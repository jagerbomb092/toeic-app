import _ from "lodash";
import { firestore } from "../../firebase.config";

export default class ServiceBase {
  public async getAll<T>(nameCollection: string) {
    const response = firestore.collection(nameCollection);
    const data = await response.get();
    let allData = data.docs.map((item) => {
      let result = item.data();
      _.set(result, "KeyDoc", item.id);
      return result;
    });
    return allData as T[];
  }

  public async save<T>(collection: string, docId: string, value: T) {
    if (docId !== "") {
   firestore.collection(collection).doc(docId).set(value);
    } else {
      firestore.collection(collection).add(value);
    }
  }

  public async update<T>(collection: string, docId: string, value: T) {
    firestore.collection(collection).doc(docId).update(value);
  }

  public async delete(collection: string, docId: string) {
    firestore.collection(collection).doc(docId).delete();
  }

  public async saveDocWithId(collection: string, idCustom: string, value: any) {
    firestore.collection(collection).doc(idCustom).set(value);
  }

  public async getItemByQuery<T>(
    colection: string,
    field: string,
    operator: any,
    value: string
  ) {
    let data = await (
      await firestore.collection(colection).where(field, operator, value).get()
    ).docs;
    let result: any[] = [];
    if (data && data.length > 0) {
      result = data.map((item) => {
        let resultItem = item.data();
        _.set(resultItem, "KeyDoc", item.id);
        return resultItem;
      });
    }
    return result as T[];
  }
}
