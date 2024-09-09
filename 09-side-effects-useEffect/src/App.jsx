import { useRef, useState, useEffect, useCallback } from 'react';
import Places from './components/Places.jsx';
import { AVAILABLE_PLACES } from './data.js';
import Modal from './components/Modal.jsx';
import DeleteConfirmation from './components/DeleteConfirmation.jsx';
import logoImg from './assets/logo.png';
import { sortPlacesByDistance } from './loc.js';

const storedIds = JSON.parse(localStorage.getItem('selectPlaces')) || [];
const storedPlaces = storedIds.map(id => 
  AVAILABLE_PLACES.find((place) => place.id === id )
);

function App() {
  const selectedPlace = useRef();
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [acailablePlaces, setAcailablePlaces] = useState([]);
  const [pickedPlaces, setPickedPlaces] = useState(storedPlaces);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      const sortPlaces = sortPlacesByDistance(
        AVAILABLE_PLACES,
        position.coords.latitude,
        position.coords.longitude
      );

      setAcailablePlaces(sortPlaces);
    }); // 取得用戶位置
    // navigator 是一個全域對象，它提供了與瀏覽器相關的資訊和操作介面。在前端開發中，我們通常會使用 navigator 物件來獲取使用者瀏覽器的相關信息，例如瀏覽器的名稱、版本、語言設定、裝置類型、位置等等。    
  }, []);



  function handleStartRemovePlace(id) {
    setModalIsOpen(true);
    selectedPlace.current = id;
  };

  function handleStopRemovePlace() {
    setModalIsOpen(false);
  };

  function handleSelectPlace(id) {
    setPickedPlaces((prevPickedPlaces) => {
      if (prevPickedPlaces.some((place) => place.id === id)) {
        return prevPickedPlaces;
      }
      const place = AVAILABLE_PLACES.find((place) => place.id === id);
      return [place, ...prevPickedPlaces];
    });

    const storedIds = JSON.parse(localStorage.getItem('selectPlaces')) || [];
    if (storedIds.indexOf(id) === -1 ){
      localStorage.setItem('selectPlaces', JSON.stringify([id, ...storedIds]));
    }
  };

  const handleRemovePlace = useCallback(function handleRemovePlace() {
    setPickedPlaces((prevPickedPlaces) =>
      prevPickedPlaces.filter((place) => place.id !== selectedPlace.current)
    );
    setModalIsOpen(false);

    const storedIds = JSON.parse(localStorage.getItem('selectPlaces')) || [];
    localStorage.setItem('selectPlaces', JSON.stringify(
      storedIds.filter((id) => id !== selectedPlace.current)
    ));
  }, []);

  return (
    <>
      <Modal open={modalIsOpen} onClose={handleStopRemovePlace}>
        <DeleteConfirmation
          onCancel={handleStopRemovePlace}
          onConfirm={handleRemovePlace}
        />
      </Modal>

      <header>
        <img src={logoImg} alt="Stylized globe" />
        <h1>PlacePicker</h1>
        <p>
          Create your personal collection of places you would like to visit or
          you have visited.
        </p>
      </header>
      <main>
        <Places
          title="I'd like to visit ..."
          fallbackText={'Select the places you would like to visit below.'}
          places={pickedPlaces}
          onSelectPlace={handleStartRemovePlace}
        />
        <Places
          title="Available Places"
          places={acailablePlaces}
          fallbackText='Select places by distance...'
          onSelectPlace={handleSelectPlace}
        />
      </main>
    </>
  );
}

export default App;
