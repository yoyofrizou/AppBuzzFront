import { StyleSheet } from "react-native";
import { colors } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
  },

  header: {
    position: "relative",
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 30,
    paddingHorizontal: 80,
  },

  backButtonWrapper: {
    position: "absolute",
    left: 12,
    top: 22,
    zIndex: 2,
  },

  headerTitle: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
    marginLeft: 6,
  },

  container: {
    alignItems: "center",
    paddingTop: 100,
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 30,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 20,
  },

  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },

  avatarPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: colors.placeholder,
  },

  plusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    color: colors.textPrimary,
    fontSize: 20,
    fontWeight: "bold",
  },

  name: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 30,
    color: colors.textPrimary,
  },

  button: {
    width: "80%",
    height: 55,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 15,
    marginBottom: 15,
  },

  buttonText: {
    fontSize: 16,
  },

  bottomContainer: {
    position: "absolute",
    bottom: 35,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 30,
  },

  logoutText: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
    fontSize: 16,
  },

  deleteText: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "80%",
    backgroundColor: colors.surface,
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
  },

  modalText: {
    fontSize: 18,
    textAlign: "center",
    marginBottom: 20,
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
  },
});
