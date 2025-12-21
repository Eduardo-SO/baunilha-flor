'use client';

import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";

export function Logo() {
  const { theme } = useTheme();

  return (
    <Link href="/" className="flex items-center space-x-2">
      <Image src={theme === "dark" ? "/images/header-logo-dark.png" : "/images/header-logo-light.png"} alt="Logo" width={100} height={100} />
    </Link>
  );
}

