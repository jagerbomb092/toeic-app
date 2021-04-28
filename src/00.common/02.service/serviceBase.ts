import { db } from "../../firebase.config";

export default class ServiceBase {
  public async getAll(nameCollection: string) {
    const response = db.collection(nameCollection);
    const data = await response.get();
    let allData = data.docs.map((item) => {
      return item.data();
    });
    return allData;
  }
}
