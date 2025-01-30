import multer from "multer";
import path from 'path';

const cur_dir = process.cwd()

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null,path.join(cur_dir, 'uploads'))// Directory where files will be saved
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`); // Rename the file
    },
});


export const uploadFile = multer({
    storage,
    limits: { fileSize: 10 * 1024 * 1024 }, // Limit file size to 10MB
    fileFilter: (req, file, cb) => {
      const allowedMimeTypes = ['image/jpeg', 'image/png', 'application/pdf']; // Allowed file types
      if (!allowedMimeTypes.includes(file.mimetype)) {
        return cb(new Error('Invalid file type, only JPEG, PNG, or PDF are allowed'));
      }
      cb(null, true);
    }
  });