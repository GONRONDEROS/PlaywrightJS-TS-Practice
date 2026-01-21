class CartPage{
    constructor(page){
        this.page = page;
        this.checkOutBtn = page.locator("text='Checkout'");
    };

    async confirmProductAnProceedtoCheckout(){
        await this.page.locator("div li").first().waitFor();
        const bool = await this.page.locator("h3:has-text('ZARA COAT 3')").isVisible();
        if(bool){
            await this.checkOutBtn.click();
        }
    }
}

module.exports = {CartPage};