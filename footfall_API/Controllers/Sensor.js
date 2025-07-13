import { SensorModel } from "../models/Sensors.js";
import { emitFootfallUpdate } from "../socket/socketSvc.js";
import { passError } from "../Utils/errorHandler.js";
import dayjs from "dayjs";

export const postSensorData = async (req, res, next) => {
  try {
    const { sensorId, count, timestamp } = req.body;

    if ((!sensorId || !count, !timestamp)) {
      return res
        .status(400)
        .json({ error: "Sensor ID, timestamp and count are required" });
    }

    const newSensorData = new SensorModel({ sensorId, count, timestamp });
    const error = newSensorData.validateSync();
    if (error) throw error;

    await newSensorData.save();

    emitFootfallUpdate({
      day: dayjs(timestamp).format("YYYY-MM-DD"),
      time: dayjs(timestamp).format("HH:mm"),
      count,
    });

    res.status(200).json({
      success: true,
      message: "Sensor data saved successfully",
      data: newSensorData,
    });
  } catch (err) {
    next(passError().createError(err));
  }
};

export const getSensorData = async (req, res, next) => {
  try {
    const { sensor_id } = req.query;

    const startOfDay = dayjs().startOf("day").toDate();
    const endOfDay = dayjs().endOf("day").toDate();

    const query = {
      timestamp: { $gte: startOfDay, $lte: endOfDay },
    };

    if (sensor_id) query.sensor_id = sensor_id;

    const records = await SensorModel.find(query);

    const hourlyMap = {};
    let dailyTotal = 0;

    for (const record of records) {
      const hour = dayjs(record.timestamp).format("HH:00");
      hourlyMap[hour] = (hourlyMap[hour] || 0) + record.count;
      dailyTotal += record.count;
    }

    const hourly = Object.entries(hourlyMap).map(([hour, count]) => ({
      hour,
      count,
    }));

    res.json({
      success: true,
      message: "Sensor data retrieved successfully",
      data: { sensor_id: sensor_id || "all", daily_total: dailyTotal, hourly },
    });
  } catch (error) {
    next(passError().createError(error));
  }
};

export const getDeviceList = async (req, res, next) => {
  try {
    const allData = await SensorModel.find().sort({ timestamp: -1 });

    const deviceMap = new Map();

    for (const record of allData) {
      if (!deviceMap.has(record.sensorId)) {
        deviceMap.set(record.sensorId, record);
      }
    }

    const now = dayjs();
    const devices = [];

    for (const [sensorId, record] of deviceMap.entries()) {
      const lastSeen = dayjs(record.timestamp);
      const isActive = now.diff(lastSeen, "minute") <= 60;

      devices.push({
        sensorId,
        last_seen: lastSeen.format("HH:mm"),
        status: isActive ? "active" : "inactive",
      });
    }

    res.json({
      success: true,
      message: "Device list retrieved successfully",
      data: devices,
    });
  } catch (err) {
    next(passError().createError(err));
  }
};

export const getSummary = async (req, res, next) => {
  try {
    const now = dayjs();
    const startOfDay = now.startOf("day").toDate();
    const endOfDay = now.endOf("day").toDate();

    const allRecords = await SensorModel.find();

    const sensorMap = new Map();

    allRecords.forEach((record) => {
      const { sensorId, timestamp, count } = record;
      if (!sensorMap.has(sensorId)) {
        sensorMap.set(sensorId, {
          sensorId,
          lastSeen: timestamp,
          todayCount: 0,
        });
      }

      const sensor = sensorMap.get(sensorId);

      if (timestamp > sensor.lastSeen) {
        sensor.lastSeen = timestamp;
      }

      if (timestamp >= startOfDay && timestamp <= endOfDay) {
        sensor.todayCount += count;
      }
    });

    const summary = Array.from(sensorMap.values()).map((sensor) => {
      const lastSeen = dayjs(sensor.lastSeen);
      return {
        sensorId: sensor.sensorId,
        count: sensor.todayCount,
        lastSeen: lastSeen.format("HH:mm"),
        status: now.diff(lastSeen, "minute") <= 60 ? "active" : "inactive",
      };
    });

    res.json({
      success: true,
      message: "Summary retrieved successfully",
      data: summary,
    });
  } catch (error) {
    next(passError().createError(error));
  }
};

export const getRealTimeFootfall = async (req, res, next) => {
  try {
    const now = new Date(); // current time
    const oneHourAgo = new Date(now.getTime() - 60 * 60000);

    const records = await SensorModel.find({
      timestamp: { $gte: oneHourAgo },
    });

    const labels = [10, 20, 30, 40, 50, 60];
    const data = [0, 0, 0, 0, 0, 0];

    for (const record of records) {
      const [incomingHour, incomingMinute] = dayjs(record.timestamp)
        .format("HH:mm")
        .split(":")
        .map(Number);

      const roundedMinute = Math.round(incomingMinute / 10) * 10;

      const ind = labels.indexOf(roundedMinute);

      data[ind] += record.count || 0;
    }

    res.json({
      success: true,
      message: "Footfall data (last 1 hour by 10-minute interval)",
      data: {
        hour: dayjs(now).format("HH:mm"),
        label: labels,
        data: data,
      },
    });
  } catch (error) {
    next(passError().createError(error));
  }
};
