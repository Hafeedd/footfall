import { Router } from "express";
import {
  getDeviceList,
  getRealTimeFootfall,
  getSensorData,
  getSummary,
  postSensorData,
} from "../Controllers/Sensor.js";

const routes = Router();

routes.post("/sensor-data", postSensorData);
routes.get("/analytics", getSensorData);
routes.get("/devices", getDeviceList);
routes.get("/summary", getSummary);
routes.get("/realtimeFootfall", getRealTimeFootfall);

export default routes;
