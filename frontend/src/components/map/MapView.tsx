import Map, { NavigationControl, FullscreenControl } from 'react-map-gl/mapbox';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

const MapView = () => {
  return (
    <div className="w-full h-full">
      <Map
        //Initial view set to US
        initialViewState={{
          longitude: -95,
          latitude: 40,
          zoom: 3
        }}
        mapStyle="mapbox://styles/mapbox/outdoors-v12" 
        mapboxAccessToken={MAPBOX_TOKEN}
        // This ensures the map fills its parent container
        style={{ width: '100%', height: '100%' }}
      >
        {/* Adds zoom/rotate buttons */}
        <NavigationControl position="top-right" />
        <FullscreenControl position="top-right" />
      </Map>
    </div>
  );
};

export default MapView;