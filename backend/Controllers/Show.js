const Show = require('../Models/Show')
const moment = require('moment')
const Movie = require('../Models/Movie')
const User = require('../Models/User')
const Hall = require('../Models/MovieHall')
const Booking = require('../Models/Booking')
const Category = require('../Models/Category')
exports.allshows = (req, res) => {
    Show.find().populate("mid").populate("hid").exec((err, result) => {
        if (err) {
            return res.status(400).json({
                error: "Error in retrieving Shows List"
            })
        }
        res.json(result)
    })
}

exports.createShow = (req, res) => {
    const show = new Show(req.body)

    show.save((err, data) => {
        if (err) {
            return res.status(400).json({
                error: "show allready Exists"
            })
        }
        else {
            res.json({ data })
        }
    })
}

exports.specificshows = (req, res) => {
    let mid = req.params.id;
    var resu = []
    const shows = Show.find({ mid: mid }).populate("hid").then((movs) => {
        for (var i = 0; i < movs.length; i++) {
            const d1 = moment(movs[i].date, "YYYY MM DD")
            var current = moment().startOf('day');
            var dif = moment.duration(d1.diff(current)).asDays()
            if (dif >= 0) {
                resu.push(movs[i])
            }

        }
        res.json(resu);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

exports.getoneshow = (req, res) => {
    let mid = req.params.id;
    const show = Show.findById(mid).populate("hid").populate("mid").then((sh) => {
        res.json(sh);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

exports.updateshow = (req, res) => {
    let showid = req.params.id;
    const { seatbook } = req.body;
    const updateshow = {
        seatbook
    }

    const update = Show.findByIdAndUpdate(showid, updateshow).then(() => {
        res.status(200).send({ status: "show updated" })
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in updating data", error: err.message });
    })
}

exports.updatecart = (req, res) => {
    const { cart } = req.body;

    for (var i = 0; i < cart.length; i++) {
        const update = Show.findByIdAndUpdate({ _id: cart[i].sid }, {
            $push: { seatbook: cart[i].seatbook }
        }).then(() => {
            res.status(200).send({ status: "show updated" })
        }).catch((err) => {
            console.log(err);
            res.status(500).send({ status: "error in updating data", error: err.message });
        })
    }

}

exports.analytics = async (req, res) => {
    const scount = await Show.count();
    const hcount = await Hall.count();
    const ucount = await User.count();
    const mcount = await Movie.count();
    const bcount = await Booking.count();
    const ccount = await Category.count();

    const analytic = {
        scount,
        hcount,
        ucount,
        mcount,
        bcount,
        ccount
    }

    res.status(200).send(analytic)

}

exports.deleteshow = async (req, res) => {
    let delid = req.params.id;
    try {
        await Show.findByIdAndDelete(delid);
        await Booking.deleteMany({ sid: delid })
    } catch (err) {
        res.status(500).send({ status: "error", error: "error in Deleting data" });
    }


}


exports.updateoneshow = async (req, res) => {
    let showid = req.params.id;
    const { date, time, price } = req.body;
    try {
        await Show.findOneAndUpdate({ _id: showid }, { date, time, price }).then(data => {
            res.send({ status: "show updated" })
        }).catch(err => {

        })




    } catch (error) {
        res.status(500).send({ status: "error", error: "error in Updating data" });
    }
}
