import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";

const getCameraRollPermissions = async () => {
  if (Constants.platform?.ios) {
    const { status } = await ImagePicker.getCameraPermissionsAsync();
    if (status !== "granted") {
      alert("画像を選択するためにはカメラロールの許可が必要です");
    }
  }
};

export const pickImage = async () => {
  await getCameraRollPermissions();
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
  });

  if (!result.cancelled) {
    return result.uri;
  }
};
