function getBreakPoint(key){
    const breakpoints = new Map([
        ["small", "25.75em"],
        ["medium", "46.5em"],
        ["large", "64em"],
    ])
    return breakpoints.get(key)
}

export default getBreakPoint