/**
 * deepCopy
 * @param {object} obj the object to deep copy
 * @returns object
 */
export const deepCopy = (obj) => {
    try {
        return JSON.parse(JSON.stringify(obj));
    } catch(e) {
        return null;
    }
}

export const isObject = (objValue) => {
    return objValue && typeof objValue === 'object' && objValue.constructor === Object;
}
