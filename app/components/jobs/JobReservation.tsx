import { Button } from "../button";
import { Application } from "@prisma/client";

interface Props {
  onSubmit: () => void;
  disabled?: boolean;
  jobId?: string;
  applications: Application[];
  peopleCount?: number;
  buttonLabel?: string;
}

export const JobReservation = ({
  onSubmit,
  disabled,
  applications,
  peopleCount,
  buttonLabel = "Prijavi se",
}: Props) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">
          Traže/i se {peopleCount} osoba/e
        </div>
        <hr />
      </div>
      <hr />
      <div className="p-4">
        <Button
          disabled={disabled}
          label={`${buttonLabel}`}
          onClick={onSubmit}
        />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        {applications.length} Prijava/e
      </div>
    </div>
  );
};
