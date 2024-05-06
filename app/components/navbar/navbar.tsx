"use client";

import Container from "../container";
import { Logo } from "./logo";
import { Search } from "./search";
import { UserMenu } from "./user-menu";
import { SafeUser } from "@/app/types";
import { Categories } from "./Categories";
import NavbarItems from "./NavbarItems";
import { usePathname, useRouter } from "next/navigation";

interface Props {
  currentUser?: SafeUser | null;
}

const Navbar = ({ currentUser }: Props) => {
  const pathname = usePathname();
  console.log(pathname);
  console.log({ currentUser });

  return (
    // <div className="fixed w-full bg-white z-10 shadow-sm">
    //   <div className="py-4 border-b-[1px]">
    //     <Container>
    //       <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
    //         <div className="flex flex-row gap-[5%]">
    //           <Logo />
    //           <Search />
    //         </div>

    //         <UserMenu currentUser={currentUser} />
    //       </div>
    //     </Container>
    //   </div>
    //   <Categories />
    // </div>
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className=" border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            {/* <Search /> */}
            <NavbarItems pathname={`${pathname}`} currentUser={currentUser} />
            <UserMenu currentUser={currentUser} />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
