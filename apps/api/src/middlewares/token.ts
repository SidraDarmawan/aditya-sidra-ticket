import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.header("Authorization")?.replace("Bearer ", "")
        if(!token) throw "token empty!"
        const verifiedToken = verify(token, process.env.SECRET_JWT!)
        console.log(verifiedToken);

        next()

    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}