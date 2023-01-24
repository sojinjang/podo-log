import Joi from "joi";
import { JoiAuthBearer } from "../../utils";

export default {
  local: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required().pattern(new RegExp("^[a-zA-Z0-9]{3,30}$")),
  }),
  userId: Joi.object().keys({
    userId: Joi.number().required(),
  }),
  auth: Joi.object().keys({
    authorization: JoiAuthBearer().required(),
  }),
};
