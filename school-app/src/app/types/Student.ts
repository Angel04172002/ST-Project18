import { Profile } from "./Profile"
//This type is used only for admin purposes

export interface Student extends Profile {
    grade : number,
    gradeDivision : string,
    // parentId : string
}
