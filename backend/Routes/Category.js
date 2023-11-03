const { allcategory, createCategory } = require('../Controllers/Category');

const router = require('express').Router();
const csrfProtection = require('csurf')({ cookie: true });


router.get('/list', allcategory)
router.post("/create", csrfProtection, createCategory)

module.exports = router;