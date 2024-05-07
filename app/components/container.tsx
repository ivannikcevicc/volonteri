"use client";

import React from "react";

interface Container {
  children: React.ReactNode;
}

const Container: React.FC<Container> = ({ children }) => {
  return <div className="container">{children}</div>;
};

export default Container;
