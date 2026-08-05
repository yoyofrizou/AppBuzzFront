import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 8,
    paddingBottom: 6,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerSpacer: {
    width: 40,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 60,
  },

  sectionLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 26,
  },

  menuCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.card,
  },

  button: {
    width: "100%",
    minHeight: 62,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
  },

  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 66,
  },

  menuIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  menuIconBadgeDanger: {
    backgroundColor: "#F6E2DF",
  },

  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  buttonTextDanger: {
    color: colors.danger,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalBox: {
    width: "80%",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 22,
    alignItems: "center",
    ...shadow.card,
  },

  modalText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: colors.textPrimary,
    lineHeight: 24,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },
});
