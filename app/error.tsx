"use client";

import { useEffect } from "react";
import { EmptyState } from "./components/EmptyState";

interface Props {
  error: Error;
}

const ErrorState = ({ error }: Props) => {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <EmptyState title="Uh Oh!" subtitle="Something went wrong"></EmptyState>
  );
};

export default ErrorState;
