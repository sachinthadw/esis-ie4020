const Booking = require('../Models/Booking')
const Show = require('../Models/Show')
const handlebars = require('handlebars')
const fs = require('fs')
const path = require('path')


var nodemailer = require('nodemailer');
const User = require('../Models/User');
exports.createBooking = async (req, res) => {
    const { cart, uid } = req.body
    const user = await User.findById({ _id: uid })
    setdata(cart, user.email, user.name);
    sendSMS({ to: "0740849017" })

    for (var i = 0; i < cart.length; i++) {
        var book = new Booking();
        book.uid = uid;
        book.sid = cart[i].sid
        book.tickets = cart[i].tickets
        book.price = cart[i].show.price
        book.mid = cart[i].mov._id
        book.seats = cart[i].seatbook



        book.save((err, data) => {
            if (err) {
                return res.status(400).json({
                    error: "booking allready Exists"
                })
            }
            else {
                res.json({ data })
            }
        })
    }


}

exports.getbookings = (req, res) => {
    let mid = req.params.id;
    const book = Booking.find({ uid: mid }).populate("sid").populate("mid").then((sh) => {
        res.json(sh);
    }).catch((err) => {
        console.log(err);
        res.status(500).send({ status: "error in fetching", error: err.message });
    })

}

exports.delbookings = async (req, res) => {
    let mid = req.params.id;
    const booking = await Booking.findById(mid);

    const show = await Show.findById(booking.sid)
    var arr = show.seatbook
    for (var i = 0; i < booking.seats.length; i++) {
        arr = arr.filter(item => item !== booking.seats[i])

    }
    show.seatbook = arr;
    console.log(arr)
    show.save()

    const bo = await Booking.findByIdAndDelete(mid)


}

exports.getallbookings = async (req, res) => {
    try {

        const books = await Booking.find().populate("mid").populate({
            path: 'uid',
            model: 'User',
            select: '-password' // Exclude the "password" field
        });
        res.json(books)

    } catch (error) {
        res.status(400).json({
            error: String(err)

        })
    }
}

const setdata = (cart, email, name) => {

    for (var i = 0; i < cart.length; i++) {
        let item = {
            mname: cart[i].mov.name,
            mimage: cart[i].mov.image,
            seats: cart[i].seatbook,
            hall: cart[i].show.hid.name,
            date: cart[i].show.date,
            time: cart[i].show.time,
            price: cart[i].show.price

        }
        sendmail(item, email, name)
    }
}
const gettime = (id) => {
    if (id === 1) {
        return "10.00am - 1.00pm"
    }
    else if (id === 2) {
        return "1.00pm - 4.00pm"
    }
    else {
        return "4.00pm - 7.00pm"
    }
}

const sendmail = (ob, email, name) => {
    const filePath = path.join(__dirname, '../middleware/template.html');
    const source = fs.readFileSync(filePath, 'utf-8').toString();
    const template = handlebars.compile(source);
    const replacements = {
        uname: name,
        mname: ob.mname,
        hname: ob.hall,
        tic: ob.seats.length,
        date: ob.date,
        time: gettime(ob.time),
        Total: (ob.seats.length * ob.price)

    };
    const htmlToSend = template(replacements);




    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'moviemastersrilanka@gmail.com',
            pass: 'movie22@'
        }
    });

    var mailOptions = {
        from: 'moviemastersrilanka@gmail.com',
        to: email,
        subject: 'Sending Email using Node.js',
        text: 'That was easy!',
        attachments: [{
            filename: ob.mimage,
            path: __dirname + '/../' + ob.mimage,
            cid: 'imagename'
        }],
        html: htmlToSend
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response);
        }
    });
}

const sendSMS = (smsObj) => {

    const accountSid = "AC765e6daabdbee2af8e1b7b07309a4b5d";
    const authToken = "b018f6ebf4cbad8f2f2fb6009ea5bfdf";
    const client = require("twilio")(accountSid, authToken);

    client.messages
        .create({
            body:
                "Dear Customer,Your payment is succesfully received... Your Booking ID is 1159075. Hope you enjoy this service.",
            from: "+13393090187",
            to: smsObj.to.replace("0", "+94")
        })
        .then(message =>
            console.log(message.sid + " Message has been successfully send")
        ).catch((err) => {
            console.log(err)
        });
}

