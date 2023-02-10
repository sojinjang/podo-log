import Joi from "joi";

export default {
  createPackage: Joi.object().keys({
    packageName: Joi.string().required(),
    podoPrice: Joi.number().optional(),
  }),
};
