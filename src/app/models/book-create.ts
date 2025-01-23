export interface BookCreate {
  title: string;
  author: string;
  addedBy: string;
  description?: string;
  coverImageUrl?: string;
}
