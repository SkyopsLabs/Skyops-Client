// Get projectId from https://cloud.reown.com
export const projectId = process.env.NEXT_PUBLIC_INFURA_ID;

if (!projectId) {
  throw new Error("Project ID is not defined");
}
