const getACC = (characterCount: number, wrongCount: number) => {
    return (characterCount > 0)
    ? Math.round((characterCount - wrongCount) / characterCount * 100)
    : 100
}

export default getACC;