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
import { AddItemController } from "./controllers/order/AddItemController"
import { CreateOrderController } from "./controllers/order/CreateOrderController"
import { RemoveOrderController } from "./controllers/order/RemoveOrderController"
import { ListByCategoryController } from "./controllers/product/ListByCategoryController"

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
router.get(
  "/category/product",
  isAuthenticated,
  new ListByCategoryController().handle
)

// Rotas ORDERS
router.post("/order", isAuthenticated, new CreateOrderController().handle)
router.delete("/order", isAuthenticated, new RemoveOrderController().handle)
router.post("/order/add", isAuthenticated, new AddItemController().handle)

export { router }
