type CloudinaryAssetOptions = {
  width?: number;
  height?: number;
  crop?: "fill" | "fit" | "limit";
  gravity?: "auto" | "center" | "face";
  quality?: "auto" | number;
  format?: "auto" | "webp" | "jpg" | "png";
};

export const cloudinaryConfig = {
  cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dtmh3eypz",
  folder: process.env.NEXT_PUBLIC_CLOUDINARY_FOLDER || "hudson-river-realtors",
};

export function getCloudinaryAssetUrl(publicId: string, options: CloudinaryAssetOptions = {}) {
  if (!cloudinaryConfig.cloudName || !publicId) {
    return "";
  }

  const resizeComponent = [
    options.crop ? `c_${options.crop}` : options.width || options.height ? "c_limit" : null,
    options.gravity ? `g_${options.gravity}` : null,
    options.width ? `w_${options.width}` : null,
    options.height ? `h_${options.height}` : null,
  ]
    .filter(Boolean)
    .join(",");

  const transformations = [resizeComponent || null, `f_${options.format ?? "auto"}`, `q_${options.quality ?? "auto"}`]
    .filter(Boolean)
    .join("/");

  return `https://res.cloudinary.com/${cloudinaryConfig.cloudName}/image/upload/${transformations}/${publicId}`;
}
