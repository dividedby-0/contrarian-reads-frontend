export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate?: Date;
  description?: string;
  coverImageUrl?: string;
  rating?: number;
}
