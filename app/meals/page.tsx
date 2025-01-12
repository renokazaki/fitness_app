// import { MealLog } from "@/components/meal-log"

export default function MealsPage() {
  return (
    <div className="h-full w-full">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-white">
          食事ログ
        </h1>
        <div className="  rounded-lg shadow-lg p-6">{/* <MealLog /> */}</div>
      </main>
    </div>
  );
}
