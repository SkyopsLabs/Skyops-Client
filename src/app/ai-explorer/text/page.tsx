"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SelectGroupAIModel from "@/components/FormElements/SelectGroup/SelectGroupAIModel";
import { IChat, IModel } from "@/types";
import { generateAiText, getAiModels } from "@/apis/api-v1";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import { AnimatePresence, motion } from "framer-motion";

const initialState = {
  temperature: 0,
  topP: 0,
  maxTokens: 0,
  frequencyPenalty: 0,
  presencePenalty: 0,
  repetitionPenalty: 0,
};

const parameters = [
  { name: "temperature", label: "Temperature" },
  { name: "topP", label: "Top P" },
  { name: "maxTokens", label: "Max Tokens" },
  { name: "frequencyPenalty", label: "Frequency Penalty" },
  { name: "presencePenalty", label: "Presence Penalty" },
  // { name: "repetitionPenalty", label: "Repetition Penalty" },
];

const AIExplorerTextPage = () => {
  const isDesktop = typeof window !== "undefined" && window.innerWidth > 1024;
  const [formData, setFormData] = useState(initialState);
  const [models, setModels] = useState<IModel[] | null>(null);
  const [isSelectedModel, setSelectedModel] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [chats, setChats] = useState<IChat[] | null>(null);
  const [showSettings, setShowSettings] = useState<boolean>(
    isDesktop ? true : false,
  );

  const {
    temperature,
    topP,
    maxTokens,
    frequencyPenalty,
    presencePenalty,
    repetitionPenalty,
  } = formData;

  useEffect(() => {
    (async () => {
      const _ = await getAiModels();
      console.log("models", _);
      setModels(_);
    })();
  }, []);

  const handleChange = (e: any) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleGenerate = async () => {
    if (!isSelectedModel || isSelectedModel === "Default") {
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
      type: "user",
      content: prompt,
      tokens: 0,
      created_at: new Date().toISOString(),
    };
    if (!chats) {
      // New Conversation
      const newChats: IChat[] = [];
      newChats.push(chatObj);
      setChats(newChats);
    } else {
      // Push to Old chats
      setChats((prevChats) => [...(prevChats || []), chatObj]);
    }
    setPrompt(null);
    const resp: any = await generateAiText(
      isSelectedModel,
      prompt,
      systemPrompt,
    );
    if (resp.error) {
      toast.error(resp.msg, { id: loading });
      return;
    }
    toast.dismiss(loading);
    resp.type = "assistant";
    setChats((prevChats) => [...(prevChats || []), resp]);
  };

  const selectedModel =
    models &&
    isSelectedModel &&
    models.filter((model) => model._id === isSelectedModel);

  let chatContent;
  if (chats && chats.length > 0) {
    chatContent = chats.map((chat, idx) => {
      if (chat.type === "assistant") {
        return (
          <div className="mb-4 flex items-start p-1" key={idx}>
            <Image
              className="mx-1 my-2"
              src={"/images/logos/logo-blue.png"}
              alt="Logo"
              width={25}
              height={20}
            />
            <div className="max-w-[500px] bg-gray p-2 text-sm font-medium">
              <ReactMarkdown>{chat.content}</ReactMarkdown>
            </div>
          </div>
        );
      } else {
        return (
          <div className="mb-4 flex items-end justify-end p-1" key={idx}>
            <Image
              className="mx-1 my-2"
              src={"/images/ai-explorer/icon-mistral.png"}
              alt="Logo"
              width={25}
              height={20}
            />
            <div className="max-w-[500px] bg-gray p-2 text-sm font-medium">
              {chat.content}
            </div>
          </div>
        );
      }
    });
  }

  return (
    <div className="flex flex-1 flex-col">
      <div className="flex h-[64px] items-center justify-between border-b border-border px-5 dark:border-white/10 lg:px-10">
        <h4 className="text-2xl font-medium text-appBlack  dark:text-white lg:text-[28px]">
          Ai-Explorer/Text
        </h4>
        <div className="flex h-full w-[20%] items-center justify-center border-l border-border lg:hidden">
          <button onClick={() => setShowSettings(!showSettings)}>
            <Image
              src={"/images/icon/settings.svg"}
              width={24}
              height={24}
              alt="settings"
            />
          </button>
        </div>
      </div>
      <div className="flex  w-full flex-1 flex-col gap-3  sm:flex-row  lg:p-4">
        <AnimatePresence mode="wait">
          {/* Left section */}
          <div
            className="
            
                        hidden
            w-3/4 flex-col
            bg-white
            p-5
            dark:bg-dark-2
            lg:flex
            lg:p-6
          "
          >
            <div className="  flex h-[95%] w-full flex-col gap-2 overflow-y-scroll ">
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
                  what can i help you with?
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
                  className="w-full rounded-[47px] border-[1px] border-black/10 bg-appGray  px-5.5 py-2  pr-[5%] text-black/50 outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark dark:text-white/[.48] dark:focus:border-primary"
                />
                <button
                  type="submit"
                  className="absolute right-5 top-1/2 -translate-y-1/2"
                >
                  <Image
                    className="mx-1 my-2"
                    src={"/images/icon/send.svg"}
                    alt="Logo"
                    width={18}
                    height={18}
                  />
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
          "
            >
              <div className="  flex h-[95%] w-full flex-col gap-2 overflow-y-scroll ">
                <div className="flex items-center gap-4 ">
                  <div className="grid h-12 w-12 place-content-center rounded-full bg-appGray">
                    <Image
                      className=""
                      src={"/images/logo/logo_tint.svg"}
                      alt="logo"
                      width={24}
                      height={25}
                    />
                  </div>
                  <div className=" font-medium text-appBlack  ">
                    what can i help you with?
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
                    className="z-50 w-full rounded-[47px] border-[1px] border-black/10 bg-appGray px-5.5 py-2  pr-[5%] text-black/50 outline-none transition focus:border-primary active:border-primary  disabled:cursor-default dark:border-dark-3 dark:bg-dark dark:text-white/[.48] dark:focus:border-primary"
                  />
                  <button
                    type="submit"
                    className="absolute right-5 top-1/2 -translate-y-1/2"
                  >
                    <Image
                      className="mx-1 my-2"
                      src={"/images/icon/send.svg"}
                      alt="Logo"
                      width={18}
                      height={18}
                    />
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
                <SelectGroupAIModel
                  models={models}
                  handleChangeModel={setSelectedModel}
                />
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
                          disabled
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
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default AIExplorerTextPage;
