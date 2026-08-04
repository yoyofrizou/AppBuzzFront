import React from "react";
import { View, Text } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

export default function TogoLogo({ size = 32, style }) {
  const badgeSize = Math.round(size * 0.85);
  const iconSize = Math.round(size * 0.4);

  const letterStyle = {
    fontSize: size,
    fontWeight: "800",
    color: colors.textPrimary,
    letterSpacing: -0.5,
  };

  const badgeStyle = {
    width: badgeSize,
    height: badgeSize,
    borderRadius: badgeSize / 2,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 2,
  };

  return (
    <View style={[{ flexDirection: "row", alignItems: "center" }, style]}>
      <Text style={letterStyle}>T</Text>

      <View style={badgeStyle}>
        <MaterialCommunityIcons name="steering" size={iconSize} color={colors.mint} />
      </View>

      <Text style={letterStyle}>G</Text>

      <View style={badgeStyle}>
        <MaterialCommunityIcons name="steering" size={iconSize} color={colors.mint} />
      </View>
    </View>
  );
}
