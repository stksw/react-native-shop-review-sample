import { createContext } from "react";
import { Review } from "../types/review";

type ReviewContextValue = {
  reviews: Review[];
  setReviews: (review: Review[]) => void;
};

export const ReviewsContext = createContext<ReviewContextValue>({
  reviews: [],
  setReviews: (reviews = []) => {},
});
