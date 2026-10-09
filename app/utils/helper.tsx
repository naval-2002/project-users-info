import React from "react";

export const localUrl = (file: Blob | MediaSource | undefined) => {
  return file ? URL.createObjectURL(file) : "";
};
