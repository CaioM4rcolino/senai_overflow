const { celebrate, Joi, errors, Segments, CelebrateError } = require('celebrate');


module.exports = {

    create: celebrate({

        [Segments.BODY]: Joi.object().keys({
            title: Joi.string().max(255).required(),
            description: Joi.string().min(10).max(255).required(),
            gist: Joi.string().max(255),
            categories: Joi.string().required()            
        })

    })
 
}