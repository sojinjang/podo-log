import Joi from "joi";

export default {
  createPackage: Joi.object().keys({
    packageName: Joi.string().required(),
    podoPrice: Joi.number().optional(),
  }),
  packageId: Joi.object().keys({
    packageId: Joi.number().required(),
  }),
};
