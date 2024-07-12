import { Flex, Spin } from "antd";
import React from "react";
type Props = {
  loadingText?: string;
  children?: React.ReactNode;
};
const ContentPreloader: React.FC<Props> = ({ loadingText, children }) => (
  <div>
    <Flex style={{ height: "40vh" }} align="center" justify="center">
      <Spin size="large" />
    </Flex>

    {(children || loadingText) && (
      <Flex align="center" justify="center" style={{ height: "10vh" }}>
        {children}
        {loadingText && <p>{loadingText}</p>}
      </Flex>
    )}
  </div>
);

export default ContentPreloader;
