// import axios from "axios";
// import { useRouter } from "next/navigation";
// import { useCallback, useMemo } from "react";
// import toast from "react-hot-toast";
// import { SafeUser } from "../types";
// import { useLoginModal } from "./useLoginModal";
// import { roundToNearestHours } from "date-fns/fp/roundToNearestHours";

// interface Props {
//   jobId: string;
//   currentUser?: SafeUser | null;
// }

// const useFavorite = ({ currentUser, jobId }: Props) => {
//   const router = useRouter();
//   const loginModal = useLoginModal();

//   const hasFavorited = useMemo(() => {
//     const list = currentUser?.favoriteIds || [];
//     return list.includes(jobId);
//   }, [currentUser, jobId]);

//   const toggleFavorite = useCallback(
//     async (e: React.MouseEvent<HTMLDivElement>) => {
//       e.stopPropagation();
//       if (!currentUser) return loginModal.onOpen();

//       try {
//         let request;
//         if (hasFavorited) {
//           request = () => axios.delete(`/api/favorites/${jobId}`);
//         } else {
//           request = () => axios.post(`/api/favorites/${jobId}`);
//         }

//         await request();
//         router.refresh();

//         toast.success("Favorited");
//       } catch (error) {
//         toast.error("Error Favoriting");
//       }
//     },
//     [currentUser, hasFavorited, jobId, loginModal, router]
//   );

//   return { hasFavorited, toggleFavorite };
// };

// export default useFavorite;

import { useCallback, useMemo, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { SafeUser } from "../types";
import { useLoginModal } from "./useLoginModal";

interface Props {
  jobId: string;
  currentUser?: SafeUser | null;
}

const useFavorite = ({ currentUser, jobId }: Props) => {
  const router = useRouter();
  const loginModal = useLoginModal();
  const [hasFavorited, setHasFavorited] = useState(() => {
    const list = currentUser?.favoriteIds || [];
    return list.includes(jobId);
  });

  const toggleFavorite = useCallback(
    async (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      if (!currentUser) return loginModal.onOpen();

      try {
        // Optimistically update the UI
        const updatedFavorites = hasFavorited
          ? currentUser.favoriteIds.filter((id) => id !== jobId)
          : [...currentUser.favoriteIds, jobId];

        // Update the currentUser's favoriteIds based on the action (add or remove)
        currentUser.favoriteIds = updatedFavorites;

        // Update the UI immediately
        setHasFavorited(!hasFavorited);

        // Make the request to the server
        if (hasFavorited) {
          await axios.delete(`/api/favorites/${jobId}`);
        } else {
          await axios.post(`/api/favorites/${jobId}`);
        }

        toast.success(
          hasFavorited ? "Removed from favorites" : "Added to favorites"
        );
      } catch (error) {
        // If the request fails, revert the UI back to the original state
        setHasFavorited(hasFavorited); // Reset to the previous state
        toast.error("Error favoriting");
      }
    },
    [currentUser, hasFavorited, jobId, loginModal]
  );

  return { hasFavorited, toggleFavorite };
};

export default useFavorite;
