"use client";

import { Range } from "react-date-range";
import { Calendar } from "../inputs/Calendar";
import { Button } from "../button";

interface Props {
  price: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates?: Date[];
}

export const ListingReservation = ({
  price,
  onChangeDate,
  dateRange,
  onSubmit,
  disabled,
  disabledDates,
}: Props) => {
  return (
    <div className="bg-white rounded-xl border-[1px] border-neutral-200 overflow-hidden">
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
        <hr />
      </div>

      <Calendar
        value={dateRange}
        onChange={(value) => onChangeDate(value.selection)}
        disabledDates={disabledDates}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label={"Reserve"} onClick={onSubmit} />
      </div>
      <div className="p-4 flex flex-row items-center justify-between font-semibold text-lg">
        <div>Total</div>
        {/* Here should be the number of days */}
      </div>
    </div>
  );
};
