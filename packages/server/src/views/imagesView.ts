import Image from "../models/Image";

function renderOne(image: Image) {
  return {
    id: image.id,
    url: `http://192.168.100.5:3333/uploads/${image.path}`,
  }
}

export default {
  render(images: Image[] | Image) {
    return (images instanceof Array)
      ? images.map(renderOne)
      : renderOne(images);
  }
}