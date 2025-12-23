"use client";

import { useEffect, useState } from "react";

interface Props {
  message: string;
  red: boolean;
}

export default function Fluter({ message, red }: Props) {
  const [visivel, setVisivel] = useState(false);
  const [delay, setDelay] = useState(true);

  useEffect(() => {
    const time = setTimeout(() => {
      setVisivel(false);
    }, 3000);

    const time2 = setTimeout(() => {
      setVisivel(true);
    }, 50);

    return () => {
      clearTimeout(time);
      clearTimeout(time2);
    };
  }, []);

  useEffect(() => {
    let time2: ReturnType<typeof setTimeout>;

    if (!visivel) {
      time2 = setTimeout(() => {
        setDelay(false);
      }, 500);
    }

    return () => clearTimeout(time2);
  }, [visivel]);

  if (!delay) return null;

  return (
    <div
      className={`w-screen h-screen select-none flex justify-center items-start absolute left-0 top-4 z-50 transition-all duration-300
        ${
          visivel
            ? " opacity-100 translate-y-0 "
            : " opacity-0 -translate-y-10 "
        }
      `}
    >
      <div
        className={`w-fit px-4 py-2 text-white ${
          red ? "bg-red-400 " : "bg-green-400 "
        } rounded-xl border-2 ${
          red ? "border-red-200" : "border-green-200"
        } text-neutral-800 text-sm `}
      >
        {message}
      </div>
    </div>
  );
}
