import React from "react";
import { Flex, Typography } from "antd";

const { Title } = Typography;

export default function Welcome() {
  return (
    <Flex justify="center" align="center" vertical>
      <Title level={1}>WELCOME TO APPFORPRACTICE</Title>
      <iframe
        title="welcome"
        src="https://giphy.com/embed/xUPGGDNsLvqsBOhuU0"
        width="480"
        height="360"
        frameBorder="0"
        class="giphy-embed"
        allowFullScreen
      ></iframe>
      <p>
        <a href="https://giphy.com/gifs/animation-cool-hello-xUPGGDNsLvqsBOhuU0">
          via GIPHY
        </a>
      </p>
    </Flex>
  );
}
