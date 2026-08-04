import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background,
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 35,
    paddingBottom: 40,
  },

  backButton: {
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },

  rowCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    ...shadow.card,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  rowIcon: {
    marginRight: 10,
  },

  statusBadge: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  statusBadgeDone: {
    backgroundColor: colors.success,
  },

  statusBadgeMissing: {
    backgroundColor: "#F6E2DF",
  },

  rowTitle: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
    flexShrink: 1,
  },

  actionButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 95,
    alignItems: "center",
  },

  actionButtonDone: {
    backgroundColor: colors.success,
  },

  actionButtonText: {
    color: colors.white,
    fontWeight: "600",
    fontSize: 14,
  },

  helperText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: colors.textSecondary,
    textAlign: "center",
  },

  saveButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 28,
  },

  saveButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },

  saveButtonDisabled: {
    opacity: 0.5,
  },
});
