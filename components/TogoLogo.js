import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

export default function TogoLogo({ size = 32, color = colors.textPrimary, style }) {
  const wheelSize = Math.round(size * 0.9);

  const letterStyle = {
    fontSize: size,
    fontWeight: "800",
    color,
    letterSpacing: -0.5,
  };

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <Text style={letterStyle}>T</Text>
      <MaterialCommunityIcons name="steering" size={wheelSize} color={color} style={{ marginHorizontal: 1 }} />
      <Text style={letterStyle}>G</Text>
      <MaterialCommunityIcons name="steering" size={wheelSize} color={color} style={{ marginHorizontal: 1 }} />
    </View>
  );
}
