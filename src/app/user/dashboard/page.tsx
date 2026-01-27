"use client";

import { useAuth } from "@/context/AuthProvider";
import {
  IconBulb,
  IconFileText,
  IconQuestionMark,
  IconVideo,
} from "@tabler/icons-react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";

export default function Dashboard() {
  const { user } = useAuth();
  const data = [
    { name: "Mon", videos: 3, quizzes: 2 },
    { name: "Tue", videos: 5, quizzes: 3 },
    { name: "Wed", videos: 2, quizzes: 1 },
    { name: "Thu", videos: 7, quizzes: 4 },
    { name: "Fri", videos: 6, quizzes: 5 },
  ];

  const pieData = [
    { name: "Summaries", value: 45 },
    { name: "Highlights", value: 25 },
    { name: "Quizzes", value: 30 },
  ];

  const COLORS = ["#3b82f6", "#22c55e", "#f97316"];

  return (
    <div className="p-6 space-y-10">
      {/* Stats Row */}
      <div className="stats shadow w-full bg-base-300 border border-primary">
        <div className="stat">
          <div className="stat-figure text-primary">
            <IconVideo size={28} />
          </div>
          <div className="stat-title">Videos Processed</div>
          <div className="stat-value text-primary">120</div>
          <div className="stat-desc">↗︎ 12% from last week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <IconFileText size={28} />
          </div>
          <div className="stat-title">Summaries Generated</div>
          <div className="stat-value text-secondary">85</div>
          <div className="stat-desc">↗︎ 8% from last week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-accent">
            <IconBulb size={28} />
          </div>
          <div className="stat-title">Highlights Extracted</div>
          <div className="stat-value text-accent">230</div>
          <div className="stat-desc">↘︎ 5% from last week</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-warning">
            <div className="avatar avatar-online">
              <div className="w-16 rounded-full">
                <img src={user?.profileImage!} />
              </div>
            </div>
          </div>
          <div className="stat-value">60</div>
          <div className="stat-title">Quizzes Generated</div>
          <div className="stat-desc text-secondary">↗︎ 15% from last week</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Line Chart */}
        <div className="card shadow p-4 bg-base-300 border border-primary">
          <h2 className="font-semibold text-center uppercase mb-4">
            Weekly Activity
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="videos"
                stroke="#3b82f6"
                strokeWidth={2}
              />
              <Line
                type="monotone"
                dataKey="quizzes"
                stroke="#f59e0b"
                strokeWidth={2}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="card shadow p-4 border border-primary bg-base-300">
          <h2 className="font-semibold uppercase text-center mb-4">
            Content Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                outerRadius={120}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
