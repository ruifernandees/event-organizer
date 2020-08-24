class EventController {
  async store(request, response) {
    const { file } = request;

    response.json({ file }).status(200);
  }
}

export default EventController;