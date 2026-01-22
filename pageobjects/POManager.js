const { CartPage } = require('./CartPage');
const { CheckOutPage } = require('./CheckOutPage');
const { DashboardPage } = require('./DashboardPage');
const { LoginPage } = require('./LoginPage');
const { MyOrdersPage } = require('./MyOrdersPage');

class POManager{

    constructor(page){
        this.page = page;
        this.cartPage = new CartPage(this.page);
        this.checkOutPage = new CheckOutPage(this.page);
        this.dashBoardPage = new DashboardPage(this.page);
        this.loginPage = new LoginPage(this.page);
        this.myOrdersPage = new MyOrdersPage(this.page);   
    }

    getCartPage(){
        return this.cartPage;
    }

    getCheckOutPage(){
        return this.checkOutPage;
    }

    getDashBoardPage(){
        return this.dashBoardPage;
    }

    getLoginPage(){
        return this.loginPage;
    }

    getMyOrdersPage(){  
        return this.myOrdersPage;
    }
}
module.exports = {POManager}