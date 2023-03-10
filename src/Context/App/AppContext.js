/**
 * AppContext
 * 
 * {
 *      seearchClient,
 *      api
 * }
 */
import { createContext } from "react";

export const AppContext = createContext({ debugMode: false });