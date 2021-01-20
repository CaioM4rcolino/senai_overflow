const { celebrate, Joi, errors, Segments, CelebrateError } = require('celebrate');


module.exports = {

    create: celebrate({

        [Segments.BODY]: Joi.object().keys({
            name: Joi.string().min(3).max(255).required(),
            ra: Joi.string().length(7).pattern(/^[0-9]+$/).required(),
            email: Joi.string().min(8).max(255).required(),
            password: Joi.string().min(6).max(255).required()
            
        })

    })
 
}