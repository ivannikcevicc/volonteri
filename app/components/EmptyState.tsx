"use client";

import { useRouter } from "next/navigation";
import { Heading } from "./heading";
import { Button } from "./button";

interface Props {
  title?: string;
  subtitle?: string;
  showReset?: boolean;
}

export const EmptyState = ({
  title = "No exact matches.",
  subtitle = "Try changing or removing some of your filters.",
  showReset,
}: Props) => {
  const router = useRouter();

  return (
    <div className="h-[60vh] flex-col flex gap-2 justify-center items-center">
      <Heading title={title} subtitle={subtitle} center />
      <div className="w-48 mt-4">
        {showReset && (
          <Button
            outline
            label="Remove all filters"
            onClick={() => {
              router.push("/");
            }}
          />
        )}
      </div>
    </div>
  );
};
