import React, { useCallback, useEffect, useMemo, useState } from "react";
import firebase from "./firebase";

const userCounterRef = firebase.database().ref("counters/users");
const costsRef = firebase.database().ref("costs");

const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
const facebookAuthProvider = new firebase.auth.FacebookAuthProvider();
const twitterAuthProvider = new firebase.auth.TwitterAuthProvider();

async function logOut() {
  await firebase.auth().signOut();
}

async function logInGoogle() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(googleAuthProvider));
}

async function logInFacebook() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(facebookAuthProvider));
}

async function logInTwitter() {
  await firebase
    .auth()
    .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
    .then(() => firebase.auth().signInWithPopup(twitterAuthProvider));
}

async function logInPassword(email: string, password: string) {
  const a = await firebase.auth().fetchSignInMethodsForEmail(email);
  if (a.includes("password")) {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => firebase.auth().signInWithEmailAndPassword(email, password));
  } else {
    await firebase
      .auth()
      .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(() => firebase.auth().createUserWithEmailAndPassword(email, password));
  }
}

async function logInAnonymously() {
  await firebase.auth().signInAnonymously();
}

async function sendPasswordMail(email: string) {
  await firebase.auth().sendPasswordResetEmail(email);
}

async function reLogIn() {
  const { currentUser } = firebase.auth();
  if (currentUser) {
    await currentUser.reauthenticateWithPopup(googleAuthProvider);
  }
}

interface IFirebaseActions {
  logInGoogle: () => Promise<void>;
  logInFacebook: () => Promise<void>;
  logInTwitter: () => Promise<void>;
  logInPassword: (email: string, password: string) => Promise<void>;
  logInAnonymously: () => Promise<void>;
  linkWithGoogle: () => Promise<void>;
  linkWithFacebook: () => Promise<void>;
  linkWithTwitter: () => Promise<void>;
  linkWithPassword: (email: string, password: string) => Promise<void>;
  changePassword: (oldPassword: string, newPassword: string) => Promise<void>;
  sendPasswordMail: (email: string) => Promise<void>;
  logOut: () => Promise<void>;
  reLogIn: () => Promise<void>;
  // setIsLoaded: () => void;
}

interface IfirebaseValues {
  uid: string;
  isLoaded: boolean;
  isAuth: boolean;
  isAnonymous: boolean;
  isGoogle: boolean;
  isFacebook: boolean;
  isTwitter: boolean;
  isPassword: boolean;
  userCounter: number;
  earning: number;
  spending: number;
}

interface IFirebaseContext {
  actions: IFirebaseActions;
  values: IfirebaseValues;
}

interface IProps {
  children: React.ReactNode;
}

export const FirebaseContext = React.createContext<IFirebaseContext>({
  actions: {
    reLogIn: () => Promise.resolve(),
    logInGoogle: () => Promise.resolve(),
    logInFacebook: () => Promise.resolve(),
    logInTwitter: () => Promise.resolve(),
    logInPassword: () => Promise.resolve(),
    logInAnonymously: () => Promise.resolve(),
    linkWithGoogle: () => Promise.resolve(),
    linkWithFacebook: () => Promise.resolve(),
    linkWithTwitter: () => Promise.resolve(),
    linkWithPassword: () => Promise.resolve(),
    changePassword: () => Promise.resolve(),
    sendPasswordMail: () => Promise.resolve(),
    logOut: () => Promise.resolve(),
  },
  values: {
    uid: "",
    isAnonymous: true,
    isLoaded: false,
    isGoogle: false,
    isFacebook: false,
    isTwitter: false,
    isPassword: false,
    isAuth: false,
    userCounter: 0,
    earning: 0,
    spending: 0,
  },
});

