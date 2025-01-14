import Dashboard from "@/components/DashBoard";

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="container mx-auto my-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-500 ">
          Your Count
        </h1>
        <div>
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
