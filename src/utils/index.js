const API_URL = 'https://okrcentral.github.io/sample-okrs/db.json';

export const fetchData = async () => {
  const response = await fetch(API_URL);

  if (!response.ok) {
    const message = `An error has occured: ${response.status}`;
    throw new Error(message);
  }
  
  const list = await response.json();
  return list;
}

export const getColor = (index, level) => {
  return level === 0 ? '#99ccff' : (index % 2 === 0) ? '#D3D3D3' : '#FFFFFF';
}

export const capitalize = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1)
}