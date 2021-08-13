import React, { useContext, useEffect, useLayoutEffect, useState } from "react";
import {
  StyleSheet,
  SafeAreaView,
  Text,
  View,
  Image,
  Alert,
} from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../types/navigation";
import IconButton from "../components/IconButton";
import { TextArea } from "../components/TextArea";
import { Button } from "../components/Button";
import { UserContext } from "../contexts/userContext";
import { StarInput } from "../components/StarInput";
import { addReview, createReviewRef, uploadImage } from "../lib/firebase";
import firebase from "firebase";
import { Review } from "../types/review";
import { pickImage } from "../lib/imagePicker";
import { getExtension } from "../utils/file";
import { Loading } from "../components/Loading";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "CreateReview">;
  route: RouteProp<RootStackParamList, "CreateReview">;
};

const CreateReviewScreen: React.FC<Props> = ({ navigation, route }) => {
  const { shop } = route.params;
  const [text, setText] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const { user } = useContext(UserContext);
  const [score, setScore] = useState<number>(3);

  useEffect(() => {
    navigation.setOptions({
      title: shop.name,
      headerLeft: () => (
        <IconButton onPress={() => navigation.goBack()} name="x" />
      ),
    });
  }, [navigation, shop]);

  const onSubmit = async () => {
    setLoading(true);
    // docのIDが自動採番され、docのReferenceが返ってくる
    const reviewDocRef = await createReviewRef(shop.id!);
    // storageのpath
    const storagePath = `reviews/${reviewDocRef.id}.${getExtension(imageUrl)}`;
    const downloadUrl = await uploadImage(imageUrl, storagePath);

    if (!text) {
      Alert.alert("レビュー本文がありません");
      return;
    }
    const { id, name } = user!;
    const review = {
      user: { id, name },
      shop: { id: shop.id, name: shop.name },
      text,
      score,
      imageUrl: downloadUrl,
      createdAt: firebase.firestore.Timestamp.now(),
      updatedAt: firebase.firestore.Timestamp.now(),
    } as Review;
    // addReviewの代わりにreviewDocRef.setを実行
    // await addReview(shop.id!, review);
    await reviewDocRef.set(review);

    setLoading(false);
    navigation.goBack();
  };

  const onPickImage = async () => {
    const uri = await pickImage();
    if (uri) {
      setImageUrl(uri);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StarInput score={score} onChangeScore={(value) => setScore(value)} />
      <TextArea
        label="レビュー"
        value={text}
        onChangeText={(value) => setText(value)}
        placeholder="レビューを書いてください"
      />
      <View style={styles.photoContainer}>
        <IconButton name="camera" onPress={onPickImage} color="#ccc" />
        {!!imageUrl && (
          <Image source={{ uri: imageUrl }} style={styles.image} />
        )}
      </View>
      <Button text="レビューを投稿する" onPress={onSubmit} />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  photoContainer: {
    margin: 8,
  },
  image: {
    width: 100,
    height: 100,
    margin: 8,
  },
});

export default CreateReviewScreen;
