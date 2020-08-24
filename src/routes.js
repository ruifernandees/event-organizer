import express, { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import EventController from './controllers/EventController';

const routes = express.Router();
const upload = multer(multerConfig).single('file');

const eventController = new EventController();

routes.post('/event', upload, eventController.store);

export default routes;