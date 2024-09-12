import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

// ini karena middlewares, maka ada parameter tambahan next: NextFunction dari express
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // ini nangkep minta Authorization maka direplace Bearer dgn kosong
        const token = req.header("Authorization")?.replace("Bearer ", "")

        // ini jika token nya tidak ada maka kasih status token empty
        if(!token) throw "token empty!"

        // = verify() ini dari jsonwebtoken JWT dengan parameter token dan proses env JWT
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