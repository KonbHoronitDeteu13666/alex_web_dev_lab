import type { Metadata } from "next";
import CategoryPage from "@/components/tiers/CategoryPage";
import { categoryOf } from "@/data/tiers";

const category = categoryOf("simple");

export const metadata: Metadata = {
  title: category.title,
  description: category.note,
};

export default function SimplePage() {
  return <CategoryPage categoryId="simple" />;
}
