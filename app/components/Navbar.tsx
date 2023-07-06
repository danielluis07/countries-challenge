"use client";

import Link from "next/link";
import ToggleTheme from "./ToggleTheme";

const Navbar = () => {
  return (
    <div className="dark:bg-darkblue flex justify-between items-center px-5 py-6 desktop:px-14 shadow-sm">
      <Link href={"/"}>
        <p className="font-extrabold desktop:text-xl dark:text-white cursor-pointer">
          Where in the world?
        </p>
      </Link>
      <ToggleTheme />
    </div>
  );
};

export default Navbar;
