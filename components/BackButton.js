import { TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";

export default function BackButton({ color = "#800020" }) {
  const navigation = useNavigation();

  return (
    <TouchableOpacity onPress={() => navigation.goBack()} style={{ padding: 8 }}>
      <Ionicons name="arrow-back" size={32} color={color} />
    </TouchableOpacity>
  );
}