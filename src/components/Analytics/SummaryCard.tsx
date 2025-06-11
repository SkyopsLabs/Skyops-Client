import Image from "next/image";

interface SummaryCardProps {
  title: string;
  value: string | number;
  icon: string;
  trend?: string;
  from?: string;
  to?: string;
  bg?: string;
  bgDark?: string;
}

const SummaryCard = ({
  title,
  value,
  icon,
  trend,
  from,
  to,
  bg,
  bgDark,
}: SummaryCardProps) => {
  const gradientStyle =
    from && to
      ? { backgroundImage: `linear-gradient(90deg, ${from} 0%, ${to} 100%)` }
      : {};

  return (
    <div className="border border-[#EAECF0] bg-white p-4 shadow-[0px_1px_2px] shadow-[#1018280d]/5 dark:border-[#01020C]  dark:bg-dark-2">
      <div className="mb-6 flex items-center justify-between">
        <div
          className="icon-bg flex h-10 w-10 items-center justify-center"
          style={
            {
              "--light-bg": bg,
              "--dark-bg": bgDark || bg,
            } as React.CSSProperties & {
              "--light-bg": string;
              "--dark-bg": string;
            }
          }
        >
          <Image src={icon} alt={title} width={24} height={24} />
        </div>
        {/* {trend && (
          <span className="rounded bg-green/10 px-2 py-1 text-xs font-medium text-green">
            {trend}
          </span>
        )} */}
      </div>
      <div className="rounded-sm p-4" style={gradientStyle}>
        <p className="font-archivo mb-1 text-sm font-medium  text-white">
          {title}
        </p>
        <h3 className="text-2xl font-semibold text-white">{value}</h3>
      </div>
    </div>
  );
};

export default SummaryCard;
