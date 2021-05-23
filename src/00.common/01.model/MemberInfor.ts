export interface MemberInfor {
  KeyDoc?:string;
  Address?: string;
  Alias?: string;
  DateOfBirth?: { nanoseconds: string; seconds: string };
  Email?: string;
  LoginName: string;
  JobTitle?: string;
  PhoneNumber?: string;
  Sex?: "Male" | "Female";
  Uid: string;
  PhotoUrl?: string;
}
