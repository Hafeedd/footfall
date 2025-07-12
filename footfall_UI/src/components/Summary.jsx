import React from "react";
import { useFetch } from "../hooks/useFetch";
import { sensorSvc } from "../api/services";

export const Summary = () => {
  const { data, isLoading, error } = useFetch(sensorSvc.summary);

  return (
    <div className="flex flex-col mt-8">
      <span className="text-xl font-bold">Footfall Summary</span>

      <div className="flex flex-wrap gap-4 mt-4">
        {data?.length > 0 ? (
          data.map((sensor) => (
            <div className="w-[25%] border border-gray-200 rounded-lg p-4 flex flex-col gap-2 hover:shadow-lg transition-shadow duration-200">
              <span>{sensor?.sensorId}</span>
              <span className="text-2xl font-semibold">Today's Count: {sensor?.count}</span>
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
