export const isbnFormat = () => {
  const chunk = () =>
    Math.floor(1000 + Math.random() * 9000);

  return `${chunk()}-${chunk()}-${chunk()}-${chunk()}`;
};