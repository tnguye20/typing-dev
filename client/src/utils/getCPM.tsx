const getCPM = (characterCount: number, minutes: number) => {
  return Math.floor((characterCount) / minutes)
}

export default getCPM;