import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";

type Props = {
  onPress: () => void;
  name: "plus" | "user" | "x";
  color?: string;
};

const IconButton: React.FC<Props> = ({ onPress, name, color = "#000" }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.container}>
      <Feather name={name} color={color} size={32} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 8,
  },
});

export default IconButton;
