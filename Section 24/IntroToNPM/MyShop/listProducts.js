var faker = require('faker');



function listTenProducts() {
    for (var i = 0; i < 10; i++ ) {
        var fakeProduct = faker.commerce.productName();
        var fakePrice = faker.commerce.price();
        console.log(fakeProduct + " - $" + fakePrice);
    }
}
listTenProducts();