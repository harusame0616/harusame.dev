import { test as base, expect, type Page } from "@playwright/test";

const test = base.extend<{ homePage: Page }>({
	homePage: async ({ page }, use) => {
		await page.goto("/blog/posts/1f2a3b4c-5d6e-7f8g-9h0i-1j2k3l4m5n6o/");
		await use(page);
	},
});

test("タイトルが「デザインテスト - はるさめ.dev」になる", async ({
	homePage,
}) => {
	await expect(homePage).toHaveTitle(/^デザインテスト - はるさめ.dev$/);
});

test.describe("スナップショット", () => {
	test("初回表示", async ({ homePage }, { title }) => {
		await expect(homePage).toHaveScreenshot(title, {
			fullPage: true,
		});
	});
});
