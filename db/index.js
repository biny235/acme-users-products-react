const conn = require('./conn');
const User = require('./User');
const faker = require('faker');

const syncAndSeed = ()=>{
    return conn.sync({force: true})
        .then(()=>{
            return Promise.all([
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
                User.create({name: faker.name.firstName()}),
            ])
        })
};

module.exports = {
    syncAndSeed,
    models:{
        User
    }
};