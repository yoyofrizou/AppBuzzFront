import { StyleSheet } from "react-native";

const BORDEAUX = "#8B2332";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F4F4F6",
    paddingHorizontal: 20,
    paddingTop: 35,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F6",
    paddingHorizontal: 24,
  },

  emptyText: {
    fontSize: 18,
    color: "#333333",
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingTop: 10,
  },

  backButton: {
    width: 36,
  },

  headerSpacer: {
    width: 36,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: BORDEAUX,
    textAlign: "center",
    flex: 1,
    marginHorizontal: 8,
  },

  stepText: {
    fontSize: 15,
    color: "#777777",
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 6,
    textAlign: "center",
  },

  summarySubtitle: {
    fontSize: 14,
    color: "#666666",
    marginBottom: 12,
    textAlign: "center",
  },

  paidAmountLabel: {
    fontSize: 14,
    color: "#777777",
    marginBottom: 4,
  },

  paidAmountValue: {
    fontSize: 26,
    fontWeight: "800",
    color: BORDEAUX,
  },

  passengerCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 22,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },

  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: BORDEAUX,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  passengerName: {
    fontSize: 19,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
  },

  question: {
    fontSize: 21,
    fontWeight: "700",
    color: "#1F1F1F",
    textAlign: "center",
    marginBottom: 18,
  },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 26,
  },

  commentLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1F1F1F",
    marginBottom: 10,
  },

  input: {
    minHeight: 120,
    backgroundColor: "#FFFFFF",
    borderWidth: 1.5,
    borderColor: BORDEAUX,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: "#1F1F1F",
    textAlignVertical: "top",
    marginBottom: 24,
  },

  submitButton: {
    backgroundColor: BORDEAUX,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
    shadowColor: BORDEAUX,
    shadowOpacity: 0.18,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  submitButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },
});
