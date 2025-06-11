import { RawNodeData, TransformedNodeData } from "@/types";

export const leaderboardPalette = [
  "#FF5733",
  "#FF6F40",
  "#FF874D",
  "#FF9F5A",
  "#FFB767",
  "#FFCF74",
  "#FFE781",
  "#FFFF8E",
  "#E8FF9B",
  "#D1FFA8",
  "#BAFFB5",
  "#A3FFC2",
  "#8CFFCF",
  "#75FFDC",
  "#5EFFE9",
  "#47FFF6",
  "#30FFFC",
  "#19F7FF",
  "#02EFFF",
  "#02D7FF",
  "#02BFFF",
  "#02A7FF",
  "#028FFF",
  "#0277FF",
  "#0260FF",
  "#0248FF",
  "#0230FF",
  "#141AFF",
  "#2E14FF",
  "#4814FF",
  "#6214FF",
  "#7C14FF",
  "#9614FF",
  "#B014FF",
  "#CA14FF",
  "#E414FF",
  "#FF14F7",
  "#FF14DD",
  "#FF14C3",
  "#FF14A9",
  "#FF148F",
  "#FF1475",
  "#FF145B",
  "#FF1441",
  "#FF1427",
  "#FF140D",
  "#FF2602",
  "#FF4002",
  "#FF5A02",
  "#FF7402",
];

export const getRandomColor = () => {
  return `#${Math.floor(Math.random() * 16777215)
    .toString(16)
    .padStart(6, "0")}`;
};

export const history = [
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "04.03.2025",
    type: "New user reward",
    points: "+50",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "04.03.2025",
    type: "New user reward",
    points: "+50",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "04.03.2025",
    type: "New user reward",
    points: "+50",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
  {
    date: "05.03.2025",
    type: "Chat with AI to earn",
    points: "+10",
  },
];

export const proseFormatting =
  "prose-h1:text-3xl  prose-h2:text-2xl  prose-blockquote:text-xs prose-blockquote:font-semibold prose-blockquote:italic prose-ol:list-decimal prose-ul:list-disc prose-li:ml-6 prose-li:my-2";

