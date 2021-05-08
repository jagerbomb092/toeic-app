import { firestore } from "../../firebase.config";
import { ContentItem } from "../01.model/WordToeic";
import ServiceBase from "./serviceBase";

class Words600Service extends ServiceBase {
  public async updateContent(
    collection: string,
    docId: string,
    Content: ContentItem
  ) {
    let data = await (
      await firestore.collection(collection).doc(docId).get()
    ).data();
    if (data) {
      if (data.Content && (data.Content as any[]).length > 0) {
        (data.Content as any[]).push(Content);
      } else {
        data.Content = [Content];
      }

      super.update(collection, docId, {
        Content: data.Content,
      });
    }
  }
}
export const words600Service = new Words600Service();
