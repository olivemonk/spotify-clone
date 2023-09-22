"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import { useForm, FieldValues } from "react-hook-form";

const UploadModal = () => {
  const uploadModal = useUploadModal();

  const form = useForm<FieldValues>({
    defaultValues:{
        author: '',
        title: '',
        song: null,
        image: null,
    }
  })

  const onChange = (open: Boolean) => {
    if (!open) {
      //Reset the form
      uploadModal.onClose();
    }
  };
  return (
    <Modal
      title="Add a Song"
      descrption="Upload a MP3 File"
      onChange={onChange}
      isOpen={uploadModal.isOpen}
    >
      Upload Content
    </Modal>
  );
};

export default UploadModal;
