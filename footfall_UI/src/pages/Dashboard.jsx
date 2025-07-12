import React from "react";
import { RealTimeGraph } from "../components/RealTimeGraph";
import { DeviceList } from "../components/DeviceList";
import { Summary } from "../components/Summary";
import { SensorMap } from "../components/SensorMap";

export const Dashboard = () => {
  return (
    <div className="flex flex-col">
      <span className="text-4xl font-semibold">Dashboard</span>

      {/* Footfall Summary */}
      <Summary />

      {/* realtime footage */}
      <RealTimeGraph />

      {/* Device list */}
      <DeviceList />
      
      {/* Sensor Map */}
      <SensorMap />
    </div>
  );
};
