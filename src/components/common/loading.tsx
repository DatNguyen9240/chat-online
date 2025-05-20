"use client";

import Image from "next/image";

type Props = {
  size?: number;
};

export default function Loading({ size = 100 }: Props) {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <Image
        src="/assets/logo/logo.png"
        alt="logo"
        width={size}
        height={size}
        className="animate-pulse duration-800"
        priority
      />
    </div>
  );
}
