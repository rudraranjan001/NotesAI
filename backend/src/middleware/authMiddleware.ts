import type{ Request , Response, NextFunction } from "express";

import { adminAuth } from "../config/firebaseAdmin";

export const authMiddleware = async(
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const authHeader = req.headers.authorization;

    if(!authHeader){
        return res.status(401).json({message: "No token provided"});
    }
    if(!authHeader.startsWith("Bearer ")){
        return res.status(401).json({message: "Invalid token format"});
    }
    const token = authHeader.split(" ")[1];
    try {
        const decodedToken = await adminAuth.verifyIdToken(token);

        (req as any).uid = decodedToken.uid;

         next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
};