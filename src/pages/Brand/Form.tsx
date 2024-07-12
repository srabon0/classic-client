import { Button, Col } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import CDrawer from "../../components/ui/Drawer";

import FormInput from "../../components/form/FormInput";
import FormTextArea from "../../components/form/FormTextArea";
import {
  useAddBrandMutation,
  useUpdateBrandMutation,
} from "../../redux/features/brand/brandApi";

const commonStyles = {
  input: {
    width: "100%",
    marginBottom: "10px",
  },
  select: {
    width: "100%",
    marginBottom: "20px",
  },
  button: {
    width: "100%",
    marginTop: "20px",
  },
};

type Props = {
  updatingData?: any;
  isOpen: boolean;
  handleClose: () => void;
};

const ProductForm: React.FC<Props> = ({
  updatingData,
  isOpen,
  handleClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addBrand] = useAddBrandMutation();
  const [updateBrand] = useUpdateBrandMutation();
  // const token = useAppSelector(useCurrentToken);

  const [defaultValues, setDefaultValues] = useState<any>({
    name: "",
    description: "",
  });

  useEffect(() => {
    if (updatingData) {
      setDefaultValues({
        name: updatingData?.name,
        description: updatingData?.description,
      });
    }
  }, [updatingData]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    const payload = {
      name: data.name,
      description: data.description,
    };

    const isUpdate = updatingData ? updatingData._id : null;
    try {
      const response = (await isUpdate)
        ? updateBrand({
            ...payload,
            id: updatingData._id,
          }).unwrap()
        : addBrand(payload).unwrap();
      console.log("response", response);
      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      console.log("error", error);
      setIsSubmitting(false);
      handleClose();
    }
  };

  return (
    <div>
      <CDrawer title={"Brand Form"} isOpen={isOpen} onClose={handleClose}>
        <Form defaultValues={defaultValues} submitHandler={onSubmit}>
          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              required
              label="Brand"
              name="name"
              type="text"
              size="large"
              placeholder="Brand name"
              validation={{ required: "Brand name is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormTextArea
              name="description"
              label="Description"
              placeholder="Description"
              rows={4}
            />
          </Col>
          <Button
            disabled={isSubmitting}
            loading={isSubmitting}
            htmlType="submit"
            style={commonStyles.button}
          >
            {
              // eslint-disable-next-line no-nested-ternary
              isSubmitting
                ? "Submitting..."
                : !updatingData
                ? "Create Brand"
                : "Update Brand"
            }
          </Button>
        </Form>
      </CDrawer>
    </div>
  );
};

export default ProductForm;
