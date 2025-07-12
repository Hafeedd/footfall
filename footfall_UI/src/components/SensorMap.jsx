import React from "react";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";

export const SensorMap = () => {
  return (
    <div className="flex flex-col mt-8">
      <span className="text-xl font-bold">Sensors Map View</span>

      <div className="mt-4 h-[500px] w-full">
        <MapContainer
          center={[11.2488, 75.7839]}
          zoom={13}
          scrollWheelZoom={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={[11.2488, 75.7839]}>
            <Popup>
              SENSOR1<br />
              Status: Active
              <br />
              Last Seen: 20 minutes ago
              <br />
              Total Count Today: 50
            </Popup>
          </Marker>
          <Marker position={[11.2591, 75.7839]}>
            <Popup>
              SENSOR2<br />
              Status: InActive
              <br />
              Last Seen: 1 hours ago
              <br />
              Total Count Today: 130
            </Popup>
          </Marker>
        </MapContainer>
      </div>
    </div>
  );
};
