const conn = require('./conn');
const User = require('./User');
const Product = require('./Product');
const faker = require('faker');

const makeProduct= ()=>{
    return `${faker.commerce.productAdjective()} ${faker.commerce.productName()}`
}

const syncAndSeed = ()=>{
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                Product.create({name: makeProduct()}),
                Product.create({name: makeProduct()}),
                Product.create({name: makeProduct()}),
                Product.create({name: makeProduct()})
            ])
        })
};

module.exports = {
    syncAndSeed,
    models:{
        User,
        Product
    }
};