import { api } from "@/utils/api";
import { setAuthToken } from "@/utils/setAuthToken";

// Authentication
export const auth = async (address: string, code: string) => {
  try {
    const { data } = await api.post("/users", { address, code });
    setAuthToken(data.token);

    return true;
  } catch (error) {
    console.error("Error in authentication: ", error);
    return false;
  }
};

// Get current user with auth token
export const getCurrentUser = async () => {
  try {
    const { data } = await api.get("/users");

    return data;
  } catch (error) {
    console.error("Error in getting user info: ", error);
    return null;
  }
};

// Save Billing tx
export const saveBillingTx = async (amount: number) => {
  try {
    const { data } = await api.post("/billing", { amount });

    return data;
  } catch (error) {
    console.error("Error in saving a billing tx: ", error);
    return null;
  }
};

// Get Billings by user
export const getBillings = async () => {
  try {
    const { data } = await api.get("/billing");

    return data;
  } catch (error) {
    console.error("Error in getting billings by user: ", error);
    return null;
  }
};

// Get Ai Models
export const getAiModels = async () => {
  try {
    const { data } = await api.get("/models");

    return data;
  } catch (error) {
    console.error("Error in getting ai models: ", error);
    return null;
  }
};

// Get Ai Model by Id
export const getAiModelById = async (id: string) => {
  try {
    const { data } = await api.get(`/models/${id}`);

    return data;
  } catch (error) {
    console.error("Error in getting ai model by id: ", error);
    return null;
  }
};

// Get Conversations by userId
export const getConversationsById = async () => {
  try {
    const { data } = await api.get(`/chats`);

    return data;
  } catch (error) {
    console.error("Error in getting conversations by id: ", error);
    return null;
  }
};
// Get Services
export const getServices = async () => {
  try {
    const { data } = await api.get("/service");

    return data;
  } catch (error) {
    console.error("Error in getting services: ", error);
    return null;
  }
};

// Get Organization by user id
export const getOrganizationById = async () => {
  try {
    const { data } = await api.get("/orgs");

    return data;
  } catch (error) {
    console.error("Error in getting organization by user id: ", error);
    return null;
  }
};

// Update Profile
export const updateProfile = async (username: string) => {
  try {
    await api.post("/users/update-profile", { username });

    return true;
  } catch (error) {
    console.error("Error in updating profile: ", error);
    return false;
  }
};

// Top Up Tokens
export const topUpTokens = async (modelId: string, token: number) => {
  try {
    await api.post("/users/top-up", { model: modelId, token });
    return true;
  } catch (error) {
    console.error("Error in charging tokens: ", error);
    return false;
  }
};

// Ai Explorer : Text
export const generateAiText = async (
  model: string,
  prompt: string,
  systemPrompt: string,
) => {
  try {
    const { data } = await api.post("/explorer/text/generate", {
      model,
      prompt,
      systemPrompt,
    });

    return data;
  } catch (error: any) {
    console.error("Error in generating ai text: ", error);
    return { error: true, msg: error.response.data.msg };
  }
};
