import React, { useContext, useEffect, useState } from "react";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { View, Text, SafeAreaView, StyleSheet, FlatList } from "react-native";
import { RootStackParamList } from "../types/navigation";
import ShopDetail from "../components/ShopDetail";
import { FloatingActionButton } from "../components/FloatingActionButton";
import { Review } from "../types/review";
import { getReviews } from "../lib/firebase";
import ReviewItem from "../components/ReviewItem";
import { ReviewsContext } from "../contexts/reviewsContext";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "Shop">;
  route: RouteProp<RootStackParamList, "Shop">;
};

export const ShopScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const { reviews, setReviews } = useContext(ReviewsContext);

  useEffect(() => {
    navigation.setOptions({ title: shop.name });

    const fetchReviews = async () => {
      const reviews = await getReviews(shop.id!);
      setReviews(reviews);
    };
    fetchReviews();
  }, [shop]);

  return (
    <SafeAreaView style={styles.container}>
      {reviews && reviews.length === 0 ? (
        <>
          <ShopDetail shop={shop} />
          <Text style={styles.noReviews}>まだレビューがありません</Text>
        </>
      ) : (
        <FlatList
          ListHeaderComponent={<ShopDetail shop={shop} />}
          data={reviews}
          renderItem={({ item }: { item: Review }) => (
            <ReviewItem review={item} />
          )}
          keyExtractor={(item) => item.id!}
        />
      )}
      <FloatingActionButton
        iconName="plus"
        onPress={() => navigation.navigate("CreateReview", { shop })}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "flex-start",
  },
  noReviews: {
    margin: 16,
    flex: 1,
  },
});
