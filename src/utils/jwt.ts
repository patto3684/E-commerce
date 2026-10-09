import jwt, { SignOptions } from "jsonwebtoken";

interface TokenPayload {
  id: string;
}

const getJwtSecret = () => {
  const secret = process.env.JWT_SECRET?.trim();

  if (!secret) {
    console.warn("JWT_SECRET is missing or empty. Falling back to a development secret. Set a real secret in your .env file for production.");
    return "node-auth-mailer-dev-secret";
  }

  return secret;
};

export const signToken = (payload: TokenPayload) =>
  jwt.sign(payload, getJwtSecret(), {
    expiresIn: (process.env.JWT_EXPIRES_IN || "1d") as SignOptions["expiresIn"],
  });

export const verifyToken = (token: string) =>
  jwt.verify(token, getJwtSecret()) as TokenPayload;
