"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useUser } from "@clerk/nextjs";
import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/nextjs";

const Header = () => {
  const { isSignedIn } = useUser(); // ユーザーがサインインしているかを判定

  // サインインしていない場合にヘッダーを非表示に
  if (!isSignedIn) {
    return null; // ログインしていない場合は何も表示しない
  }

  return (
    <header className="border-b border-slate-400 border-[0.5px] sticky top-0 z-50  flex px-4">
      <SignedIn>
        {/* Mount the UserButton component */}
        <UserButton />
      </SignedIn>
      <SignedOut>
        {/* Signed out users get sign in button */}
        <SignInButton />
      </SignedOut>
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        <Link href="/" className="text-base font-bold text-sky-600">
          smoke tracker
        </Link>
        <nav className="flex items-center text-black">
          <Button variant="ghost" asChild>
            <Link href="/activities">Activities</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
