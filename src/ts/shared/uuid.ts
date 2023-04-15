import {v4} from "uuid";

export const getuuid: () => string = function() {
    return v4();
}