import { Request, Response } from "express";
import prisma from "../prisma";
import { genSalt, hash } from "bcrypt";

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

            // ini jika tidak, maka menjalankan ENSCRYPT dari password
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

    async getAuthor(req: Request, res: Response) {
        try {
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
            const author = await prisma.author.findUnique({ 
                where: { id: +req.params.id } 
            })
            if (!author) throw 'author not found!'
            res.status(200).send({
                status: 'ok',
                author
            })
        } catch (err) {
            res.status(400).send({
                status: 'error',
                msg: err
            })
        }
    }
}