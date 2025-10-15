import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import {
  generateUserId,
  getOrCreateUserBeer,
  updateUserBalance,
  BeerRecord,
} from "../utils/api";

export interface UserContextType {
  userId: string;
  userBalance: number;
  setUserBalance: (balance: number) => void;
  isLoading: boolean;
  error: string | null;
}

export const UserContext = createContext<UserContextType | undefined>(
  undefined
);

interface UserProviderProps {
  children: ReactNode;
}

export const UserProvider: React.FC<UserProviderProps> = ({ children }) => {
  const [userId, setUserId] = useState<string>("");
  const [userBalance, setUserBalance] = useState<number>(5000);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Initialize user on component mount (page load)
  useEffect(() => {
    const initializeUser = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Generate or get existing user ID from localStorage
        let currentUserId = localStorage.getItem("october_user_id");

        if (!currentUserId) {
          // Generate new unique user ID
          currentUserId = generateUserId();
          localStorage.setItem("october_user_id", currentUserId);
        }

        setUserId(currentUserId);

        // Get or create user beer record from backend
        const beerRecord = await getOrCreateUserBeer(currentUserId);
        setUserBalance(beerRecord.balance);

        console.log("User initialized:", {
          userId: currentUserId,
          balance: beerRecord.balance,
        });
      } catch (err) {
        console.error("Failed to initialize user:", err);
        setError(
          err instanceof Error ? err.message : "Failed to initialize user"
        );
        // Fallback to default balance if backend is unavailable
        setUserBalance(5000);
      } finally {
        setIsLoading(false);
      }
    };

    initializeUser();
  }, []);

  // Sync balance changes to backend
  const handleSetUserBalance = async (newBalance: number) => {
    try {
      setUserBalance(newBalance);

      // Update balance in backend if user is initialized
      if (userId) {
        await updateUserBalance(userId, newBalance);
        console.log("Balance synced to backend:", {
          userId,
          balance: newBalance,
        });
      }
    } catch (err) {
      console.error("Failed to sync balance to backend:", err);
      // Keep the local balance even if sync fails
    }
  };

  const value: UserContextType = {
    userId,
    userBalance,
    setUserBalance: handleSetUserBalance,
    isLoading,
    error,
  };

  return <UserContext.Provider value={value}>{children}</UserContext.Provider>;
};

export const useUser = (): UserContextType => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
