import { createContext, useContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAccount } from "wagmi";
import { IAppContext, IAppProviderProps, IUser } from "@/types";
import { auth, getCurrentUser } from "@/apis/api-v1";
import { setAuthToken } from "@/utils/setAuthToken";

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const router = useRouter();
  const { isConnected, address } = useAccount();

  // State Variables
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setAuthToken(null);
      setUser(null);
      router.push("/");
    } else {
      if (localStorage.getItem("authToken")) {
        setAuthToken(localStorage.getItem("authToken"));
        // get User Info
        (async () => {
          // router.push("/instances");
          const _ = await getCurrentUser();
          setUser(_);
        })();
      } else {
        // Auth Again
        (async () => {
          router.push("/instances");
          await auth(address);
          const _ = await getCurrentUser();
          setUser(_);
        })();
      }
    }
  }, [isConnected, address]);

  const refetchUserData = async () => {
    if (!address || !localStorage.getItem("authToken")) return;
    const _ = await getCurrentUser();
    setUser(_);
  };

  return (
    <AppContext.Provider
      value={{
        loading: false,
        user,
        refetchUserData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used within a AppProvider");
  }
  return context;
};
