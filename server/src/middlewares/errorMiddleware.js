const ColorError = require("../errors/ColorError");

const errorMiddleware = (error, req, res, next)=> {
  //En desarrollo todos los errores se pueden ver en el lado del cliente
  if(process.env.NODE_ENV === "development") {
    if(!error.status || !error.toJSON) {
      console.log(error);
      return res.status(500).end("Revisa el error en la consola del servidor");
    }
    return res.status(error.status).json(error.toJSON());
  }

  //En producción solo algunos errores se pueden ver en el lado del cliente
  if(process.env.NODE_ENV === "production") {
    if(error instanceof ColorError) 
      return res.status(error.status).json(error.toJSON()); 
  }

  //En otro ambiente o el error ingresado no se puede ver en el lado del cliente
  return res.status(400).json({
    status: 400,
    name: "Unknown error",
    message: "Unknown error"
  });
}

module.exports = errorMiddleware;