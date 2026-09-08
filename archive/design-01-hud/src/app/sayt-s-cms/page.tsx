import type { Metadata } from "next";
import CategoryPage from "@/components/tiers/CategoryPage";
import { categoryOf } from "@/data/tiers";

const category = categoryOf("middle");

export const metadata: Metadata = {
  title: category.title,
  description: category.note,
};

export default function MiddlePage() {
  return <CategoryPage categoryId="middle" />;
}
