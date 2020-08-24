import path from 'path';
import fs from 'fs';
import organizeEvent from '../helpers/organizeEvent';

class EventsController {
  async store(request, response) {
    const { file } = request;

    const filePath = path.resolve(__dirname, '..', '..', 'tmp', 'uploads', file.filename);
    
    const array = organizeEvent(filePath);

    try {
      fs.unlinkSync(filePath);
    } catch (error) {
      console.log(error);
      response.status(400).json({ error: "Unexpected error" });
    }

    if (array === null) {
      response.status(400).json({ error: "Some line of the file have and invalid format" });
    } else {
      response.status(200).json({ file: array });
    }
  }
}

export default EventsController;