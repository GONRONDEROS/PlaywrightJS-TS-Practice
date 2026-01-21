class OrderCompletedPage{
    constructor(page){
        this.page = page;
        this.dropdown = page.locator(".ta-results");
        this.placeOrderButton = page.locator(".action__submit");
    };

    async completeShippingInfo(){
        await this.page.locator("[placeholder*='Country']").pressSequentially("arg", {delay: 100});
        await this.dropdown.waitFor();
        const optionsCount = await this.dropdown.locator("button").count();
        for(let i = 0; i < optionsCount; i++){
            let text = await this.dropdown.locator("button").nth(i).textContent();
            if(text === ' Argentina'){
                await this.dropdown.locator("button").nth(i).click();
                break;
            };
        }
    };
        
    async placeOrder(){
        await this.placeOrderButton.click();
    }; 
}

module.exports = {OrderCompletedPage}