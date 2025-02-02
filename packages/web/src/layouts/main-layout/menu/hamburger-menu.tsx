import logo from "@/assets/logo.svg";
import { HamburgerMenuIcon } from "@radix-ui/react-icons";
import type { PropsWithChildren } from "react";
import { Separator } from "../../../components/ui/separator";
import {
	Sheet,
	SheetContent,
	SheetHeader,
	SheetTitle,
	SheetTrigger,
} from "../../../components/ui/sheet";

export function HamburgerMenu({ children }: PropsWithChildren) {
	return (
		<Sheet>
			<SheetTrigger>
				<HamburgerMenuIcon className="h-10 w-10" aria-label="メニュー" />
			</SheetTrigger>
			<SheetContent side="top">
				<SheetHeader>
					<img
						src={logo.src}
						height={64}
						alt="はるさめ.dev"
						className="h-16 object-contain"
						loading="eager"
						decoding="sync"
					/>
					<SheetTitle className="sr-only">メニュー</SheetTitle>
				</SheetHeader>
				<Separator className="mt-4" />
				<div>{children}</div>
			</SheetContent>
		</Sheet>
	);
}
