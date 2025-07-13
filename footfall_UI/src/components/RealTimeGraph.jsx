import React, { use, useEffect, useState } from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Line } from "react-chartjs-2";
import { sensorSvc } from "../api/services";
import { useFetch } from "../hooks/useFetch";
import { socket } from "../utils/socketSvc";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

export const RealTimeGraph = () => {
  const [realTimeData, setRealTimeData] = useState([]);

  const { data, isLoading, error, refetch } = useFetch(sensorSvc.realTime);

  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to socket:", socket.id);
    });

    socket.on("footfallUpdate", (newData) => {
      if (newData && realTimeData?.data?.length > 0)
        updateFootfallRealTime(newData);
    });

    return () => {
      socket.off("connect");
      socket.off("footfallUpdate");
    };
  }, [realTimeData]);

  useEffect(() => {
    setRealTimeData(data);
  }, [data]);

  const updateFootfallRealTime = (newData) => {
    try {
      let updatedData = { ...realTimeData };
      const [incomingHour, incomingMinute] = newData.time
        .split(":")
        .map(Number);
      const [currentHour] = updatedData?.hour?.split(":").map(Number);

      const index = updatedData?.label?.indexOf(
        Math.round(incomingMinute / 10) * 10
      );
      if (incomingHour === currentHour && index !== -1) {
        updatedData.data[index] += newData.count;

        setRealTimeData({ ...updatedData });
      } else {
        refetch();
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="flex flex-col mt-8">
      <span className="text-xl font-bold">Real-Time Footfall</span>

      <div className="w-full h-[400px] mt-4">
        <Line
          data={{
            labels: realTimeData?.label || [],
            datasets: [
              {
                label: "Footfall Count",
                data: realTimeData?.data || [0, 0, 0, 0, 0, 0],
                backgroundColor: "rgba(100, 100, 100, 0.6)",
                borderColor: "rgba(0, 0, 0, 1)",
                borderWidth: 1,
                lineTension: 0.2,
              },
            ],
          }}
          options={{
            maintainAspectRatio: false,
            scales: {
              y: {
                title: {
                  display: true,
                  text: "COUNT",
                },
                beginAtZero: true,
                min: 0,
              },
              x: {
                title: {
                  display: true,
                  text: "Time (Minutes)",
                },
              },
            },
            responsive: true,
            plugins: {
              legend: {
                position: "top",
              },
            },
          }}
        />
      </div>
    </div>
  );
};
