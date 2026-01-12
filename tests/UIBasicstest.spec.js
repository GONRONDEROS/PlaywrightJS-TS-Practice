const {test, expect} = require('@playwright/test');

test('Borwser Context Playwright test',async ({browser})=> {
    //Playwright code
    //the new contaxt function initialize the browser instance based on our selected context (cookies, plugins, etc) is like setting an incognito chrome window for our test. 
    // you can decide the context for the browser every time
    // aca seteamos la variable context para manejar el contexto del browser
    const context = await browser.newContext();

    // el new page crea una nueva pagina 
    const page = await context.newPage();

    //creamos las variables de los locators con los q vamos a trabajar
    const userName = page.locator('#username'); 
    const password = page.locator("[type='password']");
    const signInButton = page.locator('#signInBtn');
    const cardTitles = page.locator(".card-body a"); 
    
    //navegamos a la pagina del test
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    console.log(await page.title());

    //css
    await userName.fill("rahulshetty");
    await password.fill("learning");
    await signInButton.click();

    //imprimimos el mensaje de error
    console.log(await page.locator("[style*='block']").textContent());
    
    //verificamos el mensaje de error
    await expect(page.locator("[style*='block']")).toContainText("Incorrect username/password.");       
    
    //fill - the "" blank is like clearing
    await userName.fill("");
    await userName.fill("rahulshettyacademy");
    await signInButton.click();

    //Una vez ingresamos queremos traer el primer elemento de la pagina de venta. el .nth(numero del elemento empezando por 0)
    console.log(await cardTitles.nth(0).textContent());
    const allTitles = await cardTitles.allTextContents(); 
    console.log(allTitles);

});

//usamos el .only despues del test para que se corra solo ese test y no el de arriba
test('UI Controls',async ({page})=> {
    
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    
    const userName = page.locator('#username'); 
    const signInButton = page.locator('#signInBtn');
    const roleDropDown = page.locator("select.form-control");
    const termsAndConditionsBtn = page.locator("#terms");
    const blinkingText = page.locator("body a.blinkingText");

    await roleDropDown.selectOption("Consultant");
    
    await page.locator(".radiotextsty").last().click();
    await page.locator("#okayBtn").click();
    //verificar que un checkbox button esta seleccionado
    await expect(await page.locator(".radiotextsty").last()).toBeChecked();
    //si quiero verificar por consola si el checkbox esta seleccionado, imprimo por consola un booleano
    //console.log(await page.locator(".radiotextsty").last().isChecked());
    await termsAndConditionsBtn.click();
    await expect(termsAndConditionsBtn).toBeChecked();
    await termsAndConditionsBtn.uncheck();
    //verificar que un checkbox esta no clickeado
    expect (await termsAndConditionsBtn.isChecked()).toBeFalsy();
    //si queremos verificar el atributo de un elemento. definimos el valor a chequear
    expect (await blinkingText).toHaveClass("blinkingText");

    //assertion
    
    
    //await page.pause();

});

test.only("Child Window handler", async({browser})=>{
    
    const context = await browser.newContext();
    const page = await context.newPage();
    const userName = page.locator('#username'); 
    await page.goto("https://rahulshettyacademy.com/loginpagePractise/");
    const blinkingText = page.locator("body a.blinkingText");
    //si queremos testear en una pagina nueva que deviene de la pagina original que estamos testeando
    //en este escenario, lo que queremos es q la linea 91 se verifiquen al mismo tiempo. Es lo q llamamos promesa
    const [newPage] = await Promise.all(
    [
        context.waitForEvent('page'), blinkingText.click()
    ]);

    //Ahora vamos a trabajar en la nueva pagina, por lo que hay q definir el trabajo en la nueva pagina
    const redText = await newPage.locator(".red").textContent();
    console.log(redText);

    //Queremos tomar una parte del redText para usarlo en otra pagina
    //Creamos un array para manejar el contenido del texto
    const arrayRedText = redText.split("@") //cortamos el texto en el lugar desde donde queremos tomar el texto
    const domain = arrayRedText[1].split(" ")[0];
    console.log(domain);

    //ahora queremos poner ese domain en la pagina inicial, entonces usamos page (no la newPage)
    await userName.fill(domain);
    console.log(await userName.inputValue());

    

})

