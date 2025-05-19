"use client";

import { SignInButton, SignUpButton, UserButton, useUser } from "@clerk/nextjs";

export default function AuthButton() {
  const { isSignedIn } = useUser();

  if (!isSignedIn) {
    return (
      <div className="flex gap-4">
        <SignInButton mode="modal">
          <button className="px-4 py-2 bg-primary text-white rounded-md hover:bg-primary/90">
            Sign In
          </button>
        </SignInButton>
        <SignUpButton mode="modal">
          <button className="px-4 py-2 bg-secondary text-white rounded-md hover:bg-secondary/90">
            Sign Up
          </button>
        </SignUpButton>
      </div>
    );
  }

  return (
    <div className="flex justify-end mb-8">
      <UserButton afterSignOutUrl="/sign-in" />
    </div>
  );
}
