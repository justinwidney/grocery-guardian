import Link from "next/link";
import { MainNav } from "./main-nav";
import { buttonVariants } from "./ui/button";
import { cn } from "~/utils/form-handling";
import { Icons } from "./icons";

export function Header() {
  return (
    <header className="bg-background container z-40 mx-auto">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between py-6 ">
        <MainNav items={[]} />
        <nav>
          <div className="flex h-20 items-center gap-6 py-6">
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "cart", size: "lg" }),
                "px-4",
              )}
            >
              <Icons.shoppingBasket />
              <span className="px-4"> Cart</span>
            </Link>
            <Link
              href="/login"
              className={cn(
                buttonVariants({ variant: "default", size: "lg" }),
                "px-4",
              )}
            >
              <Icons.blocks />

              <span className="px-4">Build</span>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}
