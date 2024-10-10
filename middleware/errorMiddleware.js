const errorHandler=async(req,res,next)=>{
    const statusCode=res.statusCode===200 ? 500:res.statusCode
    res.status(statusCode)
    next()
    res.json({
        message:err.message,
        stack:process.env.NODE_ENV==='development' ? null:err.stack   
    })
}

const notFound=async(req,res,next)=>{
    const error=new Error(`not found- ${req.originalUrl}`) 
    res.status(404)
    next(error)
}

module.exports={errorHandler,notFound} 