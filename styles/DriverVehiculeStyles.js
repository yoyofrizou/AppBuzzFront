import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    paddingTop: 35,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  backButton: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 18,
    textAlign: "center",
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: colors.fill,
    marginBottom: 12,
    color: colors.textPrimary,
  },

  dropdownBlock: {
    marginBottom: 12,
  },

  dropdownButton: {
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 12,
    backgroundColor: colors.fill,
    minHeight: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownButtonDisabled: {
    backgroundColor: colors.neutralLight,
    borderColor: colors.border,
  },

  dropdownButtonText: {
    fontSize: 15,
    color: colors.textPrimary,
    flex: 1,
    marginRight: 10,
  },

  dropdownPlaceholder: {
    color: colors.textSecondary,
  },

  dropdownDisabledText: {
    color: colors.textSecondary,
  },

  saveButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
    ...shadow.soft,
  },

  saveText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: "100%",
    maxHeight: "70%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 18,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 14,
  },

  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  modalOptionText: {
    fontSize: 16,
    color: colors.textPrimary,
  },

  modalCloseButton: {
    marginTop: 14,
    backgroundColor: colors.textPrimary,
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  modalCloseButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
