import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F9F7F7",
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
    color: "#800020",
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
    backgroundColor: "#DDD8DC",
  },

  plusBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: "#800020",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    elevation: 3,
  },

  plusText: {
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
    lineHeight: 20,
  },

  name: {
    fontSize: 21,
    fontWeight: "800",
    marginBottom: 28,
    color: "#800020",
    textAlign: "center",
  },

  button: {
    width: "86%",
    height: 58,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 18,
    marginBottom: 14,
    borderWidth: 1,
    borderColor: "#EFE7EA",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 8,
    elevation: 2,
  },

  buttonText: {
    fontSize: 16,
    color: "#4A4A4A",
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
    color: "#800020",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  deleteText: {
    color: "#A11A2B",
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalBox: {
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 18,
    padding: 22,
    alignItems: "center",
  },

  modalText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: "#222",
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
    color: "#800020",
  },
  buttonLeft: {
  flexDirection: "row",
  alignItems: "center",
},
warningIcon: {
  marginLeft: 8,
},
});