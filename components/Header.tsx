import Link from "next/link";
import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <div className="w-full sticky top-0 z-50 bg-foreground">
      <div className="max-w-5xl mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          <Link href="/" className="text-xl font-bold text-white">
            JobPair AI
          </Link>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-white">
              <Button className="text-xl">Login</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
