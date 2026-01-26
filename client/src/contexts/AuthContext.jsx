import { useState, useEffect, useContext, createContext } from "react";
import { axiosInstance } from "../lib/axios";

// LocalStorage Functions
const setUserToStorage = (user) => {
  localStorage.setItem("user", JSON.stringify(user));
};

const removeUserFromStorage = () => {
  localStorage.removeItem("user");
};

const getUserFromStorage = () => {
  const user = localStorage.getItem("user");
  return user ? JSON.parse(user) : null;
};

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(getUserFromStorage);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const setUserAndStore = (userData) => {
    setUser(userData);
    setUserToStorage(userData);
  };

  const clearUser = () => {
    setUser(null);
    removeUserFromStorage();
  };

  const createUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.post("/users/signup", userData);
      console.log(res);
      setUserAndStore(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (userData) => {
    setLoading(true);
    setError(null);
    try {
      const res = await axiosInstance.patch("/users", userData);
      setUserAndStore(res.data);
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.delete("/users");
      clearUser();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const logoutUser = async () => {
    setLoading(true);
    setError(null);
    try {
      await axiosInstance.get("/users/logout");
      clearUser();
    } catch (err) {
      setError(err.response?.data?.message || err.message);
    } finally {
      setLoading(false);
    }
  };

  const getUser = async () => {
    try {
      const res = await axiosInstance.get("/users");
      setUserAndStore(res.data);
    } catch {
      clearUser();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        createUser,
        updateUser,
        deleteUser,
        logoutUser,
        getUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
