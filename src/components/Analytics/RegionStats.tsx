interface Region {
  name: string;
  activeNodes: number;
  percentage: number;
}

interface RegionStatsProps {
  regions: Region[];
}

const RegionStats = ({ regions }: RegionStatsProps) => {
  return (
    <div className="space-y-4">
      {regions.map((region, index) => (
        <div key={index} className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="h-3 w-3 rounded-full bg-green"></div>
            <span className="text-sm text-appBlack dark:text-white">
              {region.name}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <span className="text-sm font-medium text-appBlack dark:text-white">
              {region.activeNodes}
            </span>
            <span className="text-xs text-appBlack/60 dark:text-white/60">
              ({region.percentage}%)
            </span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RegionStats;
