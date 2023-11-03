const { createBooking, getbookings, delbookings, getallbookings } = require('../Controllers/Booking');

const router = require('express').Router();
const csrfProtection = require('csurf')({ cookie: true });


router.post('/', csrfProtection, createBooking)
router.get('/getbooking/:id', getbookings)
router.delete('/:id', csrfProtection, delbookings)
router.get('/all', getallbookings)

module.exports = router;