const { allshows, createShow, specificshows, getoneshow, updateshow, updatecart, analytics, deleteshow, updateoneshow } = require('../Controllers/Show');

const router = require('express').Router();
const csrfProtection = require('csurf')({ cookie: true });


router.post('/', csrfProtection, createShow)
router.get("/all", allshows)
router.get("/all/:id", specificshows)
router.get('/getone/:id', getoneshow)
router.put('/update/:id', csrfProtection, updateshow)
router.put('/updateone/:id', csrfProtection, updateoneshow)
router.delete('/delete/:id', csrfProtection, deleteshow)
router.put('/updatecart', csrfProtection, updatecart)
router.get('/analytic', analytics)

module.exports = router;