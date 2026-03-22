import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#fff",
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
    fontSize: 22,
    fontWeight: "800",
    color: "#800020",
    marginBottom: 12,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 14,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },

  input: {
    borderBottomWidth: 1,
    borderColor: "#DDD",
    paddingVertical: 10,
    marginBottom: 18,
    fontSize: 16,
  },

  saveButton: {
    backgroundColor: "#800020",
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: "center",
    marginTop: 30,
  },

  saveText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 16,
  },
});