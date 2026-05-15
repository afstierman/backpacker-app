import { useEffect, useRef } from "react";
import maplibregl from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const MapView = () => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const map = useRef<maplibregl.Map | null>(null);

  useEffect(() => {
    if (!mapContainer.current || map.current) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: import.meta.env.VITE_MAP_STYLE_URL,
      center: [20, 20],
      zoom: 2,
    });

    // Add zoom/rotate controls
    map.current.addControl(new maplibregl.NavigationControl(), "top-right");
    map.current.addControl(new maplibregl.FullscreenControl(), "top-right");

    //Make into globe
    map.current.on("style.load", () => {
      map.current?.setProjection({ type: "globe" });
    });

    return () => {
      map.current?.remove();
      map.current = null;
    };
  }, []);

  return <div ref={mapContainer} className="w-full h-full" />;
};

export default MapView;
