import path from 'path';
import textToObject from '../helpers/TextToObject';

class EventController {
  async store(request, response) {
    const { file } = request;

    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.filename);
    
    if (filePath) {
      textToObject(filePath);
      response.json({ file }).status(200);
    } else {
      response.status(500);
    }
  }
}

export default EventController;