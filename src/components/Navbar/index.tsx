"use client";
import { IconVideo } from "@tabler/icons-react";
import ThemeToggler from "./ThemeToggler";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="navbar fixed top-0 left-0 right-0 z-50 bg-base-100/80 backdrop-blur-lg border-b border-base-300 px-4 md:px-8">
      <div className="navbar-start">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16" />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
            <li><Link href="/signin">Sign In</Link></li>
            <li><Link href="/signup">Get Started</Link></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#how-it-works">How It Works</a></li>
          </ul>
        </div>
        <Link href="/" className="flex items-center gap-2">
          <IconVideo className="w-8 h-8 text-primary" />
          <span className="text-xl md:text-2xl font-bold gradient-text">NeuroStream</span>
        </Link>
      </div>
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><a href="#features" className="text-sm font-medium">Features</a></li>
          <li><a href="#how-it-works" className="text-sm font-medium">How It Works</a></li>
        </ul>
      </div>
      <div className="navbar-end gap-2">
        <ThemeToggler />
        <div className="hidden sm:flex gap-2">
          <Link href="/signin" className="btn btn-primary btn-sm md:btn-md">
            Sign In
          </Link>
          <Link href="/signup" className="btn btn-secondary btn-sm md:btn-md">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
