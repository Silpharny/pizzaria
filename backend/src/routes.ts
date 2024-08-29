import { Router } from "express"
import multer from "multer"
import { AuthUserController } from "./controllers/user/AuthUserController"
import { CreateUserController } from "./controllers/user/CreateUserController"
import { DetailUserController } from "./controllers/user/DetailUserController"

import { isAuthenticated } from "./middlewares/isAuthenticated"

import { CreateCategoryController } from "./controllers/category/CreateCategoryController"
import { ListCategoryController } from "./controllers/category/ListCategoryController"
import { CreateProductController } from "./controllers/product/CreateProductController"

import uploadConfig from "./config/multer"

const router = Router()

const upload = multer(uploadConfig.upload("./tmp"))

// Rotas USERS
router.post("/users", new CreateUserController().handle)
router.post("/session", new AuthUserController().handle)
router.get("/me", isAuthenticated, new DetailUserController().handle)

// Rotas CATEGORIES
router.post("/category", isAuthenticated, new CreateCategoryController().handle)
router.get("/category", isAuthenticated, new ListCategoryController().handle)

// Rotas PRODUCTS
router.post(
  "/product",
  isAuthenticated,
  upload.single("file"),
  new CreateProductController().handle
)

// Rotas ORDERS

export { router }
