"use client";

import { AiOutlineMenu } from "react-icons/ai";
import Avatar from "../Avatar";
import { useCallback, useEffect, useRef, useState } from "react";
import MenuItem from "./MenuItem";
import useRegisterModal from "@/app/hooks/useRegisterModal";
import useLoginModal from "@/app/hooks/useLoginModal";
import useRentModal from "@/app/hooks/useRentModal";
import { signOut } from "next-auth/react";

//types
import { SafeUser } from "@/app/types";
import { useRouter } from "next/navigation";
import getTripsLength from "@/app/actions/getTripsLength";
import getFavsLength from "@/app/actions/getFavsLength";
import getReservLength from "@/app/actions/getReservLength";
import getPropLength from "@/app/actions/getPropLength";

interface UserMenuProps {
  currentUser?: SafeUser | null;
  tripsLength?: number;
  favsLength?: number;
  reservLength?: number;
  propLength?: number;
}

const UserMenu: React.FC<UserMenuProps> = ({
  currentUser,
  tripsLength,
  favsLength,
  reservLength,
  propLength,
}) => {
  const router = useRouter();
  const menuRef = useRef(null);

  const registerModal = useRegisterModal();
  const loginModal = useLoginModal();
  const rentModal = useRentModal();

  const [isOpen, setIsOpen] = useState<boolean>(false);

  const toggleOpen = useCallback((e: any) => {
    e.stopPropagation();
    setIsOpen((value) => !value);
  }, []);

  const onRent = useCallback(() => {
    if (!currentUser) {
      return loginModal.onOpen();
    }

    rentModal.onOpen();
  }, [currentUser, loginModal, rentModal]);

  useEffect(() => {
    const onClick = (e: any) => {
      if (e.target !== menuRef.current) {
        setIsOpen(false);
      }
    };

    const onKey = (e: any) => {
      if (e.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("click", onClick);
    document.addEventListener("keydown", onKey);

    return () => {
      document.removeEventListener("click", onClick);
      document.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  return (
    <div className="relative">
      <div className="flex flex-row items-center gap-3">
        <div
          onClick={onRent}
          className="hidden md:block text-sm font-semibold py-3 px-4 rounded-full hover:bg-neutral-100 transition cursor-pointer"
        >
          {currentUser ? (
            <div>
              <div>
                Hey{" "}
                <span className="text-red-500">{`${currentUser?.name}`}</span>
              </div>
              <div>Airbnb your home</div>
            </div>
          ) : (
            <span>Airbnb your home</span>
          )}
        </div>
        <div
          onClick={toggleOpen}
          className="p-4 md:py-1 md:px-2 border-[1px] border-neutral-200 flex flex-row items-center gap-3 rounded-full cursor-pointer
        hover:shadow-md transtion
        "
        >
          <AiOutlineMenu />
          <div className="hidden md:block">
            <Avatar src={currentUser?.image} />
          </div>
        </div>
      </div>

      {isOpen && (
        <div
          ref={menuRef}
          onClick={(e) => {
            e.stopPropagation();
            setIsOpen(false);
          }}
          className="absolute rounded-xl shadow-md w-[40vw] md:w-3/4 bg-white overflow-hidden right-0 top-12 text-sm"
        >
          <div className="flex flex-col cursor-pointer">
            {currentUser ? (
              <>
                <MenuItem
                  onClick={() => router.push("/trips")}
                  label="My trips"
                  count={tripsLength}
                />
                <MenuItem
                  onClick={() => router.push("/favorites")}
                  label="My favorites"
                  count={favsLength}
                />
                <MenuItem
                  onClick={() => router.push("/reservations")}
                  label="My reservations"
                  count={reservLength}
                />
                <MenuItem
                  onClick={() => router.push("/properties")}
                  label="My properties"
                  count={propLength}
                />
                <MenuItem onClick={rentModal.onOpen} label="Airbnb my home" />
                <hr />
                <MenuItem onClick={() => signOut()} label="Logout" />
              </>
            ) : (
              <>
                <MenuItem onClick={loginModal.onOpen} label="Login" />
                <MenuItem onClick={registerModal.onOpen} label="Sign up" />
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;
