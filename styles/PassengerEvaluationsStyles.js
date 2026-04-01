import { StyleSheet } from "react-native";

const BORDEAUX = "#8B2332";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F4F4F6",
  },

  screen: {
    flex: 1,
    backgroundColor: "#F4F4F6",
    paddingTop: 35,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 10,
  },

  backButton: {
    marginBottom: 50,
  },

  headerSpacer: {
    width: 36,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 40,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F4F4F6",
  },

  pageTitle: {
    fontSize: 22,
    marginTop: 40,
    fontWeight: "800",
    color: "#800020",
    textAlign: "center",
  },

  summaryCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  averageText: {
    fontSize: 42,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 14,
  },

  averageStarsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  totalText: {
    fontSize: 14,
    color: "#666666",
  },

  histogramCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  histogramRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  histogramLabel: {
    width: 28,
    fontSize: 14,
    fontWeight: "600",
    color: "#333333",
  },

  histogramBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#E8E8EC",
    borderRadius: 999,
    marginHorizontal: 12,
    overflow: "hidden",
  },

  histogramBarFill: {
    height: "100%",
    backgroundColor: BORDEAUX,
    borderRadius: 999,
  },

  histogramCount: {
    width: 20,
    textAlign: "right",
    fontSize: 14,
    color: "#555555",
  },

  reviewCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 14,
    shadowColor: "#000000",
    shadowOpacity: 0.06,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 2,
  },

  avatarWrapper: {
    marginRight: 14,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 27,
  },

  avatarFallback: {
    width: 54,
    height: 54,
    borderRadius: 27,
    backgroundColor: BORDEAUX,
    justifyContent: "center",
    alignItems: "center",
  },

  reviewContent: {
    flex: 1,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  reviewerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    flex: 1,
    marginRight: 8,
  },

  reviewDate: {
    fontSize: 12,
    color: "#888888",
  },

  reviewStarsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewRatingText: {
    marginLeft: 6,
    fontSize: 14,
    color: "#777777",
    fontWeight: "600",
  },

  reviewComment: {
    fontSize: 16,
    color: "#333333",
    lineHeight: 22,
  },
});