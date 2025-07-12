import React from "react";
import { useFetch } from "../hooks/useFetch";
import { sensorSvc } from "../api/services";

export const DeviceList = () => {
  const { data, isLoading, error } = useFetch(sensorSvc.summary);

  return (
    <div className="flex flex-col mt-8">
      <span className="text-xl font-bold">Sensors list</span>

      <div className="flex flex-wrap gap-4 mt-4">
        {data?.length > 0 ? (
          data.map((sensor) => (
            <div className="w-[32%] bg-gray-50 shadow-md rounded-lg p-4 flex flex-col gap-2 ">
              <div className="flex items-center gap-4">
                <span className="text-xl font-semibold">{sensor?.sensorId}</span>
                <span
                style={{
                  backgroundColor: sensor?.status === "active" ? "green" : "red",
                }}
                className="text-white w-fit p-1 rounded-sm">
                  Status: {sensor?.status}
                </span>
              </div>
              <span>last Seen : {sensor?.lastSeen}</span>
              <span>Today total count : {sensor?.count}</span>
            </div>
          ))
        ) : (
          <div className="w-full text-center text-gray-500">
            {isLoading ? "Loading..." : error || "No data available"}
          </div>
        )}
      </div>
    </div>
  );
};