const FirebaseProvider: React.FC<IProps> = ({ children }) => {
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isGoogle, setIsGoogle] = useState<boolean>(false);
  const [isFacebook, setIsFacebook] = useState<boolean>(false);
  const [isTwitter, setIsTwitter] = useState<boolean>(false);
  const [isPassword, setIsPassword] = useState<boolean>(false);
  const [isAnonymous, setIsAnonymous] = useState<boolean>(false);
  const [isAuth, setIsAuth] = useState<boolean>(false);
  const [uid, setUid] = useState<string>("");
  const [userCounter, setUserCounter] = useState(0);
  const [costs, setCosts] = useState({ earning: 0, spending: 0 });

  const handleUser = useCallback((user: firebase.User | null) => {
    setIsAuth(user !== null);
    setUid(user === null ? "" : user.uid);
    setIsAnonymous(user === null ? true : user.isAnonymous);
    setIsGoogle(
      user?.providerData.some((provider) => provider?.providerId === "google.com") ?? false
    );
    setIsTwitter(
      user?.providerData.some((provider) => provider?.providerId === "twitter.com") ?? false
    );
    setIsFacebook(
      user?.providerData.some((provider) => provider?.providerId === "facebook.com") ?? false
    );
    setIsPassword(
      user?.providerData.some((provider) => provider?.providerId === "password") ?? false
    );
  }, []);

  useEffect(() => {
    const cb = userCounterRef.on("value", (snapshot) => {
      setUserCounter(snapshot.val());
    });

    return () => userCounterRef.off("value", cb);
  }, []);
  useEffect(() => {
    const cb = costsRef.on("value", (snapshot) => {
      setCosts(snapshot.val());
    });

    return () => userCounterRef.off("value", cb);
  }, []);

  useEffect(() => {
    firebase.auth().onAuthStateChanged((user) => {
      setIsLoaded(true);
      handleUser(user);
    });
  }, [handleUser]);

  const linkWithGoogle = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(googleAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const linkWithFacebook = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(facebookAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const linkWithTwitter = useCallback(async () => {
    const { currentUser } = firebase.auth();
    if (currentUser === null) return;

    const linkResult = await currentUser.linkWithPopup(twitterAuthProvider);

    if (linkResult.credential) {
      const { user } = await firebase.auth().signInWithCredential(linkResult.credential);
      handleUser(user);
    }
  }, [handleUser]);

  const linkWithPassword = useCallback(
    async (email, password) => {
      const { currentUser } = firebase.auth();
      if (currentUser === null) return;

      const credential = firebase.auth.EmailAuthProvider.credential(email, password);
      const linkResult = await currentUser.linkWithCredential(credential);

      handleUser(linkResult.user);
    },
    [handleUser]
  );

  const changePassword = useCallback(async (oldPassword: string, newPassword: string) => {
    const { currentUser } = firebase.auth();
    if (currentUser === null || currentUser.email === null) return;

    const credential = firebase.auth.EmailAuthProvider.credential(currentUser.email, oldPassword);
    await currentUser.reauthenticateWithCredential(credential);
    await currentUser.updatePassword(newPassword);
  }, []);

  const value = useMemo(
    () => ({
      actions: {
        reLogIn,
        changePassword,
        logInGoogle,
        logInFacebook,
        logInTwitter,
        logInPassword,
        logInAnonymously,
        linkWithGoogle,
        linkWithFacebook,
        linkWithTwitter,
        linkWithPassword,
        sendPasswordMail,
        logOut,
      },
      values: {
        uid,
        isLoaded,
        isAuth,
        isAnonymous,
        isGoogle,
        isFacebook,
        isTwitter,
        isPassword,
        userCounter,
        earning: costs.earning,
        spending: costs.spending,
      },
    }),
    [
      changePassword,
      linkWithGoogle,
      linkWithFacebook,
      linkWithTwitter,
      linkWithPassword,
      uid,
      isLoaded,
      isAuth,
      isAnonymous,
      isGoogle,
      isFacebook,
      isTwitter,
      isPassword,
      userCounter,
      costs.earning,
      costs.spending,
    ]
  );

  return <FirebaseContext.Provider value={value}>{children}</FirebaseContext.Provider>;
};

export default FirebaseProvider;
