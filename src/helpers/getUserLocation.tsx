export const getUserLocation = async(): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.latitude, coords.longitude]);
      },
      (err) => {
        alert('Não conseguimos obeter sua localização');
        console.log('object-err', err);
        reject(err);
      }
    );
  });
}