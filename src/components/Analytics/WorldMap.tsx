"use client";

import { getCountryName, getRegionFromCountry } from "@/utils/helpers";
import { getNodes } from "@/apis/api-v1";
import React, { useState, useEffect, useMemo } from "react";
import {
  ComposableMap,
  Geographies,
  Geography,
  Marker,
  Line,
} from "react-simple-maps";

// World map data - using a simple world map topology
const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Robust static test dataset for development and testing
const staticTestNodes: RawNodeData[] = [
  {
    _id: { $oid: "static_node_1" },
    agent_id: "skyops_node_gaming",
    hostname: "gaming",
    location: {
      ip: "197.210.53.160",
      city: "Lagos",
      region: "Lagos",
      country: "NG",
      loc: "6.4541,3.3947",
      org: "AS29465 MTN NIGERIA Communication limited",
      timezone: "Africa/Lagos",
      readme: "https://ipinfo.io/missingauth",
    },
    system_info: {
      hostname: "gaming",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "24.04",
      kernel_version: "6.11.0-1023-oem",
      architecture: "amd64",
      cpu_count: 16,
      boot_time: "2025-06-08T11:32:17+01:00",
      uptime: 30426,
    },
    wallet_address: "0x9DCbD7533397CCfc260c71F05E3152e34551902A",
    status: "online",
    created_at: { $date: "2025-06-08T18:59:27.466Z" },
    updated_at: { $date: "2025-06-08T18:59:48.144Z" },
    last_seen: { $date: "2025-06-08T18:59:48.144Z" },
    reputation_score: 85,
    total_jobs_completed: 247,
    cpu_count: 16,
    disk_free: 86,
    disk_total: 441,
    gpu_name: "NVIDIA GeForce RTX 3050 Laptop GPU",
    gpu_ram_free: 3.7,
    gpu_ram_total: 4,
    ram_free: 5.4,
    ram_total: 27.1,
  },
  {
    _id: { $oid: "static_node_2" },
    agent_id: "skyops_node_server_ny",
    hostname: "ny-compute-1",
    location: {
      ip: "173.252.88.67",
      city: "New York",
      region: "New York",
      country: "US",
      loc: "40.7128,-74.0060",
      org: "AS32934 Facebook Inc.",
      timezone: "America/New_York",
      readme: "",
    },
    system_info: {
      hostname: "ny-compute-1",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "22.04",
      kernel_version: "5.15.0-91-generic",
      architecture: "amd64",
      cpu_count: 32,
      boot_time: "2025-06-01T09:15:30-05:00",
      uptime: 691200,
    },
    wallet_address: "0x1A2B3C4D5E6F7890ABCDEF1234567890ABCDEF12",
    status: "online",
    created_at: { $date: "2025-06-01T14:15:30.000Z" },
    updated_at: { $date: "2025-06-08T19:30:15.123Z" },
    last_seen: { $date: "2025-06-08T19:30:15.123Z" },
    reputation_score: 92,
    total_jobs_completed: 1834,
    cpu_count: 32,
    disk_free: 1200,
    disk_total: 2048,
    gpu_name: "NVIDIA RTX 4090",
    gpu_ram_free: 20.5,
    gpu_ram_total: 24,
    ram_free: 48.2,
    ram_total: 128,
  },
  {
    _id: { $oid: "static_node_3" },
    agent_id: "skyops_node_london",
    hostname: "london-edge-1",
    location: {
      ip: "185.199.108.153",
      city: "London",
      region: "England",
      country: "GB",
      loc: "51.5074,-0.1278",
      org: "AS54113 Fastly",
      timezone: "Europe/London",
      readme: "",
    },
    system_info: {
      hostname: "london-edge-1",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "24.04",
      kernel_version: "6.8.0-35-generic",
      architecture: "amd64",
      cpu_count: 24,
      boot_time: "2025-06-05T14:22:45+00:00",
      uptime: 259200,
    },
    wallet_address: "0xFEDCBA0987654321FEDCBA0987654321FEDCBA09",
    status: "online",
    created_at: { $date: "2025-06-05T14:22:45.000Z" },
    updated_at: { $date: "2025-06-08T19:25:30.456Z" },
    last_seen: { $date: "2025-06-08T19:25:30.456Z" },
    reputation_score: 88,
    total_jobs_completed: 967,
    cpu_count: 24,
    disk_free: 780,
    disk_total: 1024,
    gpu_name: "NVIDIA RTX 3080",
    gpu_ram_free: 8.2,
    gpu_ram_total: 10,
    ram_free: 28.5,
    ram_total: 64,
  },
  {
    _id: { $oid: "static_node_4" },
    agent_id: "skyops_node_tokyo",
    hostname: "tokyo-compute-2",
    location: {
      ip: "202.12.27.33",
      city: "Tokyo",
      region: "Tokyo",
      country: "JP",
      loc: "35.6762,139.6503",
      org: "AS7506 GMO Internet",
      timezone: "Asia/Tokyo",
      readme: "",
    },
    system_info: {
      hostname: "tokyo-compute-2",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "23.10",
      kernel_version: "6.5.0-14-generic",
      architecture: "amd64",
      cpu_count: 16,
      boot_time: "2025-06-03T10:45:20+09:00",
      uptime: 432000,
    },
    wallet_address: "0x456789ABCDEF0123456789ABCDEF0123456789AB",
    status: "online",
    created_at: { $date: "2025-06-03T01:45:20.000Z" },
    updated_at: { $date: "2025-06-08T19:20:45.789Z" },
    last_seen: { $date: "2025-06-08T19:20:45.789Z" },
    reputation_score: 79,
    total_jobs_completed: 542,
    cpu_count: 16,
    disk_free: 450,
    disk_total: 512,
    gpu_name: "NVIDIA RTX 3070",
    gpu_ram_free: 6.8,
    gpu_ram_total: 8,
    ram_free: 18.3,
    ram_total: 32,
  },
  {
    _id: { $oid: "static_node_5" },
    agent_id: "skyops_node_sydney",
    hostname: "sydney-gpu-1",
    location: {
      ip: "103.28.54.191",
      city: "Sydney",
      region: "New South Wales",
      country: "AU",
      loc: "-33.8688,151.2093",
      org: "AS13335 Cloudflare",
      timezone: "Australia/Sydney",
      readme: "",
    },
    system_info: {
      hostname: "sydney-gpu-1",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "22.04",
      kernel_version: "5.15.0-89-generic",
      architecture: "amd64",
      cpu_count: 20,
      boot_time: "2025-06-04T16:30:15+11:00",
      uptime: 345600,
    },
    wallet_address: "0x789ABCDEF0123456789ABCDEF0123456789ABCDE",
    status: "online",
    created_at: { $date: "2025-06-04T05:30:15.000Z" },
    updated_at: { $date: "2025-06-08T19:15:22.234Z" },
    last_seen: { $date: "2025-06-08T19:15:22.234Z" },
    reputation_score: 91,
    total_jobs_completed: 723,
    cpu_count: 20,
    disk_free: 920,
    disk_total: 1024,
    gpu_name: "NVIDIA RTX A5000",
    gpu_ram_free: 22.1,
    gpu_ram_total: 24,
    ram_free: 42.7,
    ram_total: 64,
  },
  {
    _id: { $oid: "static_node_6" },
    agent_id: "skyops_node_singapore",
    hostname: "singapore-edge-3",
    location: {
      ip: "159.138.102.146",
      city: "Singapore",
      region: "Singapore",
      country: "SG",
      loc: "1.3521,103.8198",
      org: "AS4758 Axiata Digital Labs",
      timezone: "Asia/Singapore",
      readme: "",
    },
    system_info: {
      hostname: "singapore-edge-3",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "24.04",
      kernel_version: "6.8.0-31-generic",
      architecture: "amd64",
      cpu_count: 12,
      boot_time: "2025-06-06T11:20:40+08:00",
      uptime: 172800,
    },
    wallet_address: "0xABCDEF0123456789ABCDEF0123456789ABCDEF01",
    status: "online",
    created_at: { $date: "2025-06-06T03:20:40.000Z" },
    updated_at: { $date: "2025-06-08T19:10:55.567Z" },
    last_seen: { $date: "2025-06-08T19:10:55.567Z" },
    reputation_score: 76,
    total_jobs_completed: 389,
    cpu_count: 12,
    disk_free: 380,
    disk_total: 512,
    gpu_name: "NVIDIA GTX 1660 Ti",
    gpu_ram_free: 5.1,
    gpu_ram_total: 6,
    ram_free: 14.8,
    ram_total: 24,
  },
  {
    _id: { $oid: "static_node_7" },
    agent_id: "skyops_node_frankfurt",
    hostname: "frankfurt-compute-4",
    location: {
      ip: "46.4.84.139",
      city: "Frankfurt",
      region: "Hesse",
      country: "DE",
      loc: "50.1109,8.6821",
      org: "AS3320 Deutsche Telekom AG",
      timezone: "Europe/Berlin",
      readme: "",
    },
    system_info: {
      hostname: "frankfurt-compute-4",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "23.04",
      kernel_version: "6.2.0-20-generic",
      architecture: "amd64",
      cpu_count: 28,
      boot_time: "2025-06-02T08:15:10+02:00",
      uptime: 518400,
    },
    wallet_address: "0x234567890ABCDEF1234567890ABCDEF12345678",
    status: "online",
    created_at: { $date: "2025-06-02T06:15:10.000Z" },
    updated_at: { $date: "2025-06-08T19:05:30.890Z" },
    last_seen: { $date: "2025-06-08T19:05:30.890Z" },
    reputation_score: 94,
    total_jobs_completed: 1456,
    cpu_count: 28,
    disk_free: 1800,
    disk_total: 2048,
    gpu_name: "NVIDIA RTX 4080",
    gpu_ram_free: 14.2,
    gpu_ram_total: 16,
    ram_free: 78.9,
    ram_total: 96,
  },
  {
    _id: { $oid: "static_node_8" },
    agent_id: "skyops_node_sao_paulo",
    hostname: "saopaulo-server-1",
    location: {
      ip: "191.232.38.25",
      city: "São Paulo",
      region: "São Paulo",
      country: "BR",
      loc: "-23.5505,-46.6333",
      org: "AS7738 Telemar Norte Leste S.A.",
      timezone: "America/Sao_Paulo",
      readme: "",
    },
    system_info: {
      hostname: "saopaulo-server-1",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "22.04",
      kernel_version: "5.15.0-87-generic",
      architecture: "amd64",
      cpu_count: 8,
      boot_time: "2025-06-07T15:45:30-03:00",
      uptime: 86400,
    },
    wallet_address: "0x567890ABCDEF1234567890ABCDEF1234567890AB",
    status: "maintenance",
    created_at: { $date: "2025-06-07T18:45:30.000Z" },
    updated_at: { $date: "2025-06-08T19:00:15.123Z" },
    last_seen: { $date: "2025-06-08T18:45:30.123Z" },
    reputation_score: 68,
    total_jobs_completed: 156,
    cpu_count: 8,
    disk_free: 180,
    disk_total: 256,
    gpu_name: undefined,
    gpu_ram_free: 0,
    gpu_ram_total: 0,
    ram_free: 8.2,
    ram_total: 16,
  },
  {
    _id: { $oid: "static_node_9" },
    agent_id: "skyops_node_mumbai",
    hostname: "mumbai-edge-2",
    location: {
      ip: "103.21.244.14",
      city: "Mumbai",
      region: "Maharashtra",
      country: "IN",
      loc: "19.0760,72.8777",
      org: "AS13335 Cloudflare",
      timezone: "Asia/Kolkata",
      readme: "",
    },
    system_info: {
      hostname: "mumbai-edge-2",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "24.04",
      kernel_version: "6.8.0-28-generic",
      architecture: "amd64",
      cpu_count: 14,
      boot_time: "2025-06-05T20:30:45+05:30",
      uptime: 259200,
    },
    wallet_address: "0x890ABCDEF1234567890ABCDEF1234567890ABCDE",
    status: "online",
    created_at: { $date: "2025-06-05T15:00:45.000Z" },
    updated_at: { $date: "2025-06-08T18:55:42.456Z" },
    last_seen: { $date: "2025-06-08T18:55:42.456Z" },
    reputation_score: 83,
    total_jobs_completed: 634,
    cpu_count: 14,
    disk_free: 720,
    disk_total: 1024,
    gpu_name: "NVIDIA RTX 3060",
    gpu_ram_free: 10.3,
    gpu_ram_total: 12,
    ram_free: 22.4,
    ram_total: 32,
  },
  {
    _id: { $oid: "static_node_10" },
    agent_id: "skyops_node_toronto",
    hostname: "toronto-compute-5",
    location: {
      ip: "99.79.1.48",
      city: "Toronto",
      region: "Ontario",
      country: "CA",
      loc: "43.6532,-79.3832",
      org: "AS16509 Amazon.com Inc.",
      timezone: "America/Toronto",
      readme: "",
    },
    system_info: {
      hostname: "toronto-compute-5",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "22.04",
      kernel_version: "5.15.0-92-generic",
      architecture: "amd64",
      cpu_count: 36,
      boot_time: "2025-05-30T12:15:20-04:00",
      uptime: 777600,
    },
    wallet_address: "0xCDEF1234567890ABCDEF1234567890ABCDEF1234",
    status: "online",
    created_at: { $date: "2025-05-30T16:15:20.000Z" },
    updated_at: { $date: "2025-06-08T18:50:18.789Z" },
    last_seen: { $date: "2025-06-08T18:50:18.789Z" },
    reputation_score: 96,
    total_jobs_completed: 2134,
    cpu_count: 36,
    disk_free: 3200,
    disk_total: 4096,
    gpu_name: "NVIDIA RTX 4090",
    gpu_ram_free: 21.8,
    gpu_ram_total: 24,
    ram_free: 96.7,
    ram_total: 256,
  },
];

