/**
 * Capitalize the first letter of a string
 * @param {String} string the string to process
 * @returns {String} the resulting string
 */
function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
/**
 * Generate a Unique identifier for the element component
 * @param {String} uuid the unique identifier for the component (hopefully)
 * @param {*} prefix a prefix to be added as part of the UUID
 * @returns {String} the resulting UUID for the element
 */
function getUUID(uuid, prefix = "d") {
    try {
        console.log("get UUID ", uuid, prefix);
        const r = Math.floor(Math.random() * 10000);
        return uuid === undefined || uuid === "" ? `${prefix}-${r}` : uuid;
    } catch(e) {
        return uuid;
    }
}

function getRandomInt(max) {
    return Math.floor(Math.random() * max);
}

export { capitalizeFirstLetter, getUUID, getRandomInt };
