"use client";
import React, { useState } from "react";
import { WeightChart } from "./WeightChart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const Dashboard = () => {
  const [cost, setCost] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handlePost = async () => {
    setIsLoading(true);
    try {
      // リクエストの内容をログ出力
      const requestBody = {
        many: 1,
        cost: parseInt(cost),
        userId: "cm5xm3mun0001l703mv5vcax7",
      };
      console.log("Request body:", requestBody);

      const response = await fetch("/api/data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(requestBody),
      });

      // レスポンスの詳細をログ出力
      console.log("Response status:", response.status);
      console.log(
        "Response headers:",
        Object.fromEntries(response.headers.entries())
      );

      // レスポンスの生データを確認
      const rawResponse = await response.text();
      console.log("Raw response:", rawResponse);

      // レスポンスが空でない場合のみJSONパース
      if (rawResponse) {
        const result = JSON.parse(rawResponse);
        if (!response.ok) {
          throw new Error(result.error || "データの送信に失敗しました");
        }
        console.log("Parsed response:", result);
        setCost("");
        alert("データを送信しました");
      } else {
        throw new Error("空のレスポンスが返されました");
      }
    } catch (error) {
      console.error("Error details:", error);
      alert(error instanceof Error ? error.message : "エラーが発生しました");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-12">
      <div className="bg-sky-950 rounded-lg shadow-lg p-6">
        <WeightChart />
      </div>
      <div className="flex justify-center gap-4">
        <Input
          type="text"
          placeholder="値段"
          className="w-auto border-sky-500"
          value={cost}
          onChange={(e) => setCost(e.target.value)}
          disabled={isLoading}
        />
        <Button type="submit" onClick={handlePost} disabled={isLoading}>
          {isLoading ? "送信中..." : "吸った"}
        </Button>
      </div>
    </div>
  );
};

export default Dashboard;