// Real node data from database - keeping original for reference
const originalStaticNode: RawNodeData[] = [
  {
    _id: {
      $oid: "6845dd8fec4506dacb1389c9",
    },
    agent_id: "skyops_node_gaming",
    hostname: "gaming",
    location: {
      ip: "197.210.53.160",
      city: "Lagos",
      region: "Lagos",
      country: "NG",
      loc: "6.4541,3.3947",
      org: "AS29465 MTN NIGERIA Communication limited",
      timezone: "Africa/Lagos",
      readme: "https://ipinfo.io/missingauth",
    },
    system_info: {
      hostname: "gaming",
      platform: "ubuntu",
      platform_family: "debian",
      platform_version: "24.04",
      kernel_version: "6.11.0-1023-oem",
      architecture: "amd64",
      cpu_count: 16,
      boot_time: "2025-06-08T11:32:17+01:00",
      uptime: 30426,
    },
    wallet_address: "0x9DCbD7533397CCfc260c71F05E3152e34551902A",
    status: "online",
    created_at: {
      $date: "2025-06-08T18:59:27.466Z",
    },
    updated_at: {
      $date: "2025-06-08T18:59:48.144Z",
    },
    last_seen: {
      $date: "2025-06-08T18:59:48.144Z",
    },
    reputation_score: 0,
    total_jobs_completed: 0,
    cpu_count: 16,
    disk_free: 86,
    disk_total: 441,
    gpu_name: "NVIDIA GeForce RTX 3050 Laptop GPU",
    gpu_ram_free: 3.7,
    gpu_ram_total: 4,
    ram_free: 5.4,
    ram_total: 27.1,
  },
  // Add more nodes here as they come from your database
  // Example:
  // {
  //   "_id": { "$oid": "another_node_id" },
  //   "agent_id": "skyops_node_server2",
  //   // ... rest of the node data
  // }
];

