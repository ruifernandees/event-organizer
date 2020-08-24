import multer from 'multer';
import path from 'path';
import crypto from 'crypto';

const uploadPath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads');

export default {
  dest: uploadPath,
  storage: multer.diskStorage({
    destination: (req, file, callback) => {
      callback(null, uploadPath)
    },
    filename: (req, file, callback) => {
      crypto.randomBytes(16, (err, hash) => {
        if (err) callback(err);

        const fileName = `${hash.toString('hex')}-${file.originalname}`;

        callback(null, fileName);
      })
    }
  }),
  limits: {
    fileSize: 2 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const allowedMimes = [
      'text/plain'
    ];

    if (allowedMimes.includes(file.mimetype)) {
      callback(null, true);
    } else {
      callback(new Error('Invalid file type'));
    }
  }
};