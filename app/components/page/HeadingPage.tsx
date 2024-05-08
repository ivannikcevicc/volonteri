"use client";

import React from "react";
import "./heading-page.modules.scss";
import { useRouter } from "next/navigation";
interface Props {
  title: string;
}

const HeadingPage = ({ title }: Props) => {
  const router = useRouter();
  return (
    <div className="blog-grid-header w-full">
      <div className="blog-grid-header-text">
        <h3 className="blog-grid-header-text-main">{title}</h3>
        <div className="blog-grid-header-text-nav">
          <span className="blog-grid-header-text-nav-link">Home</span> &rarr;
          <span
            className="blog-grid-header-text-nav-destination"
            onClick={() => {
              router.push("/");
              router.refresh();
            }}
          >
            {title}
          </span>
        </div>
      </div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="1920"
        height="30"
        viewBox="0 0 1920 30"
        fill="none"
        className="blog-grid-header-img"
      >
        <path
          d="M0 31.501C234.5 31.5008 1654 31.5043 1920 31.501C1706 15.5007 1288 1.00098 1023 1.00098C765.395 1.00098 229.5 12.0029 0 31.501Z"
          fill="white"
        />
      </svg>
    </div>
  );
};

export default HeadingPage;