// Transform database data to map format
const transformNodeData = (data: RawNodeData[]): TransformedNodeData[] => {
  return data.map((node, index) => {
    const [lat, lng] = node.location.loc.split(",").map(Number);
    const coordinates: [number, number] = [lng, lat]; // Note: longitude first for map coordinates

    // Calculate load based on resource usage
    const ramUsage = ((node.ram_total - node.ram_free) / node.ram_total) * 100;
    const diskUsage =
      ((node.disk_total - node.disk_free) / node.disk_total) * 100;
    const gpuUsage =
      node.gpu_ram_total && node.gpu_ram_free
        ? ((node.gpu_ram_total - node.gpu_ram_free) / node.gpu_ram_total) * 100
        : 0;
    const averageLoad = Math.round(
      (ramUsage + diskUsage + gpuUsage) / (gpuUsage > 0 ? 3 : 2),
    );

    // Determine tier based on specs
    const hasGPU = !!node.gpu_name;
    const highCPU = node.cpu_count >= 16;
    const highRAM = node.ram_total >= 16;
    const tier = hasGPU && highCPU && highRAM ? "primary" : "secondary";

    return {
      id: index + 1,
      name: node.location.city,
      country: getCountryName(node.location.country),
      countryCode: node.location.country,
      coordinates,
      count: 1, // Single node per entry, could be aggregated if multiple nodes per city
      region: getRegionFromCountry(node.location.country),
      status: node.status === "online" ? "active" : "inactive",
      load: averageLoad,
      tier,
      // Additional node details
      agentId: node.agent_id,
      hostname: node.hostname,
      cpuCount: node.cpu_count,
      ramTotal: node.ram_total,
      ramFree: node.ram_free,
      diskTotal: node.disk_total,
      diskFree: node.disk_free,
      gpuName: node.gpu_name,
      gpuRamTotal: node.gpu_ram_total,
      gpuRamFree: node.gpu_ram_free,
      reputationScore: node.reputation_score,
      totalJobsCompleted: node.total_jobs_completed,
      uptime: node.system_info.uptime,
      lastSeen: new Date(node.last_seen.$date),
    };
  });
};

