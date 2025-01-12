import Link from "next/link";
import { Button } from "@/components/ui/button";

const Header = () => {
  return (
    <header className="border-b border-slate-400 border-[0.5px] sticky top-0 z-50">
      <div className="container mx-auto px-2 py-2 flex justify-between items-center">
        <Link href="/" className="text-base font-bold text-sky-600">
          Fitness Tracker
        </Link>
        <nav className="flex items-center  text-white">
          <Button variant="ghost" asChild>
            <Link href="/activities">Activities</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/workouts">Work Outs</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/meals">Meals</Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/profile">Plofile</Link>
          </Button>
        </nav>
      </div>
    </header>
  );
};

export default Header;
