import { SyncOutlined } from "@ant-design/icons";
import { Spin } from "antd";
import React from "react";
import { HashRouter as Router } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

export function AppProvider({ children }: Props) {
  return (
    <React.Suspense
      fallback={
        <Spin indicator={<SyncOutlined style={{ fontSize: "24px" }} spin />} />
      }
    >
      <Router>{children}</Router>
    </React.Suspense>
  );
}
