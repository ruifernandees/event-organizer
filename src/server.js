import express from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const app = express();

app.use(express.json());

app.post('/file-post', multer(multerConfig).single('file'), (req, res) => { 
  console.log(req.file);

  res.json({ message: "Hello World" }).status(200);
});

app.listen(3333);