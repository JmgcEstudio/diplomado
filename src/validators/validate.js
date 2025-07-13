function validate(schema, target = 'body'){
    return (req, res, next) => {
        const data = req[target];
        // Paso 1 .- Verificar que haya datos
        if(!data || Object.keys(data).length===0){
            return res.status(400).json({message:'No data found'})
        }

        // Paso 2 .- Validar contra el schema con opciones
        const {error,value}=schema.validate(data,{
                abortEarly: false,  // No detener en el primer error
                stripUnknown: true, // Eliminar campos no definidos
            });
        
        // Paso 3 .- Si hay errores de validacion devolver 400 con 
        if(error){
            return res.status(400).json({
                message: `Error de validacion en ${target}`,
                errores: error.details.map(err=>err.message)
            })
        }

        // Paso 4 .- Reemplazar el Objeto original con datos limpios
        req[target]= value;

        // Continuamos...
        next();
    }
}

export default validate;