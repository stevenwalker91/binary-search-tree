const removeArrayDuplicates = (array) => {
  return array
    .filter((item, index) => array.indexOf(item) === index)
    .sort((a, b) => a - b);
};

export { removeArrayDuplicates };
