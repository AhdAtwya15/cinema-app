
interface CloudinaryOptions {
    width?: number;
    height?: number;
    quality?: string | number;
    format?: string;
    crop?: string;
    dpr?: string | number;
}

export const getOptimizedCloudinaryUrl = (url: string | undefined, options: CloudinaryOptions = {}) => {
    if (!url) return "";
    if (!url.includes("cloudinary.com")) return url;

    const { 
        width, 
        height, 
        quality = "auto", 
        format = "auto", 
        crop = "fill",
        dpr = "auto"
    } = options;
    const parts = url.split("/upload/");
    if (parts.length !== 2) return url;

    const transformParts = [
        `f_${format}`,
        `q_${quality}`,
        `dpr_${dpr}`
    ];

    if (width) transformParts.push(`w_${width}`);
    if (height) transformParts.push(`h_${height}`);
    if (width || height) transformParts.push(`c_${crop}`);

    const transformationString = transformParts.join(",");

    return `${parts[0]}/upload/${transformationString}/${parts[1]}`;
};

export const getCloudinarySrcSet = (url: string | undefined, widths: number[], options: CloudinaryOptions = {}) => {
    if (!url || !url.includes("cloudinary.com")) return undefined;
    
    return widths
        .map(w => `${getOptimizedCloudinaryUrl(url, { ...options, width: w })} ${w}w`)
        .join(", ");
};
