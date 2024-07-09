import React, { useEffect, useState } from "react";
import CDrawer from "../../components/ui/Drawer";

import { PlusOutlined } from "@ant-design/icons";
import { Button, Image, Input, Select, Upload } from "antd";
import { Controller, useForm } from "react-hook-form";
import { useAppSelector } from "../../redux/hook";

import type { GetProp, UploadFile, UploadProps } from "antd";
import { useCurrentToken } from "../../redux/features/auth/authSlice";
import { useAddProductMutation } from "../../redux/features/product/productApi";

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
  isOpen: boolean;
  handleClose: () => void;
};

const Form: React.FC<Props> = ({ isOpen, handleClose }) => {
  const token = useAppSelector(useCurrentToken);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [fileList, setFileList] = useState<UploadFile[]>([]);
  const {
    register,
    handleSubmit,
    setValue,
    clearErrors,
    formState: { errors },
    control,
    watch,
  } = useForm();

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

  const handleChangeInput = (name: string, value: string) => {
    setValue(name, value);
    if (value.trim().length > 0) clearErrors(name);
  };

  const handleChangeCategory = (value: string) => {
    console.log(`selected ${value}`);
  };

  const handleChangeBrand = (value: string) => {
    console.log(`selected ${value}`);
  };

  const categoryList = useAppSelector((state) => state.categories.categories);
  const brandList = useAppSelector((state) => state.brand.brands);

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

  const selectedCategory = watch("category");

  useEffect(() => {
    setValue("subCategory", null);
  }, [selectedCategory, setValue]);

  const [addProduct] = useAddProductMutation();

  const onSubmit = async (data: any) => {
    const files = new FormData();
    fileList.forEach((file) => {
      files.append("image", file.originFileObj as Blob);
    });
    const imgList = await uploadProductImage(files as FormData);
    const product = {
      title: data.title,
      model: data.model,
      price: Number(data.price),
      code: data.code,
      description: data.description,
      cartoncapacity: Number(data.cartoncapacity),
      category: data.category,
      subCategory: data.subCategory,
      brand: data.brand,
      image: imgList,
    };

    try {
      const response = await addProduct(product).unwrap();
      console.log("response", response);
      handleClose();
    } catch (error) {
      console.log("error", error);
    }
  };

  return (
    <div>
      <CDrawer title="Add Product" isOpen={isOpen} onClose={handleClose}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              placeholder="Product name"
              {...register("title", {
                required: "Product name is required",
              })}
              onChange={(e) => handleChangeInput("title", e.target.value)}
            />
            {errors.title && (
              <p style={{ color: "red" }}>{errors.title.message as string}</p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              placeholder="Model"
              {...register("model", { required: "Model is required" })}
              onChange={(e) => handleChangeInput("model", e.target.value)}
            />
            {errors.model && (
              <p style={{ color: "red" }}>{errors.model.message as string}</p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              type="number"
              min={0}
              placeholder="Price"
              {...register("price", { required: "Price is required" })}
              onChange={(e) => handleChangeInput("price", e.target.value)}
            />
            {errors.price && (
              <p style={{ color: "red" }}>{errors.price.message as string}</p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              placeholder="Code"
              {...register("code", { required: "Code is required" })}
              onChange={(e) => handleChangeInput("code", e.target.value)}
            />
            {errors.code && (
              <p style={{ color: "red" }}>{errors.code.message as string}</p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              placeholder="Description"
              {...register("description", {
                required: "Description is required",
              })}
              onChange={(e) => handleChangeInput("description", e.target.value)}
            />
            {errors.description && (
              <p style={{ color: "red" }}>
                {errors.description.message as string}
              </p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Input
              size="large"
              type="number"
              min={0}
              placeholder="Carton capacity"
              {...register("cartoncapacity", {
                required: "Carton capacity is required",
              })}
              onChange={(e) =>
                handleChangeInput("cartoncapacity", e.target.value)
              }
            />
            {errors.cartoncapacity && (
              <p style={{ color: "red" }}>
                {errors.cartoncapacity.message as string}
              </p>
            )}
          </div>
          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Controller
              name="category"
              control={control}
              rules={{ required: "Category is required" }}
              render={({ field }) => (
                <Select
                  allowClear
                  size="large"
                  {...field}
                  placeholder="Select Category"
                  style={commonStyles.select}
                  options={options.category}
                  loading={false} // Change this to actual loading state
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeCategory(value);
                  }}
                />
              )}
            />
            {errors.category && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.category.message as string}
              </p>
            )}
          </div>

          {selectedCategory && (
            <div style={{ marginBottom: "10px" }}>
              <Controller
                name="subCategory"
                control={control}
                rules={{ required: "Sub Category is required" }}
                render={({ field }) => (
                  <Select
                    size="large"
                    {...field}
                    placeholder="Select Sub Category"
                    style={commonStyles.select}
                    options={
                      options.category.find(
                        (item) => item.value === selectedCategory
                      )?.subCategories
                    }
                    onChange={(value) => field.onChange(value)}
                  />
                )}
              />
              {errors.subCategory && (
                <p style={{ color: "red", marginBottom: "10px" }}>
                  {errors.subCategory.message as string}
                </p>
              )}
            </div>
          )}

          <div
            style={{
              marginBottom: "10px",
            }}
          >
            <Controller
              name="brand"
              control={control}
              rules={{ required: "Brand is required" }}
              render={({ field }) => (
                <Select
                  size="large"
                  {...field}
                  placeholder="Select Brand"
                  style={commonStyles.select}
                  options={options.brand}
                  loading={false} // Change this to actual loading state
                  onChange={(value) => {
                    field.onChange(value);
                    handleChangeBrand(value);
                  }}
                />
              )}
            />
            {errors.brand && (
              <p style={{ color: "red", marginBottom: "10px" }}>
                {errors.brand.message as string}
              </p>
            )}
          </div>
          <>
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
          </>

          <Button htmlType="submit" style={commonStyles.button}>
            Submit
          </Button>
        </form>
      </CDrawer>
    </div>
  );
};

export default Form;
