const handleEventErrors = (error, res )=> {
    
    const SchemaErrors = {title: '', start: '', end: ''}
    
    if(error.errors){
        Object.values(error.errors).forEach(error=>{
            SchemaErrors[error.properties.path] = error.properties.message
        })
        return res.status(500).json(SchemaErrors);
    }

    else if(error.code == 11000){
      console.log(error)
      SchemaErrors[Object.keys(error.keyPattern)[0]] = `This is a duplicate ${Object.keys(error.keyPattern)[0]}. please enter a new one`
      return res.status(500).json(SchemaErrors);
    }else{
        return res.status(500).json("something went wrong")
    }
   }

 module.exports = handleEventErrors;