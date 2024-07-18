import React from 'react'
import Sidebar from "@/views/Sidebar";
import Dashboard from "@/views/Dashboard";

export default function Home() {
  return (
      <>
        <Sidebar tab={"home"} />
        <Dashboard />
      </>
  );
}