import { BlogSearchForm } from "./blog-search-form";
import { menus } from "./menu";
import type { Menu } from "./menu";
import { MenuItem } from "./menu-item";

type Props = {
	current: Menu | undefined;
};

export function PCMenu({ current }: Props) {
	return (
		<ul className="flex gap-2">
			{menus.map((menu) => (
				<MenuItem href={menu.href} active={menu.id === current} key={menu.id}>
					{menu.label}
				</MenuItem>
			))}
			<li>
				<BlogSearchForm />
			</li>
		</ul>
	);
}
