const { addMovie, allmovies, listbysearch, getone, allmoviesadmin, updatemovie, deletemovie } = require("../Controllers/Movie");
const multer = require('multer')
const router = require("express").Router();
const Movie = require('../Models/Movie')
const path = require("path");
const fs = require('fs')
const mongoose = require('mongoose')
const storage = multer.diskStorage({

    destination: function (req, file, cb) {
        cb(null, './uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, new Date().toISOString().replace(/:/g, '-') + file.originalname);
    }
});
const filefilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    } else {
        cb(null, false)
    }
};

const upload = multer({ storage: storage, fileFilter: filefilter });

router.route("/add").post(upload.single('studentImage'), (req, res) => {
    const name = req.body.name;
    const rate = req.body.rates;
    const description = req.body.description;
    const startDate = req.body.from;
    const endDate = req.body.to;
    let areas = req.body.arr
    areas = JSON.parse(areas)
    console.log(areas)
    const area = areas.map(s => mongoose.Types.ObjectId(s));
    // const hallid = mongoose.Types.ObjectId(req.body.hid)
    const image = req.file?.path;


    const newmovie = new Movie({
        name,
        rate,
        description,
        startDate,
        endDate,
        image,
        area,


    })

    newmovie.save().then(() => {
        res.json("student added");
    }).catch(function (err) {
        console.log(err);
    })
})


router.get('/list', allmovies)
router.get('/all', allmoviesadmin)
router.post('/by/search', listbysearch)
router.get('/getone/:id', getone)
router.put('/update/:id', updatemovie)
router.delete('/delete/:id', deletemovie)








module.exports = router;