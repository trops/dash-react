import { deepCopy } from "@dash/Utils";

export const SettingsModel = (settingsObject = {}) => {
    const obj = deepCopy(settingsObject);
    obj["debug"] = "debug" in obj ? obj["debug"] : false;

    return obj;
};
