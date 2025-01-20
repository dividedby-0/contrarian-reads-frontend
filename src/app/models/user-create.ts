export interface UserCreate {
  username: string;
  email: string;
  profilePictureUrl?: string;
  createdAt?: Date;
  password: string;
  confirmPassword: string;
  bio?: string;
}
