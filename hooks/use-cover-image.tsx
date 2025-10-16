import { create } from "zustand";

type coverImageStoreProps = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

import React from "react";

function useCoverImage({ isOpen, onOpen, onClose }: coverImageStoreProps) {
  return <div>useCoverImage</div>;
}

export default useCoverImage;
