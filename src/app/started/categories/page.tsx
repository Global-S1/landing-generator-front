import { CategoryItem } from "@/components/initial/CategoryItem";
import { CATEGORIES } from "@/started/data/categories";

export default async function CategoriesPage() {

  return (
    <main className="w-full justify-center p-4">
      <h1 className="text-3xl">Categories</h1>
      <br />

      <section className="grid grid-cols-4 gap-4">
        {
            CATEGORIES.map( category => (
              <CategoryItem key={category.title} {...category}/>
            ))
        }
      </section>
    </main>
  );
}
