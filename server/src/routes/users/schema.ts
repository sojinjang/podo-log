import Joi from "joi";

export default {
  localJoin: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    nickname: Joi.string().required().min(1).max(15),
    profile: Joi.string().optional(),
  }),
  userId: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  patchUser: Joi.object().keys({
    password: Joi.string().optional().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    newPassword: Joi.string().optional().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
    nickname: Joi.string().optional().min(1).max(15),
  }),
};
