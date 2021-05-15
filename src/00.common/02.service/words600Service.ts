import _ from "lodash";
import { firestore } from "../../firebase.config";
import { ContentItem } from "../01.model/WordToeic";
import ServiceBase from "./serviceBase";

class Words600Service extends ServiceBase {
  public async updateContent(
    collection: string,
    docId: string,
    ContentItem: ContentItem,
    IdItemUpdate?: number
  ) {
    let data = await (
      await firestore.collection(collection).doc(docId).get()
    ).data();
    if (data) {
      if (data.Content && (data.Content as any[]).length > 0) {
        if (IdItemUpdate) {
          //tim phần tử đã tôn tại và update nó
          data.Content = (data.Content as any[]).map((item) => {
            if (item.Id == IdItemUpdate) {
              item = {
                ...ContentItem,
                Id: IdItemUpdate,
              };
              return item;
            } else {
              return item;
            }
          });
        } else {
          (data.Content as any[]).push({
            ...ContentItem,
            Id: data.Content.length + 1,
          });
        }
      } else {
        data.Content = [ContentItem];
      }

      super.update(collection, docId, {
        Content: data.Content,
      });
    }
  }

  async deleteContentItem(
    collection: string,
    docId: string,
    IdContentItem: ContentItem
  ) {
    let data = await (
      await firestore.collection(collection).doc(docId).get()
    ).data();
    let newArrContent: any[] = [];
    (data!.Content as any[]).forEach((item) => {
      if (item.Id !== IdContentItem) {
        newArrContent.push(item);
      }
    });
    //sắp sếp lại mảng
    let sortArrContent = _.orderBy(newArrContent, "Id", "asc");
    // sắp sếp lại id
    sortArrContent = sortArrContent.map((item, index) => {
      return {
        ...item,
        Id: index + 1,
      };
    });

    super.update(collection, docId, {
      Content: sortArrContent,
    });
  }
}
export const words600Service = new Words600Service();
