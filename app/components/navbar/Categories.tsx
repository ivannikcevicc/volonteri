"use client";

import React from "react";
import Container from "../container";
import { TbBeach, TbMountain, TbPool } from "react-icons/tb";
import {
  GiBarn,
  GiBoatFishing,
  GiCactus,
  GiCastle,
  GiCaveEntrance,
  GiForestCamp,
  GiIsland,
  GiPlantsAndAnimals,
  GiWindmill,
} from "react-icons/gi";
import {
  MdDeliveryDining,
  MdOutlineSportsSoccer,
  MdOutlineVilla,
} from "react-icons/md";
import { FaPersonShelter, FaRegMoneyBill1 } from "react-icons/fa6";
import { CategoryBox } from "./CategoryBox";
import { usePathname, useSearchParams } from "next/navigation";
import { FaSkiing } from "react-icons/fa";
import { BsSnow } from "react-icons/bs";
import { IoDiamond } from "react-icons/io5";
import { BiFirstAid } from "react-icons/bi";
import { PiChalkboardTeacherLight } from "react-icons/pi";
import { SiHomebridge } from "react-icons/si";

export const categories = [
  {
    label: "Izvidjači",
    icon: FaPersonShelter,
    description: "Izvidjači - Avantura, učenje i prijateljstvo u prirodi..",
  },
  {
    label: "Sport",
    icon: MdOutlineSportsSoccer,
    description: "Organizacija sportskih dogadjaja.",
  },
  {
    label: "Prva Pomoć",
    icon: BiFirstAid,
    description: "Pružanje hitne medicinske pomoći povređenima",
  },
  {
    label: "Donacije",
    icon: FaRegMoneyBill1,
    description: "Donacije za osobe kojima je potrebno.",
  },
  {
    label: "Mentor",
    icon: PiChalkboardTeacherLight,
    description: "Učenje i davanje smjernica učenicima",
  },
  {
    label: "Dostava",
    icon: MdDeliveryDining,
    description: "Dostava hrane i osnovnih potrepština starijima ili nemoćnima",
  },
  {
    label: "Ekosistem",
    icon: GiPlantsAndAnimals,
    description:
      "Priroda i ekosistem. Akcije sa životinjama i prirodnim materijalama.",
  },
  {
    label: "Beskućnici",
    icon: SiHomebridge,
    description: "Pomoć beskućnicima kroz razne akcije.",
  },
];

export const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname === "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <div className="container cat:p-0">
      {/* <div className="pt-4 flex flex-row items-center justify-between overflow-x-auto"> */}
      <div className="pt-4 flex cat:h-[42vh] flex-row items-center justify-between overflow-x-auto cat:overflow-x-hidden cat:overflow-y-auto cat:grid-cols-2 cat:grid">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category === item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </div>
  );
};
