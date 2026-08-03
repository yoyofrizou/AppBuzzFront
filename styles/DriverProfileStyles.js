import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 26,
    paddingBottom: 10,
    paddingHorizontal: 20,
  },

  backButtonWrapper: {
    position: "absolute",
    left: 12,
    top: 18,
    zIndex: 2,
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
  },

  container: {
    alignItems: "center",
    paddingTop: 38,
    paddingHorizontal: 20,
    paddingBottom: 150,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 18,
  },

  avatar: {
    width: 108,
    height: 108,
    borderRadius: 54,
  },

  avatarPlaceholder: {
    width: 108,
    height: 108,
    borderRadius: 54,
    backgroundColor: colors.placeholder,
  },

  plusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
    ...shadow.soft,
  },

  plusText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
  },

  name: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 28,
    color: colors.textPrimary,
    textAlign: "center",
  },

  button: {
    width: "86%",
    height: 58,
    backgroundColor: colors.surface,
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  buttonText: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "500",
  },

  bottomContainer: {
    position: "absolute",
    bottom: 32,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 28,
  },

  logoutText: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  deleteText: {
    color: colors.danger,
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalBox: {
    width: "100%",
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
    fontWeight: "700",
    color: colors.textPrimary,
  },

  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  warningIcon: {
    marginLeft: 8,
  },
});
