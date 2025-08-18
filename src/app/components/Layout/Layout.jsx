import React from "react";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router";
import { Header } from "./Header";

export const Layout = () => {
  return (
    <div className="flex flex-row w-full h-screen bg-gray-400">
      <Navbar />
      <div className="w-full h-full overflow-y-auto overflow-hidden">
        <Header />
        <div className="p-4 flex">
          <Outlet />
        </div>
      </div>
    </div>
  );
};
