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
