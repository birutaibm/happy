import Orphanage from "../models/Orphanage";
import imagesView from "./imagesView";

function renderOne(orphanage: Orphanage) {
  return {
    id: orphanage.id,
    name: orphanage.name,
    latitude: orphanage.latitude,
    longitude: orphanage.longitude,
    about: orphanage.about,
    instructions: orphanage.instructions,
    open_on_weekends: orphanage.open_on_weekends,
    opening_hours: orphanage.opening_hours,
    images: imagesView.render(orphanage.images),
  }
}

export default {
  render(orphanages: Orphanage[] | Orphanage) {
    return (orphanages instanceof Array)
      ? orphanages.map(renderOne)
      : renderOne(orphanages);
  }
}