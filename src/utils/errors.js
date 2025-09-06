export class InvalidProductException extends Error{
    constructor(message){
    super(message)
    this.name= "InvalidProductException "
    this.statusCode = 404;
}
}

export class OutOfStockException extends Error{
    constructor(message){
    super(message)
    this.name= "OutOfStockException "
    this.statusCode = 404;
}
}