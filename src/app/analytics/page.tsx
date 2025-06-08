"use client";

import SummaryCard from "@/components/Analytics/SummaryCard";
import WorldMap from "@/components/Analytics/WorldMap";
import RegionStats from "@/components/Analytics/RegionStats";
import JobsTable from "@/components/Analytics/JobsTable";

// Mock data for analytics
const analyticsData = {
  summary: {
    activeRentals: 1247,
    availableGPUs: 3568,
    averagePricePerHour: 0.35,
    totalGPUMemory: "45.2TB",
  },
  summaryCards: [
    {
      title: "Active Rentals",
      value: "156",
      icon: "/images/icon/rent.svg",
      trend: "+12%",
      from: "#0C4089",
      to: "#1570EF",
      bg: "#EFF8FF",
      bgDark: "#2F2F2F",
    },
    {
      title: "Available GPUs",
      value: "25",
      icon: "/images/icon/gpu.svg",
      trend: "+8%",
      to: "#7F56D9",
      from: "#432E73",
      bg: "#F4EBFF",
      bgDark: "#3D3C3E",
    },
    {
      title: "Avg Price/Hour",
      value: "$2.45",
      icon: "/images/icon/money.svg",
      trend: "-5%",
      from: "#022E1A",
      to: "#079455",
      bg: "#ECFDF3",
      bgDark: "#2A2A2A",
    },
    {
      title: "Total GPU Memory",
      value: "1.8TB",
      icon: "/images/icon/monitor.svg",
      trend: "+15%",
      from: "#4B3409",
      to: "#B17A15",
      bg: "#FFF7E8",
      bgDark: "#3E3E3E",
    },
  ],
  regions: [
    { name: "North America", activeNodes: 847, percentage: 42 },
    { name: "Europe", activeNodes: 623, percentage: 31 },
    { name: "Asia Pacific", activeNodes: 412, percentage: 20 },
    { name: "Others", activeNodes: 141, percentage: 7 },
  ],
  recentJobs: [
    {
      id: 1,
      wallet: "0x1a2b...8f9e",
      agent: "GPT-4 Training",
      cpu: "64 cores",
      disk: "2TB SSD",
      ram: "512GB",
      gpu: "8x H100",
      status: "running",
      duration: "2h 35m",
    },
    {
      id: 2,
      wallet: "0x3c4d...7a8b",
      agent: "LLaMA Fine-tune",
      cpu: "32 cores",
      disk: "1TB SSD",
      ram: "256GB",
      gpu: "4x A100",
      status: "completed",
      duration: "45m",
    },
    {
      id: 3,
      wallet: "0x5e6f...9c0d",
      agent: "Stable Diffusion",
      cpu: "16 cores",
      disk: "500GB SSD",
      ram: "128GB",
      gpu: "2x RTX 4090",
      status: "running",
      duration: "1h 22m",
    },
    {
      id: 4,
      wallet: "0x7g8h...1e2f",
      agent: "Data Processing",
      cpu: "48 cores",
      disk: "1.5TB SSD",
      ram: "384GB",
      gpu: "6x V100",
      status: "pending",
      duration: "-",
    },
    {
      id: 5,
      wallet: "0x9i0j...3g4h",
      agent: "Model Inference",
      cpu: "24 cores",
      disk: "750GB SSD",
      ram: "192GB",
      gpu: "3x RTX 3080",
      status: "running",
      duration: "58m",
    },
  ],
};

// Main Analytics Page Component
const AnalyticsPage = () => {
  return (
    <div className="flex w-full flex-col">
      {/* Page Header */}
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-dark-3 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack dark:text-white lg:text-[28px]">
          Analytics
        </h4>
      </div>

      {/* Main Content */}
      <div className="flex flex-col gap-10 p-5 lg:p-6">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {analyticsData.summaryCards.map((card, index) => (
            <SummaryCard
              key={index}
              title={card.title}
              value={card.value}
              icon={card.icon}
              trend={card.trend}
              from={card.from}
              to={card.to}
              bg={card.bg}
              bgDark={card.bgDark}
            />
          ))}
        </div>

        {/* World Map and Region Stats */}
        <div className="flex flex-col border border-[#EAECF0] bg-white p-6  shadow-[0px_1px_2px] shadow-[#1018280d]/5 dark:border-[#2d2d2d]  dark:bg-dark-2">
          {/* <div className="mb-4 flex items-center justify-between border-b pb-4 dark:border-[#2d2d2d]">
            <div>
              <h3 className="text-lg font-semibold text-[#101828] dark:text-white">
                Active Nodes
              </h3>
              <p className="text-sm  text-[#475467] dark:text-white">
                System resources handling compute tasks in real time.
              </p>
            </div>
            <div className="flex  items-center gap-2 border border-[#D0D5DD] px-4 py-2.5 shadow-[0px_1px_2px] shadow-[#1018280d]/5 dark:border-[#2d2d2d]">
              <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
              <p className="text-sm font-semibold dark:text-white">
                Live Report
              </p>
            </div>
          </div> */}
          <WorldMap />
        </div>

        {/* Recent Jobs Table */}
        <JobsTable jobs={analyticsData.recentJobs} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
