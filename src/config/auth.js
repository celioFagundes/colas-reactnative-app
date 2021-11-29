import React, { createContext, useEffect, useState } from "react";
import firebase from "./firebase";
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
} from "firebase/auth";
export const AuthContext = createContext();
const auth = getAuth();

const useCreateUser = () => {
  const [status, setStatus] = useState({ success: null, error: null });

  const createUser = (email, password) => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredencial) => {
        const user = userCredencial.user;
        setStatus({ sucess: "ok", error: null });
      })
      .catch((error) => {
        setStatus({ sucess: null, error: error });
      });
  };
  return [status, createUser];
};

const useLogin = () => {
  const [status, setStatus] = useState(null);
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password).catch((error) => {
      setStatus(error);
    });
    setStatus(null);
  };
  return [status, login];
};
const useGetUser = () => {
  const [user, setUser] = useState(null);
  const [authFinalizou, setAuthFinalizou] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setAuthFinalizou(true);
      } else {
        setAuthFinalizou(true);
        setUser(null);
      }
      
    });
  }, []);
  return [user, authFinalizou];
};

const logout = async () => {
  await signOut(auth);
};

const AuthProvider = ({ children }) => {
  const [user, loading] = useGetUser();
  const [createUserStatus, createUser] = useCreateUser();
  const [loginStatus, login] = useLogin();

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        logout,
        createUser: {
          createUserStatus,
          createUser,
        },
        login: {
          loginStatus,
          login,
        },
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
export default AuthProvider;
