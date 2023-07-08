function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getUUID(uuid) {
    return uuid === undefined ? Math.floor(Math.random() * 10000) : uuid;
}
export { capitalizeFirstLetter, getUUID };
