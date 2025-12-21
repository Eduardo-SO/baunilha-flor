'use client';

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <Link href="/" className={cn("flex items-center space-x-2", className)}>
      <Image src='/images/logo.png' alt="Logo" width={120} height={120} />
    </Link>
  );
}

