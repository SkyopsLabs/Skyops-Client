"use client";

import {
  generateAiText,
  getAiModels,
  getConversationsById,
} from "@/apis/api-v1";
import SelectComponent from "@/components/FormElements/SelectGroup/SelectComponent";
import SyntaxComponent from "@/components/SyntaxHighliter";
import { IChat, IModel } from "@/types";
import { form } from "@reown/appkit/networks";
import { AnimatePresence, motion } from "framer-motion";
import "highlight.js/styles/github-dark.css"; // Choose any highlight.js theme
import Image from "next/image";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/redux/hooks";
import toast from "react-hot-toast";

const initialState = {
  temperature: 0,
  // topP: 0,
  maxTokens: 0,
  // frequencyPenalty: 0,
  // presencePenalty: 0,
  // repetitionPenalty: 0,
};

const parameters = [
  { name: "temperature", label: "Temperature" },
  // { name: "topP", label: "Top P" },
  { name: "maxTokens", label: "Max Tokens" },
  // { name: "frequencyPenalty", label: "Frequency Penalty" },
  // { name: "presencePenalty", label: "Presence Penalty" },
  // { name: "repetitionPenalty", label: "Repetition Penalty" },
];

const AIExplorerTextPage = () => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;
  // Get iSKYOPS points from Redux
  const user = useAppSelector((state) => state.user.user);
  const points = user?.points ?? 0;
  const [formData, setFormData] = useState(initialState);
  const [models, setModels] = useState<IModel[]>([]);
  const [isSelectedModel, setSelectedModel] = useState<IModel | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [chats, setChats] = useState<IChat[]>([]);
  const [showSettings, setShowSettings] = useState<boolean>(
    isDesktop ? true : false,
  );

  const {
    temperature,
    // topP,
    maxTokens,
    // frequencyPenalty,
    // presencePenalty,
    // repetitionPenalty,
  } = formData;

  useEffect(() => {
    (async () => {
      console.log("fetching models and conversations...");
      const _ = await getAiModels();
      const data = await getConversationsById();
      console.log("models", _);
      console.log("data", data);
      setModels(_);
      setChats(data);
    })();
  }, []);
  console.log(formData, "formData");
  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    if (!isSelectedModel) {
      toast.error("Choose AI Model Service");
      return;
    }
    if (!prompt) {
      toast.error("Enter your sentence");
      return;
    }
    const loading = toast.loading("Loading");
    // Add a chat
    const chatObj: IChat = {
      sender: "user",
      message: prompt,
      tokens: 0,
      created_at: new Date().toISOString(),
    };
    if (chats?.length == 0) {
      // New Conversation
      const newChats: IChat[] = [];
      newChats.push(chatObj);
      setChats(newChats);
    } else {
      // Push to Old chats
      setChats((prevChats) => [...(prevChats || []), chatObj]);
    }
    const resp: any = await generateAiText(
      isSelectedModel._id,
      prompt,
      systemPrompt,
      temperature,
      maxTokens,
    );
    if (resp.error) {
      toast.error(resp.msg, { id: loading });
      return;
    }
    toast.dismiss(loading);
    console.log(resp, " response from API");
    setChats(resp.conversations);
    setPrompt(null);
  };

  let chatContent;
  if (chats && chats.length > 0) {
    chatContent = chats.map((chat, idx) => {
      if (chat.sender === "assistant") {
        return (
          <div className=" mb-4  flex items-start p-1" key={idx}>
            <Image
              className=" mx-1"
              src={
                chat.model?.includes("meta")
                  ? "/images/icon/meta.svg"
                  : "/images/icon/deepseek.png"
              }
              alt="Logo"
              width={25}
              height={20}
            />
            <div className=" no-scrollbar max-w-max px-2 text-sm font-medium dark:text-white/[.48]">
              <SyntaxComponent code={chat.message.replace(/\\n/g, "\n")} />
            </div>
          </div>
        );
      } else {
        return (
          <div className="mb-4 flex items-end justify-end p-1" key={idx}>
            <div className="relative mx-1 my-2 h-[20px] w-[25px]">
              <Image
                src={"/images/logos/logo-white.png"}
                alt="Logo"
                className="hidden object-contain dark:block"
                fill
              />
              <Image
                fill
                src={"/images/logos/logo-grey.png"}
                alt="Logo"
                className="object-contain dark:hidden"
              />
            </div>
            <div className="max-w-max rounded-lg bg-gray  p-2 text-sm font-medium">
              {chat.message}
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="mt-[64px] flex flex-1 flex-col lg:mt-0">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-white/10  lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack dark:text-white   lg:text-[28px]">
          Ai-Explorer/Text
        </h4>
        <div className="flex h-full w-[20%] items-center justify-center border-l border-border dark:border-dark-3 lg:hidden">
          <button onClick={() => setShowSettings(!showSettings)}>
            <svg
              width="24"
              height="24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M3 8h12m0 0a3 3 0 106 0 3 3 0 00-6 0zm-6 8h12M9 16a3 3 0 11-6 0 3 3 0 016 0z"
                stroke="currentColor"
                strokeOpacity="currentOpacity"
                strokeWidth="1.2"
                strokeLinecap="square"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* iSKYOPS Balance Section */}
      {/* <div className="mx-auto mb-2 mt-6 flex w-full max-w-xl items-center justify-between rounded-2xl bg-gradient-to-r from-[#23263B] to-[#2B2E4A] p-5 shadow-lg ring-1 ring-[#23263B]/40 dark:from-[#23263B] dark:to-[#181A20]">
        <div className="flex items-center gap-4">
          <div className="grid h-12 w-12 place-content-center rounded-full bg-[#23263B]">
            <Image
              src="/images/icon/icon-white.svg"
              alt="iSKYOPS"
              width={32}
              height={32}
            />
          </div>
          <div>
            <div className="text-lg font-semibold text-white">
              iSKYOPS for Chatting
            </div>
            <div className="text-xs text-[#A3A9BA]">
              Available for AI conversations
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-3xl font-bold text-white drop-shadow-lg">
            {points}
          </span>
          <span className="text-xs font-medium text-[#A3A9BA]">iSKYOPS</span>
        </div>
      </div> */}

      <div className=" flex  h-[calc(100vh-148px)] w-full  flex-col gap-3  sm:flex-row  lg:p-4">
        <AnimatePresence mode="sync">
          {/* Left section */}
          <div
            className="
            
                        
             
            hidden
            w-3/4
            flex-col
            bg-white p-5
            dark:bg-dark-2
            lg:flex
            lg:p-0
            lg:px-6
            lg:pb-2
            lg:pt-6
          "
          >
            <div className="  no-scrollbar  flex h-[95%] max-h-[95%]   w-full flex-col gap-2 overflow-y-scroll">
              {chatContent ? (
                chatContent
              ) : (
                <div className="flex items-center gap-4 ">
                  <div className="grid h-12 w-12 place-content-center rounded-full bg-appGray ">
                    <Image
                      src={"/images/logo/logo_tint.svg"}
                      alt="logo"
                      width={24}
                      height={25}
                      className="dark:hidden"
                    />
                    <Image
                      className="hidden dark:flex"
                      src={"/images/logos/logo-black.png"}
                      alt="logo"
                      width={24}
                      height={25}
                    />
                  </div>
                  <div className=" font-medium text-appBlack dark:text-white  ">
                    How can I help you today?
                  </div>
                </div>
              )}
            </div>
            {/* input box */}
            <div className=" relative">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleGenerate();
                }}
              >
                <input
                  type="text"
                  placeholder="Choose a model before you write"
                  value={prompt ? prompt : ""}
                  onChange={(e) => setPrompt(e.target.value)}
                  className="w-full rounded-[47px] border-[1px] border-black/10 bg-appGray px-5.5 py-2  pr-[5%] text-sm  text-black/50 outline-none transition placeholder:text-sm focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark dark:text-white/[.48] dark:focus:border-primary"
                />
                <button
                  type="submit"
                  className="absolute right-5 top-1/2 -translate-y-1/2 text-black/[.65] dark:text-white/[.75]"
                >
                  <svg
                    width="18"
                    height="18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M7.877 9H3.752m-.063.219l-1.752 5.23c-.137.412-.206.617-.157.744.043.11.135.193.249.225.13.036.328-.053.724-.23l12.533-5.64c.386-.174.579-.261.638-.382a.375.375 0 000-.332c-.06-.12-.252-.207-.638-.381L2.748 2.81c-.394-.177-.59-.266-.722-.23a.375.375 0 00-.248.225c-.05.126.018.331.154.741L3.69 8.839c.023.07.035.106.04.142a.375.375 0 010 .096c-.005.036-.017.071-.04.142z"
                      stroke="currentColor"
                      strokeOpacity=".28"
                      strokeWidth="1.4"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>
            </div>
          </div>
          {!isDesktop && !showSettings && (
            <motion.div
              key={showSettings.toString()}
              initial={{ x: "-100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.3 }}
              className="
             mb-2
            w-full
            flex-1
            bg-white
            p-5
            dark:bg-dark-2
          "
            >
              <div className="  flex h-[95%] w-full flex-col gap-2 overflow-y-scroll ">
                <div className="flex items-center gap-4 ">
                  <div className="grid h-12 w-12 place-content-center rounded-full bg-appGray">
                    <Image
                      src={"/images/logo/logo_tint.svg"}
                      alt="logo"
                      width={24}
                      height={25}
                      className="dark:hidden"
                    />
                    <Image
                      className="hidden dark:flex"
                      src={"/images/logos/logo-black.png"}
                      alt="logo"
                      width={24}
                      height={25}
                    />
                  </div>
                  <div className=" font-medium text-appBlack dark:text-white  ">
                    How can I help you today?
                  </div>
                </div>
                {chatContent}
              </div>
              {/* input box */}
              <div className=" relative">
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleGenerate();
                  }}
                >
                  <input
                    type="text"
                    placeholder="Choose a model before you write"
                    value={prompt ? prompt : ""}
                    onChange={(e) => setPrompt(e.target.value)}
                    className="z-50 w-full rounded-[47px] border-[1px] border-black/10 bg-appGray px-5.5 py-2 pr-[5%] text-sm  text-black/50 outline-none transition placeholder:text-sm focus:border-primary active:border-primary  disabled:cursor-default dark:border-dark-3 dark:bg-dark dark:text-white/[.48] dark:focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-5 top-1/2 -translate-y-1/2 text-black/[.65] dark:text-white/[.75]"
                  >
                    <svg
                      width="18"
                      height="18"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M7.877 9H3.752m-.063.219l-1.752 5.23c-.137.412-.206.617-.157.744.043.11.135.193.249.225.13.036.328-.053.724-.23l12.533-5.64c.386-.174.579-.261.638-.382a.375.375 0 000-.332c-.06-.12-.252-.207-.638-.381L2.748 2.81c-.394-.177-.59-.266-.722-.23a.375.375 0 00-.248.225c-.05.126.018.331.154.741L3.69 8.839c.023.07.035.106.04.142a.375.375 0 010 .096c-.005.036-.017.071-.04.142z"
                        stroke="currentColor"
                        strokeOpacity=".28"
                        strokeWidth="1.4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </button>
                </form>
              </div>
            </motion.div>
          )}
          {/* Right sidebar */}
          {showSettings && (
            <motion.div
              key={showSettings.toString()}
              initial={{ x: "100%" }}
              animate={{ x: "0%" }}
              transition={{ duration: 0.3 }}
              className="
              flex w-full
            flex-1
            flex-col
            justify-between
            sm:w-1/4
          "
              style={{ overflowY: "auto", overflowX: "hidden" }}
            >
              <div className="flex w-full flex-col bg-white p-4 dark:bg-dark-2">
                <p className="font-medium text-appBlack dark:text-white">
                  API Keys
                </p>
                <p className="mb-4 mt-1 text-sm text-black/50 dark:text-white/[.48]">
                  Choose the model you will work with
                </p>
                <SelectComponent
                  zIndex={5000}
                  models={false}
                  label=""
                  placeholder="Choose the model"
                  items={models as IModel[]}
                  onChange={setSelectedModel}
                />
                {/* <SelectGroupAIModel
                  models={models}
                  handleChangeModel={setSelectedModel}
                /> */}
              </div>

              <div className="mt-3 flex w-full flex-col bg-white p-4 dark:bg-dark-2">
                <p className="mb-4 font-medium text-appBlack dark:text-white">
                  System Prompt
                </p>
                <textarea
                  rows={5}
                  placeholder="Input Something..."
                  value={systemPrompt as string}
                  onChange={(e) => setSystemPrompt(e.target.value)}
                  style={{ resize: "none" }}
                  className="w-[100%]text-sm max-h-[8vh] border-[1px] border-black/10   bg-transparent px-5.5 py-3 font-medium text-dark outline-none placeholder:text-appBlack/30 focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:text-white/[.48] placeholder:dark:text-white/[.3] dark:focus:border-primary"
                />
              </div>

              <div className="mt-3  flex  w-full flex-1 flex-col bg-white p-4 dark:bg-dark-2">
                <p className="mb-4 font-medium text-appBlack dark:text-white">
                  Parameters
                </p>
                <div className="flex flex-col gap-2">
                  {parameters.map((param) => (
                    <div key={param.name}>
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-appBlack/50 dark:text-white/[.48]">
                          {param.label}
                        </p>
                        <input
                          type="text"
                          placeholder=""
                          name={param.name}
                          value={formData[param.name as keyof typeof formData]}
                          // disabled
                          onChange={handleChange}
                          className="w-[45px] rounded-[11px] border-[1px] border-black/10 bg-transparent py-2 text-center text-appBlack  outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              <button className="mx-auto mt-3 h-[40px] w-[95%] bg-prim2 font-medium text-white  dark:bg-white dark:text-appBlack lg:w-full">
                Apply
              </button>

              {/* iSKYOPS Balance Section - now below parameters, mobile responsive */}
              <div className="mx-auto mb-2 mt-4 flex w-full max-w-xs items-center justify-between rounded-2xl bg-gradient-to-r from-[#23263B] to-[#2B2E4A] p-4 shadow-lg ring-1 ring-[#23263B]/40 dark:from-[#23263B] dark:to-[#181A20] sm:max-w-sm sm:p-5 md:max-w-md lg:max-w-lg xl:max-w-xl">
                <div className="flex items-center gap-3 sm:gap-4">
                  <div className="grid h-10 w-10 place-content-center rounded-full bg-[#23263B] sm:h-12 sm:w-12">
                    <Image
                      src="/images/icon/icon-white.svg"
                      alt="iSKYOPS"
                      width={28}
                      height={28}
                      className="sm:h-8 sm:w-8"
                    />
                  </div>
                  <div>
                    <div className="text-xs text-[#A3A9BA]">
                      Available for AI conversations
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <span className="text-2xl font-bold text-white drop-shadow-lg sm:text-3xl">
                    {points}
                  </span>
                  <span className="text-xs font-medium text-[#A3A9BA]">
                    iSKYOPS
                  </span>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIExplorerTextPage;
