const getWPM = (characterCount: number, minutes: number) => {
  return Math.floor((characterCount / 5) / minutes)
}

export default getWPM;