import jwt from "jwt-simple";
import { DateTime } from "luxon";

export const createToken = (userId: string) => {
    const payload = {
        user: userId,
        iat: DateTime.local().toSeconds(),
        exp: DateTime.local().plus({ days: 14 }).toSeconds(),
    };

    return jwt.encode(payload, process.env.JWT_SECRET as string);
};

export const decodeToken = (token: string) => {
    let payload: { user: string; iat: number; exp: number };
    try {
        payload = jwt.decode(token, process.env.JWT_SECRET as string);
        if (payload.exp <= DateTime.local().toSeconds()) {
            return { status: 401, message: "Token expired" };
        }
    } catch (error) {
        console.log(error);
    }
};
