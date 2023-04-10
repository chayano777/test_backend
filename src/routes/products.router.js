import { Router } from "express";
import ProductManager from "../managers/productManager.js"

const manager = new ProductManager();

const router = Router();

router.get('/', async (req, res)=>{
    const products = await manager.getProducts();

    let limit = req.query.limit;

    if(!limit) return res.send({products});
    let productsLimit = products.slice(0,limit);
    res.send({productsLimit});
})

router.get('/:pid', async (req, res)=>{
    let pid = req.params.pid;

    let product = await manager.getProductById(pid);

    res.send({product});
})

router.post('/', async (req, res)=>{
    const {title, price, stock, thumbnail, description, status="true", category, code} = req.body;

    if(!title || !price || !stock || !description || !code || !status || !category || status==="false") {
        res.send('Faltan datos');
        return
    }

    const product = {
        title, price, stock, thumbnail, description, status, category, code
    }

    const mensaje = await manager.addProduct(product);
    res.send(mensaje);
})

router.put('/:pid', async (req, res)=>{
    const {id, title, price, stock, thumbnail, description, status, category, code} = req.body;

   if(!title || !price || !stock || !description || !category || !code) {
       
       res.send('Faltan datos');
       
       return
   }

   const mensaje = await manager.updateProduct(id, title, price, stock, thumbnail, description, status, category, code);
   res.send(mensaje);
})

router.delete('/:pid', async (req, res)=>{
    const id = req.body.id;

    const mensaje = await manager.deleteProduct(id)

    res.send({
        status: "Success",
        msg: "Producto eliminado"
    });
})

export default router;