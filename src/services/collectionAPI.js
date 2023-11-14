export const getCollection = async () => {
  try {
    const collectionAwnser = await fetch('http://localhost:3002/obras/obras');
    const data = await collectionAwnser.json();
    return data;
  } catch (error) {
    console.error('Error getting collection', error);
    return [];
  }
};
