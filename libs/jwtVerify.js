import { verify } from "jsonwebtoken";
export const jwtverify = (token) => {
  try {
    verify(token, process.env.NEXT_PUBLIC_JWT_KEY, (err, details) => {
      if (err) {
        return 400;
      }
      return 200;
    });
  } catch (error) {
    return error.message;
  }
};
