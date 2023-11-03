const { addhall, allHalls, updateHall, deleteHall, getonehall } = require('../Controllers/MovieHall');

const router = require('express').Router();
const csrfProtection = require('csurf')({ cookie: true });


router.post('/', csrfProtection, addhall)
router.get('/list', allHalls)
router.get('/getone/:id', getonehall)
router.put('/update/:id', csrfProtection, updateHall)
router.delete('/delete/:id', csrfProtection, deleteHall)


module.exports = router;