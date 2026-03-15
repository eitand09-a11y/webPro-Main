const LoggeeMiddleware = (req,res,next)=>{
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const time = `${now.getHours()}:${now.getMinutes()}:${now.getSeconds()}`;
    console.log(`Date: ${date} ${time}\nRequest: ${req.method}\nPath: ${req.path}`);
    next();
}

module.exports = LoggeeMiddleware;