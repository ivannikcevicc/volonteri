"use client";

import { Range } from "react-date-range";

interface Props {
  price: number;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  dateRange: Range;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

export const ListingReservation = ({
  price,
  totalPrice,
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
        <Calendar
          value={dateRange}
          onChange={(value) => onChangeDate(value.selection)}
          disabledDates={disabledDates}
        />
      </div>
    </div>
  );
};
