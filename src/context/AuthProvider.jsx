import React, { useEffect, useState } from 'react';
import { AuthContext } from './AuthContext/AuthContext';
import { createUserWithEmailAndPassword, onAuthStateChanged, signInWithEmailAndPassword, signOut, updateProfile } from 'firebase/auth';
import { auth } from '../firebase/firebase.init';

// const provider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);

    const registerUser = (email, password) => {
        setLoading(true);
        return createUserWithEmailAndPassword(auth, email, password);
    }

    const loginUser = (email, password) => {
        setLoading(true);
        return signInWithEmailAndPassword(auth, email, password);
    }

    const logOut = () => {
        setLoading(true);
        return signOut(auth);
    }

    const updateUserProfile = (profile) => {
        return updateProfile(auth.currentUser, profile)
    }

    // const socialLogin = () => {
    //     return signInWithPopup(auth, provider);
    // }

    useEffect(() => {
        const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false)
        })
        return () => {
            unSubscribe();
        }
    }, [])

    const authInfo = {
        updateUserProfile,
        registerUser,
        // socialLogin,
        loginUser,
        logOut,
        loading,
        user,
    }

    return (
        <AuthContext value={authInfo}>
            {children}
        </AuthContext>
    );
};

export default AuthProvider;