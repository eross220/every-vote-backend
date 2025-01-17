import { userService } from "../../services";
import { errorHandlerWrapper } from "../../utils";
import { generateToken } from "../../utils/generate";
import { comparePassword } from "../../utils/password";
import httpStatus from "http-status";

const loginHandler = async (req, res) => {
  const { email, password } = req.body;
  const user = await userService.getOneUser({ email });
  if (!user) res.json({ message:"User does not exist." }).status(httpStatus.BAD_REQUEST);
  if (user.deletedAt) return null;
  const compare = await comparePassword(password, user.password);
  if (!compare) res.json({ message:"Password is wrong." }).status(httpStatus.BAD_REQUEST);
  const token = generateToken(user.uuid);
  res.json({ token, user }).status(httpStatus.ACCEPTED);
};

export const loginController = errorHandlerWrapper(loginHandler);
