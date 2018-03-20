const express = require('express');
const path = require('path');
const db = require('./db');
const { User, Product } = db.models;
const app = express();

app.use(require('body-parser').json())


db.syncAndSeed()
    .then(()=>{console.log('seeded')})

app.use('/', express.static(path.join(__dirname, 'dist')))

app.get('/', (req, res, next)=> res.sendFile(path.join(__dirname,'dist', 'index.html')));

app.get('/api/users', (req, res, next)=>{
    User.findAll()
        .then(users => res.send({ users }))
        .catch(next);
});

app.get('/api/products', (req, res, next)=>{
    Product.findAll()
        .then(products => res.send({ products }))
        .catch(next);
});

app.post('/api/users', (req, res, next)=>{
    User.create(req.body)
        .then(user => res.send(user))
        .catch(next);
});

app.patch('/api/users/:id', (req, res, next)=>{
    console.log(req.body)
    User.findById(req.params.id)
        .then(user => {
            user = Object.assign(user, req.body);
            return user.save()
        })
        .then(user => res.send(user))
        .catch(next)
});

app.delete('/api/users/:id', (req, res, next)=>{
    User.findById(req.params.id)
        .then(user=>{
            return user.destroy()
        })
        .then(()=>{
            res.sendStatus(204)
        })
        .catch(next);
});

const port = process.env.PORT || 3000;
app.listen(port, ()=>{console.log(`Listening on port ${port}`)});