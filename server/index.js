var express = require("express");
var router = express.Router();
const formidable = require("express-formidable");

const transform = require("./utils");

const cloudinary = require("cloudinary");
cloudinary.config({
    cloud_name: "dbl7whgry",
    api_key: "234917719617762",
    api_secret: "FBrkoNhWu1Xc3CkjxKtVPOIBcUI"
});

router.get("/", function(req, res, next) {
    res.send("Dzifa");
});

router.post("/upload", formidable(), (req, res) => {
    if (req.files.image) {
        cloudinary.v2.uploader.upload(req.files.image.path, (error, result) => {
            console.log(result, error);
            let { secure_url, public_id } = result;
            res.send({ secure_url, public_id });
        });
    } else {
        res.send("False");
    }
});

router.post("/transform", (req, res) => {
    const { public_id, command } = req.body;
    // console.log({ public_id, option });
    const url = transform(public_id, {command}, cloudinary);
    res.send({public_id, url});
});

module.exports = router;
