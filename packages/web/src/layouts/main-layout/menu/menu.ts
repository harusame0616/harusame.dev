import * as v from "valibot";

export const menuIds = ["top", "blog", "products"] as const;
export type Menu = (typeof menuIds)[number];

export const menus = [
	{ href: "/", label: "トップ", id: "top" },
	{ href: "/blog/pages/1/", label: "ブログ", id: "blog" },
	{ href: "/products/", label: "プロダクト", id: "products" },
] as const satisfies Array<{ href: string; label: string; id: Menu }>;

export function parseMenu(value: unknown): Menu | undefined {
	const parseResult = v.safeParse(v.picklist(menuIds), value);

	return parseResult.success ? parseResult.output : undefined;
}
