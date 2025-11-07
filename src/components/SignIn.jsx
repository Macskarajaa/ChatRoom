import { useEffect, useRef, useCallback } from "react";
import { getAuth, GoogleAuthProvider, signInWithCredential } from "firebase/auth";

const CLIENT_ID = import.meta.env.VITE_MY_WEB_CLIENT_ID;

export const SignIn = () => {
    const auth = getAuth();
    const googleButtonRef = useRef(null);

    const handleCredentialResponse = useCallback(async (response) => {
        const { credential: idToken } = response;
        const googleCredential = GoogleAuthProvider.credential(idToken);

        try {
            await signInWithCredential(auth, googleCredential);
            console.log("Successfully signed in with Google via Firebase!");
        } catch (error) {
            console.error("Error during Google sign-in:", error);
        }
    }, [auth]);

    useEffect(() => {
        if (!googleButtonRef.current || !window.google?.accounts?.id) return;

        window.google.accounts.id.initialize({
            client_id: CLIENT_ID,
            callback: handleCredentialResponse,
            ux_mode: "popup",
        });

        window.google.accounts.id.renderButton(googleButtonRef.current, {
            theme: "outline",
            size: "large",
            text: "signin_with",
            shape: "rectangular",
        });


    }, [handleCredentialResponse]);

    return (
        <div className="signin flex flex-col items-center gap-4">
            <p className="text-lg font-medium">Jelentkezz be</p>
           <div ref={googleButtonRef}></div>
        </div>
    );
};
