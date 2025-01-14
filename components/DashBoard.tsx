import React from "react";
import { WeightChart } from "./WeightChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  return (
    <div className=" space-y-12">
      <div className=" bg-sky-950 rounded-lg shadow-lg p-6">
        <WeightChart />
      </div>
      <div className="flex justify-center  gap-4">
        <Input
          type="text"
          placeholder="値段"
          className="w-auto border-sky-500"
        />
        <Button type="submit">吸った</Button>
      </div>
    </div>
  );
};

export default Dashboard;
