"use client";

import { TransformedNodeData } from "@/types";
import {
  calculateRegionStats,
  getCountryName,
  getRegionFromCountry,
} from "@/utils/helpers";
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

// Transform database data to map format

// Props interface for WorldMap component
interface WorldMapProps {
  nodeData: TransformedNodeData[];
  useStaticData: boolean;
  loading: boolean;
  error: string | null;
  lastUpdate: Date;
}

// Interface for transformed node data

const WorldMap: React.FC<WorldMapProps> = ({
  nodeData,
  useStaticData,
  loading,
  error,
  lastUpdate,
}) => {
  // Map interaction state
  const [hoveredNode, setHoveredNode] = useState<number | null>(null);
  // Zoom state
  const [zoomLevel, setZoomLevel] = useState(1);
  const [center, setCenter] = useState<[number, number]>([0, 20]);

  // Transform data to map format

  // Calculate region statistics
  const regionStats = useMemo(() => {
    return calculateRegionStats(nodeData);
  }, [nodeData]);

  // Create random pulse animations
  useEffect(() => {
    if (nodeData.length === 0) return;

    const interval = setInterval(() => {
      const randomNodes = nodeData
        .sort(() => 0.5 - Math.random())
        .slice(0, Math.floor(Math.random() * 4) + 2)
        .map((node) => node.id);
    }, 3000);

    return () => clearInterval(interval);
  }, [nodeData]);

  // Calculate total nodes
  const totalNodes = useMemo(() => {
    return nodeData.reduce((sum, node) => sum + node.count, 0);
  }, [nodeData]);

  // Get node color based on region
  const getNodeColor = (node: TransformedNodeData) => {
    // Color mapping for regions - matching the region stats colors
    const regionColors: { [key: string]: string } = {
      "North America": "#1570EF",
      Europe: "#7F56D9",
      "Asia Pacific": "#079455",
      "South America": "#F79009",
      Africa: "#EF4444",
      "Middle East": "#06B6D4",
      Other: "#6B7280",
    };

    return regionColors[node.region] || "#6B7280";
  };

  // Get node size based on count and tier
  const getNodeSize = (node: TransformedNodeData) => {
    const baseSize = node.tier === "primary" ? 150 : 100;
    const sizeMultiplier = Math.min(node.count / 50, 1.5);
    return baseSize * sizeMultiplier;
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
                {/* {nodeData
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
                  })} */}

                {/* Render active nodes with enhanced animations */}
                {nodeData.map((node) => {
                  const isPulsing = node.status === "active";
                  const isHovered = hoveredNode === node.id;
                  const nodeColor = getNodeColor(node);
                  const nodeSize = getNodeSize(node);

                  return (
                    <Marker
                      key={node.id}
                      coordinates={node.coordinates}
                      onMouseEnter={() => setHoveredNode(node.id)}
                      onMouseLeave={() => setHoveredNode(null)}
                    >
                      {/* Outer pulse ring for high-load nodes */}
                      {/* {node.load > 80 && (
                        <circle
                          r={nodeSize + 8}
                          fill="none"
                          stroke={nodeColor}
                          strokeWidth={1}
                          opacity={0.4}
                          className="animate-ping hover:cursor-pointer"
                        />
                      )} */}

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
                        className={`bord transition-all duration-300 hover:scale-150 hover:cursor-pointer ${
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
                            className="capitalize"
                            fill="white"
                            textAnchor="middle"
                            fontWeight="bold"
                          >
                            {node.tier}
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
                {totalNodes ?? "..."}
              </div>
            </div>

            {/* Loading state */}
            {/* {loading && (
              <div className="mb-4 flex items-center justify-center">
                <div className="h-4 w-4 animate-spin rounded-full border-2 border-blue-500 border-t-transparent"></div>
                <span className="ml-2 text-sm text-gray-400">
                  Loading nodes...
                </span>
              </div>
            )} */}

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
                      <span className="text-sm font-medium text-dark-3 dark:text-white/[.48]">
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
                        className="relative h-full rounded-full transition-all duration-2000 ease-out"
                        style={{
                          width: `${region.percentage}%`,
                          backgroundColor: region.color,
                        }}
                      >
                        {/* Animated shine effect */}
                        {/* <div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-30"
                          style={{
                            animation: `shine 3s ease-in-out infinite`,
                            animationDelay: `${index * 0.5}s`,
                          }}
                        /> */}
                      </div>
                    </div>
                    <div className="mt-1 flex items-center justify-between">
                      <span className="text-xs text-[#475467] dark:text-white/[.48]">
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
