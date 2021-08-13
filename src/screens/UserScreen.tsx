import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import firebase from "firebase";
import React, { useState, useContext } from "react";
import { SafeAreaView, Text, View, StyleSheet } from "react-native";
import { Button } from "../components/Button";
import { Loading } from "../components/Loading";
import { UserForm } from "../components/UserForm";
import { UserContext } from "../contexts/userContext";
import { updateUser } from "../lib/firebase";
import { RootStackParamList } from "../types/navigation";

type Props = {
  navigation: StackNavigationProp<RootStackParamList, "User">;
  route: RouteProp<RootStackParamList, "User">;
};

const UserScreen: React.FC<Props> = ({ navigation, route }) => {
  const { user, setUser } = useContext(UserContext);
  const [name, setName] = useState<string | undefined>(user?.name);
  const [loading, setLoading] = useState<boolean>(false);

  const onSubmit = async () => {
    if (user?.id) {
      setLoading(true);
      const updatedAt = firebase.firestore.Timestamp.now();
      await updateUser(user.id, { name, updatedAt });
      setUser({ ...user, name, updatedAt });
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <UserForm
        value={name}
        onChangeText={(text) => setName(text)}
        label="名前"
      />
      <Button onPress={onSubmit} text="保存する" />
      <Loading visible={loading} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default UserScreen;
