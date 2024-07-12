import { Button, Modal } from "antd";
import React from "react";

type ClassicModalProps = {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
  onConfirm: () => void;
  isLoading?: boolean;
  isDeleteModal?: boolean;
};

const ClassicModal: React.FC<ClassicModalProps> = ({
  isOpen,
  title = "Confirmation",
  onClose,
  onConfirm,
  children,
  isLoading,
  isDeleteModal,
}) => {
  const deleteFooter = [
    <Button key="back" onClick={onClose}>
      Return
    </Button>,
    <Button
      key="submit"
      type="primary"
      danger
      loading={isLoading}
      onClick={onConfirm}
    >
      Delete
    </Button>,
  ];

  const defaultFooter = [
    <Button key="back" onClick={onClose}>
      Return
    </Button>,
    <Button key="submit" type="primary" loading={isLoading} onClick={onConfirm}>
      Submit
    </Button>,
  ];

  return (
    <>
      <Modal
        open={isOpen}
        title={title}
        onOk={onConfirm}
        onCancel={onClose}
        footer={isDeleteModal ? deleteFooter : defaultFooter}
      >
        <div
          style={{
            margin: "0 auto",
            paddingTop: "20px",
            width: "100%",
          }}
        >
          {children}
        </div>
      </Modal>
    </>
  );
};

export default ClassicModal;
