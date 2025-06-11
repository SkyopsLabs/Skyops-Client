import { useState } from "react";

interface Job {
  id: number;
  wallet: string;
  agent: string;
  cpu: string;
  disk: string;
  ram: string;
  gpu: string;
  status: string;
  duration: string;
}

interface JobsTableProps {
  jobs: Job[];
}

const JobsTable = ({ jobs }: JobsTableProps) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(jobs.length / itemsPerPage);

  const getCurrentPageData = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return jobs.slice(startIndex, endIndex);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "running":
        return "text-green bg-green/10";
      case "completed":
        return "text-blue bg-blue/10";
      case "pending":
        return "text-orange-light bg-orange-light/10";
      default:
        return "text-appBlack/60 bg-gray-2";
    }
  };

  return (
    <div className="border border-border bg-white dark:border-dark-3 dark:bg-dark-2">
      {/* Table Header */}
      <div className="border-b border-border px-6 py-4 dark:border-dark-3">
        <h3 className="text-lg font-medium text-appBlack dark:text-white">
          Recent Jobs
        </h3>
      </div>

      {/* Table Content */}
      <div className="overflow-x-auto">
        <div className="min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-7 gap-4 bg-gray-1 px-6 py-3 text-sm font-medium text-appBlack/70 dark:bg-dark-3 dark:text-white/70">
            <div>Wallet</div>
            <div>Agent</div>
            <div>CPU</div>
            <div>Disk</div>
            <div>RAM</div>
            <div>GPU</div>
            <div>Status</div>
          </div>

          {/* Data Rows */}
          {getCurrentPageData().map((job) => (
            <div
              key={job.id}
              className="grid grid-cols-7 gap-4 border-b border-border px-6 py-4 text-sm dark:border-dark-3"
            >
              <div className="font-mono text-appBlack dark:text-white">
                {job.wallet}
              </div>
              <div className="text-appBlack dark:text-white">{job.agent}</div>
              <div className="text-appBlack/70 dark:text-white/70">
                {job.cpu}
              </div>
              <div className="text-appBlack/70 dark:text-white/70">
                {job.disk}
              </div>
              <div className="text-appBlack/70 dark:text-white/70">
                {job.ram}
              </div>
              <div className="text-appBlack/70 dark:text-white/70">
                {job.gpu}
              </div>
              <div>
                <span
                  className={`rounded px-2 py-1 text-xs font-medium ${getStatusColor(job.status)}`}
                >
                  {job.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-border px-6 py-4 dark:border-dark-3">
        <div className="text-sm text-appBlack/60 dark:text-white/60">
          Showing {(currentPage - 1) * itemsPerPage + 1} to{" "}
          {Math.min(currentPage * itemsPerPage, jobs.length)} of {jobs.length}{" "}
          jobs
        </div>
        <div className="flex items-center space-x-2">
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="rounded border border-border px-3 py-1 text-sm text-appBlack hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
          >
            Previous
          </button>
          <div className="flex items-center space-x-1">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => setCurrentPage(page)}
                className={`rounded px-3 py-1 text-sm ${
                  currentPage === page
                    ? "bg-prim2 text-white"
                    : "border border-border text-appBlack hover:bg-gray-1 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
                }`}
              >
                {page}
              </button>
            ))}
          </div>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="rounded border border-border px-3 py-1 text-sm text-appBlack hover:bg-gray-1 disabled:cursor-not-allowed disabled:opacity-50 dark:border-dark-3 dark:text-white dark:hover:bg-dark-3"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobsTable;
