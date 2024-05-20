import { CldUploadWidget } from "next-cloudinary";
import Image from "next/image";
import { useCallback } from "react";
import { TbPhotoPlus } from "react-icons/tb";

declare global {
  var cloudinary: any;
}

interface Props {
  onChange: (value: string) => void;
  value: string;
  padding?: string;
  label?: string;
}
export const ImageUpload = ({
  onChange,
  value,
  padding = "20",
  label = "Click to Upload",
}: Props) => {
  const handleUpload = useCallback(
    (result: any) => {
      onChange(result.info.secure_url);
    },
    [onChange]
  );

  return (
    <CldUploadWidget
      onSuccess={handleUpload}
      uploadPreset="dovhko1b"
      options={{
        maxFiles: 1,
        cropping: true,
        resourceType: "image",
        croppingAspectRatio: 4 / 4,
      }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open?.()}
            className={` ${
              label === "" ? "" : " gap-4 "
            } relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-${padding} flex flex-col border-neutral-200 justify-center items-center  text-neutral-600`}
          >
            <TbPhotoPlus size={50} />
            <div className="font-semibold text-lg text-center">{label}</div>
            {value && (
              <div className="absolute inset-0 w-full h-full">
                <Image
                  alt="Upload"
                  src={value}
                  fill
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};
