"use client";

// import { useState } from "react";

// import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

// import React from "react";
// import { Modal } from "./modal";
// import { Heading } from "../heading";
// import { Input } from "../inputs/input";
// import toast from "react-hot-toast";
// import { useRouter } from "next/navigation";
// import { useProfileModal } from "@/app/hooks/useProfileModal";
// import { SafeUser } from "@/app/types";
// import { Avatar } from "../avatar";
// import { ImageUpload } from "../inputs/ImageUpload";
// import axios from "axios";

// interface Props {
//   currentUser?: SafeUser | null;
// }

// export const ProfileModal = ({ currentUser }: Props) => {
//   const router = useRouter();
//   const profileModal = useProfileModal();
//   const [isLoading, setIsLoading] = useState(false);
//   const {
//     register,
//     handleSubmit,
//     setValue,
//     watch,
//     formState: { errors },
//     reset,
//   } = useForm<FieldValues>({
//     defaultValues: {
//       name: `${currentUser?.name}`,
//       imageSrc: currentUser?.image,
//     },
//   });

//   const imageSrc = watch("imageSrc");
//   const setCustomValue = (id: string, value: any) => {
//     setValue(id, value, {
//       shouldValidate: true,
//       shouldDirty: true,
//       shouldTouch: true,
//     });
//   };

//   const onSubmit: SubmitHandler<FieldValues> = (data) => {
//     console.log(data);
//     setIsLoading(true);
//     if (!currentUser) {
//       toast.error("Unauthorized");
//       profileModal.onClose();
//     }
//     const userId = currentUser?.id;

//     axios
//       .patch(`/api/user/${currentUser?.id}`, { ...data, userId })
//       .then((error) => {
//         setIsLoading(false);

//         if (!error) {
//           toast.success("Logged in successfully");
//           router.refresh();
//           profileModal.onClose();
//         }
//         if (error) {
//           toast.error("Something went wrong!");
//         }
//       });
//     profileModal.onClose();
//   };

//   const bodyContent = (
//     <div className="flex flex-col gap-4 items-center">
//       <div className="relative flex flex-col items-center gap-4">
//         <Avatar height={100} width={100} src={imageSrc} />
//         <div className="w-[auto] max-h-[20rem]">
//           <ImageUpload
//             onChange={(value) => {
//               setCustomValue("imageSrc", value);
//             }}
//             value={imageSrc}
//             padding="2"
//             label=""
//           />
//         </div>
//       </div>

//       <p className="font-semibold text-md">Your avatar</p>
//       <Input
//         id="name"
//         label={"Name"}
//         disabled={isLoading}
//         register={register}
//         errors={errors}
//         required
//       />
//     </div>
//   );

//   return (
//     <Modal
//       disabled={isLoading}
//       isOpen={profileModal.isOpen}
//       title="Edit profile"
//       actionLabel="Update Profile"
//       onClose={profileModal.onClose}
//       onSubmit={handleSubmit(onSubmit)}
//       body={bodyContent}
//     ></Modal>
//   );
// };

import { useState, useEffect } from "react"; // Import useEffect
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import React from "react";
import { Modal } from "./modal";
import { Input } from "../inputs/input";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useProfileModal } from "@/app/hooks/useProfileModal";
import { SafeUser } from "@/app/types";
import { Avatar } from "../avatar";
import { ImageUpload } from "../inputs/ImageUpload";
import axios from "axios";

interface Props {
  currentUser?: SafeUser | null;
}

export const ProfileModal = ({ currentUser }: Props) => {
  const router = useRouter();
  const profileModal = useProfileModal();
  const [isLoading, setIsLoading] = useState(false);
  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<FieldValues>({
    defaultValues: {
      name: `${currentUser?.name}`,
      imageSrc: currentUser?.image,
    },
  });

  const imageSrc = watch("imageSrc");
  const setCustomValue = (id: string, value: any) => {
    setValue(id, value, {
      shouldValidate: true,
      shouldDirty: true,
      shouldTouch: true,
    });
  };

  useEffect(() => {
    console.log("imageSrc changed:", imageSrc);
  }, [imageSrc]); // Log whenever imageSrc changes

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const userId = currentUser?.id;
    console.log({ ...data, userId });
    setIsLoading(true);
    if (!currentUser) {
      toast.error("Niste prijavljeni");
      profileModal.onClose();
      return;
    }

    axios
      .patch(`/api/user/${currentUser?.id}`, { ...data, userId })
      .then((response) => {
        setIsLoading(false);

        if (response) {
          toast.success("Promjene uspješno postavljene");
          router.refresh();
          profileModal.onClose();
        } else {
          toast.error("Greška prilikom mijenjanja");
        }
      })
      .catch((error) => {
        setIsLoading(false);
        toast.error("Greška prilikom ažuriranja");
        console.error("Error updating user:", error);
      });
  };

  const bodyContent = (
    <div className="flex flex-col gap-4 items-center">
      <div className="relative flex flex-col items-center gap-4">
        <Avatar height={100} width={100} src={imageSrc} />
        <div className="w-[auto] max-h-[20rem]">
          <ImageUpload
            onChange={(value) => {
              setCustomValue("imageSrc", value);
            }}
            value={imageSrc}
            padding="2"
            label=""
          />
        </div>
      </div>

      <p className="font-semibold text-md">Your avatar</p>
      <Input
        id="name"
        label={"Name"}
        disabled={isLoading}
        register={register}
        errors={errors}
        required
        regex={/^[a-zA-Z0-9\s]+$/}
        requiredMsg="Name is required."
        errorMsg="Only letters, numbers and spaces allowed"
      />
    </div>
  );

  return (
    <Modal
      disabled={isLoading}
      isOpen={profileModal.isOpen}
      title="Edit profile"
      actionLabel="Update Profile"
      onClose={profileModal.onClose}
      onSubmit={handleSubmit(onSubmit)}
      body={bodyContent}
    ></Modal>
  );
};
