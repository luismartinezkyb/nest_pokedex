import * as Joi from 'joi';

export const JoiValidationSchema = Joi.object({
  MONGODB_URI: Joi.required(),
  ENVIRONMENT: Joi.required().default('dev'),
  PORT: Joi.number().default(3000),
});
