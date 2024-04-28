import prismadb from "../libs/prismadb";

export default async function getListings() {
  try {
    const listings = await prismadb.listing.findMany({
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
