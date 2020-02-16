var express = require("express"),
  router = express.Router();

router.get("/img", (req, res) => {

    res.download("../hometask2/public/crop.jpg", "crop.jpg", (err) => {
        if (err) {
          res.send(err);
        }
        res.end();
    });
});

router.get("/pdf", (req, res) => {
    res.download("../hometask2/public/file.pdf", "file.pdf", (err) => {
        if (err) {
          res.send(err);
        }
        res.end();
    });
});
module.exports = router;
