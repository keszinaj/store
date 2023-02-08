const {validationResult } = require('express-validator');
function register_user(data)
{
    console.log(data.body);

}
function register(req, res){
    console.log("ala")
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        register_user(req);
      }
    res.status(201).json({ errors: errors.array() }); //201 abysmy nie
}





export default register;