// Calculate region statistics dynamically from active nodes
const calculateRegionStats = (nodes: TransformedNodeData[]) => {
  const regionCounts: { [key: string]: number } = {};
  const totalNodes = nodes.length;

  // Count nodes per region
  nodes.forEach((node) => {
    regionCounts[node.region] = (regionCounts[node.region] || 0) + 1;
  });

  // Color mapping for regions
  const regionColors: { [key: string]: string } = {
    "North America": "#1570EF",
    Europe: "#7F56D9",
    "Asia Pacific": "#079455",
    "South America": "#F79009",
    Africa: "#EF4444",
    "Middle East": "#06B6D4",
    Other: "#6B7280",
  };

  // Convert to the expected format
  return Object.entries(regionCounts).map(([regionName, count]) => ({
    name: regionName,
    count,
    percentage: Math.round((count / totalNodes) * 100),
    color: regionColors[regionName] || "#6B7280",
    trend: "+0%", // Could be calculated from historical data
  }));
};

// Interface for the raw node data from database
interface RawNodeData {
  _id: { $oid: string };
  agent_id: string;
  hostname: string;
  location: {
    ip: string;
    city: string;
    region: string;
    country: string;
    loc: string;
    org: string;
    timezone: string;
    readme: string;
  };
  system_info: {
    hostname: string;
    platform: string;
    platform_family: string;
    platform_version: string;
    kernel_version: string;
    architecture: string;
    cpu_count: number;
    boot_time: string;
    uptime: number;
  };
  wallet_address: string;
  status: string;
  created_at: { $date: string };
  updated_at: { $date: string };
  last_seen: { $date: string };
  reputation_score: number;
  total_jobs_completed: number;
  cpu_count: number;
  disk_free: number;
  disk_total: number;
  gpu_name?: string;
  gpu_ram_free?: number;
  gpu_ram_total?: number;
  ram_free: number;
  ram_total: number;
}

