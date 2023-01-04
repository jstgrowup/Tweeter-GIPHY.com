import joi from "joi";
import passwordComplexity from "joi-password-complexity";

const loginvalidate = (data) => {
  const schema = joi.object({
    email: joi.string().email().label("email"),
    password: passwordComplexity().label("password"),
  });
  return schema.validate(data);
};
export default loginvalidate;
