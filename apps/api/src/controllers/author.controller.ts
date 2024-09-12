import { Request, Response } from "express";
import prisma from "../prisma";
import { compare, genSalt, hash } from "bcrypt";
import { sign } from 'jsonwebtoken'

export class AuthorController {
    async createAuthor(req: Request, res: Response) {
        try {
            // nerima db dari req.body
            const { name, email, password } = req.body

            // dapetin secara UNIQUE, yg mana email itu didapat dr req.body
            const existingAuthor = await prisma.author.findUnique({
                where: { email: email} // ini pengecekan
            })
            // ini untuk validasi, jika sudah ada Author nya (existingAuthor), throw ini akan ditangkap oleh catch err
            if(existingAuthor) throw "email has been used"

            //! ini jika tidak, maka menjalankan ENSCRYPT dari password
            const salt = await genSalt(10);
            const hashPassword = await hash(password, salt); // password yg sudah ditangkap di hash dulu
            
            
            // ini nge Create
            const author = await prisma.author.create({
                data: { name, email, password: hashPassword } // password: hashPassword nya ditambahkan jadi langsung dibuatkan dalam db
            })
            res.status(201).send({  // ini hanya pemberitahuan tidak err
                status: 'ok',
                msg: 'author created!',
                author
            })
        } catch (err) {
            res.status(400).send({ // akan ditanggkap ini
                status: 'error',
                msg: err
            })
        }
    }

    async loginAuthor(req: Request, res: Response) {
        try {
            // ini ngirim dari req.body (email, dan password) ke server
            const { email, password } = req.body

            // ini nyari author yg unique, dimana email nya itu sama
            const existingAuthor = await prisma.author.findUnique({
                where: { email: email } // email = email
            })

            // ini mengecek jika Author yg sudah ada tidak dpt, maka res nya author not found
            if (!existingAuthor) throw "author not found!"

            // ini jika dapat author yg dimaksud, maka akan compare(bcrypt) password nya itu dengan password dari author yg lain (password yg sudah di ENCRYPTED)
            const isValidPassword = await compare(password, existingAuthor.password)

            if(!isValidPassword) throw "incorrect password!"

            const payload = { id: existingAuthor.id, role: existingAuthor.role }
            const token = sign(payload, process.env.SECRET_JWT!, { expiresIn: '1d' }) // tanda ! untuk memberi tau ini pasti ada, m = menit jika sudah 10 menit token tidak dpt dipakai lagi

            res.status(200).send({
                status: 'ok',
                msg: "login success!",
                token, // ini akan ngirim token nya
                author: existingAuthor // ini ngirim res sebagai existingAuthor
            })

    }   catch (err) {
        res.status(400).send({ // akan ditanggkap ini jika err
            status: 'error',
            msg: err
        })
    }
}


    async getAuthor(req: Request, res: Response) {
        try {
            console.log(req.author)

            // ini untuk mendapat data author semua
            const authors = await prisma.author.findMany()
            res.status(200).send({
                status: 'ok',
                authors
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }

    async getAuthorId(req: Request, res: Response) {
        try {

            // ini untuk dapat author tertentu
            const author = await prisma.author.findUnique({ 

                // ini akan membut oto id dgn sistem incremen params
                where: { id: +req.params.id } 
            })

            // ini jika tidak ada author
            if (!author) throw 'author not found!'
            res.status(200).send({
                status: 'ok',
                author
            })
        
        //ini jika error
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}