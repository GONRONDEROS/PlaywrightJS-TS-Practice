class DashboardPage{
    constructor(page){
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']")
        this.orders = page.locator("button[routerlink*='myorders']");
    }

    async searchProductAddCart(productName){
        const allCardTitles = await this.productsText.allTextContents();
            console.log(allCardTitles);
            const countProducts = await this.products.count();
            for(let i = 0; i < countProducts; ++i) {
                if (await this.products.nth(i).locator("b").textContent() === productName) {
                    await this.products.nth(i).locator("text=  Add To Cart").click();
                    break;
                }
            };
    }
    async navigateToCart(){
        await this.cart.click();
    }

    async navigateToOrders(){
        await this.orders.click()
    }
}
module.exports = {DashboardPage}