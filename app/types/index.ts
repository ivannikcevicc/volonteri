import { Application, Job, User } from "@prisma/client";

export type SafeApplication = Omit<Application, ""> & {
  Job: Job;
};
export type SafeUser = Omit<
  User,
  "createdAt" | "updatedAt" | "emailVerified"
> & {
  createdAt: string;
  updatedAt: string;
  emailVerified: string | null;
};

export interface LocationValue {
  cityName?: string | null;
  countryName?: string | null;
  flag?: string | null;
  lat?: string | null;
  lng?: string | null;
  // Other properties if applicable
}

export type SafeJob = {
  id: string;
  title: string;
  description: string;
  imageSrc: string;
  createdAt: Date;
  category: string;
  locationValue: LocationValue; // Use the specific interface here
  userId: string;
  peopleCount: number;
};
