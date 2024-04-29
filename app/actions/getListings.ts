import prismadb from "../libs/prismadb";

export interface ListingProps {
  userId?: string;
}

export default async function getListings(params: ListingProps) {
  try {
    const { userId } = params;

    let query: any = {};

    if (userId) {
      query.userId = userId;
    }

    const listings = await prismadb.listing.findMany({
      where: query,
      orderBy: {
        createdAt: "desc",
      },
    });
    const safeListings = listings.map((listing) => ({
      ...listing,
      createdAt: listing.createdAt.toISOString(),
    }));

    return safeListings;
  } catch (err: any) {
    throw new Error(err);
  }
}
