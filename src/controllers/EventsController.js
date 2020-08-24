import path from 'path';
import textToObject from '../helpers/textToObject';

class EventsController {
  async store(request, response) {
    const { file } = request;

    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.filename);
    
    const array = textToObject(filePath);

    if (array === null) {
      response.status(400).json({ error: "Some line of the file have and invalid format" });
    } else {
      response.status(200).json({ file: array });
    }
  }
}

export default EventsController;