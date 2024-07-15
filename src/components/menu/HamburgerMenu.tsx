import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { useState, type PropsWithChildren } from "react";
import { cn } from "@/lib/utils";

export function HamburgerMenu({ children }: PropsWithChildren) {
  const [open, setOpen] = useState(false);

  return (
    <div className="relative" aria-modal={open}>
      <button
        aria-expanded={open}
        type="button"
        onClick={() => {
          setOpen((isOpen) => !isOpen);
        }}
        className={cn("relative", { "z-50": open })}
      >
        <span className="sr-only">メニュー</span>
        {open ? (
          <Cross1Icon aria-hidden className="h-10 w-10" />
        ) : (
          <HamburgerMenuIcon aria-hidden className="h-10 w-10" />
        )}
      </button>
      <div className={cn({ hidden: !open })} id="menu-content">
        {children}
      </div>
    </div>
  );
}
