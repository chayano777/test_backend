import fs from 'fs';

export default class CartManager {

    constructor(){
        this.path = './src/files/carts.json';
    }

    validateField(){
        throw('Error - Campo sin parametro');    
    }

    getCarts = async () =>{
       
        if(!fs.existsSync(this.path)){
            return [];
        }
        
        try {
            
            const cartProducts = await fs.promises.readFile(this.path, 'utf-8');
            const cartProductsJSON = JSON.parse(cartProducts);
            return cartProductsJSON;
            
        } catch (error) {
            console.log(error);  
        }

    }

    getCartById = async (idCart) =>{

        const cartProducts = await this.getCarts();
                
        const cartProduct = cartProducts.find( e => e.id === parseInt(idCart))

        return cartProduct;
    }

    createCart = async () => {

        const cartProduct = {
            
            "products": []
        }

        const cartProducts = await this.getCarts();

        if (cartProducts.length === 0){
            cartProduct.id = 1;
        } else {
            cartProduct.id = cartProducts[cartProducts.length-1].id + 1;
        }

        cartProducts.push(cartProduct);

        try {
            
            await fs.promises.writeFile(this.path, JSON.stringify(cartProducts, null, '\t'))
            return 'Carrito generado'

        } catch (error) {
            console.log(error);
        }

    }

    addProductToCart = async (idCart, idProduct) => {
        
        const cartProducts = await this.getCarts();

        const cartProduct = cartProducts.find(e=>e.id===parseInt(idCart))

        if(!cartProduct){
            return 'Carrito inexistente'
        }

        const productFilter = cartProduct.products.find(e=>e.id===idProduct);

        if(!productFilter || productFilter.id != idProduct ){

            cartProduct.products.push({
                id: idProduct,
                quanty: 1
            })
        } else {
            productFilter.quanty +=1;
        }

        try {
            
            await fs.promises.writeFile(this.path, JSON.stringify(cartProducts, null, '\t'));
            return cartProduct; 

        } catch (error) {
            console.log(error)
        }
    }
}