import React, { createContext, useState, useEffect } from "react";
import app from "../Firebase/Firebase.config";

import {
  getAuth,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
  sendPasswordResetEmail,
} from "firebase/auth";
import axios from "axios";

export const AuthContext = createContext();

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [roleLoading, setRoleLoading] = useState(true);
  const [role, setRole] = useState("");
  const [userStatus, setUserStatus] = useState("");

  const googleSignIn = () => {
    setLoading(true);
    return signInWithPopup(auth, googleProvider);
  };

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const updateUser = async (updatedData) => {
    setLoading(true);
    await updateProfile(auth.currentUser, updatedData);

    setUser({
      ...auth.currentUser,
      ...updatedData,
    });

    setLoading(false);
  };

  const resetPassword = (email) => {
    setLoading(true);
    return sendPasswordResetEmail(auth, email).finally(() => setLoading(false));
  };

  const logOut = () => {
    setLoading(true);
    return signOut(auth);
  };



  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      setRoleLoading(false);
      return;
    }

    if (user?.email) {
      axios
        .get(`http://localhost:3000/users/role/${user.email}`)
        .then((res) => {
          setRole(res.data.role);
          setUserStatus(res.data.status);
        })
        .catch((err) => {
          console.error("Error fetching role:", err);
        })
        .finally(() => {
          setRoleLoading(false);
        });
    }
  }, [user, loading]);

  const authData = {
    role,
    user,
    loading,
    createUser,
    signIn,
    googleSignIn,
    logOut,
    updateUser,
    resetPassword,
    setLoading,
    roleLoading,
    userStatus,
  };

  return (
    <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
