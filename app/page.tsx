import Dashboard from "@/components/DashBoard";

export default function Home() {
  return (
    <div className="h-full w-full">
      <main className="container mx-auto p-4">
        <h1 className="text-3xl font-bold mb-6 text-center text-sky-500 ">
          Your Weight
        </h1>
        <div className="bg-sky-950 rounded-lg shadow-lg p-6 h-[calc(100vh-200px)]">
          <Dashboard />
        </div>
      </main>
    </div>
  );
}
