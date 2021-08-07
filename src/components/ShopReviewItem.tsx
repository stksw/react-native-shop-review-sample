import React from "react";
import { StyleSheet, Text, View, Image, Dimensions } from "react-native";
import "firebase/firestore";
import { Shop } from "../types/shop";
import { getShops } from "../lib/firebase";
import Stars from "./Stars";

type Props = {
  shop: Shop;
};

const { width } = Dimensions.get("window");
const CONTAINER_WIDTH = width / 2;
const IMAGE_WIDTH = CONTAINER_WIDTH - 32;

const ShopReviewItem: React.FC<Props> = ({ shop }) => {
  console.log("shop", shop);
  return (
    <View style={styles.container}>
      <Image source={{ uri: shop.imageUrl }} style={styles.image} />
      <Text style={styles.nameText}>{shop.name}</Text>
      <Text style={styles.placeText}>{shop.place}</Text>
      <Stars score={shop.score} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CONTAINER_WIDTH,
    padding: 16,
  },
  image: {
    width: IMAGE_WIDTH,
    height: IMAGE_WIDTH * 0.7,
  },
  nameText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
    marginTop: 8,
  },
  placeText: {
    fontSize: 12,
    color: "#888",
    marginTop: 4,
  },
});

export default ShopReviewItem;
