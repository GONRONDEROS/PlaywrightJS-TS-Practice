const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');
const { info } = require('node:console');
const { waitForDebugger } = require('node:inspector');

test('Check Out Test',async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();
    await page.goto("https://rahulshettyacademy.com/client/#/auth/login");

    const email = "gonzaronderos@gmail.com";
    const userEmail = page.locator("#userEmail");
    const password = page.locator("#userPassword");
    const lognInButton = page.locator("#login");
    const listedProductsArray = page.locator(".card-body");
    
    const productToBuy = "ZARA COAT 3";
    const productToBuy2 = "iphone 13 pro";
    const goToCartBtn = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text='Checkout'");
    const personalInfoCard = page.locator(".form__cc");
    const infoCardFields = page.locator("div.field > input.input.txt");
    const applyCupponBtn = page.locator("div.field > button");
    const userShippingInfofield = page.locator("div.user__name > input.input");
    const countryShippingInfoField = page.locator("div.form-group > input");
    const dropDownOptions = page.locator(".ta-results");
    const placeOrderBtn = page.locator("div.actions > a");

    const thankYouTitle = page.locator(".hero-primary");
    const ordersId = page.locator(".em-spacer-1 > .ng-star-inserted");
    const ordersBtn = page.locator('button.btn-custom', { hasText: 'ORDERS' }); 

    const rowsInTable = page.locator("tbody tr");
    const viewOrdersBtn = page.locator("td > .btn-primary");

    const idInOrderSummaryPage = page.locator("div.col-md-6 > div.-main");
    const backToOrdersPageBtn = page.locator(".-teal");


    await expect(page.locator("h1.login-title")).toContainText("Log in");
    await userEmail.fill(email);
    await password.fill("Estudiantes?11");
    await lognInButton.click();
    await page.locator(".card-body b").first().waitFor();
    const productsCounter = await listedProductsArray.count();
    for(let i = 0; i < productsCounter; ++i) {
        if (await listedProductsArray.nth(i).locator("b").textContent() === productToBuy) {
            await listedProductsArray.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    }
    // for(let i = 0; i < productsCounter; ++i) {
    //     if (await listedProductsArray.nth(i).locator("b").textContent() === productToBuy2) {
    //         await listedProductsArray.nth(i).locator("text=  Add To Cart").click();
    //         break;
    //     }
    // }

    await goToCartBtn.click();
    await page.locator("div li").first().waitFor();
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();

    //await expect(page).toHaveURL("https://rahulshettyacademy.com/client/#/dashboard/order?prop=%5B%226960eac0c941646b7a8b3e68%22%5D");
    await personalInfoCard.isVisible();
    await expect(infoCardFields.nth(0)).toHaveValue("4542 9931 9292 2293");
    await infoCardFields.nth(1).fill("528");
    await infoCardFields.nth(2).fill("Gonzalo Ronderos");
    await infoCardFields.nth(3).fill("rahulshettyacademy");
    await applyCupponBtn.click();
    await expect(await page.locator("div.field > p")).toContainText("* Coupon Applied");
    await expect(userShippingInfofield).toHaveValue("gonzaronderos@gmail.com");
    await countryShippingInfoField.pressSequentially("arg", {delay: 150});
    await dropDownOptions.waitFor();
    const dropDownOptionCount = await dropDownOptions.locator("button").count();
    for (let i = 0; i < dropDownOptionCount; i++) {
        let text = await dropDownOptions.locator("button").nth(i).textContent();
        if (text === " Argentina") {
            await dropDownOptions.locator("button").nth(i).click();
            break;
        }
    }

    await expect(countryShippingInfoField).toHaveValue("Argentina");
    await placeOrderBtn.click();

    await expect(page.locator(".hero-primary")).toHaveText(" Thankyou for the order. ");
    const orderId = await page.locator(".em-spacer-1 .ng-star-inserted").textContent();
    console.log(orderId);
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const rows = await page.locator("tbody tr");
    for (let i = 0; i < await rows.count(); ++i) {
        const rowOrderId = await rows.nth(i).locator("th").textContent();
        if (orderId.includes(rowOrderId)) {
            await rows.nth(i).locator("button").first().click();
            break;
        }
    }
    const orderIdDetails = await page.locator(".col-text").textContent();
    expect(orderId.includes(orderIdDetails)).toBeTruthy();

    // await page.locator(".ng-star-inserted").last().waitFor();
    // await expect(thankYouTitle).toHaveText(" Thankyou for the order. ");
    // const ordersIDcount = await ordersId.count();
    // const idPerOrder = [];
    // for (let i = 0; i < ordersIDcount; i++) {
    //     const text = await ordersId.nth(i).textContent();
    //     idPerOrder.push(text);
    // }
    // console.log(idPerOrder);

    // await ordersBtn.click();
    // await page.locator("tbody").waitFor();

    // for (let i = 0; i < await rowsInTable.count(); ++i) {
    //     const rawOrderID = await rowsInTable.nth(i).locator("th").textContent();
    //     const rowOrderID = rawOrderID.trim();
    //     //console.log("Row:", rowOrderID, "Array:", idPerOrder);
    //     const normalizedArray = idPerOrder.map(id => id.replace(/\|/g, "").trim());
    //     if (normalizedArray.includes(rowOrderID)) {
    //         //await page.pause();
    //         await rowsInTable.nth(i).locator("button").first().click()
    //         await page.locator(".email-wrapper").first().waitFor();
    //         expect(await idInOrderSummaryPage.textContent()).toBe(rowOrderID);
    //     }
    //     await backToOrdersPageBtn.click();
    //     }
    }
);

   // await page.pause();

