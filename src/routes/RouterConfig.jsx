import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Spin } from "antd";
import DashboardLayout from "../dashboard/Layout/index.jsx";
import NotFound from "../components/NotFound.jsx";
import "./RouterConfig.css";

const Welcome = lazy(() => import("../dashboard/Welcome"));
const Colors = lazy(() => import("../dashboard/Colors"));
const CarRegistration = lazy(() => import("../dashboard/CarRegistration"));
const NotificationScreen = lazy(() => import("../dashboard/Notification"));

export default function RouterConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route
            path="/"
            element={
              <Suspense fallback={<Spin className="loader" />}>
                <Welcome />
              </Suspense>
            }
          />
          <Route
            path="/color"
            element={
              <Suspense fallback={<Spin />}>
                <Colors />
              </Suspense>
            }
          />
          <Route
            path="/car-registration"
            element={
              <Suspense fallback={<Spin />}>
                <CarRegistration />
              </Suspense>
            }
          />
          <Route
            path="/notifications"
            element={
              <Suspense fallback={<Spin />}>
                <NotificationScreen />
              </Suspense>
            }
          />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
