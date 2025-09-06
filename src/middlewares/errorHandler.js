export function errorHandler(err, req,res,next) {
    console.log(err);

    if(err.statusCode){
        return res.status(err.statusCode).json({error: err.message});
    }
    res.status(500).json({error:"Internal server error"})
}