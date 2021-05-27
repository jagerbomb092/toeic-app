import _ from "lodash";
import { firestore } from "../../firebase.config";
import { ContentItem } from "../01.model/600WordsToeic";
import { MyNoteWord } from "../01.model/MyNoteWord";
import ServiceBase from "./serviceBase";

class MyNoteWordService extends ServiceBase {
  public async updateContent() {
    // super.update("MyNoteWord", docId, {
    //   Content: data.Content,
    // });
  }

  async deleteContentItem(docId: string, IdContentItem: ContentItem) {
    // super.update("MyNoteWord", docId, {
    //   Content: sortArrContent,
    // });
  }
}
export const myNoteWordService = new MyNoteWordService();
