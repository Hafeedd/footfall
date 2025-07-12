import React from "react";
import { Header } from "./Header";
import { Outlet } from "react-router-dom";

export const Layout = () => {
  return (
    <div>
      <Header />
      <div 
      style={{ height: "calc(100vh - 64px)" }}
      className="overflow-y-auto pb-10">
        <div className="container mx-auto py-6">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
