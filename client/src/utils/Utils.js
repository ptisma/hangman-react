export const isLetter = (c) => {
  return c.toLowerCase() !== c.toUpperCase();
};

export const getAlphabet = () => {
  const alpha = Array.from(Array(26)).map((e, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));
  return alphabet;
};

export const findUnique = (str) => {
  // The variable that contains the unique values
  let uniq = "";

  for (let i = 0; i < str.length; i++) {
    // Checking if the uniq contains the character
    if (uniq.includes(str[i]) === false && isLetter(str[i])) {
      // If the character not present in uniq
      // Concatenate the character with uniq
      uniq += str[i];
    }
  }
  return uniq;
};
