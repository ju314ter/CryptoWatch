"use client";

import React, { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2 } from "lucide-react";
import { signIn, signOut } from "next-auth/react";
import { Session } from "next-auth";
import Image from "next/image";

const LoginButton = ({ session }: { session: Session | null }) => {
  const [pending, startTransition] = useTransition();

  if (!session) {
    return (
      <Button
        className="w-[60px]"
        variant={"link"}
        onClick={() => startTransition(() => signIn())}
      >
        {pending ? (
          <Loader2
            size={40}
            strokeWidth={0.75}
            className={"animate-spin w-full h-20"}
          />
        ) : (
          <div className="w-[80%] flex justify-center items-center">
            <svg
              width="40"
              height="40"
              viewBox="0 0 40 40"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M20 0.5C8.95161 0.5 0 9.45161 0 20.5C0 31.5484 8.95161 40.5 20 40.5C31.0484 40.5 40 31.5484 40 20.5C40 9.45161 31.0484 0.5 20 0.5ZM20 8.24194C23.9194 8.24194 27.0968 11.4194 27.0968 15.3387C27.0968 19.2581 23.9194 22.4355 20 22.4355C16.0806 22.4355 12.9032 19.2581 12.9032 15.3387C12.9032 11.4194 16.0806 8.24194 20 8.24194ZM20 35.9839C15.2661 35.9839 11.0242 33.8387 8.18548 30.4839C9.70161 27.629 12.6694 25.6613 16.129 25.6613C16.3226 25.6613 16.5161 25.6935 16.7016 25.75C17.75 26.0887 18.8468 26.3064 20 26.3064C21.1532 26.3064 22.2581 26.0887 23.2984 25.75C23.4839 25.6935 23.6774 25.6613 23.871 25.6613C27.3306 25.6613 30.2984 27.629 31.8145 30.4839C28.9758 33.8387 24.7339 35.9839 20 35.9839Z"
                fill="#D2D2D2"
              />
            </svg>
          </div>
        )}
      </Button>
    );
  } else if (session.user.image) {
    return (
      <Button
        variant={"link"}
        className="w-[60px]"
        onClick={() => startTransition(() => signOut())}
        // TODO => add modal 'Sure you wanna log out ?'
      >
        <Image
          src={session.user.image}
          width={40}
          height={40}
          className="rounded-full border border-primary"
          alt="profile picture"
        />
      </Button>
    );
  }

  return null;
};

// TODO : display profile in round container with secondary-forefront border img that disconnect if clicked

export default LoginButton;
