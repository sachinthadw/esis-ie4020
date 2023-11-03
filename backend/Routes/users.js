const router = require('express').Router();
const authController = require("../Controllers/user");
const isAuth = require("../middleware/auth");
const csrfProtection = require('csurf')({ cookie: true });

router.post("/login", csrfProtection, authController.login);

router.put("/update/:userId", csrfProtection, isAuth, authController.update);


router.post("/signup", csrfProtection, authController.signup,);

// get one user for update
router.get("/getuser/:userId", isAuth, authController.getUser);
router.get("/all", authController.getallusers);
router.delete("/delete/:id", csrfProtection, authController.deleteuser);

module.exports = router;
