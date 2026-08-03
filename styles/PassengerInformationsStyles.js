import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 25,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  rowIcon: {
    marginRight: 12,
  },

  rowValue: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  separator: {
    height: 1,
    backgroundColor: colors.border,
  },

  editButton: {
    marginTop: 35,
    backgroundColor: colors.textPrimary,
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
  },

  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
