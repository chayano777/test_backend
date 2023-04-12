import express from 'express';
import productsRouter from './routes/products.router.js'
import cartsRouter from './routes/carts.router.js'

const PORT = '8080';


const app = express();

app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.listen(PORT, ()=>{
    console.log(`Servidor UP! en Puerto: ${PORT}`);
})

app.use('/api/products', productsRouter);
app.use('/api/carts', cartsRouter);



