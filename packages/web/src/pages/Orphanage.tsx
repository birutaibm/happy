import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";

import happyMapIcon from '../utils/mapIcon';

import Sidebar from "../components/Sidebar";
import { useState } from "react";
import api from "../services/api";
import '../styles/pages/orphanage.css';

interface Orphanage {
  name: string,
  about: string,
  instructions: string,
  open_on_weekends: boolean,
  opening_hours: string,
  latitude: number,
  longitude: number,
  images: Array<{
    id: number,
    url: string,
  }>
}

interface RouteParams {
  id: string;
}

const Orphanage: React.FC = () => {
  const params = useParams<RouteParams>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [orphanage, setOrphanage] = useState<Orphanage>();

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then(({data}) => {
      setOrphanage(data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImageIndex].url} alt="Foto do orfanato" />

          <div className="images">
            {orphanage.images.map((image, index) => (
              <button
                key={image.id}
                className={activeImageIndex === index ? "active" : ''}
                type="button"
                onClick={() => setActiveImageIndex(index)}
              >
                <img src={image.url} alt="Foto do orfanato" />
              </button>
            ))}
          </div>
          
          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map 
                center={[orphanage.latitude, orphanage.longitude]} 
                zoom={16} 
                style={{ width: '100%', height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer 
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker interactive={false} icon={happyMapIcon} position={[orphanage.latitude, orphanage.longitude]} />
              </Map>

              <footer>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                  target="blank"
                  rel="noopener noreferrer"
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="dont open-on-weekends">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

export default Orphanage;