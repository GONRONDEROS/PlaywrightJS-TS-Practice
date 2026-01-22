class MyOrdersPage{

    constructor(page){
        this.page = page;
        this.ordersContainer = page.locator("tbody");
        this.rows = page.locator("tbody tr");
        this.orderIdDetailsList = page.locator(".col-text");
    };

    async searchOrderAndSelect(orderId){
        await this.ordersContainer.waitFor();
        for(let i = 0; i < await this.rows.count(); ++i)
        {
            const rowOrderId = await this.rows.nth(i).locator("th").textContent();
            if (orderId.includes(rowOrderId))
            {
                await this.rows.nth(i).locator("button").first().click();
                break;
            }
        };
    }

    async getOrderId(){
        return await this.orderIdDetailsList.textContent();
    }
}

module.exports = {MyOrdersPage}
