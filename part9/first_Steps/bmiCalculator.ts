const calculateBmi = (height: number, weight: number) => {
  const formula =  weight / ((height / 100) ** 2);
  console.log(formula);
}

calculateBmi(180, 74);