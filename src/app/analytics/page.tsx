"use client";

import SummaryCard from "@/components/Analytics/SummaryCard";
import WorldMap from "@/components/Analytics/WorldMap";
import JobsTable from "@/components/Analytics/JobsTable";
import { getNodes } from "@/apis/api-v1";
import React, { useState, useEffect, useMemo } from "react";
import {
  getCountryName,
  getRegionFromCountry,
  staticTestNodes,
  transformNodeData,
} from "@/utils/helpers";
import { RawNodeData, TransformedNodeData } from "@/types";

// Static test data for development
// Robust static test dataset for development and testing

// Calculate summary cards data from node data
const calculateSummaryData = (
  nodeData: RawNodeData[],
  useStaticData: boolean,
) => {
  if (useStaticData) {
    // Return static mock data for demo
    return {
      activeRentals: 156,
      availableGPUs: 25,
      averagePricePerHour: 2.45,
      totalGPUMemory: "1.8TB",
    };
  }

  // Calculate real data from nodes
  const totalGPUs = nodeData.filter((node) => node.gpu_name).length;
  const totalGPUMemory = nodeData.reduce(
    (sum, node) => sum + (node.gpu_ram_total || 0),
    0,
  );

  return {
    activeRentals: 0,
    availableGPUs: totalGPUs,
    averagePricePerHour: 0, // This would come from your pricing API
    totalGPUMemory:
      totalGPUMemory >= 1000
        ? `${(totalGPUMemory / 1000).toFixed(1)}TB`
        : `${totalGPUMemory.toFixed(1)}GB`,
  };
};

// Main Analytics Page Component
const AnalyticsPage = () => {
  // State for data source toggle and node data
  const [useStaticData, setUseStaticData] = useState(!true);
  const [nodeData, setNodeData] = useState<RawNodeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Fetch live data from API
  const fetchLiveData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNodes();
      console.log(response, "resp");
      if (response && Array.isArray(response)) {
        setNodeData(response);
        setLastUpdate(new Date());
      } else {
        throw new Error("Invalid API response format");
      }
    } catch (err) {
      console.error("Failed to fetch live node data:", err);
      setError("Failed to fetch live data. Using static data instead.");
      setNodeData(staticTestNodes);
      setUseStaticData(true);
    } finally {
      setLoading(false);
    }
  };

  // Toggle data source
  const toggleDataSource = async () => {
    if (useStaticData) {
      // Switch to live data
      await fetchLiveData();
      setUseStaticData(false);
    } else {
      // Switch to static data
      setNodeData(staticTestNodes);
      setUseStaticData(true);
      setError(null);
      setLastUpdate(new Date());
    }
  };

  const transformedData = transformNodeData(nodeData);

  // Initialize data on component mount
  useEffect(() => {
    if (useStaticData) {
      setNodeData(staticTestNodes);
    } else {
      fetchLiveData();
    }
  }, [useStaticData]);

  // Auto-refresh live data every 30 seconds if using live data
  useEffect(() => {
    if (!useStaticData) {
      const interval = setInterval(() => {
        fetchLiveData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [useStaticData]);

  // Calculate summary data based on current data source
  const summaryData = useMemo(() => {
    return calculateSummaryData(nodeData, useStaticData);
  }, [nodeData, useStaticData]);

  // Update summary cards with calculated data
  const summaryCards = useMemo(
    () => [
      {
        title: "Active Rentals",
        value: summaryData.activeRentals.toString(),
        icon: "/images/icon/rent.svg",
        trend: "+12%",
        from: "#0C4089",
        to: "#1570EF",
        bg: "#EFF8FF",
        bgDark: "#2F2F2F",
      },
      {
        title: "Available GPUs",
        value: summaryData.availableGPUs.toString(),
        icon: "/images/icon/gpu.svg",
        trend: "+8%",
        to: "#7F56D9",
        from: "#432E73",
        bg: "#F4EBFF",
        bgDark: "#3D3C3E",
      },
      {
        title: "Avg Price/Hour",
        value: `$${summaryData.averagePricePerHour}`,
        icon: "/images/icon/money.svg",
        trend: "-5%",
        from: "#022E1A",
        to: "#079455",
        bg: "#ECFDF3",
        bgDark: "#2A2A2A",
      },
      {
        title: "Total GPU Memory",
        value: summaryData.totalGPUMemory,
        icon: "/images/icon/monitor.svg",
        trend: "+15%",
        from: "#4B3409",
        to: "#B17A15",
        bg: "#FFF7E8",
        bgDark: "#3E3E3E",
      },
    ],
    [summaryData],
  );

  // Static data for jobs table - you might want to make this dynamic too
  const analyticsData = {
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
        {/* Error message */}
        {error && (
          <div className="mb-4 rounded-lg border border-red-500/50 bg-red-900/50 p-3">
            <p className="text-sm text-red-300">{error}</p>
          </div>
        )}

        {/* Summary Cards */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {summaryCards.map((card, index) => (
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
        <div className="flex flex-col border border-[#EAECF0] bg-white p-6 shadow-[0px_1px_2px] shadow-[#1018280d]/5 dark:border-[#2d2d2d] dark:bg-dark-2">
          {/* Header with Node Info */}
          <div className="mb-4 flex flex-col items-center justify-between border-b pb-4 dark:border-[#2d2d2d] md:flex-row">
            <div className="mb-2 w-full lg:mb-0 lg:w-max">
              <h3 className="text-lg font-semibold text-[#101828] dark:text-white">
                Active Nodes
              </h3>
              <p className="text-sm text-[#475467] dark:text-white/[.48]">
                {
                  transformedData.filter((item) => item.status === "active")
                    .length
                }{" "}
                active compute nodes out of {transformedData.length} total
                nodes.
              </p>
            </div>
            <div className="flex items-center space-x-4">
              {/* Data Source Toggle */}
              <div className="flex items-center space-x-3">
                <span className="text-xs text-gray-400 lg:text-sm">
                  Data Source:
                </span>
                <button
                  onClick={toggleDataSource}
                  disabled={loading}
                  className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-900 ${
                    useStaticData ? "bg-gray-600" : "bg-blue-600"
                  } ${loading ? "cursor-not-allowed opacity-50" : "cursor-pointer"}`}
                >
                  <span
                    className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform duration-200 ease-in-out ${
                      useStaticData ? "translate-x-1" : "translate-x-6"
                    }`}
                  />
                </button>
                <span className="text-xs text-gray-300 lg:text-sm">
                  {useStaticData ? "Demo" : "Live"}
                </span>
              </div>

              {/* Status indicator */}
              <div className="flex items-center space-x-2">
                <div
                  className={`h-1 w-1 rounded-full lg:h-2 lg:w-2 ${
                    loading
                      ? "animate-pulse bg-yellow-500"
                      : error
                        ? "bg-red-500"
                        : "animate-pulse bg-green-500"
                  }`}
                ></div>
                <span className="text-xs text-gray-400 lg:text-sm">
                  {loading ? "Loading..." : error ? "Error" : "Live"}
                </span>
              </div>

              {/* Last update time */}
              <div className="text-xs text-gray-400 lg:text-sm">
                Updated {lastUpdate.toLocaleTimeString()}
              </div>
            </div>
          </div>
          <WorldMap
            nodeData={transformedData}
            useStaticData={useStaticData}
            loading={loading}
            error={error}
            lastUpdate={lastUpdate}
          />
        </div>

        {/* Recent Jobs Table */}
        <JobsTable jobs={useStaticData ? analyticsData.recentJobs : []} />
      </div>
    </div>
  );
};

export default AnalyticsPage;
