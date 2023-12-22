import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import {
  DashboardLayout,
  Welcome,
  ColorButtons,
  UserDetails,
  NotificationScreen,
} from "../dashboard";
import NotFound from "../components/NotFound.jsx";

export default function RouterConfig() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<DashboardLayout />}>
          <Route path="/" element={<Welcome />} />
          <Route path="/color" element={<ColorButtons />} />
          <Route path="/user-details" element={<UserDetails />} />
          <Route path="/notifications" element={<NotificationScreen />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
