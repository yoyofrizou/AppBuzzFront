import { StyleSheet, Platform } from "react-native";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#f4f4f4",
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 30,
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
    marginBottom: 18,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 18,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: "#d8d8d8",
    borderWidth: 3,
    borderColor: "#ececec",
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: "#ececec",
  },

  plusBadge: {
    position: "absolute",
    right: -2,
    bottom: 4,
    width: 22,
    height: 22,
    borderRadius: 11,
    backgroundColor: "#A7333F",
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
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

  passwordInfo: {
    width: "100%",
    color: "#000",
    fontSize: 12,
    lineHeight: 17,
    marginTop: -2,
    marginBottom: 12,
  },

  passwordInfoError: {
    color: "#b00020",
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
  top: Platform.OS === "ios" ? 60 : 30,
  left: 20,
  zIndex: 20,
  padding: 8,
},
});

export default styles;