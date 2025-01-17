import { Env } from "../env";
import jwt from "jsonwebtoken";

export const generateToken = (uuid) => {
  const { secretKey, expiresIn } = Env;
  return `Bearer ${jwt.sign({ uuid }, secretKey || "express", { expiresIn })}`;
};

export const verifyToken = (token: string): string | null => {
  const { secretKey } = Env;
  
  try {
    const tokenWithoutBearer = token.startsWith("Bearer ") ? token.slice(7) : token;
    const decoded = jwt.verify(tokenWithoutBearer, secretKey || "express") as { uuid: string };
    return decoded.uuid;
  } catch (error) {
    return null;
  }
};