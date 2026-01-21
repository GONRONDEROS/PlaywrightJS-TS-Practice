class APIUtils 
{
    constructor(apiContext, loginApiPayload)
    {
        this.apiContext = apiContext;
        this.loginApiPayload = loginApiPayload;
    }

    async getToken() 
    {
        const loginResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginApiPayload
            });
        //expect(await loginResponse.ok()).toBeTruthy(); //se fija si la response es 200,2001,2
        const loginResponseJson = await loginResponse.json();
        const token = loginResponseJson.token;
        console.log(token);
        return token;
    };

    async createOrder(orderPayload) 
    {
        let response = {};
        response.token = await this.getToken();
        const orderResponse = await this.apiContext.post("https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data : orderPayload,
                headers : {
                    'Authorization': response.token,
                    'Content-Type': 'application/json'

                }
            });

        const orderResponseJson = await orderResponse.json();
        console.log(orderResponseJson);
        const orderId = orderResponseJson.orders[0];
        response.orderId = orderId;
        return response;

    }

}

module.exports = {APIUtils};