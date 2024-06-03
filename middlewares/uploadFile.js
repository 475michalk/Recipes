const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.resolve(__dirname, '..', 'uploads'));
  },
  filename: function (req, file, cb) {
    const myName = Date.now() + '-' + file.originalname;
    cb(null, myName);
  }
});

function fileFilter(req, file, cb) {
  if (file.mimetype === 'image/png' || file.mimetype === 'image/jpeg') {
    cb(null, true);
  } else {
    console.log("Only jpeg, jpg, or png files are allowed");
    cb(null, false);
  }
}

const upload = multer({ storage, fileFilter });

module.exports = { upload };
