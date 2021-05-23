export interface TopMenu {
  Title: string;
  KeyDoc: string;
  Code: string;
  Color: string;
  Link: string;
  OrderBy: number;
  SubItem: {
    OrderBy: number;
    Title: string;
    Code: string;
  }[];
}
