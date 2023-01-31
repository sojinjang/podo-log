import Joi from "joi";
import { JoiAuthBearer } from "../../utils";

export default {
  local: Joi.object().keys({
    email: Joi.string().required().email().max(25),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")).max(55),
  }),
  userId: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  auth: Joi.object()
    .keys({
      authorization: JoiAuthBearer().required(),
    })
    .unknown(true),
};
