import { Button } from "../button";
import { Application } from "@prisma/client";

interface Props {
  onSubmit: () => void;
  disabled?: boolean;
  jobId?: string;
  applications: Application[];
}

export const JobReservation = ({ onSubmit, disabled, applications }: Props) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ price</div>
        <div className="font-light text-neutral-600">night</div>
        <hr />
      </div>
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label={"Prijavi se"} onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        {applications.length} Prijava/e
      </div>
    </div>
  );
};
