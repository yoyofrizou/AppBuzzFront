import AsyncStorage from "@react-native-async-storage/async-storage";

export async function persistUser(updatedUser) {
  await AsyncStorage.setItem("user", JSON.stringify(updatedUser));
}
