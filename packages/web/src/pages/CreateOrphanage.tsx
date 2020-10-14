import React, { ChangeEvent, FormEvent, useCallback, useState } from "react";
import { useHistory } from "react-router-dom";
import { Map, Marker, TileLayer } from 'react-leaflet';
import { LeafletMouseEvent } from 'leaflet';
import { FiPlus, FiX } from "react-icons/fi";

import happyMapIcon from '../utils/mapIcon';
import Sidebar from "../components/Sidebar";
import api from "../services/api";

import '../styles/pages/create-orphanage.css';

const CreateOrphanage: React.FC = () => {
  const history = useHistory();
  const [name, setName] = useState("");
  const [about, setAbout] = useState("");
  const [instructions, setInstructions] = useState("");
  const [opening_hours, setOpeningHours] = useState("");
  const [open_on_weekends, setOpenOnWeekends] = useState(false);
  const [images, setImages] = useState<File[]>([]);
  const [position, setPosition] = useState({latitude: 0, longitude: 0});

  const handleMapClick = useCallback(({ latlng }: LeafletMouseEvent) => {
    setPosition({
      latitude: latlng.lat,
      longitude: latlng.lng,
    });
  }, []);

  const handleSubmit = useCallback(async (event: FormEvent) => {
    event.preventDefault();
    const data = new FormData();
    data.append('name', name);
    data.append('about', about);
    data.append('instructions', instructions);
    data.append('latitude', String(position.latitude));
    data.append('longitude', String(position.longitude));
    data.append('open_on_weekends', String(open_on_weekends));
    data.append('opening_hours', opening_hours);
    images.forEach(image => data.append('images', image));

    await api.post('orphanages', data);
    alert('Cadastro realizado com sucesso!');
    history.push('/app');
  }, [about, history, images, instructions, name, open_on_weekends, opening_hours, position.latitude, position.longitude]);

  const handleSelectImages = useCallback((event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newImages = Array.from(event.target.files);
      setImages(old => [...old, ...newImages]);
    }
  }, []);

  const handleRemoveImage = useCallback((index: number) => {
    setImages(old => old.filter((img, i) => i !== index));
  }, []);

  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map 
              center={[-20.9985538,-47.655361]}
              style={{ width: '100%', height: 280 }}
              zoom={15}
              onClick={handleMapClick}
            >
              <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              />

              <Marker interactive={false} icon={happyMapIcon} position={[position.latitude, position.longitude]} />
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input
                id="name"
                value={name}
                onChange={event => setName(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="about">Sobre <span>Máximo de 300 caracteres</span></label>
              <textarea
                id="about"
                maxLength={300}
                value={about}
                onChange={event => setAbout(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="image-container">
                {images.map((image, index) => (
                  <div key={image.lastModified} className="image">
                    <img
                     
                      src={URL.createObjectURL(image)}
                      alt="imagem do orfanato"
                    />
                    <div className="remove" onClick={() => handleRemoveImage(index)}>
                      <FiX color="#FF669D" size={24} />
                    </div>
                  </div>
                ))}
                <label htmlFor="images" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>

              <input type="file" multiple onChange={handleSelectImages} id="images"/>
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea
                id="instructions"
                value={instructions}
                onChange={event => setInstructions(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input
                id="opening_hours"
                value={opening_hours}
                onChange={event => setOpeningHours(event.target.value)}
              />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? 'active' : ''}
                  onClick={() => setOpenOnWeekends(true)}
                >
                  Sim
                </button>
                <button
                  type="button"
                  className={open_on_weekends ? '' : 'active'}
                  onClick={() => setOpenOnWeekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

export default CreateOrphanage;
