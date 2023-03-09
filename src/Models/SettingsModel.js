import { deepCopy } from "@dash/Utils";

export const SettingsModel = (settingsObject = {}) => {
    const obj = deepCopy(settingsObject);
    return obj;
};