import Constants from "expo-constants";
import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";
import { Shop } from "../types/shop";
import { User, initialUser } from "../types/user";
import { Review } from "../types/review";

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
    const shops = snapshot.docs.map((doc) => {
      return { ...doc.data(), id: doc.id } as Shop;
    });
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
  await firebase.firestore().collection("users").doc(userId).update(params);
};

export const addReview = async (shopId: string, review: Review) => {
  const result = await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .add(review);
};

export const createReviewRef = async (shopId: string) => {
  return await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .doc();
};

export const uploadImage = async (uri: string, path: string) => {
  const localUri = await fetch(uri);
  const blob = await localUri.blob();
  const ref = firebase.storage().ref().child(path);
  let downloadUrl = "";

  try {
    await ref.put(blob);
    downloadUrl = await ref.getDownloadURL();
  } catch (err) {
    console.log(err);
  }
  return downloadUrl;
};

export const getReviews = async (shopId: string) => {
  const reviewDocs = await firebase
    .firestore()
    .collection("shops")
    .doc(shopId)
    .collection("reviews")
    .orderBy("createdAt", "desc")
    .get();
  return reviewDocs.docs.map(
    (doc) => ({ ...doc.data(), id: doc.id } as Review)
  );
};
