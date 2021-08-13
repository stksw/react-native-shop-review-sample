import Constants from "expo-constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Shop } from "../types/shop";
import { User, initialUser } from "../types/user";

if (!firebase.apps.length) {
  firebase.initializeApp(Constants.manifest!.extra!.firebase);
}

export const getShops = async () => {
  try {
    // shopsのsnapshotを取得
    const snapshot = await firebase
      .firestore()
      .collection("shops")
      .orderBy("score", "desc")
      .get();
    const shops = snapshot.docs.map((doc) => doc.data() as Shop);
    return shops;
  } catch (err) {
    console.log("err", err);
  }
};

export const signIn = async () => {
  const credentials = await firebase.auth().signInAnonymously();

  const uid = credentials.user?.uid;
  const userDoc = await firebase.firestore().collection("users").doc(uid).get();
  console.log("uid", uid);
  if (!uid || !userDoc.exists) {
    await firebase.firestore().collection("users").doc(uid).set(initialUser);
    // firebaseから取得したuserDocの中にはidがない
    return { ...initialUser, id: uid } as User;
  } else {
    return { id: uid, ...userDoc.data() } as User;
  }
};

export const updateUser = async (userId: string, params: any) => {
  console.log("params", params);
  await firebase.firestore().collection("users").doc(userId).update(params);
};
