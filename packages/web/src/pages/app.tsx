import React, { useCallback, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiPlus, IoIosColorPalette } from 'react-icons/all';
import { Map, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';

import mapbox, { Theme as MapboxTheme, themesNames as themes } from '../utils/mapbox';

import mapMarker from '../assets/images/map-marker.svg';

import '../styles/pages/app.css';

const OrphanagesMap: React.FC = () => {
  // const openstreetmap = "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png";
  const [mapboxTheme, setMapboxTheme] = useState<MapboxTheme>();
  const ul = useRef<HTMLUListElement>(null);
  const themeButton = useRef<HTMLDivElement>(null);

  const hideThemes = useCallback(() => {
    if (ul.current && themeButton.current) {
      ul.current.style.display = 'none';
      themeButton.current.style.borderTopLeftRadius = '20px';
      themeButton.current.style.borderTopRightRadius = '20px';
    }
  }, []);

  const ThemeSelector = useCallback(() => {
    return (
      <div className="theme-container" onMouseLeave={hideThemes}>
        <ul ref={ul} className="theme-options">
          {themes.map(theme => (
            <li key={theme} onClick={() => {
              hideThemes();
              setMapboxTheme(theme);
            }}>
              {theme}
            </li>
          ))}
        </ul>
        <div ref={themeButton} className="theme-button" onMouseEnter={() => {
          if (ul.current && themeButton.current) {
            ul.current.style.display = 'block';
            themeButton.current.style.borderTopLeftRadius = '0px';
            themeButton.current.style.borderTopRightRadius = '0px';
          }
        }}>
          <IoIosColorPalette size={32} color="#fff" />
        </div>
      </div>
    );
  }, [hideThemes]);

  return (
    <div id="page-map">
      <aside>
        <header>
          <img src={mapMarker} alt="Happy"/>
          <h2>Escolha um orfanato no mapa</h2>
          <p>Muitas crianças estão esperando a sua visita :)</p>
        </header>
        <footer>
          <strong>Brodowski</strong>
          <span>São Paulo</span>
        </footer>
      </aside>
      <Map
        center={[-20.9985538,-47.655361]}
        zoom={15}
        style={{ width: '100%', height: '100%'}}
      >
        <TileLayer url={mapbox.url(mapboxTheme)}/>
      </Map>
      <ThemeSelector />
      <Link to="" className="create-orphanage">
        <FiPlus size={32} color="#fff" />
      </Link>
    </div>
  );
}

export default OrphanagesMap;