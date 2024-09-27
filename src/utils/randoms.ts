const generateRandomNumber = (min: number, max: number) => {
    return Math.random() * (max - min) + min
}
const generateRandomColor = () => {
    const randomColor = '#' + Math.floor(Math.random() * 16777215).toString(16);
    return randomColor;
  };
export {generateRandomNumber ,generateRandomColor};