// Interface for transformed node data
interface TransformedNodeData {
  id: number;
  name: string;
  country: string;
  countryCode: string;
  coordinates: [number, number];
  count: number;
  region: string;
  status: string;
  load: number;
  tier: string;
  agentId: string;
  hostname: string;
  cpuCount: number;
  ramTotal: number;
  ramFree: number;
  diskTotal: number;
  diskFree: number;
  gpuName?: string;
  gpuRamTotal?: number;
  gpuRamFree?: number;
  reputationScore: number;
  totalJobsCompleted: number;
  uptime: number;
  lastSeen: Date;
}

const WorldMap = () => {
  // State for data source toggle and node data
  const [useStaticData, setUseStaticData] = useState(true);
  const [nodeData, setNodeData] = useState<RawNodeData[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // Map interaction state
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  const [pulseNodes, setPulseNodes] = useState<number[]>([]);
  const [animationCycle, setAnimationCycle] = useState(0);

  // Zoom state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);

  // Fetch live data from API
  const fetchLiveData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getNodes();
      console.log(response, "resp   ");
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

  // Initialize data on component mount
  useEffect(() => {
    if (useStaticData) {
      setNodeData(staticTestNodes);
    } else {
      fetchLiveData();
    }
  }, [useStaticData]); // Added useStaticData as dependency

  // Auto-refresh live data every 30 seconds if using live data
  useEffect(() => {
    if (!useStaticData) {
      const interval = setInterval(() => {
        fetchLiveData();
      }, 30000); // 30 seconds

      return () => clearInterval(interval);
    }
  }, [useStaticData]);

  // Transform data to map format
  const activeNodes = useMemo(() => {
    return transformNodeData(nodeData);
  }, [nodeData]);

  // Calculate region statistics
  const regionStats = useMemo(() => {
    return calculateRegionStats(activeNodes);
  }, [activeNodes]);

  // Create random pulse animations
  useEffect(() => {
    if (activeNodes.length === 0) return;

    const interval = setInterval(() => {
      const randomNodes = activeNodes
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 2)
        .map((node) => node.id);
      setPulseNodes(randomNodes);
      setAnimationCycle((prev) => prev + 1);
    }, 3000);

    return () => clearInterval(interval);
  }, [activeNodes]);

  // Calculate total nodes
  const totalNodes = useMemo(() => {
    return activeNodes.reduce((sum, node) => sum + node.count, 0);
  }, [activeNodes]);

  // Get node color based on tier and load
  const getNodeColor = (node: TransformedNodeData) => {
    if (node.tier === "primary") {
      return node.load > 80 ? "#EF4444" : "#1570EF";
    }
    return node.load > 80 ? "#F59E0B" : "#10B981";
  };

  // Get node size based on count and tier
  const getNodeSize = (node: TransformedNodeData, isHovered: boolean) => {
    const baseSize = node.tier === "primary" ? 5 : 4;
    const sizeMultiplier = Math.min(node.count / 50, 1.5);
    return isHovered
      ? (baseSize + 2) * sizeMultiplier
      : baseSize * sizeMultiplier;
  };

  // Zoom handlers
  const handleZoomIn = () => {
    setZoomLevel((prev) => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = () => {
    setZoomLevel((prev) => Math.max(prev - 0.5, 0.5));
  };

  const handleZoomReset = () => {
    setZoomLevel(1);
    setCenter([0, 20]);
  };

  // Handle mouse wheel zoom
  const handleWheel = (event: React.WheelEvent) => {
    event.preventDefault();
    const delta = event.deltaY;
    if (delta > 0) {
      handleZoomOut();
    } else {
      handleZoomIn();
    }
  };

  return (
    <div className="relative">
      {/* Header with Data Source Toggle */}
      <div className="mb-4 flex flex-col items-center justify-between border-b pb-4 dark:border-[#2d2d2d] md:flex-row">
        <div className="mb-2 w-full lg:mb-0">
          <h3 className="text-lg font-semibold text-[#101828] dark:text-white">
            Active Nodes
          </h3>
          <p className="text-sm  text-[#475467] dark:text-white/[.48]">
            {totalNodes} active compute nodes across {activeNodes.length}{" "}
            locations
          </p>
        </div>
        {/* <div className="flex  items-center gap-2 border border-[#D0D5DD] px-4 py-2.5 shadow-[0px_1px_2px] shadow-[#1018280d]/5 dark:border-[#2d2d2d]">
            <div className="h-2 w-2 animate-pulse rounded-full bg-green-500" />
            <p className="text-sm font-semibold dark:text-white">Live Report</p>
          </div> */}
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
              {useStaticData ? "Static" : "Live"}
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
            <span className=" text-xs text-gray-400 lg:text-sm">
              {loading ? "Loading..." : error ? "Error" : "Live"}
            </span>
          </div>

          {/* Last update time */}
          <div className="text-xs text-gray-400 lg:text-sm">
            Updated {lastUpdate.toLocaleTimeString()}
          </div>
        </div>
      </div>

      {/* Error message */}
      {error && (
        <div className="mb-4 rounded-lg border border-red-500/50 bg-red-900/50 p-3">
          <p className="text-sm text-red-300">{error}</p>
        </div>
      )}

      <div className="flex h-[485px]">
        {/* Enhanced World Map */}
        <div className="hidden flex-1 lg:flex ">
          <div className="relative h-full overflow-hidden rounded-lg bg-gradient-to-br from-gray-900 via-slate-900 to-gray-800">
            {/* Zoom Controls */}
            <div className="absolute right-4 top-4 z-10 flex flex-col space-y-2">
              <button
                onClick={handleZoomIn}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800/90 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Zoom In"
              >
                +
              </button>
              <button
                onClick={handleZoomOut}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800/90 text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Zoom Out"
              >
                −
              </button>
              <button
                onClick={handleZoomReset}
                className="flex h-8 w-8 items-center justify-center rounded-md bg-gray-800/90 text-xs text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                title="Reset Zoom"
              >
                ⌂
              </button>
            </div>

            <div
              // onWheel={handleWheel}
              className="h-full w-full"
            >
              <ComposableMap
                projection="geoMercator"
                projectionConfig={{
                  scale: 140 * zoomLevel,
                  center: center,
                }}
                width={900}
                height={400}
                style={{ width: "100%", height: "100%" }}
              >
                <Geographies geography={geoUrl}>
                  {({ geographies }: any) =>
                    geographies.map((geo: any) => (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        fill="rgba(31, 41, 55, 0.6)"
                        stroke="rgba(55, 65, 81, 0.8)"
                        strokeWidth={0.3}
                        style={{
                          default: { outline: "none" },
                          hover: {
                            outline: "none",
                            fill: "rgba(31, 41, 55, 0.8)",
                            transition: "all 0.3s ease",
                          },
                          pressed: { outline: "none" },
                        }}
                      />
                    ))
                  }
                </Geographies>

                {/* Connection lines between major nodes */}
                {activeNodes
                  .filter((node) => node.tier === "primary")
                  .map((node, index, primaryNodes) => {
                    if (index === primaryNodes.length - 1) return null;
                    const nextNode = primaryNodes[index + 1];
                    return (
                      <Line
                        key={`${node.id}-${nextNode.id}`}
                        from={node.coordinates}
                        to={nextNode.coordinates}
                        stroke="rgba(21, 112, 239, 0.3)"
                        strokeWidth={1}
                        strokeDasharray="2,3"
                        opacity={0.6}
                      />
                    );
                  })}

                {/* Render active nodes with enhanced animations */}
                {activeNodes.map((node) => {
                  const isPulsing = pulseNodes.includes(node.id);
                  const isHovered = hoveredNode === node.id;
                  const nodeColor = getNodeColor(node);
                  const nodeSize = getNodeSize(node, isHovered);

                  return (
                    <Marker
                      key={node.id}
                      coordinates={node.coordinates}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Outer pulse ring for high-load nodes */}
                      {node.load > 80 && (
                        <circle
                          r={nodeSize + 8}
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth={1}
                          opacity={0.4}
                          className="animate-ping hover:cursor-pointer"
                        />
                      )}

                      {/* Main pulse ring */}
                      {isPulsing && (
                        <circle
                          r={nodeSize + 4}
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth={2}
                          opacity={0.7}
                          className="animate-ping hover:cursor-pointer"
                          style={{
                            animationDuration: "2s",
                            animationDelay: `${Math.random() * 1000}ms`,
                          }}
                        />
                      )}

                      {/* Inner glow ring */}
                      <circle
                        r={nodeSize + 2}
                        fill={nodeColor}
                        opacity={0.3}
                        className={isPulsing ? "animate-pulse" : ""}
                      />

                      {/* Main node */}
                      <circle
                        r={nodeSize}
                        fill={nodeColor}
                        className={`transition-all duration-300 hover:cursor-pointer ${
                          isPulsing ? "animate-pulse" : ""
                        }`}
                        style={{
                          filter: `drop-shadow(0 0 ${nodeSize * 2}px ${nodeColor})`,
                          cursor: "pointer",
                        }}
                      />

                      {/* Node center highlight */}
                      <circle
                        className="hover:cursor-pointer"
                        r={nodeSize * 0.4}
                        fill="white"
                        opacity={0.8}
                      />

                      {/* Enhanced Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={15}
                            y={-60}
                            width={200}
                            height={110}
                            fill="rgba(17, 24, 39, 0.95)"
                            rx={8}
                            stroke="rgba(75, 85, 99, 0.5)"
                            strokeWidth={1}
                            style={{
                              filter: "drop-shadow(0 4px 12px rgba(0,0,0,0.3))",
                            }}
                          />

                          {/* Location */}
                          <text
                            x={25}
                            y={-45}
                            fontSize={12}
                            fontWeight="bold"
                            fill="white"
                          >
                            {node.name}, {node.country}
                          </text>

                          {/* Agent ID */}
                          <text x={25} y={-32} fontSize={9} fill="#9CA3AF">
                            {node.agentId || `Agent ${node.id}`}
                          </text>

                          {/* Hostname */}
                          <text x={25} y={-20} fontSize={9} fill="#9CA3AF">
                            Host: {node.hostname || "N/A"}
                          </text>

                          {/* System specs */}
                          <text x={25} y={-8} fontSize={9} fill="#9CA3AF">
                            CPU: {node.cpuCount || "N/A"} cores | RAM:{" "}
                            {node.ramTotal ? `${node.ramTotal}GB` : "N/A"}
                          </text>

                          {/* GPU info */}
                          {node.gpuName && (
                            <text x={25} y={4} fontSize={9} fill="#9CA3AF">
                              GPU:{" "}
                              {node.gpuName.length > 25
                                ? node.gpuName.substring(0, 25) + "..."
                                : node.gpuName}
                            </text>
                          )}

                          {/* Reputation and jobs */}
                          <text x={25} y={16} fontSize={9} fill="#9CA3AF">
                            Reputation: {node.reputationScore} | Jobs:{" "}
                            {node.totalJobsCompleted}
                          </text>

                          {/* Load indicator */}
                          <text
                            x={25}
                            y={28}
                            fontSize={10}
                            fill={node.load > 80 ? "#EF4444" : "#10B981"}
                          >
                            Load: {node.load}% | Status: {node.status}
                          </text>

                          {/* Tier badge */}
                          <rect
                            x={25}
                            y={32}
                            width={node.tier === "primary" ? 45 : 55}
                            height={14}
                            fill={
                              node.tier === "primary" ? "#1570EF" : "#10B981"
                            }
                            rx={7}
                            opacity={0.8}
                          />
                          <text
                            x={node.tier === "primary" ? 47 : 52}
                            y={42}
                            fontSize={8}
                            fill="white"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            {node.tier.toUpperCase()}
                          </text>
                        </g>
                      )}
                    </Marker>
                  );
                })}
              </ComposableMap>
            </div>
          </div>
        </div>

        {/* Enhanced Statistics Panel */}
        <div className="w-80">
          <div className="lg:px-6">
            {/* Total counter */}
            <div className="mb-2 flex text-center">
              <div className="mb-2 animate-pulse text-4xl font-semibold text-white">
                {loading ? "..." : totalNodes}
              </div>
            </div>

            {/* Loading state */}
            {loading && (
              <div className="mb-4 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="ml-2 text-sm text-gray-400">
                  Loading nodes...
                </span>
              </div>
            )}

            {/* Regional breakdown */}
            <div className="space-y-5">
              {regionStats.map((region, index) => (
                <div key={index} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div
                        className="h-3 w-3 rounded-full"
                        style={{ backgroundColor: region.color }}
                      />
                      <span className="text-sm font-medium text-gray-200">
                        {region.name}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="text-sm font-bold text-white">
                        {region.count}
                      </span>
                      {/* <span className="text-xs font-medium text-green-400">
                        {region.trend}
                      </span> */}
                    </div>
                  </div>

                  <div className="relative">
                    <div className="h-3 overflow-hidden rounded-full bg-gray-700">
                      <div
                        className="duration-2000 relative h-full rounded-full transition-all ease-out"
                        style={{
                          width: `${region.percentage}%`,
                          backgroundColor: region.color,
                        }}
                      >
                        {/* Animated shine effect */}
                        <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          style={{
                            animation: `shine 3s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`,
                          }}
                        />
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-gray-400">
                        {region.percentage}% of network
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorldMap;
