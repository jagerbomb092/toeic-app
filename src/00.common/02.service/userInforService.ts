import firebase from "firebase";
import { MemberInfor } from "../01.model/MemberInfor";
import ServiceBase from "./serviceBase";

class UserInforService extends ServiceBase {
  async getCurrentUser() {
    let uid = firebase.auth().currentUser!.uid;
    let currentUser = await super.getItemByQuery<MemberInfor>("MemberDirectory","Uid", "==", uid);
    return currentUser[0];
  }
}
export const userInforService = new UserInforService();
