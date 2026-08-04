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
    paddingTop: 35,
  },

  backButton: {
    marginTop: 10,
    marginBottom: 20,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
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

  iconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
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
    borderRadius: 14,
    alignItems: "center",
    ...shadow.card,
  },

  editButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "600",
  },
});
