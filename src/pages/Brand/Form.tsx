import React from "react";
import CDrawer from "../../components/ui/Drawer";

type Props = {
  isOpen: boolean;
  handleClose: () => void;
};

const Form: React.FC<Props> = ({ isOpen, handleClose }) => {
  return (
    <div>
      <CDrawer isOpen={isOpen} onClose={handleClose}>
        hello worl
      </CDrawer>
    </div>
  );
};

export default Form;
