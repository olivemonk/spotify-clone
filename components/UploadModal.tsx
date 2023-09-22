"use client";

import useUploadModal from "@/hooks/useUploadModal";
import Modal from "./Modal";
import Input from "./Input";
import { useForm, FieldValues, SubmitHandler } from "react-hook-form";
import { useState } from "react";
import Button from "./Button";
import uniqid from "uniqid";
import toast from "react-hot-toast";
import { useUser } from "@/hooks/useUser";
import { useSupabaseClient } from "@supabase/auth-helpers-react";

const UploadModal = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const [isLoading, setIsLoading] = useState(false);
  const uploadModal = useUploadModal();

  const { register, handleSubmit, reset } = useForm<FieldValues>({
    defaultValues: {
      author: "",
      title: "",
      song: null,
      image: null,
    },
  });

  const onChange = (open: Boolean) => {
    if (!open) {
      //Reset the form
      reset();
      uploadModal.onClose();
    }
  };

  const onSubmit: SubmitHandler<FieldValues> = async (values) => {
    // upload to supabase;
    try {
      setIsLoading(true);
      const imageFile = values.image?.[0];
      const songFile = values.song?.[0];
      if (!imageFile || !songFile || !user) {
        toast.error("Please fill all the fields");
        return;
      }

      const uniqueId = uniqid();

      const {data:songData, error: songError} = await supabaseClient.storage.from('songs')


    } catch (error) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      title="Add a Song"
      descrption="Upload a MP3 File"
      onChange={onChange}
      isOpen={uploadModal.isOpen}
    >
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <Input
          id="title"
          disabled={isLoading}
          {...register("title", { required: true })}
          placeholder="Song Title"
        />
        <Input
          id="author"
          disabled={isLoading}
          {...register("author", { required: true })}
          placeholder="Song Author"
        />
        <div>
          <div className="pb-1">Select a song file</div>
          <Input
            id="song"
            type="file"
            accept=".mp3 "
            disabled={isLoading}
            {...register("song", { required: true })}
          />
        </div>
        <div>
          <div className="pb-1">Select a image </div>
          <Input
            id="image"
            type="file"
            accept="image/* "
            disabled={isLoading}
            {...register("image", { required: true })}
          />
        </div>
        <Button disabled={isLoading} type="submit">
          Create
        </Button>
      </form>
    </Modal>
  );
};

export default UploadModal;
