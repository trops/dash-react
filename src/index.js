import "./tailwind.css";

// FontAwesome — bulk-register all solid + brand icons
import { library } from "@fortawesome/fontawesome-svg-core";
import * as SolidIcons from "@fortawesome/free-solid-svg-icons";
import * as BrandIcons from "@fortawesome/free-brands-svg-icons";

const solidIconList = Object.keys(SolidIcons)
    .filter((key) => key !== "fas" && key !== "prefix")
    .map((icon) => SolidIcons[icon]);
library.add(...solidIconList, BrandIcons.faAlgolia);

export * from "./Common";
export * from "./Common/Input";
export * from "./Layout";
export * from "./Context";
export * from "./Utils";
export * from "./Mock";
export * from "./window";

export { DragComponent, DropComponent } from "./Common/Draggable";

// Icons — re-export all solid icons and FontAwesomeIcon for consuming apps
export * from "@fortawesome/free-solid-svg-icons";
export { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

if (process.env.NODE_ENV !== "development") {
    console.log = () => {};
}
