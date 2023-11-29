const express = require('express');
const app = express();

const{ connectDatabase } = require('./database/connect');
const bodyParser = require('body-parser'); 

connectDatabase();

app.use(bodyParser.json());

//routes

const productRoutes = require('./modules/product/product.routes');
const UserRoutes = require('./modules/user/user.routes');
const OrderRoutes = require('./modules/order/order.routes');



app.use('/products' , productRoutes);
app.use('/users',UserRoutes);
app.use('/orders',OrderRoutes);


app.listen(3001, ()=>{
    console.log("Server is runnig on port",3001);
});
