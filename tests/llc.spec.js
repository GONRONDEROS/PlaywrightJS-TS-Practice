import {test, expect } from '@playwright/test';

test('Playright Special Locators', async({page}) => {
    await page.goto("https://rahulshettyacademy.com/angularpractice/");
    await page.getByLabel("Check me out if you Love IceCreams").click();
    await page.getByLabel("Employed").check(); //get by label no sirve pata typear
    await page.getByLabel("Gender").selectOption("Female"); //selectOption es para los elementos <select>
    await page.getByPlaceholder("").fill("abc123")  //sirce para traer los metodos <placeholder>. Se puede typear o fille
    await page.getByRole("button", {name: 'Submit'}).click(); //aqui playwright filtra todos los botones del DOM. Y especificamos cual queremos en el segundo parametro
    await page.getByText("Success! The Form has been submitted successfully!.").isVisible() //escanea todo el dom buscando el texto
    await page.getByRole("link", {name : "Shop"}).click() 
    await page.locator("app-card").filter({hasText: 'Nokia Edge'}).getByRole("button").click();
})