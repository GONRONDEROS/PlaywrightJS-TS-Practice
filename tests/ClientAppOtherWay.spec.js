const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');

test.only('Log in Test',async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    const email = "gonzaronderos@gmail.com"

    await page.goto("https://rahulshettyacademy.com/client/auth/login/");
    await expect(page.locator("h1.login-title")).toContainText("Log in");
    await page.getByPlaceholder("email@example.com").fill(email);
    await page.getByPlaceholder("enter your passsword").fill("Estudiantes?11");
    await page.getByRole("button", {name : "Login"}).click()
    await page.waitForLoadState('networkidle');
    await page.locator(".card-body b").first().waitFor();
    await page.locator(".card-body").filter({hasText : "ZARA COAT 3"}).getByRole("button", {name : "Add to Cart"}).click();
    await page.getByRole("listitem").getByRole("button", {name : "Cart"}).click();
    await page.locator("div li").first().waitFor();
    await page.getByTestId("ZARA COAT 3").isVisible();
    await page.getByRole("button", {name : "Checkout"}).click();
    await page.getByPlaceholder("Select Country").pressSequentially("arg");
    await page.getByRole("button", {name : "Argentina"}).click();
    await page.getByText("PLACE ORDER").click();
    await page.getByTestId("Thankyou for the order.").isVisible();

});

