import React from "react";
import ThemeToggler from "./ThemeToggler";
import LoginButton from "../auth/LoginButton";
import Image from "next/image";
import { getAuthSession } from "@/prisma/auth";
import { Session } from "next-auth";
import clsx from "clsx";
import Link from "next/link";

export const Topnav = async ({ ...props }) => {
  const session = (await getAuthSession()) satisfies Session | null;

  return (
    <div
      {...props}
      className={clsx(
        props.className,
        "flex w-full justify-between items-center border-b border-primary font-light px-5"
      )}
    >
      <div className="flex items-center justify-center gap-2 uppercase text-2xl">
        <Link href="/">
          <Image
            src="/whiteEye.png"
            width={40}
            height={40}
            alt="Logo"
            className="w-auto"
          />
        </Link>

        <p className="tracking-widest">Crypto Watch++</p>
      </div>
      <div className="flex items-center justify-center gap-5 rounded-[15px] px-7 h-[40px] bg-[#2A2A2A] bg-opacity-20 border border-primary text-lg">
        <Link href="/list-explorer" className="hover:text-accent">
          <span>Explore</span>
        </Link>
        <Link href="/dashboard" className="text-accent hover:text-accent">
          <span>View</span>
        </Link>
        <Link href="/alert-manager" className="hover:text-accent">
          <span>Monitor</span>
        </Link>
      </div>
      <div className="flex items-center justify-center gap-2 card">
        <span className="flex h-full justify-center items-center rounded-[15px] bg-[#2A2A2A] hover:bg-primary bg-opacity-20 border border-primary">
          <ThemeToggler />
        </span>
        <span className="flex h-full justify-center items-center rounded-[15px] bg-[#2A2A2A] hover:bg-primary bg-opacity-20 border border-primary">
          <LoginButton session={session} />
        </span>
      </div>
    </div>
  );
};
