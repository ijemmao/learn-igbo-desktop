import numbers from './../assets/data/numbers.json'

const convertNumber = (number) => {
  if (number < 10) {
    return `${numbers.digits[number]}`
  }

  const numberString = `${number}`
  let finalNumber = ''

  for (let i = numberString.length - 1; i >= 0; i--) {
    const digit = numberString[i]
    const tens = numberString.length - i - 1

    if (i === 0) {
      // on first digit of number
      if (digit !== '1') {
        finalNumber = `${numbers.multiples[tens]}${numbers.digits[digit]} ${finalNumber}`
      } else {
        finalNumber = `${numbers.multiples[tens]}${finalNumber}`
      }
    } else {
      if (digit !== '0') {
        if (digit === '1' && i !== numberString.length - 1) {
          finalNumber = `${numbers.coor} ${numbers.multiples[tens]}${finalNumber}`
        } else {
          finalNumber = `${numbers.coor} ${numbers.multiples[tens]}${numbers.digits[digit]} ${finalNumber}`
        }
      }
    }
  }

  return finalNumber
}

export default convertNumber