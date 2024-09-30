import { useEffect, useState } from "react";
import { axiosInstance } from "../../../helpers/helper";
import { CategoriesState } from "../../../components/atom/atoms";

export function useCategories() {
  const [categories, setCategories] = useState<CategoriesState[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosInstance.get(`/categories/me`);
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
      }
    }
    fetchCategories();
  }, []);

  return categories;
}