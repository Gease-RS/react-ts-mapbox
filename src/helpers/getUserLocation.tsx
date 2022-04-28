export const getUserLocation = async(): Promise<[number, number]> => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        resolve([coords.longitude, coords.latitude]);
      },
      (err) => {
        alert('Não conseguimos obeter sua localização');
        console.log('object-err', err);
        reject(err);
      }
    );
  });
}