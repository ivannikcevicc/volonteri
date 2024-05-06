// import React, { useState } from "react";
// import { BiSearch } from "react-icons/bi";

// const NavbarItems = () => {
//   const [activeLabel, setActiveLabel] = useState("home");

//   let NavItems = [
//     {
//       label: "Home Page",
//       route: "/",
//       key: "home",
//     },
//     {
//       label: "About Us",
//       route: "/about",
//       key: "about",
//     },
//     {
//       label: "Post a Job",
//       route: "/post",
//       key: "post",
//     },
//   ];
//   return (
//     // <div className="border-[1px] w-full md:w-auto rounded-full py-2 shadow-sm hover:shadow-md transition cursor-pointer">
//     //   <div className="flex flex-row items-center justify-between">
//     //     <div className="text-sm font-semibold px-6">asdasdasdas</div>
//     //     <div className="hidden sm:block font-semibold text-sm px-6 border-x-[1px] flex-1 text-center">
//     //       asdasdasasd
//     //     </div>
//     //     <div className="text-sm pl-6 pr-2 text-gray-600 flex flex-row items-center gap-3">
//     //       <div className="hidden sm:block">asda</div>
//     //       <div className="p-2 bg-green-800 rounded-full text-white">
//     //         <BiSearch size={18} />
//     //       </div>
//     //     </div>
//     //   </div>
//     //   asdasdasdasd
//     // </div>

//     <div className="flex flex-row ">
//       {NavItems.map((item) => (
//         <div
//           className={`border-t-[10px] border-transparent  px-4 pt-5 translate-y-[-33%] ${
//             activeLabel === item.key ? "border-green-800" : ""
//           }  `}
//           key={item.key}
//         >
//           {item.label}
//         </div>
//       ))}
//     </div>
//   );
// };

// export default NavbarItems;

import { useLoginModal } from "@/app/hooks/useLoginModal";
import { useRentModal } from "@/app/hooks/useRentModal";
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { BiSearch } from "react-icons/bi";

interface Props {
  pathname: string;
  currentUser?: SafeUser | null;
}

const NavbarItems = ({ pathname, currentUser }: Props) => {
  const loginModal = useLoginModal();
  const router = useRouter();
  const rentModal = useRentModal();
  const NavItems = [
    {
      label: "Home Page",
      route: "/",
      key: "home",
      onClick: undefined,
    },
    {
      label: "About Us",
      route: "/about",
      key: "about",
      onClick: undefined,
    },
    {
      label: "Post a Job",
      route: "/post",
      key: "post",
      onClick: () => {
        if (!currentUser) {
          toast.error("Unauthorized");
          loginModal.onOpen();
          return;
        }
        rentModal.onOpen();
      },
    },
  ];

  return (
    <div className="flex flex-row">
      {NavItems.map((item) => (
        <div
          onClick={
            item.onClick
              ? item.onClick
              : () => {
                  router.push(`${item.route}`);
                }
          }
          className={`border-t-[10px] px-4 pt-5 translate-y-[-33%]  transition ${
            pathname === item.route ? "border-green-800" : "border-transparent"
          }`}
          key={item.key}
        >
          {item.label}
        </div>
      ))}
    </div>
  );
};

export default NavbarItems;
