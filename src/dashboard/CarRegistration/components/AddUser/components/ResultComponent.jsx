import React from "react";
import { Result } from "antd";

export const ResultComponent = ({ result }) => {
  const { status, title, subTitle } = result;

  return <Result status={status} title={title} subTitle={subTitle} />;
};
