import imageCompression from "browser-image-compression";

export const compressImage = async (file: File): Promise<File> => {
 
  if (!file.type.startsWith("image/")) {
    return file;
  }

  const options = {
    maxSizeMB: 0.5, 
    maxWidthOrHeight: 1280, 
    useWebWorker: true,
    initialQuality: 0.8,
  };

  try {
    const compressedFile = await imageCompression(file, options);
    return new File([compressedFile], file.name, {
      type: file.type,
      lastModified: Date.now(),
    });
  } catch (error) {
    console.error("Image compression failed:", error);
    return file;
  }
};
