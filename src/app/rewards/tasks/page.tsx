"use client";
import Image from "next/image";
import { useAccount } from "wagmi";

const history = [
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

const tasks = [
  {
    image: "/images/icon/twitter.svg",
    points: "+10",
    label: "Connect X",
    desc: "Connect X to your Skyops to get points!",
  },
  {
    image: "/images/icon/telegram.svg",
    points: "+10",
    label: "Connect Telegram",
    desc: "Connect Telegram to your Skyops to get points!",
  },
  {
    image: "/images/icon/email.svg",
    points: "+10",
    label: "Connect Email",
    desc: "Connect your Email to  Skyops to get points!",
  },
  {
    image: "/images/icon/trade.svg",
    points: "+50",
    label: "First 100 USDT Voulme",
    desc: "Earn 50 points when your trading volume first reaches 100 USDT.",
  },
  {
    image: "/images/icon/twitter.svg",
    points: "+10",
    label: "Follow us on X",
    desc: "Follow us on X to earn 10 points",
  },
  {
    image: "/images/icon/telegram.svg",
    points: "+10",
    label: "Join us on Telegram",
    desc: "Send at least one message in Telegram per day",
  },
  {
    image: "/images/icon/discord.svg",
    points: "+10",
    label: "Join us on Discord",
    desc: "Send at least one message in Discord per day",
  },
  {
    image: "/images/icon/smile.svg",
    points: "+10",
    label: "Refer a friend",
    desc: "Refer a friend to get points",
  },
  {
    image: "/images/icon/twitter.svg",
    points: "+10",
    label: "Post your opinion",
    desc: "Post your opinion on X about Skyops",
    input: true,
    placeholder: "Enter a link",
  },
  {
    image: "/images/icon/twitter.svg",
    points: "+10",
    label: "Make a thread on X",
    desc: "-",
    input: true,
    placeholder: "Enter a link to your thread about us",
  },
];

const Tasks = () => {
  // --------------------------------------------VARIABLES
  const { address } = useAccount();

  //-----------------------------------------------------------FUNCTIONS

  //------------------------------------------------------------------USE EFFECTS

  return (
    <div className="w-full">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-dark-3 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          Rewards
        </h4>
      </div>
      <section className="flex w-full flex-col  gap-4  lg:flex-row lg:gap-3 lg:p-4">
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="w-full bg-white">
            <div className=" m-5 flex items-center gap-3 lg:m-6 lg:gap-3.5">
              <div className="h-12 w-12 rounded-full bg-[#F24924]" />
              <div>
                <p className="font-semibold text-black">Bound Point Account</p>
                <p className="text-black/[0.48]">
                  {address?.slice(0, 7)}...
                  {address?.slice(-6)}
                </p>
              </div>
            </div>
            <div className="m-5 flex h-[232px] flex-col bg-black  lg:m-2 lg:h-[336px]">
              <div className="flex h-1/2 border-b-[1px] border-white/10 px-4 ">
                <div className="w-1/2 border-r-[1px] border-white/10">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Total Points
                  </p>
                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    $0
                  </p>
                </div>
                <div className="w-1/2 px-4 ">
                  <p className="h-1/2 pt-4 text-sm font-medium text-white/[.49]">
                    Rank
                  </p>
                  <p className="flex h-1/2 items-end pb-4 text-[32px] font-medium leading-none text-white">
                    $0
                  </p>
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between  p-4 ">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-medium text-white/[.49]">
                    Mining Points
                  </p>
                  <p className="text-sm  text-white underline">What is this?</p>
                </div>
                <div className="flex items-center justify-between">
                  <p className="flex items-end  text-[32px] font-medium leading-none text-white">
                    $0
                  </p>
                  <button className="bg-prim2 px-8 py-2 font-medium text-white">
                    Claim
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="mt- w-full bg-white pb-8 pt-5 lg:mt-5 lg:pt-6">
            <h6 className="px-5 text-xl font-medium text-appBlack lg:px-6 lg:text-[22px]">
              History
            </h6>

            <div className="w-full ">
              <div className="grid h-[56px] grid-cols-[0.8fr,1fr,0.4fr] place-content-center border-b-[1px] border-border2 px-5 lg:h-[64px] lg:px-6">
                <p className="flex items-start text-sm text-appBlack/[0.48]">
                  Date
                </p>
                <p className="flex items-start text-sm text-appBlack/[0.48]">
                  Type
                </p>
                <p className="flex justify-end text-sm text-appBlack/[0.48]">
                  Points
                </p>
              </div>
              <div className="max-h-[60vh] overflow-y-scroll">
                {history.map((item, index) => (
                  <div
                    key={index.toString()}
                    className="grid h-[56px] grid-cols-[0.8fr,1fr,0.4fr] place-content-center border-b-[1px] border-border2 px-5 lg:h-[64px] lg:px-6"
                  >
                    <p className="flex items-start text-sm text-appBlack">
                      {item.date}
                    </p>
                    <p className="flex items-start text-sm text-appBlack">
                      {item.type}
                    </p>
                    <p className="flex justify-end text-sm text-[#097C4C]">
                      {item.points}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex w-full flex-col lg:w-[50%]">
          <div className="w-full bg-white p-5 lg:p-6">
            <h6 className="mb-4 text-xl font-medium text-appBlack lg:mb-6 lg:text-[22px]">
              Invite Friends
            </h6>
            <ul className="flex list-outside list-decimal flex-col gap-1 pl-3">
              <li className="text-sm text-appBlack/[.48]">
                You'll earn 50 points when your invited user reaches a total of
                100 USDT in transactions for the first time.
              </li>
              <li className="text-sm text-appBlack/[.48]">
                When you invite user B and user B uses Skyops for trading, you
                will receive 10% of the points that B earns.
              </li>
              <li className="text-sm text-appBlack/[.48]">
                When user B invites user C and user C uses Skyops for trading,
                user B will receive 10% of the points that C earns, and you will
                receive 5% of the points that C earns.
              </li>
            </ul>

            <div className="mb-4 mt-4 flex h-[60px] items-center justify-between border border-black/10  px-4.5 lg:mb-3 lg:mt-6">
              <p className="text-sm text-appBlack">
                https://Skyops.net/point?invite=QFJNFU
              </p>
              <Image
                src={"/images/icon/copy.svg"}
                width={20}
                height={20}
                alt="copy"
              />
            </div>
            <div className="flex h-[60px] items-center justify-between border border-black/10  px-4.5 ">
              <p className="text-sm text-appBlack">QFJNFU</p>
              <Image
                src={"/images/icon/copy.svg"}
                width={20}
                height={20}
                alt="copy"
              />
            </div>

            <h6 className="my-4 w-full text-center  text-black/[.28] lg:my-6">
              OR
            </h6>
            <div className="flex w-full items-center justify-center gap-1">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray">
                <Image
                  src={"/images/icon/telegram.svg"}
                  width={20}
                  height={20}
                  alt="tg"
                />
              </div>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray">
                <Image
                  src={"/images/icon/twitter.svg"}
                  width={18}
                  height={18}
                  alt="twitter"
                />
              </div>
            </div>
          </div>
          <div className="mt-4 flex w-full flex-1 flex-col items-center justify-center bg-white px-[50px] py-8 lg:mt-3 lg:px-[74px] lg:py-[99px] ">
            <Image
              width={212}
              height={198.12}
              src={"/images/clusters/empty-cluste.png"}
              alt="Logo"
              className="dark:hidden"
            />
            <div className=" mt-8 flex flex-col items-center gap-[6px]   lg:mt-[56px]">
              <h6 className=" text-[22px] font-semibold text-black lg:text-[28px]">
                Minning Rewards
              </h6>
              <p className="text-center text-base text-black/[.48]">
                Skyops will extract publicly available data from AI model
                training. As a reward, you&apos;ll receive mining points.
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="my-5 border-t-[1px] border-border p-5 lg:my-4 lg:p-0 lg:pt-6">
        <h5 className="mb-4 text-[22px] font-semibold text-appBlack lg:mb-6 lg:px-10">
          Special rewards tasks
        </h5>
        <div className="flex w-full flex-col gap-2 lg:grid lg:grid-cols-4 lg:gap-[11px] lg:px-4">
          {tasks.map((item, index) => (
            <div
              key={index.toString()}
              className={`flex h-[152px] w-full flex-col justify-between bg-white ${item.input && "h-[208px] lg:h-[252px]   "} ${item.label.includes("thread") && " lg:col-span-2"} p-5  lg:h-[224px] lg:p-6`}
            >
              <div className="flex items-center justify-between">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-appGray">
                  <Image
                    src={item.image}
                    width={20}
                    height={20}
                    alt={index.toString()}
                  />
                </div>
                <p className="text-[22px] font-semibold text-black">
                  {item.points}
                </p>
              </div>
              <div className="flex flex-col">
                <p className="text-lg font-medium text-black">{item.label}</p>
                <p className="text-sm text-black/[.48]">{item.desc}</p>
              </div>
              {item.input && (
                <div className="flex h-[40px] w-full items-center justify-between border-[1px] border-[#E6E6E6] px-[18px]">
                  <input
                    placeholder={item.placeholder}
                    className="h-full w-full focus:outline-none"
                  />
                  <Image
                    src={"/images/icon/send.svg"}
                    width={18}
                    height={18}
                    alt={index.toString()}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
export default Tasks;
