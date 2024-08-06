"use client";

import { useTheme } from "next-themes";
import React from "react";
import { Button } from "../ui/button";

const ThemeToggler = () => {
  const { setTheme, theme } = useTheme();
  return (
    <Button
      className="relative perspective-top w-[60px]"
      variant={"link"}
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
      <div className="w-[20px] flex justify-center items-center rotate-0 scale-100 transition-transform duration-300 dark:rotate-90 dark:scale-0">
        <svg
          width="40"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20.5C0 31.5456 8.95427 40.5 20 40.5C31.0457 40.5 40 31.5456 40 20.5C40 9.45435 31.0456 0.5 20 0.5C8.95435 0.5 0 9.45427 0 20.5ZM20 35.3387V5.66129C28.202 5.66129 34.8387 12.2993 34.8387 20.5C34.8387 28.702 28.2007 35.3387 20 35.3387Z"
            fill="#D2D2D2"
          />
        </svg>
      </div>

      <div className="w-[20px] absolute flex justify-center items-center rotate-90 scale-0 transition-transform duration-300 dark:rotate-0 dark:scale-100">
        <svg
          width="40"
          height="40"
          viewBox="0 0 41 40"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 20.5C0 31.5456 8.95427 40.5 20 40.5C31.0457 40.5 40 31.5456 40 20.5C40 9.45435 31.0456 0.5 20 0.5C8.95435 0.5 0 9.45427 0 20.5ZM20 35.3387V5.66129C28.202 5.66129 34.8387 12.2993 34.8387 20.5C34.8387 28.702 28.2007 35.3387 20 35.3387Z"
            fill="hsl(23, 83%, 55%)"
          />
        </svg>
      </div>
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};

export default ThemeToggler;
