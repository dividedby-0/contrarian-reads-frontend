export interface UserRetrieve {
  id: string;
  username: string;
  email: string;
  profilePictureUrl?: string;
  createdAt?: Date;
  bio?: string;
}
