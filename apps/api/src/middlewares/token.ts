import { NextFunction, Request, Response } from "express"
import { verify } from "jsonwebtoken"

// ini tipe data Interface Author, yg hanya ada id dan role
type IAuthor = {
    id: number,
    role: string
}

// ini karena middlewares, maka ada parameter tambahan next: NextFunction dari express
export const verifyToken = async (req: Request, res: Response, next: NextFunction) => {
    try {
        // ini nangkep minta Authorization maka direplace Bearer dgn kosong
        const token = req.header("Authorization")?.replace("Bearer ", "")

        // ini jika token nya tidak ada maka kasih status token empty
        if(!token) throw "token empty!"

        // = verify() ini dari jsonwebtoken JWT dengan parameter token dan proses env JWT
        const verifiedToken = verify(token, process.env.SECRET_JWT!)
        
        // req ini tidak punya tipe data author, tp ingin dipakai di controller
        req.author = verifiedToken as IAuthor

        // kalau bukan maka akan lanjut ke proses berikutnya
        next()

    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}

// ini untuk mengecek ROLE nya ADMIN atau AUTHOR
export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {

        // ini dicek apakah role nya bukan Admin maka muncul Unauthorize
        if(req.author?.role !== "Admin") throw "Unauthorize!"

        next()
    } catch (err) {
        res.status(400).send({
            status: 'error',
            msg: err
        })
    }
}