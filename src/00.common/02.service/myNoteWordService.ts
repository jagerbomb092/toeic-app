import _ from "lodash";
import { firestore } from "../../firebase.config";
import { ContentItem } from "../01.model/600WordsToeic";
import ServiceBase from "./serviceBase";

class MyNoteWordService extends ServiceBase {
  public async updateContent(
    docId: string,
    ContentItem: ContentItem,
    IdItemUpdate?: number
  ) {
    let data = await (
      await firestore.collection("MyNoteWord").doc(docId).get()
    ).data();
    if (data) {
      if (data.Content && (data.Content as ContentItem[]).length > 0) {
        if (IdItemUpdate) {
          //tim phần tử đã tôn tại và update nó
          data.Content = (data.Content as ContentItem[]).map((item) => {
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
          (data.Content as ContentItem[]).push({
            ...ContentItem,
            Id: data.Content.length + 1,
          });
        }
      } else {
        data.Content = [ContentItem];
      }

      super.update("MyNoteWord", docId, {
        Content: data.Content,
      });
    }
  }

  async deleteContentItem(
    docId: string,
    IdContentItem: ContentItem
  ) {
    let data = await (
      await firestore.collection("MyNoteWord").doc(docId).get()
    ).data();
    let newArrContent: ContentItem[] = [];
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

    super.update("MyNoteWord", docId, {
      Content: sortArrContent,
    });
  }
}
export const myNoteWordService = new MyNoteWordService();
