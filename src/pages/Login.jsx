import { useEffect, useState } from "react";
import {
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";

import { auth, provider, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

import "./Login.css";

function Login() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser || null);
    });

    return () => unsubscribe();
  }, []);

  const googleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);

      const currentUser = result.user;

      await setDoc(
        doc(db, "users", currentUser.uid),
        {
          uid: currentUser.uid,
          name: currentUser.displayName,
          email: currentUser.email,
          photo: currentUser.photoURL,
          createdAt: new Date().toISOString(),
        },
        { merge: true }
      );
    } catch (err) {
      alert(err.message);
    }
  };

  const logout = async () => {
    await signOut(auth);
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h1>🔐 SkillTwin Login</h1>

        {!user ? (
          <>
            <p>Sign in with Google to continue.</p>

            <button
              className="google-btn"
              onClick={googleLogin}
            >
              Continue with Google
            </button>
          </>
        ) : (
          <>
            <img
              src={user.photoURL}
              alt="profile"
              className="profile-img"
            />

            <h2>{user.displayName}</h2>

            <p>{user.email}</p>

            <button
              className="logout-btn"
              onClick={logout}
            >
              Logout
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Login;