import {Suggestion} from "./suggestion";

export interface Book {
  id: string;
  title: string;
  author: string;
  description?: string;
  coverImageUrl?: string;
  suggestions: Suggestion[];
}
