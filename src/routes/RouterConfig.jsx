import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  Welcome,
  Colors,
  CarRegistration,
  NotificationScreen,
} from "../dashboard";
import DashboardLayout from "../dashboard/Layout/index.jsx";
import NotFound from "../components/NotFound.jsx";

export default function RouterConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/color" element={<Colors />} />
          <Route path="/car-registration" element={<CarRegistration />} />
          <Route path="/notifications" element={<NotificationScreen />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
