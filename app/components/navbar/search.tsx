"use client";

import useSearchModal from "@/app/hooks/useSearchModal copy";
import { differenceInDays, startOfDay } from "date-fns";
import { useSearchParams } from "next/navigation";
import { useMemo } from "react";
import { BiSearch } from "react-icons/bi";

export const Search = () => {
  const params = useSearchParams();
  const searchModal = useSearchModal();

  const cityName = params?.get("cityName");
  console.log(cityName);
  const locationLabel = useMemo(() => {
    if (cityName) {
      return `${cityName}`;
    }

    return "Bilo Gdje";
  }, [cityName]);

  return (
    <div
      onClick={searchModal.onOpen}
      className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer"
    >
      <div className="flex flex-row items-center justify-between">
        <div className="text-sm font-semibold px-6">{locationLabel}</div>
        <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
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
