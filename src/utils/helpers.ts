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
