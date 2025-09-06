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