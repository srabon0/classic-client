import { Button, Form, Input } from "antd";
import React, { useEffect, useState } from "react";
import CDrawer from "../../components/ui/Drawer";

import { CloseOutlined, PlusCircleOutlined } from "@ant-design/icons";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import {
  useAddCategoryMutation,
  useUpdateCategoryMutation,
} from "../../redux/features/categories/categoryApi";

type Props = {
  updatingData?: any;
  isOpen: boolean;
  handleClose: () => void;
};

const CategoryForm: React.FC<Props> = ({
  updatingData,
  isOpen,
  handleClose,
}) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [addCategory] = useAddCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  // const token = useAppSelector(useCurrentToken);

  const { control, handleSubmit, setValue, reset } = useForm({
    defaultValues: {
      name: "",
      description: "",
      subCategories: [{ name: "" }],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "subCategories",
  });

  useEffect(() => {
    if (updatingData) {
      setValue("name", updatingData.name);
      setValue("description", updatingData.description);
      setValue("subCategories", updatingData.subCategories);
    }
  }, [updatingData, setValue]);

  useEffect(() => {
    if (!isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);

    const payload = {
      name: data.name,
      description: data.description,
      subCategories: data.subCategories,
    };

    const isUpdate = updatingData ? updatingData._id : null;
    console.log("payload", payload);
    console.log("updatingData", updatingData);
    console.log("isUpdate", isUpdate);
    try {
      const response = (await isUpdate)
        ? updateCategory({
            ...payload,
            id: updatingData._id,
          }).unwrap()
        : addCategory(payload).unwrap();
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
      <CDrawer title={"Category Form"} isOpen={isOpen} onClose={handleClose}>
        <Form layout="vertical" onFinish={handleSubmit(onSubmit)}>
          <Form.Item label="Category">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <Input {...field} placeholder="Enter Product Category name" />
              )}
            />
          </Form.Item>

          <Form.Item label="Sub Categories">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="ant-row ant-form-item"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  marginBottom: "8px",
                }}
              >
                <Controller
                  name={`subCategories.${index}.name`}
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder="Enter Sub Category name"
                      style={{ width: "90%", marginRight: "8px" }}
                    />
                  )}
                />
                <Button
                  danger
                  onClick={() => remove(index)}
                  style={{ marginRight: "8px" }}
                >
                  <CloseOutlined />
                </Button>
                {index === fields.length - 1 && (
                  <Button
                    type="primary"
                    icon={<PlusCircleOutlined />}
                    onClick={() => append({ name: "" })}
                  ></Button>
                )}
              </div>
            ))}
          </Form.Item>

          <Form.Item label="Description">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <Input.TextArea
                  {...field}
                  rows={4}
                  placeholder="Type your message"
                />
              )}
            />
          </Form.Item>

          <Form.Item>
            <Button
              disabled={isSubmitting}
              loading={isSubmitting}
              htmlType="submit"
              type="primary"
            >
              {
                // eslint-disable-next-line no-nested-ternary
                isSubmitting
                  ? "Submitting..."
                  : !updatingData
                  ? "Create Category"
                  : "Update Category"
              }
            </Button>
          </Form.Item>
        </Form>
      </CDrawer>
    </div>
  );
};

export default CategoryForm;
