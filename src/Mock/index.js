import { themes, mockThemeContext } from "./theme";
import { mockApi } from "./api";

export * from "./mock";

const mock = {
    theme: {
        themeName: "theme-1",
        themes,
        rawThemes: themes,
        context: mockThemeContext,
    },
    api: mockApi,
};

export { mock };
