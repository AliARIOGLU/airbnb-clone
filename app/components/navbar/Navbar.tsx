"use client";

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./Logo";
import Search from "./Search";
import UserMenu from "./UserMenu";

//types
import { SafeUser } from "@/app/types";

interface NavbarProps {
  currentUser?: SafeUser | null;
  tripsLength?: number;
  favsLength?: number;
  reservLength?: number;
  propLength?: number;
}

const Navbar: React.FC<NavbarProps> = ({
  currentUser,
  tripsLength,
  favsLength,
  reservLength,
  propLength,
}) => {
  return (
    <div className="fixed w-full bg-white z-10 shadow-sm">
      <div className="py-4 border-b-[1px]">
        <Container>
          <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
            <Logo />
            <Search />
            <UserMenu
              currentUser={currentUser}
              tripsLength={tripsLength}
              favsLength={favsLength}
              reservLength={reservLength}
              propLength={propLength}
            />
          </div>
        </Container>
      </div>
      <Categories />
    </div>
  );
};

export default Navbar;
