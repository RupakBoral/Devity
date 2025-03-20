export const BASE_URL =
  location.hostname === "localhost"
    ? "http://localhost:8888"
    : "https://devity-backend.onrender.com";

// export const BASE_URL = "https://devity-backend.onrender.com";

export const compressBase64 = (base64, maxWidth = 500, quality = 0.4) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.src = base64;
    img.onload = () => {
      const canvas = document.createElement("canvas");
      const ctx = canvas.getContext("2d");

      // Maintain aspect ratio while resizing
      const scaleFactor = maxWidth / img.width;
      canvas.width = maxWidth;
      canvas.height = img.height * scaleFactor;

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // Convert to compressed JPEG Base64
      const compressedBase64 = canvas.toDataURL("image/jpeg", quality);
      resolve(compressedBase64);
    };
    img.onerror = (err) => reject(err);
  });
};

// while using AWS, write "/api" in place of "https://devity-backend.onrender.com"
