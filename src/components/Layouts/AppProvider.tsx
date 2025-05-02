import { createContext, useContext, useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { IAppContext, IAppProviderProps, IUser } from "@/types";
import { auth, getCurrentUser } from "@/apis/api-v1";
import { setAuthToken } from "@/utils/setAuthToken";
import { useAppSelector } from "@/redux/hooks";
import { useAppKitAccount } from "@reown/appkit/react";

export const AppContext = createContext<IAppContext | null>(null);

export const AppProvider = ({ children }: IAppProviderProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isConnected, address } = useAppKitAccount();

  // Extract invite param from URL
  const invite = searchParams?.get("invite") as string;

  // Retrieve code from Redux state
  const { code } = useAppSelector((state) => state.code);

  // State Variables
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    if (!isConnected || !address) {
      setAuthToken(null);
      setUser(null);
      invite ? router.push(`/?invite=${invite}`) : router.push("/");
    } else {
      console.log(invite, "invite");
      if (localStorage.getItem("authToken")) {
        setAuthToken(localStorage.getItem("authToken"));
        // Fetch user info
        (async () => {
          const _ = await getCurrentUser();
          setUser(_);
        })();
      } else {
        // Authenticate user with optional invite code
        (async () => {
          await auth(address as string, invite || code);
          router.push("/instances");
          const _ = await getCurrentUser();
          setUser(_);
        })();
      }
    }
  }, [isConnected, address, invite, code]);

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
