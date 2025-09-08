export function validProductInput({name, price, stock}) {
    if(!name || name.trim().length === 0){
        throw new Error("Product name cannot be empty");
    }

    if(price <=0){
        throw new Error("Price must be greater than 0");
    }

    if(stock <0){
        throw new Error("Stock cannot be negative");
    }
}

export function validateUserInput({name, email, role}) {
    if(!name || name.trim().length === 0){
        throw new Error("User name cannot be empty");
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        throw new Error("Invalid email format");
    }

    if(role && !["ADMIN","CUSTOMER"]){
        throw new Error("Role must be admin or customer");
    }
}


export function validateOrderInput({productId, quantity}) {
    if(!productId || isNaN(productId)){
        throw new Error("Invalid Product ID");
    }
   if(quantity <=0){
        throw new Error("Quantity must be greater than 0");
    }

}

