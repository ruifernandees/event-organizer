import path from 'path';
import textToObject from '../helpers/textToObject';

class EventController {
  async store(request, response) {
    const { file } = request;

    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.filename);
    
    if (filePath) {
      const array = textToObject(filePath);
      // console.log(array);
      response.json({ file: array }).status(200);
    } else {
      response.status(500);
    }
  }
}

export default EventController;