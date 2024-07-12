import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Image, Upload } from "antd";
import React, { useEffect, useState } from "react";
import Form from "../../components/form/Form";
import CDrawer from "../../components/ui/Drawer";
import { useAppSelector } from "../../redux/hook";

import type { GetProp, UploadFile, UploadProps } from "antd";
import FormInput from "../../components/form/FormInput";
import FormSelectField from "../../components/form/FormSelectField";
import FormTextArea from "../../components/form/FormTextArea";
import DeleteImageCard from "../../components/ui/ClassicDeleteImage";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import {
  useAddProductMutation,
  useUpdateProductMutation,
} from "../../redux/features/product/productApi";
import { TSubCategory } from "../../types/categories.type";

type FileType = Parameters<GetProp<UploadProps, "beforeUpload">>[0];

const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

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

  const [selectedCategory, setSelectedCategory] = useState({
    value: "",
    label: "",
  });
  const token = useAppSelector(useCurrentToken);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const [defaultValues, setDefaultValues] = useState<any>({
    title: "",
    model: "",
    price: "",
    code: "",
    cartoncapacity: "",
    description: "",
    category: "",
    subCategory: "",
    brand: "",
  });

  useEffect(() => {
    setFileList([]);
    setPreviewImage("");
    setSelectedCategory({ value: "", label: "" });
    setSubCategory([]);
  }, [isOpen]);

  useEffect(() => {
    if (updatingData) {
      setDefaultValues({
        title: updatingData?.title,
        model: updatingData?.model,
        price: updatingData?.price,
        code: updatingData?.code,
        cartoncapacity: updatingData?.cartoncapacity,
        description: updatingData?.description,
        category: updatingData?.category?._id || selectedCategory.value,
        subCategory: updatingData?.subCategory,
        brand: updatingData?.brand?._id,
      });
    }
  }, [updatingData]);

  const uploadProductImage = async (files: FormData) => {
    const base =
      import.meta.env.NODE_ENV === "development"
        ? import.meta.env.VITE_LOCAL_BACKEND_URL
        : import.meta.env.VITE_PROD_BACKEND_URL;

    const uploadUrl = base + "files/upload-image";

    // Get the token from the Redux state

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: files,
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      });

      if (
        (response?.status === 200 || response?.status === 201) &&
        response.ok
      ) {
        const data = await response.json();
        if (data?.length) {
          return data.map((item: any) => item?.data);
        }
        return await data?.data;
      } else {
        console.log("image upload failed", response);
        return;
      }
    } catch (error) {
      console.log("image upload error", error);
      return;
    }
  };

  const uploadProductImageToFolder = async (files: FormData) => {
    const folder = updatingData?.image[0]?.folder || "tempFolder";
    const base =
      import.meta.env.NODE_ENV === "development"
        ? import.meta.env.VITE_LOCAL_BACKEND_URL
        : import.meta.env.VITE_PROD_BACKEND_URL;
    const uploadUrl = base + "files/upload-to-folder/" + folder;

    try {
      const response = await fetch(uploadUrl, {
        method: "POST",
        body: files,
        headers: {
          "Access-Control-Allow-Origin": "*",
          authorization: `Bearer ${token}`,
        },
      });

      if (
        (response?.status === 200 || response?.status === 201) &&
        response.ok
      ) {
        const data = await response.json();
        if (data?.length) {
          return data.map((item: any) => item?.data);
        }
        return await data?.data;
      } else {
        console.log("image upload failed", response);
        return;
      }
    } catch (error) {
      console.log("image upload error", error);
      return;
    }
  };

  const categoryList = useAppSelector((state) => state.categories.categories);
  const brandList = useAppSelector((state) => state.brand.brands);

  const [subCategory, setSubCategory] = useState<TSubCategory[]>([]);

  const options = {
    category: categoryList?.map((item) => ({
      value: item._id,
      label: item.name,
      subCategories: item?.subCategories?.map((sub) => ({
        value: sub.name,
        label: sub.name,
      })),
    })),
    brand: brandList?.map((item) => ({
      value: item._id,
      label: item.name,
    })),
  };

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  const handleChange: UploadProps["onChange"] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button style={{ border: 0, background: "none" }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const [addProduct] = useAddProductMutation();
  const [updateProduct] = useUpdateProductMutation();

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const files = new FormData();
    fileList.forEach((file) => {
      files.append("image", file.originFileObj as Blob);
    });
    // const imgList = await uploadProductImage(files as FormData);
    const imgList = updatingData?.image?.length
      ? await uploadProductImageToFolder(files as FormData)
      : await uploadProductImage(files as FormData);
    const payload = {
      title: data.title,
      model: data.model,
      price: Number(data.price),
      code: data.code,
      description: data.description,
      cartoncapacity: Number(data.cartoncapacity),
      category: data.category as string,
      subCategory: data.subCategory,
      brand: data.brand,
      image: imgList,
    };

    const isUpdate = updatingData ? updatingData._id : null;
    try {
      const response = (await isUpdate)
        ? updateProduct({
            ...payload,
            id: updatingData._id,
          }).unwrap()
        : addProduct(payload).unwrap();
      console.log("response", response);
      setIsSubmitting(false);
      handleClose();
    } catch (error) {
      console.log("error", error);
      setIsSubmitting(false);
      handleClose();
    }
  };

  const onChangeCategory = (cat: any) => {
    setSelectedCategory(cat);

    const foundCategory = options?.category?.find(
      (item) => item?.value === cat
    );
    const subCategories = foundCategory?.subCategories as
      | TSubCategory[]
      | undefined;
    setSubCategory(subCategories || []);
  };
  return (
    <div>
      <CDrawer title={"Product Form"} isOpen={isOpen} onClose={handleClose}>
        <Form defaultValues={defaultValues} submitHandler={onSubmit}>
          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              required
              label="Product name"
              name="title"
              type="text"
              size="large"
              placeholder="Product name"
              validation={{ required: "Product name is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              required
              label="Model"
              name="model"
              type="text"
              size="large"
              placeholder="Model"
              validation={{ required: "Model is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              label="Price"
              required
              name="price"
              type="number"
              size="large"
              placeholder="Price"
              validation={{ required: "Price is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              required
              label="Code"
              name="code"
              type="text"
              size="large"
              placeholder="Code"
              validation={{ required: "Code is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormInput
              name="cartoncapacity"
              label="Carton capacity"
              required
              type="number"
              size="large"
              placeholder="Carton capacity"
              validation={{ required: "Carton capacity is required" }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              name="category"
              options={options.category}
              placeholder="Select Category"
              label="Category"
              handleChange={(value) => {
                onChangeCategory(value);
              }}
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              name="subCategory"
              options={subCategory as any}
              placeholder="Select Sub Category"
              label="Sub Category"
            />
          </Col>

          <Col
            className="gutter-row"
            style={{
              marginBottom: "10px",
            }}
          >
            <FormSelectField
              name="brand"
              options={options.brand}
              placeholder="Select Brand"
              label="Brand"
            />
          </Col>
          <Col
            style={{
              marginBottom: "10px",
              marginTop: "10px",
            }}
          >
            <Upload
              listType="picture-card"
              fileList={fileList}
              onPreview={handlePreview}
              onChange={handleChange}
            >
              {fileList.length >= 8 ? null : uploadButton}
            </Upload>
            {previewImage && (
              <Image
                wrapperStyle={{ display: "none" }}
                preview={{
                  visible: previewOpen,
                  onVisibleChange: (visible) => setPreviewOpen(visible),
                  afterOpenChange: (visible) => !visible && setPreviewImage(""),
                }}
                src={previewImage}
              />
            )}

            {updatingData?.image?.length
              ? updatingData?.image?.map((item: any, index: number) => (
                  <div
                    key={index}
                    style={{
                      display: "flex",
                      gap: "10px",
                      marginBottom: "10px",
                    }}
                  >
                    <DeleteImageCard
                      item={{ ...item, productId: updatingData?._id }}
                    />
                  </div>
                ))
              : null}
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
                ? "Create Product"
                : "Update Product"
            }
          </Button>
        </Form>
      </CDrawer>
    </div>
  );
};

export default ProductForm;
