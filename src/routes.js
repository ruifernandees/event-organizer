import express, { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';
import EventsController from './controllers/EventsController';

const routes = express.Router();
const upload = multer(multerConfig).single('file');

const eventsController = new EventsController();

routes.post('/events', upload, eventsController.store);

export default routes;