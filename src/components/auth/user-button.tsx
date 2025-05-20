"use client";

import { UserButton } from "@clerk/nextjs";

export default function UserButtonComponent() {
  return (
    <div className="flex justify-end mb-8">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
