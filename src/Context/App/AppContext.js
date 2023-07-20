/**
 * AppContext
 *
 * {
 *      seearchClient,
 *      api
 * }
 */
import { createContext } from "react";

export const AppContext = createContext({
    settings: { theme: null },
    debugMode: false,
});
