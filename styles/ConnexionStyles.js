import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 24,
  },

  card: {
    width: "84%",
    alignItems: "center",
  },

  logo: {
    fontSize: 42,
    fontWeight: "800",
    color: "#A7333F",
    marginBottom: 8,
  },

  title: {
    fontSize: 18,
    fontWeight: "500",
    color: "#444",
    marginBottom: 24,
  },

  input: {
    width: "100%",
    height: 46,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 12,
    color: "#333",
  },

  passwordContainer: {
    width: "100%",
    height: 46,
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    paddingHorizontal: 14,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: "#333",
  },

  forgotPassword: {
    color: "#A7333F",
    marginTop: 12,
    marginBottom: 16,
    textDecorationLine: "underline",
    fontSize: 14,
  },

  error: {
    width: "100%",
    color: "#b00020",
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
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },

  modalBox: {
    width: "85%",
    backgroundColor: "#fff",
    borderRadius: 12,
    padding: 20,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
  },

  modalText: {
    fontSize: 14,
    color: "#444",
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
});

export default styles;