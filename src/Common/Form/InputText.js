/**
 * The package root exported two components named InputText (this one and
 * Common/Input's); the bundle only ever shipped Common/Input's. This path
 * now points at that one so there is a single InputText.
 */
export { InputText } from "../Input/InputText";
