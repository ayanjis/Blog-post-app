import path from "path";
import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, file, callBack) {
    callBack(null, "Backend/uploads/avatar_images");
  },
  filename: function (req, file, callBack) {
    let ext = path.extname(file.originalname);
    callBack(null, Date.now() + ext);
  },
});

const upload = multer({
  storage: storage,
  fileFilter: function (req, file, callBack) {
    if (file.mimetype == "image/png" || file.mimetype == "image/jpg") {
      callBack(null, true);
    } else {
      console.log("Only jpg & png file supported!");
      callBack(null, true);
    }
  },
  limits: {
    fileSize: 1024 * 1024 * 2, //2mb.
  },
});

export default upload;
