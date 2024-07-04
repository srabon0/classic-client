import { Drawer, Space } from "antd";
import React from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
  footer?: React.ReactNode;
};

const CDrawer: React.FC<Props> = ({
  isOpen,
  onClose,
  children,
  title = "",
  footer = null,
}) => {
  return (
    <>
      <Drawer
        title={title}
        width={720}
        onClose={onClose}
        open={isOpen}
        styles={{
          body: {
            paddingBottom: 80,
          },
        }}
        footer={<>{footer ? <Space>{footer}</Space> : <Space>{null}</Space>}</>}
      >
        {children}
      </Drawer>
    </>
  );
};

export default CDrawer;
