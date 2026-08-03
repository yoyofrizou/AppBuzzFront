import { StyleSheet, Platform } from "react-native";
import { colors, radii, shadow } from "./theme";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "88%",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    paddingVertical: 32,
    paddingHorizontal: 24,
    ...shadow.card,
  },

  logo: {
    fontSize: 36,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.mint,
    marginBottom: 6,
  },

  title: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 26,
  },

  inputRow: {
    width: "100%",
    height: 52,
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inputField: {
    flex: 1,
    height: "100%",
    color: colors.textPrimary,
    fontSize: 15,
  },

  passwordContainer: {
    width: "100%",
    height: 52,
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: colors.textPrimary,
    fontSize: 15,
  },

  forgotPassword: {
    color: colors.textPrimary,
    marginTop: 12,
    marginBottom: 16,
    textDecorationLine: "underline",
    fontSize: 14,
  },

  error: {
    width: "100%",
    color: colors.danger,
    marginBottom: 10,
    marginTop: -4,
    fontSize: 13,
  },

  backButton: {
    position: "absolute",
    top: Platform.OS === "ios" ? 60 : 40,
    left: 20,
    zIndex: 20,
    padding: 8,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 22,
    ...shadow.card,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: colors.textPrimary,
  },

  modalText: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 15,
    textAlign: "center",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginTop: 10,
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  modalButtonTextMuted: {
    color: colors.textSecondary,
    fontSize: 15,
  },

  modalButtonTextStrong: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },
});

export default styles;
