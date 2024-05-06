"use client";

import useCountries from "@/app/hooks/useCountries";
import useSearchModal from "@/app/hooks/useSearchModal copy";
import { differenceInDays, startOfDay } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

export const Search = () => {
  const params = useSearchParams();
  const { getByValue } = useCountries();
  const searchModal = useSearchModal();

  const locationValue = params?.get("locationValue");
  const startDate = params?.get("startDate");
  const endDate = params?.get("endDate");
  const guestCount = params?.get("guestCount");

  const locationLabel = useMemo(() => {
    if (locationValue) {
      return getByValue(locationValue as string)?.label;
    }
    return "Anywhere";
  }, [getByValue, locationValue]);

  const durationLabel = useMemo(() => {
    if (startDate && endDate) {
      const start = new Date(startDate as string);
      const end = new Date(endDate as string);
      let diff = differenceInDays(end, start);

      if (diff === 0) {
        diff = 1;
      }

      return `${diff} days`;
    }
    return "Anytime";
  }, [startDate, endDate]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="hidden sm:block font-semibold text-sm px-6 border-x-[1px] flex-1 text-center">
          {durationLabel}
        </div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
          <div className="hidden sm:block">asda</div>
          <div className="p-2 bg-green-800 rounded-full text-white">
            <BiSearch size={18} />
          </div>
        </div>
      </div>
    </div>

    ////////////////////////////

    // <div
    //   onClick={searchModal.onOpen}
    //   className="border-[1px] w-full rounded-full py-1 shadow-sm hover:shadow-md transition flex align-center cursor-pointer"
    // >
    //   <div className="flex flex-row items-center justify-between">
    //     <div className="text-[0.9rem] font-semibold px-6">{locationLabel}</div>
    //     <div className="hidden sm:block font-semibold text-[0.9rem] px-6 border-x-[1px] flex-1 text-center">
    //       {durationLabel}
    //     </div>
    //     <div className="text-[0.9rem] pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
    //       <div className="hidden sm:block">{guestLabel}</div>
    //       <div className="p-2 bg-green-800 rounded-full text-white">
    //         <BiSearch size={18} />
    //       </div>
    //     </div>
    //   </div>
    // </div>

    /////////////////////////////////

    // <div
    //   onClick={searchModal.onOpen}
    //   className="border-[1px] w-full rounded-full py-1 shadow-sm hover:shadow-md transition flex align-center cursor-pointer"
    // >
    //   <div className="flex flex-row items-center justify-between">
    //     <div className="text-[0.9rem] font-semibold px-6 text-nowrap">
    //       {locationLabel}
    //     </div>
    //     <div className="hidden sm:block font-semibold text-[0.9rem] px-6 border-x-[1px] flex-1 text-center text-nowrap">
    //       {durationLabel}
    //     </div>
    //     <div className="text-[0.9rem] pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
    //       <div className="p-2 bg-green-800 rounded-full text-white">
    //         <BiSearch size={18} />
    //       </div>
    //     </div>
    //   </div>
    // </div>
  );
};
