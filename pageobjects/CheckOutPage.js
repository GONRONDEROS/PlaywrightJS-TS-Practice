const { expect } = require("@playwright/test");

class CheckOutPage{
    constructor(page){
        this.page = page;
        this.country = page.locator("[placeholder*='Country']");
        this.dropdown = page.locator(".ta-results");
        this.emailId = page.locator(".user__name [type='text']").first();
        this.placeOrderButton = page.locator(".action__submit");
        this.orderConfirmation = page.locator(".hero-primary");
        this.orderId = page.locator(".em-spacer-1 .ng-star-inserted");
    };

    async searchCountryAndSelect(countryCode,countryName){
        await this.country.pressSequentially(countryCode, {delay:100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i = 0; i < optionsCount; i++){
            let text = await this.dropdown.locator("button").nth(i).textContent();
            if(text.trim() === countryName){
                await this.dropdown.locator("button").nth(i).click();
                break;
            };
        }
    }

    async veryfyEmailId(userEmail){
        await expect(this.emailId).toHaveText(userEmail);
    }

    async submitAndGetOrderId(){
        await this.placeOrderButton.click();
        await expect(this.orderConfirmation).toHaveText("  Thankyou for the order. ");
        return await this.orderId.textContent();
    }
}

module.exports = {CheckOutPage}