import { Router } from "express";
import CartManager from "../managers/cartManager.js";

const router = Router();

const manager = new CartManager();

router.get('/', async (req, res)=>{
    const carts = await manager.getCarts();

    let limit = req.query.limit;

    if(!limit) return res.send({carts});
    let cartsLimit = carts.slice(0,limit);
    res.send({cartsLimit});
})

router.get('/:cid', async (req, res)=>{
    const cid = req.params.cid;

    const cart = await manager.getCartById(cid);

    if(!cart){
        return res.send({
            status: 'Error',
            msg: `Carrito con ID: ${cid}, inexistente. `
        })
    }

    res.send({cart})

})

router.post('/', async (req, res)=>{
    const cart = await manager.createCart();

    res.send({
        status: 'Success',
        cart
    });
});

router.post('/:cid/products/:pid', async (req, res)=>{
    const idCart = req.params.cid;
    const idProduct = req.params.pid;

    const cartProduct = await manager.addProductToCart(idCart, idProduct);

        if(!cartProduct){
            return res.send({
                status: 'ERROR!',
                msg: 'Carrito inexistente'
            })
        } else {
            res.send({cartProduct});
        }


})




export default router;