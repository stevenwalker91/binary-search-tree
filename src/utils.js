const removeArrayDuplicates = (array) => {
  return array
    .filter((item, index) => array.indexOf(item) === index)
    .sort((a, b) => a - b);
};

const minValue = (root) => {
  let value = root.data;

  while (root.left != null) {
    value = root.left.data;
    root = root.left;
  }
  console.log(value);
  return value;
};

export { removeArrayDuplicates, minValue };
