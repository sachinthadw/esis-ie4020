const Category = require('../Models/Category')

exports.allcategory = (req, res) => {
    Category.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

exports.createCategory = (req, res) => {
    const category = new Category(req.body)
    category.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "category allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}