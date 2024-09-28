import { Router } from "express";
import { registerUser } from "../controllers/register.js";
import { loginUser } from "../controllers/login.js";
import { verifyToken } from "../middleware/auth.js";
import { getUser } from "../controllers/get_user.js";

const router = Router();

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);

router.use(verifyToken);

router.route("/").get(getUser);

export default router;
