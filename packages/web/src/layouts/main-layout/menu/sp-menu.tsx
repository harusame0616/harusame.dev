import { BlogSearchForm } from "./blog-search-form";
import { menus } from "./menu";
import { MenuItem } from "./menu-item";

export function SPMenu() {
	return (
		<ul className="relative bg-background">
			{menus.map((menu) => (
				<div className="border-b border-solid border-border" key={menu.id}>
					<MenuItem href={menu.href}>{menu.label}</MenuItem>
				</div>
			))}
			<div className="border-b border-solid border-border p-2">
				<BlogSearchForm />
			</div>
		</ul>
	);
}
