const base = require('@playwright/test');

exports.customTest = base.test.extend(
    {
        testDataForOrder: {
            userEmail : "gonzaronderos@gmail.com",
            password : "Estudiantes?11",
            productName : "ZARA COAT 3" 
        }
    });