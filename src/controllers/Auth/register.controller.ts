import { userService } from "../../services";
import { errorHandlerWrapper, generateToken } from "../../utils";
import { encryptPassword } from "../../utils/encrypt";
import httpStatus from "http-status";

const registerHandler = async (req, res) => {
  const { username, email, password } = req.body;
  const hashPassword = await encryptPassword(password);
  const user = await userService.createUser({
    username,
    email,
    password: hashPassword,
  });
  if(!user){
    res.json({ message:"User already exist." }).status(httpStatus.BAD_REQUEST);
  }
  const token = generateToken(user.uuid);
  res.json({ user, token }).status(httpStatus.CREATED);
};

export const registerController = errorHandlerWrapper(registerHandler);
