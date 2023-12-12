import { Result } from "antd";
import React from "react";

export default function ResultComponent({ result }) {
  const { status, title, subTitle } = result;

  return <Result status={status} title={title} subTitle={subTitle} />;
}
