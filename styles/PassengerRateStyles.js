import { StyleSheet } from "react-native";

const BORDEAUX = "#8B2332";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 24,
    paddingTop: 60,
  },

  header: {
    alignItems: "center",
    marginBottom: 28,
  },

  headerTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: BORDEAUX,
  },

  driverCard: {
    alignItems: "center",
    marginBottom: 28,
  },

  avatarPlaceholder: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: BORDEAUX,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  driverName: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1F1F1F",
    marginBottom: 4,
  },

  driverCar: {
    fontSize: 15,
    color: "#666666",
  },

  question: {
    fontSize: 22,
    fontWeight: "600",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 20,
  },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 28,
  },

  commentLabel: {
    fontSize: 18,
    fontWeight: "600",
    color: "#1F1F1F",
    marginBottom: 12,
  },

  input: {
    minHeight: 120,
    borderWidth: 1.5,
    borderColor: BORDEAUX,
    borderRadius: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F1F1F",
    textAlignVertical: "top",
    marginBottom: 24,
  },

  submitButton: {
    backgroundColor: BORDEAUX,
    borderRadius: 14,
    paddingVertical: 18,
    alignItems: "center",
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "700",
  },
});