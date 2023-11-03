const Hall = require('../Models/MovieHall')
const Show = require('../Models/Show')


exports.addhall = (req, res) => {
    const hall = new Hall(req.body)

    let seats = []
    let alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

    for (var i = 0; i < hall.rows; i++) {
        for (var j = 0; j < hall.cols; j++) {
            let se = alphabet.charAt(i) + String(j + 1)
            seats.push(se)
        }
    }
    hall.seats = seats;
    hall.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "hall allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}

exports.allHalls = (req, res) => {
    Hall.find().exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: String(err)
            })
        }
        res.json(result)
    })
}

exports.updateHall = async (req, res) => {
    let mid = req.params.id;
    const { rate, name } = req.body;
    try {
        await Hall.findOneAndUpdate({ _id: mid }, { rate, name }).then(data => {
            res.send({ status: "hall updated" })
        }).catch(err => {

        })
    } catch (error) {
        res.status(500).send({ status: "error", error: "error in Updating data" });
    }
}


exports.deleteHall = async (req, res) => {
    let delid = req.params.id;
    try {
        await Hall.findByIdAndDelete(delid);
        await Show.deleteMany({ hid: delid })
        res.send("deleted")
    } catch (err) {
        res.status(500).send({ status: "error", error: "error in Deleting data" });
    }

}

exports.getonehall = (req, res) => {
    let mid = req.params.id;
    const movie = Hall.findById(mid).then((mov) => {
        res.json(mov);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error", error: "error in Fetching" });
    })

}