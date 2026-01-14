const {test, expect, request} = require('@playwright/test');
const { Assert } = require('node:assert');
const loginApiPaylod = {userEmail: "gonzaronderos@gmail.com", userPassword: "Estudiantes?11"};
let token; //creamos la variable token para que sea accesible 

test.beforeAll( async ()=>{
    const apiContext = await request.newContext();
    const loginResponse = await apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
        {
            data: loginApiPaylod
        } )
        expect(await loginResponse.ok()).toBeTruthy(); //se fija si la response es 200,2001,2
        //ahora necesitamos guardar la response de la llamada post
        const loginResponseJson = await loginResponse.json();
        //buscamos el token en el json y lo guardamos en una variable
        token = loginResponseJson.token;
        console.log(token);
    });

test.beforeEach( async ()=>{

});


test('Log in Test',async ({page})=> {
    
    ///debemos insertar el token usando javascript
    await page.addInitScript(value => {

        window.localStorage.setItem('token', value);
    }, token);
    
    
    await page.goto("https://rahulshettyacademy.com/client/");

    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cartBtn = page.locator("[routerlink*='cart']");
    const checkOutBtn = page.locator("text='Checkout'") 
    const allCardTitles = await page.locator(".card-body b").allTextContents(); 
    console.log(allCardTitles);
    const countProducts = await products.count();
    for(let i = 0; i < countProducts; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    };

    await cartBtn.click();
    await page.locator("div li").first().waitFor(); //como isVisible no tiene auto wait, agregamos este waitFor para asegurarnos que el listado de productos del carrito fue cargados
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();
    await checkOutBtn.click();
    
});