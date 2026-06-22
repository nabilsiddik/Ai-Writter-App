export enum UserRole {
  SUPER_ADMIN = 'SUPER_ADMIN',
  ADMIN = "ADMIN",
  USER = "USER",
}

export enum UserStatus {
  ACTIVE = "ACTIVE",
  DELETED = "DELETED",
  BLOCKED = "BLOCKED",
}

export enum Gender {
  MALE = "MALE",
  FEMALE = "FEMALE",
  OTHERS = "OTHERS",
}

// export interface IUserInfo {
//   id: string;
//   name?: string;
//   firstName?: string;
//   lastName?: string;
//   email: string;
//   role: UserRole;
//   profileImage?: string;
// }

export interface IUserInfo {
  id: string;
  fullName: string,
  email: string;
  role: UserRole;
  isEmailVerified: boolean,
  profilePhoto?: string;
}

export interface IUser {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;

  bio?: string | null;
  profileImage?: string | null;
  currentLocation?: string | null;
  gender: Gender;

  travelPlansCount: string[];
  interests: string[];
  visitedCountries: string[];

  verifiedBadge: boolean;
  status: UserStatus;
  isDeleted: boolean;

  createdAt: string;
  updatedAt: string;
}

export interface IUpdateUserProfilePayload {
  name: string;
  bio?: string;
  currentLocation?: string;
  gender: "MALE" | "FEMALE" | "OTHER";
  interests?: string[];
  visitedCountries?: string[];
  profileImage?: File;
}
