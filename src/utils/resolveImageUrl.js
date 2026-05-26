import { API_BASE_URL } from "../services/api";

export const resolveImageUrl = (image) => {
  if (!image || typeof image !== "string") {
    return "";
  }

  const value = image.trim();

  if (!value) {
    return "";
  }

  if (/^https?:\/\//i.test(value) || value.startsWith("blob:") || value.startsWith("data:")) {
    return value;
  }

  const normalizedPath = value.startsWith("/") ? value : `/${value}`;

  try {
    return new URL(normalizedPath, API_BASE_URL).toString();
  } catch {
    return normalizedPath;
  }
};
