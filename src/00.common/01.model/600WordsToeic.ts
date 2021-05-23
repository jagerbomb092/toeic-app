export interface WordsToeic {
  KeyDoc: string;
  Title: string;
  Title_VN: string;
  OrderBy: number;
  ImgBanner: string;
  Content: ContentItem[];
}
export interface ContentItem {
  Id:number;
  Category: string;
  Example: string;
  Explain: string;
  ImgItem: string;
  LinkAudio: string;
  Spelling: string;
  Title: string;
  Translate: string;
}
