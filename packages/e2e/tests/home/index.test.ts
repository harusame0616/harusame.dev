import { test as base, expect, type Page } from "@playwright/test";

const test = base.extend<{ homePage: Page }>({
	homePage: async ({ page }, use) => {
		await page.goto("/");
		await use(page);
	},
});

test("タイトルが「はるさめ.dev」になる", async ({ homePage }) => {
	await expect(homePage).toHaveTitle(/^はるさめ.dev$/);
});

test.describe("スナップショット", () => {
	test("初回表示", async ({ homePage }, { title, snapshotDir }) => {
		console.log(snapshotDir);

		await expect(homePage).toHaveScreenshot(title, {
			fullPage: true,
		});
	});
});
