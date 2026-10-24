import { expect, test } from "@playwright/test";

test.describe("Homepage", () => {
  test("sends Get a demo to the request form", async ({ page }) => {
    await page.goto("/");
    await expect(page.getByRole("heading", { name: /serving your dealership/i })).toBeVisible();
    await page.getByRole("link", { name: "Get a demo" }).first().click();
    await expect(page).toHaveURL(/request-a-demo/);
    await expect(page.getByRole("heading", { name: /boost PVR/i })).toBeVisible();
  });

  test("opens Lot Management from Learn more", async ({ page }) => {
    await page.goto("/");
    await page.getByRole("link", { name: "Learn more" }).first().click();
    await expect(page).toHaveURL(/lot-management/);
    await expect(page.getByRole("heading", { name: /full visibility of cars and keys/i })).toBeVisible();
  });
});

test.describe("Dealer login", () => {
  test("shows both portal choices", async ({ page }) => {
    await page.goto("/dealer-login");
    await expect(page.getByRole("heading", { name: /access your dealer portal/i })).toBeVisible();
    await expect(page.getByRole("link", { name: /launch current portal/i })).toHaveAttribute(
      "href",
      /track\.ikongps\.com/,
    );
    await expect(page.getByRole("link", { name: /launch toolbox web/i })).toHaveAttribute(
      "href",
      /toolbox\.ikontechnologies\.com/,
    );
  });
});

test.describe("Demo form", () => {
  test("shows an error when required fields are empty", async ({ page }) => {
    await page.goto("/request-a-demo");
    await page.getByTestId("lead-form").locator('button[type="submit"]').click();
    await expect(page.getByTestId("lead-form").getByRole("alert")).toContainText(/required/i);
  });

  test("accepts a complete lead", async ({ page }) => {
    await page.goto("/request-a-demo");
    const form = page.getByTestId("lead-form");
    await form.getByLabel("Name").fill("Test Buyer");
    await form.getByLabel("Dealership").fill("Example Motors");
    await form.getByLabel("Email").fill("buyer@example.com");
    await form.locator('button[type="submit"]').click();
    await expect(page.getByRole("status")).toContainText(/thanks/i);
  });
});

test.describe("Mobile menu", () => {
  test("opens navigation on a compact viewport", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open menu" }).click();
    await expect(page.getByTestId("primary-nav")).toBeVisible();
    await page.getByTestId("primary-nav").getByRole("link", { name: "Resources" }).click();
    await expect(page).toHaveURL(/dealers-digest/);
  });
});
