export async function fetchAvailablePlaces() {
  const response = await fetch('http://localhost:3000/places');
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failrd to fetch places');
  };

  return resData.places;
};

export async function updateUserPlaces(places) {
  const response = await fetch('http://localhost:3000/places', {
    method: 'PUT',
    body: JSON.stringify({places}),
    headers: {
      'Content-Type': 'application/json'
    }
  });
  const resData = await response.json();

  if (!response.ok) {
    throw new Error('Failrd to update user data.');
  };

  return resData.message;
}