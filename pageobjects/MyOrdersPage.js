class MyOrdersPage{

    constructor(page){
        this.page = page;
        this.ordersContainer = page.locator("tbody");
        this.myOrdersButton = page.locator("button[routerlink*='myorders']");
        this.rows = page.locator("tbody tr");
        this.orderIdDetailsList = page.locator(".col-text");
    };

    async goToMyOrders(){
        await this.myOrdersButton.click();
    };

    async verifyOrderIsListed(order){
        await this.ordersContainer.waitFor();
        const rowsCount = await this.rows.count();
        for(let i = 0; i < rowsCount; ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (order.includes(rowOrderId))
            {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        };
    }
}

module.exports = {MyOrdersPage}
