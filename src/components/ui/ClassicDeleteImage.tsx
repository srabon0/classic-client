import { DeleteOutlined } from "@ant-design/icons";
import { Button, Image, Spin } from "antd";
import { useState } from "react";
import { useDeleteSingleImageMutation } from "../../redux/features/product/productApi";
import { getImageUrl } from "../../utils/get-image-url";

type Props = {
  item: any;
};

const DeleteImageCard: React.FC<Props> = ({ item }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [deleteSingleImage, { isLoading: isDeleting, error: deleteError }] =
    useDeleteSingleImageMutation();
  const deleteImage = (item: any) => {
    deleteSingleImage(item);
  };

  if (deleteError) {
    console.log(deleteError);
  }

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        width: 175,
        marginTop: 10,
        position: "relative",
        borderRadius: 8,
      }}
    >
      <Image
        style={{
          borderRadius: 8,
          objectFit: "cover",
          width: "100%",
        }}
        preview={false}
        src={getImageUrl(item?.imageUrl)}
      />
      {isHovered &&
        (isDeleting ? (
          <Button
            onClick={() => {
              deleteImage(item);
            }}
            icon={<Spin />}
            type="dashed"
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ) : (
          <Button
            onClick={() => {
              deleteImage(item);
            }}
            icon={<DeleteOutlined />}
            type="primary"
            danger
            style={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}
    </div>
  );
};

export default DeleteImageCard;
