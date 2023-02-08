const {validationResult } = require('express-validator');
function register_user(data)
{
    console.log(data);

}
function register(req, res){
    const errors = validationResult(req);
    if (errors.isEmpty()) {
        register_user(req.body);
      }
    res.status(201).json({ errors: errors.array() }); //201 abysmy nie
}





export default register;