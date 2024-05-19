"use client";
import * as React from "react";
import { useEdgeStore } from "@/app/libs/edgestore";
import { useState } from "react";
import Link from "next/link";
import { MdOutlineDriveFolderUpload } from "react-icons/md";

export default function Page() {
  const [file, setFile] = React.useState<File>();
  const { edgestore } = useEdgeStore();
  const [url, setUrl] = useState<string | null>();
  const [progress, setProgress] = useState(0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    setFile(selectedFile);
    console.log("Selected file:", selectedFile); // Debug: Check if file is set
  };

  const handleUpload = async () => {
    if (!file) {
      console.log("No file selected"); // Debug: Check if file is selected
      return;
    }

    try {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          // you can use this to show a progress bar
          setProgress(progress);
        },
      });

      console.log("Upload response:", res.url); // Debug: Check the response
      setUrl(res.url);
    } catch (error) {
      console.error("Upload failed:", error); // Debug: Check for errors
    }
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="gap-4 flex flex-col">
        <input
          type="file"
          onChange={handleFileChange}
          name="files"
          id="files"
          style={{
            visibility: `hidden`,
          }}
        />
        <label
          htmlFor="files"
          className="w-full h-[20vh] border-2 bg-gradient-to-t from-green-200 to-transparent rounded-lg border-black flex flex-col items-center justify-center"
        >
          <div className="flex flex-col items-center justify-center gap-2 ">
            <MdOutlineDriveFolderUpload size={50} />
            <span>Izaberi Datoteku</span>
          </div>
        </label>
        <button
          onClick={handleUpload}
          className={` border-2 text-black border-black  relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition w-full py-2 `}
          style={{
            backgroundImage: `linear-gradient(to right, #10B981 ${progress}%, #fff ${progress}%)`,
          }}
        >
          Upload
        </button>
      </div>
      {url && (
        <div className="flex flex-col gap-1">
          <div> Pregled: </div>
          <Link href={url} target="_blank" className="text-blue-500">
            {url}
          </Link>
        </div>
      )}
    </div>
  );
}
