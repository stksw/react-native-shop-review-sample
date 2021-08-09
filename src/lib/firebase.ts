import firebase from "firebase/app";
import "firebase/firestore";
import { Shop } from "../types/shop";

if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: "AIzaSyA3BZF30TiDPY4OLeGecB_8TkPbMuvCRFc",
    authDomain: "shop-review-dev.firebaseapp.com",
    projectId: "shop-review-dev",
    storageBucket: "shop-review-dev.appspot.com",
    messagingSenderId: "736108519658",
    appId: "1:736108519658:web:fb0d1a6e473b9853d8f793",
  };
  firebase.initializeApp(firebaseConfig);
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
