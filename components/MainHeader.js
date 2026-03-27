import { View, Text, TouchableOpacity } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function MainHeader({ navigation }) {
  return (
    <View
      style={{
        paddingTop: 55,
        paddingHorizontal: 25,
        paddingBottom: 18,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: "#F5F5F5",
      }}
    >
      <Text style={{ fontSize: 40, fontWeight: "800", color: "#8B2332" }}>
        BUZZ
      </Text>

      <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
        <Ionicons name="person-circle-outline" size={40} color="#111" />
      </TouchableOpacity>
    </View>
  );
}