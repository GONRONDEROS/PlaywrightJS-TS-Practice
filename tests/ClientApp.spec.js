const {test, expect} = require('@playwright/test');
const { Assert } = require('node:assert');

test.only('Log in Test',async ({browser})=> {
    const context = await browser.newContext();
    const page = await context.newPage();

    const userEmail = page.locator('#userEmail'); 
    const password = page.locator('#userPassword');
    const signInButton = page.locator("[name='login']");
    const products = page.locator(".card-body");
    const productName = "ZARA COAT 3";
    const cartBtn = page.locator("[routerlink*='cart']");

    //navegamos a la pagina del test
    await page.goto("https://rahulshettyacademy.com/client/auth/login/");
    //Verificamos titulo de Log In
    await expect(page.locator("h1.login-title")).toContainText("Log in");

    //Rellenamos formulario
    await userEmail.fill("gonzaronderos@gmail.com");
    await password.fill("Estudiantes?11");
    await signInButton.click();

    //Una vez ingresamos queremos traer el primer elemento de la pagina de venta. el .nth(numero del elemento empezando por 0)
    //console.log(await cardTitles.nth(0).textContent());
    //Utilizaremos el waitForLoadState de Playwright para poder evitar el error o el conjunto vacio. Es una condicion
    //que ayuda a esperar que todos los API request de la pagina esten completos para hacer la assertion. 
    //por eso se llama networkIdle = espera a q todo este perfecto
    await page.waitForLoadState('networkidle');
    //La otra forma, mas recomendada, es esperar al tipo de elemento (si son muchos) q cargue con waitFor()
    await page.locator(".card-body b").first().waitFor();
    //Vamos a traer todos los elementos de la pagina de una sola vez y los guardaremos en un arrat
    const allCardTitles = await page.locator(".card-body b").allTextContents(); 
    console.log(allCardTitles);
    //console.log(allCardTitles[0]);

    //contamos cuantos productos estan siendo renderizados
    const countProducts = await products.count();
    //Iteramos por los productos del DOM y clickeamos el add to cart para el que estamos buscando
    for(let i = 0; i < countProducts; ++i) {
        if (await products.nth(i).locator("b").textContent() === productName) {
            //add product to cart
            await products.nth(i).locator("text=  Add To Cart").click();
            break;
        }
    };

    //Accedemos al carrito de compras
    await cartBtn.click();
    await page.locator("div li").first().waitFor(); //como isVisible no tiene auto wait, agregamos este waitFor para asegurarnos que el listado de productos del carrito fue cargados
    const bool = await page.locator("h3:has-text('ZARA COAT 3')").isVisible();
    expect(bool).toBeTruthy();

    //await page.pause();


});

