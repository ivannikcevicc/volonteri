import prismadb from "../libs/prismadb";
import getCurrentUser from "./getCurrentUser";
import { LocationValue } from "@/app/types"; // Assuming LocationValue is defined in this file

export default async function getFavoriteJobs() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return [];
    }

    const favorites = await prismadb.job.findMany({
      where: {
        id: {
          in: [...(currentUser.favoriteIds || [])],
        },
      },
    });

    const safeFavorites = favorites.map((favorite) => ({
      ...favorite,
      createdAt: favorite.createdAt,
    }));

    return safeFavorites;
  } catch (err: any) {
    throw new Error(err);
  }
}
