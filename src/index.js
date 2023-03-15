import "./tailwind.css";

import { library } from "@fortawesome/fontawesome-svg-core";
import {
    faHome,
    faPlug,
    faMagnifyingGlass,
    faDatabase,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faTrash,
    faPlus,
    faMinus,
    faClone,
    faArrowsUpDown,
    faArrowsLeftRight,
    faCog,
    faXmark,
    faSquare,
    faEye,
    faPencil,
    faFolder,
    faEarListen,
    faBullhorn,
    faSquareCheck,
    faPhone,
    faSignal,
    faHammer,
    faSeedling,
    faTrophy,
    faRobot,
    faPuzzlePiece,
    faCode,
    faLeaf,
    faBaby,
    faBabyCarriage,
    faPalette,
    faComputer,
} from "@fortawesome/free-solid-svg-icons";
library.add(
    faHome,
    faPlug,
    faMagnifyingGlass,
    faDatabase,
    faArrowDown,
    faArrowLeft,
    faArrowRight,
    faArrowUp,
    faTrash,
    faPlus,
    faMinus,
    faClone,
    faArrowsUpDown,
    faArrowsLeftRight,
    faCog,
    faXmark,
    faSquare,
    faEye,
    faPencil,
    faFolder,
    faEarListen,
    faBullhorn,
    faSquareCheck,
    faPhone,
    faSignal,
    faHammer,
    faSeedling,
    faTrophy,
    faRobot,
    faPuzzlePiece,
    faCode,
    faLeaf,
    faBaby,
    faBabyCarriage,
    faDatabase,
    faEarListen,
    faSignal,
    faPalette,
    faComputer
);

export * from "./Api";
export * from "./Common";
export * from "./ComponentManager";
export * from "./Context";
export * from "./Dashboard";
export * from "./Layout";
export * from "./Menu";
export * from "./Models";
export * from "./Plugin";
export * from "./Utils";
export * from "./Widget";
export * from "./Workspace";
export * from "./window";

// mock for stories
export * from "./mock";
