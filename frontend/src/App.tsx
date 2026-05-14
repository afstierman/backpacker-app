import MapView from "./components/map/MapView";
import StarfieldBackground from "./components/StarfieldBackground";

function App() {
  return (
    <div className="relative w-screen h-screen">
      <StarfieldBackground />
      <MapView />
    </div>
  );
}

export default App;
