"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import SelectGroupAIModel from "@/components/FormElements/SelectGroup/SelectGroupAIModel";
import { IChat, IModel } from "@/types";
import { generateAiText, getAiModels } from "@/apis/api-v1";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";

const initialState = {
  temperature: 0,
  topP: 0,
  maxTokens: 0,
  frequencyPenalty: 0,
  presencePenalty: 0,
  repetitionPenalty: 0,
};

const AIExplorerTextPage = () => {
  const [formData, setFormData] = useState(initialState);
  const [models, setModels] = useState<IModel[] | null>(null);
  const [isSelectedModel, setSelectedModel] = useState<string | null>(null);
  const [prompt, setPrompt] = useState<string | null>(null);
  const [systemPrompt, setSystemPrompt] = useState<string>("");
  const [chats, setChats] = useState<IChat[] | null>(null);

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
    <div className="flex w-full flex-col sm:flex-row">
      {/* Left section */}
      <div
        className="
            mt-5
            w-full
            rounded-[10px]
            bg-white
            p-4
            shadow-1 
            dark:bg-gray-dark
            dark:shadow-card
            sm:w-3/4
          "
      >
        {/* Sub title */}
        <div className="flex">
          {/* <Image
            className="m-4"
            src={"/images/ai-explorer/icon-meta.png"}
            alt="Logo"
            width={50}
            height={32}
          /> */}
          <Image
            width={35}
            height={20}
            src={
              selectedModel
                ? (selectedModel[0].image ?? "/images/logos/logo-grey.png")
                : "/images/logos/logo-grey.png"
            }
            alt="Logo"
            className="mx-2 my-5"
          />
          <div className="my-5 flex flex-col dark:text-white">
            <p className="text-large font-bold">
              {selectedModel ? selectedModel[0].name : "Choose your AI Model"}
            </p>
            <div className="flex items-center  justify-start">
              <p className="bg-gray-4 px-1 text-sm font-medium">Text</p>
              {/* <p className="bg-gray-4 px-1 text-sm font-medium">Meta</p> */}
            </div>
          </div>
        </div>
        <div className="  flex h-[65vh] w-full flex-col gap-2 overflow-y-scroll border p-5">
          <div className="flex items-center gap-2 p-1">
            <Image
              className=""
              src={"/images/logos/logo-blue.png"}
              alt="Logo"
              width={25}
              height={25}
            />
            <div className="rounded-sm bg-gray p-2 text-sm font-medium dark:bg-[#122031]">
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
              placeholder="Your sentence here..."
              value={prompt ? prompt : ""}
              onChange={(e) => setPrompt(e.target.value)}
              className="w-full border-[1.5px] border-stroke bg-transparent px-5.5 py-2 pr-[5%]  text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
            />
            <button
              type="submit"
              className="absolute right-5 top-1/2 -translate-y-1/2"
            >
              <Image
                className="mx-1 my-2"
                src={"/images/ai-explorer/chat_confirm.png"}
                alt="Logo"
                width={20}
                height={15}
              />
            </button>
          </form>
        </div>
      </div>
      {/* Right sidebar */}
      <div
        className="
            mt-5
            h-[82vh]
            w-full
            rounded-[10px]
            bg-white
            p-4
            shadow-1 dark:bg-gray-dark dark:shadow-card sm:ml-2
            sm:w-1/4
          "
        style={{ overflowY: "auto", overflowX: "hidden" }}
      >
        <div className="flex flex-col">
          <p className="text-large my-5 font-bold">API Keys</p>
          <div className="border-b">
            <SelectGroupAIModel
              models={models}
              handleChangeModel={setSelectedModel}
            />
          </div>
        </div>

        <div className="flex flex-col">
          <p className="text-large my-3 font-bold">System Prompt</p>
          <textarea
            rows={5}
            placeholder="Input Something..."
            value={systemPrompt as string}
            onChange={(e) => setSystemPrompt(e.target.value)}
            style={{ resize: "none" }}
            className="w-[100%] rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-3 text-dark outline-none focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
          />
        </div>

        <p className="text-large my-4 border-t py-4 font-bold">Parameters</p>

        <div className="flex flex-col gap-2">
          {/* Temperature */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Temperature</p>
              <input
                type="text"
                placeholder=""
                value={temperature}
                onChange={handleChange}
                disabled
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>

          {/* Top P */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Top P</p>
              <input
                type="text"
                placeholder=""
                value={topP}
                disabled
                onChange={handleChange}
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>

          {/* Max Tokens */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Max Tokens</p>
              <input
                type="text"
                placeholder=""
                value={maxTokens}
                disabled
                onChange={handleChange}
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>

          {/* Frequency Penalty */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Frequency Penalty</p>
              <input
                type="text"
                placeholder=""
                value={frequencyPenalty}
                disabled
                onChange={handleChange}
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>

          {/* Presence Penalty */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Presence Penalty</p>
              <input
                type="text"
                placeholder=""
                value={presencePenalty}
                disabled
                onChange={handleChange}
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>

          {/* Repetition Penalty */}
          <div>
            <div className="flex items-center justify-between">
              <p className="text-sm font-bold">Repetition Penalty</p>
              <input
                type="text"
                placeholder=""
                value={repetitionPenalty}
                disabled
                onChange={handleChange}
                className="w-25 rounded-[7px] border-[1.5px] border-stroke bg-transparent px-5.5 py-2 text-dark outline-none transition focus:border-primary active:border-primary disabled:cursor-default disabled:bg-gray-2 dark:border-dark-3 dark:bg-dark-2 dark:text-white dark:focus:border-primary"
              />
            </div>
            {/* <input
            type="range"
            min="0"
            max="100"
            value="50"
            className="w-full bg-transparent"
          /> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AIExplorerTextPage;
