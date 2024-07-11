import noImg from "../assets/images/noImg.png";

export const getImageUrl = (imgName: string) => {
  if (!imgName) {
    return noImg;
  }
  const base =
    import.meta.env.NODE_ENV === "development"
      ? import.meta.env.VITE_LOCAL_BACKEND_URL
      : import.meta.env.VITE_PROD_BACKEND_URL;
  const url = base + imgName;
  console.log(url);
  return url;
};
