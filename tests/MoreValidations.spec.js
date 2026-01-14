const {test, expect} = require('@playwright/test');

test('Popup Validations', async ({page})=> {
    page.goto("https://rahulshettyacademy.com/AutomationPractice/");
    // await page.goto("https://google.com");
    // await page.goBack();
    // await page.goForward();

    await expect(page.locator("#displayed-text")).toBeVisible();
    await page.locator("[value='Hide']");
    await expect(page.locator("#displayed-text")).toBeHidden();

    //para manejar popups que no estan en el dom
    page.on("dialog", dialog => dialog.accept()); //Playwright esta esperando al evento dialog. la accion puede ser accept o dismiss
    await page.locator("#confirmbtn").click();

    //para hoovear
    await page.locator("#mousehover").hover();

    //para child frames (pagina dentro de otra pagina)
    //si hay un tag con frame o iframe hay pag dentro de pag
    //hay q switchear entre paginas
    const framePage = page.frameLocator("#courses-iframe"); 
    await framePage.locator("li a[href*='lifetime-access']:visible").click() // como hay dos elementos (uno visible y otro no, pongo :visible para seleccionarlo)
    const textToCheck = await framePage.locator(".text h2").textContent();
    textToCheck.split(" ")[1]; //spliteamos el texto en los espacios y traemos el segundo elemento


})