import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  screen: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  header: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 32,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerSpacer: {
    width: 32,
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#111111",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 12,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
  },

  driverName: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 10,
  },

  placeholderText: {
    fontSize: 14,
    lineHeight: 20,
    color: "#666666",
  },
});