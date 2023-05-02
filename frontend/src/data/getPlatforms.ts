import {mockingMode} from "./mockingMode";
import {mockPlatforms} from "../../../mockdata/platforms";

export const retrievePlatforms = () => {

    if (mockingMode) {
        return mockPlatforms.data;
    } else {
        return mockPlatforms.data;
    }
}