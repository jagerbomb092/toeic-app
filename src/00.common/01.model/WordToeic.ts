export interface WordToeic {
  Title: string;
  OrderBy: number;
  Id: string;
  Content: ContentItem[];
  ImgBanner: string;
}
export interface ContentItem {
  Title: string;
  Spelling: string;
  Translate: string;
  LinkAudio: string;
  ImgItem: string;
  Explain: string;
  Example: string;
  Category: string;
}
