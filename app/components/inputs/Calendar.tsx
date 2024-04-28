"use client";

import { DateRange, Range, RangeKeyDict } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
interface Props {
  value: Range;
  onChange: (value: RangeKeyDict) => void;
  disabledDates?: Date[];
}

export const Calendar = ({ value, onChange, disabledDates }: Props) => {
  return (
    <DateRange
      onChange={onChange}
      direction="vertical"
      rangeColors={["#262626"]}
      ranges={[value]}
      date={new Date()}
      showDateDisplay={false}
      disabledDates={disabledDates}
      minDate={new Date()}
    />
  );
};