export const ABI = [
  {
    inputs: [],
    name: "ECDSAInvalidSignature",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "length",
        type: "uint256",
      },
    ],
    name: "ECDSAInvalidSignatureLength",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "bytes32",
        name: "s",
        type: "bytes32",
      },
    ],
    name: "ECDSAInvalidSignatureS",
    type: "error",
  },
  {
    inputs: [],
    name: "InvalidShortString",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "string",
        name: "str",
        type: "string",
      },
    ],
    name: "StringTooLong",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [],
    name: "EIP712DomainChanged",
    type: "event",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "points",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "server",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct XEXT.ExtensionClientData",
        name: "voucher",
        type: "tuple",
      },
    ],
    name: "claimRewards",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "transferOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "rate",
        type: "uint256",
      },
    ],
    name: "updateTokenPerPoint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_token",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "eip712Domain",
    outputs: [
      {
        internalType: "bytes1",
        name: "fields",
        type: "bytes1",
      },
      {
        internalType: "string",
        name: "name",
        type: "string",
      },
      {
        internalType: "string",
        name: "version",
        type: "string",
      },
      {
        internalType: "uint256",
        name: "chainId",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "verifyingContract",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "salt",
        type: "bytes32",
      },
      {
        internalType: "uint256[]",
        name: "extensions",
        type: "uint256[]",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            internalType: "address",
            name: "client",
            type: "address",
          },
          {
            internalType: "uint256",
            name: "points",
            type: "uint256",
          },
          {
            internalType: "address",
            name: "server",
            type: "address",
          },
          {
            internalType: "bytes",
            name: "signature",
            type: "bytes",
          },
        ],
        internalType: "struct XEXT.ExtensionClientData",
        name: "voucher",
        type: "tuple",
      },
    ],
    name: "hashVoucher",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "multiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "priceMultiplier",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "token",
    outputs: [
      {
        internalType: "contract IERC20",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "tokenPerPoint",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalClaimedPoints",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userClaimed",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    name: "userLastClaimedAt",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

// Utility function to safely parse timestamps and handle timezone issues
export const parseTimestampSafely = (timestamp: string): Date => {
  const date = new Date(timestamp);

  // If the timestamp doesn't include timezone info and seems to be in the past by exactly 1-2 hours,
  // it might be a timezone issue where the server is saving local time without timezone info
  if (
    !timestamp.includes("Z") &&
    !timestamp.includes("+") &&
    !timestamp.includes("-")
  ) {
    console.warn(`Timestamp ${timestamp} doesn't include timezone information`);
  }

  return date;
};

// Country code to region mapping
export const getRegionFromCountry = (countryCode: string): string => {
  const regionMap: { [key: string]: string } = {
    US: "North America",
    CA: "North America",
    MX: "North America",
    GB: "Europe",
    DE: "Europe",
    FR: "Europe",
    IT: "Europe",
    ES: "Europe",
    NL: "Europe",
    SE: "Europe",
    NO: "Europe",
    DK: "Europe",
    FI: "Europe",
    PL: "Europe",
    RU: "Europe",
    JP: "Asia Pacific",
    CN: "Asia Pacific",
    KR: "Asia Pacific",
    SG: "Asia Pacific",
    AU: "Asia Pacific",
    NZ: "Asia Pacific",
    IN: "Asia Pacific",
    TH: "Asia Pacific",
    VN: "Asia Pacific",
    ID: "Asia Pacific",
    MY: "Asia Pacific",
    PH: "Asia Pacific",
    BR: "South America",
    AR: "South America",
    CL: "South America",
    CO: "South America",
    PE: "South America",
    VE: "South America",
    UY: "South America",
    NG: "Africa",
    ZA: "Africa",
    EG: "Africa",
    KE: "Africa",
    MA: "Africa",
    GH: "Africa",
    TN: "Africa",
    AE: "Middle East",
    SA: "Middle East",
    IL: "Middle East",
    TR: "Middle East",
    IR: "Middle East",
  };
  return regionMap[countryCode] || "Other";
};

// Country code to country name mapping
export const getCountryName = (code: string): string => {
  const countries: { [key: string]: string } = {
    NG: "Nigeria",
    US: "United States",
    CA: "Canada",
    GB: "United Kingdom",
    DE: "Germany",
    FR: "France",
    JP: "Japan",
    CN: "China",
    IN: "India",
    BR: "Brazil",
    AU: "Australia",
    SG: "Singapore",
    KR: "South Korea",
    RU: "Russia",
    ZA: "South Africa",
    AE: "United Arab Emirates",
    // Add more as needed
  };
  return countries[code] || code;
};

export const staticTestNodes: RawNodeData[] = [
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
    created_at: "2025-06-08T18:59:27.466Z",
    updated_at: "2025-06-08T18:59:48.144Z",
    last_seen: "2025-06-08T18:59:48.144Z",
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
    created_at: "2025-06-01T14:15:30.000Z",
    updated_at: "2025-06-08T19:30:15.123Z",
    last_seen: "2025-06-08T19:30:15.123Z",
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
    created_at: "2025-06-05T14:22:45.000Z",
    updated_at: "2025-06-08T19:25:30.456Z",
    last_seen: "2025-06-08T19:25:30.456Z",
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
    created_at: "2025-06-03T01:45:20.000Z",
    updated_at: "2025-06-08T19:20:45.789Z",
    last_seen: "2025-06-08T19:20:45.789Z",
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
    created_at: "2025-06-04T05:30:15.000Z",
    updated_at: "2025-06-08T19:15:22.234Z",
    last_seen: "2025-06-08T19:15:22.234Z",
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
    created_at: "2025-06-06T03:20:40.000Z",
    updated_at: "2025-06-08T19:10:55.567Z",
    last_seen: "2025-06-08T19:10:55.567Z",
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
    created_at: "2025-06-02T06:15:10.000Z",
    updated_at: "2025-06-08T19:05:30.890Z",
    last_seen: "2025-06-08T19:05:30.890Z",
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
    created_at: "2025-06-07T18:45:30.000Z",
    updated_at: "2025-06-08T19:00:15.123Z",
    last_seen: "2025-06-08T18:45:30.123Z",
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
    created_at: "2025-06-05T15:00:45.000Z",
    updated_at: "2025-06-08T18:55:42.456Z",
    last_seen: "2025-06-08T18:55:42.456Z",
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
    created_at: "2025-05-30T16:15:20.000Z",
    updated_at: "2025-06-08T18:50:18.789Z",
    last_seen: "2025-06-08T18:50:18.789Z",
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

export const transformNodeData = (
  data: RawNodeData[],
): TransformedNodeData[] => {
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

    // Check if node is online based on last_seen (within 2 minutes)
    // Server sends UTC timestamps but without 'Z' suffix, so we need to handle this properly
    const lastSeenTimestamp = node.last_seen.endsWith("Z")
      ? node.last_seen
      : node.last_seen + "Z";
    const lastSeenTime = new Date(lastSeenTimestamp);
    const currentTimeUTC = new Date();

    // Use absolute difference for comparison
    const timeDiffInMinutes = Math.abs(
      (currentTimeUTC.getTime() - lastSeenTime.getTime()) / (1000 * 60),
    );

    const isOnline = timeDiffInMinutes <= 2;

    return {
      id: index + 1,
      name: node.location.city,
      country: getCountryName(node.location.country),
      countryCode: node.location.country,
      coordinates,
      count: 1, // Single node per entry, could be aggregated if multiple nodes per city
      region: getRegionFromCountry(node.location.country),
      status: isOnline ? "active" : "inactive",
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
      lastSeen: new Date(node.last_seen),
    };
  });
};

// Mock data for analytics
export const analyticsData = {
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

// Calculate region statistics dynamically from active nodes
export const calculateRegionStats = (nodes: TransformedNodeData[]) => {
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
