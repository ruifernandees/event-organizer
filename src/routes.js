import express, { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

const routes = express.Router();
const upload = multer(multerConfig).single('file');

routes.post('/file-post', upload, (req, res) => { 
  console.log(req.file);

  res.json({ message: "Hello World" }).status(200);
});

export default routes;