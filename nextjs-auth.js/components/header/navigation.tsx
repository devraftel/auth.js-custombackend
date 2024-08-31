"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface NavigationProps {
  isSignedIn: boolean;
}

export const Navigation = ({ isSignedIn }: NavigationProps) => {
  const pathname = usePathname();

  const nav = [
    {
      name: "Home",
      href: "/",
      icons: null,
      isActive: pathname === "/",
    },
  ];

  return (
    <nav>
      <ul className="flex items-center space-x-2">
        {nav.map((item) => (
          <li key={item.name}>
            <Link
              href={item.href}
              className={cn(
                buttonVariants({
                  variant: "link",
                  className: `flex items-center ${
                    item.isActive ? "underline" : ""
                  }`,
                }),
              )}
            >
              <span className="mr-1">{item.icons}</span>
              {item.name}
            </Link>
          </li>
        ))}
        {/* Add Github Icon and Link to Repo */}
        <li>
          <a
            href="https://github.com/devraftel/auth.js-custombackend"
            className={cn(
              buttonVariants({
                variant: "link",
                className: `flex items-center ${
                  pathname === "/github" ? "underline" : ""
                }`,
              }),
            )}
          >
            <span className="mr-1">GitHub</span>
            Repo
          </a>
        </li>
      </ul>
    </nav>
  );
};
