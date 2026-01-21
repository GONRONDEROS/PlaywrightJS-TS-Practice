const {test, expect, request} = require('@playwright/test');
const { Assert } = require('node:assert');
const { APIUtils } = require('./utils/APIUtils');

const loginApiPayload = {userEmail: "gonzaronderos@gmail.com", userPassword: "PutoElQueLee"};
let orderPayload = {orders: [{country: "Argentina", productOrderedId: "6960eac0c941646b7a8b3e68"}]}

let response; 

test.beforeAll( async ()=>{
    //Log in API
    const apiContext = await request.newContext();
    const apiUtils = new APIUtils(apiContext, loginApiPayload);
    response = await apiUtils.createOrder(orderPayload); 

    });

test('@API Place the Order',async ({page})=> {
    
    ///debemos insertar el token usando javascript
    await page.addInitScript(value => {
        //guardamos el token en el local storage
        window.localStorage.setItem('token', value);
    }, response.token);
    
    
    await page.goto("https://rahulshettyacademy.com/client/#/dashboard/dash");
    await page.locator("button[routerlink*='myorders']").click();
    await page.locator("tbody").waitFor();
    const row = await page.locator("tbody tr");

    for(let i = 0; i < await row.count(); i++) {
        await page.pause();
        const rowOrderId = await row.nth(i).locator("th").textContent();
        if(await response.orderId.includes(rowOrderId))
        {
            await row.nth(i).locator("button").first().click();
            break;
        }
    const orderIdDetails = await page.locator(".col-text").textContent();
    await page.pause();
    expect(response.orderId.includes(orderIdDetails)).toBeTruthy();
    };
});