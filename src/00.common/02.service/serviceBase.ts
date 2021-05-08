import _ from "lodash";
import { firestore } from "../../firebase.config";

export default class ServiceBase {
  public async getAll(nameCollection: string) {
    const response = firestore.collection(nameCollection);
    const data = await response.get();
    let allData = data.docs.map((item) => {
      let result = item.data();
      _.set(result, "KeyDoc", item.id);
      return result;
    });
    return allData;
  }

  public async save<T>(collection: string, docId: string, value: T) {
    firestore.collection(collection).doc(docId).set(value);
  }

  public async update<T>(collection: string, docId: string, value: T) {
    firestore.collection(collection).doc(docId).update(value);
  }
  public async delete(collection: string, docId: string) {
    firestore.collection(collection).doc(docId).delete();
  }
  public async saveDocWithId(
    collection: string,
    idCustom: string,
    value: any
  ) {
    firestore.collection(collection).doc(idCustom).set(value);
  }
}
