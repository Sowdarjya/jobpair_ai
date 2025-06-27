import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";
import { SignedIn, SignedOut, SignUpButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  return (
    <div className="w-full sticky top-0 z-50 bg-background">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-xl font-bold text-foreground">
            JobPair AI
          </Link>
          <div className="flex items-center gap-4">
            <SignedOut>
              <SignUpButton mode="modal">
                <Button className="cursor-pointer">Sign in</Button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>
              <UserButton />
            </SignedIn>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
