import React from "react";
import {
  StyleSheet,
  TouchableOpacity,
  GestureResponderEvent,
} from "react-native";
import { Feather } from "@expo/vector-icons";
import { Icon } from "@expo/vector-icons/build/createIconSet";

const SIZE = 56;

type Props = {
  iconName: "plus";
  onPress: (event: GestureResponderEvent) => void;
};

export const FloatingActionButton: React.FC<Props> = ({
  iconName,
  onPress,
}) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Feather name={iconName} color="#fff" size={30} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: "#900",
    position: "absolute",
    right: 16,
    bottom: 16,
    alignItems: "center",
    justifyContent: "center",
  },
});
