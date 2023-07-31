function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getUUID(uuid, prefix = "") {
    const r = Math.floor(Math.random() * 10000);
    return uuid === undefined ? `${prefix}-${r}` : uuid;
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export { capitalizeFirstLetter, getUUID, getRandomInt };
