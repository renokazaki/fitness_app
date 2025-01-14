"use client";
import { useEffect, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react"; // アイコンライブラリから矢印アイコンをインポート
// import { Card, CardContent } from "@/components/ui"; // UIコンポーネントのインポート（必要に応じて変更）

// 日付オブジェクトの型定義
interface DayObject {
  date: Date; // 実際の日付
  isCurrentMonth: boolean; // 現在の月に属しているかどうか
}

interface Activity {
  id: number;
  many: number;
  cost: number;
}

// メインのコンポーネント
export default function ActivitiesPage() {
  const [activities, setActivities] = useState<Activity[]>([]); // データを保存するstate
  // APIからデータを取得
  useEffect(() => {
    async function fetchActivities() {
      try {
        const response = await fetch("/api/data"); // APIエンドポイントを呼び出し
        const data = await response.json();
        setActivities(data); // データをstateに保存
      } catch (error) {
        console.error("データの取得中にエラーが発生しました:", error);
      }
    }

    fetchActivities();
  }, []);

  // 現在の月を保持する状態
  const [currentMonth, setCurrentMonth] = useState(new Date());
  // 選択された日付を保持する状態
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  // 曜日の配列（日本語）
  const weekDays = ["日", "月", "火", "水", "木", "金", "土"];

  // 健康データ（仮データ）
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const fitnessData: Record<string, any> = {
    "2025-01-01": { many: 5000, cost: 300 }, // 1月1日のデータ
    "2025-01-02": { many: 7000, cost: 500 }, // 1月2日のデータ
    "2025-02-03": { many: 7000, cost: 500 }, // 1月2日のデータ
  };

  // 指定された月の日付一覧を取得する関数
  const getDaysInMonth = (date: Date): DayObject[] => {
    const year = date.getFullYear(); // 年を取得
    const month = date.getMonth(); // 月を取得（0-indexed）
    const firstDay = new Date(year, month, 1); // 月初の日付
    const lastDay = new Date(year, month + 1, 0); // 月末の日付
    const daysInMonth: DayObject[] = [];

    // 月初の曜日に応じて前月の日付を追加
    for (let i = 0; i < firstDay.getDay(); i++) {
      daysInMonth.unshift({
        date: new Date(year, month, -i),
        isCurrentMonth: false,
      });
    }

    // 現在の月の日付を追加
    for (let i = 1; i <= lastDay.getDate(); i++) {
      daysInMonth.push({
        date: new Date(year, month, i),
        isCurrentMonth: true,
      });
    }

    // 日付リストの総数が42（6週間分）に満たない場合、翌月の日付を追加
    while (daysInMonth.length < 42) {
      const nextDate = new Date(
        year,
        month,
        daysInMonth.length - firstDay.getDay() + 1
      );
      daysInMonth.push({ date: nextDate, isCurrentMonth: false });
    }

    return daysInMonth;
  };

  // 選択された日付のデータを表示する関数
  const renderDateData = (date: Date | null) => {
    if (!date) return null;

    // 日付をISO形式に変換してデータを取得
    const dateString = date.toISOString().split("T")[0];
    const data = fitnessData[dateString];

    // データがない場合のメッセージ
    if (!data) {
      return (
        <div className="text-sky-300 text-center p-4">
          この日のデータはありません
        </div>
      );
    }

    // データがある場合の表示内容
    return (
      <div>
        {activities.map((item) => (
          <div key={item.id}>
            <div>{item.many}</div>
            <div>{item.cost}</div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      {/* 月を切り替えるボタンと現在の月を表示 */}
      <div className="flex items-center justify-between mb-4">
        {/* 前の月に切り替えるボタン */}
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1)
            )
          }
          className="text-sky-700 hover:text-sky-300"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        {/* 現在の月を表示 */}
        <h2 className="text-lg font-semibold text-sky-400">
          {currentMonth.getFullYear()}年 {currentMonth.getMonth() + 1}月
        </h2>
        {/* 次の月に切り替えるボタン */}
        <button
          onClick={() =>
            setCurrentMonth(
              new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1)
            )
          }
          className="text-sky-700 hover:text-sky-300"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* カレンダーの表示 */}
      <div className="grid grid-cols-7 gap-1">
        {/* 曜日のヘッダー */}
        {weekDays.map((day) => (
          <div key={day} className="text-center text-sky-400 font-medium p-2">
            {day}
          </div>
        ))}
        {/* 各日付のボタン */}
        {getDaysInMonth(currentMonth).map((dayObj, index) => (
          <button
            key={index}
            onClick={() => setSelectedDate(dayObj.date)}
            className={`p-2 text-center rounded hover:bg-sky-900/50 ${
              dayObj.isCurrentMonth ? "text-sky-700" : "text-sky-300"
            } ${
              selectedDate &&
              dayObj.date.toDateString() === selectedDate.toDateString()
                ? "bg-sky-900 text-sky-200"
                : ""
            }`}
          >
            {dayObj.date.getDate()}
            {/* 健康データがある日にはインジケータを表示 */}
            {fitnessData[dayObj.date.toISOString().split("T")[0]] && (
              <div className="w-1 h-1 bg-sky-400 rounded-full mx-auto mt-1"></div>
            )}
          </button>
        ))}
      </div>

      {/* 選択された日付の詳細データを表示 */}
      {selectedDate && (
        <div className="mt-4 border-t border-sky-900 pt-4">
          <h3 className="text-sky-400 font-semibold mb-3">
            {selectedDate.getFullYear()}年 {selectedDate.getMonth() + 1}月{" "}
            {selectedDate.getDate()}日
          </h3>
          {renderDateData(selectedDate)}
        </div>
      )}
    </div>
  );
}
