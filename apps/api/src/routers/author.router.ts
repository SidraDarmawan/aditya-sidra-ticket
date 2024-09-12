import { Router } from "express";
import { AuthorController } from "../controllers/author.controller";
import { checkAdmin, verifyToken } from "../middlewares/token";

export class AuthorRouter {
    private router: Router
    private authorController: AuthorController

    constructor() {
        this.authorController = new AuthorController()
        this.router = Router()
        this.initializeRoutes()
    }

    private initializeRoutes(): void {
        // verifyToken ini dari middlewares JWT, checkAdmin untuk menentukan ROLE
        this.router.get('/', verifyToken, checkAdmin, this.authorController.getAuthor)

        this.router.get('/:id', this.authorController.getAuthorId)
        this.router.post('/', this.authorController.createAuthor)
        this.router.post('/login', this.authorController.loginAuthor)
    }

    getRouter(): Router {
        return this.router
    }
}