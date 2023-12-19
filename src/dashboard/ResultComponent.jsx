import React from "react";
import { Result } from "antd";

export default function ResultComponent({ result }) {
  const { status, title, subTitle } = result;

  return <Result status={status} title={title} subTitle={subTitle} />;
}
