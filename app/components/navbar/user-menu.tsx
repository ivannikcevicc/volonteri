"use client";

import React, { useCallback, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Avatar } from "../avatar";
import { MenuItem } from "./menu-item";
import { useRegisterModal } from "@/app/hooks/useRegisterModal";
import { useLoginModal } from "@/app/hooks/useLoginModal";
import { User } from "@prisma/client";
import { signOut } from "next-auth/react";
import { SafeUser } from "@/app/types";
import { useRentModal } from "@/app/hooks/useRentModal";
import { useRouter } from "next/navigation";
import { useProfileModal } from "@/app/hooks/useProfileModal";

interface Props {
  currentUser?: SafeUser | null;
}

export const UserMenu = ({ currentUser }: Props) => {
  const router = useRouter();
  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();
  const profileModal = useProfileModal();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = useCallback(() => {
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      loginModal.onOpen();
      return;
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);
  return (
    <div className="relative py-4">
      <div className="flex flex-row items-center gap-3">
        <div
          className={`hidden md:block text-sm font-semibold py-3 px-4 rounded-full transition cursor-pointer ${
            !currentUser && "hover:bg-neutral-100"
          }`}
          onClick={() => {
            if (!currentUser) {
              loginModal.onOpen();
            }
          }}
        >
          {currentUser ? currentUser.name : "Prijavi se"}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer hover:shadow-md transition"
        >
          <AiOutlineMenu></AiOutlineMenu>
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 overflow-hidden bg-white right-0 top-12 text-sm">
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem onClick={profileModal.onOpen} label="Edit profile" />
                <MenuItem
                  onClick={() => router.push("/my-applications")}
                  label="Moje prijave"
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="Moje omiljeno"
                />
                <MenuItem
                  onClick={() => router.push("/applications")}
                  label="Prijave korisnika"
                />
                <MenuItem
                  onClick={() => router.push("/my-jobs")}
                  label="Moji poslovi"
                />
                <MenuItem onClick={rentModal.onOpen} label="Objavi posao" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Odjava" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Prijava" />
                <MenuItem onClick={registerModal.onOpen} label="Registracija" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
