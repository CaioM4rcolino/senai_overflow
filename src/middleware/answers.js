const { celebrate, Joi, errors, Segments, CelebrateError } = require('celebrate');


module.exports = {

    create: celebrate({

        [Segments.BODY]: Joi.object().keys({

            description: Joi.string().min(10).required()
            
        }),
        [Segments.PARAMS]: Joi.object({

            id: Joi.string().pattern(/^[0-9]+$/).required()
        })

    })
 
}