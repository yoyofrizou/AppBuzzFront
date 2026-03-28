import { StyleSheet } from "react-native";

const BORDEAUX = "#8B2332";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  listContent: {
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 36,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  topBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },

  topBarSpacer: {
    width: 42,
    height: 42,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "flex-end",
  },

  profileSection: {
    alignItems: "center",
    marginTop: 6,
    marginBottom: 22,
  },

  avatar: {
    width: 104,
    height: 104,
    borderRadius: 52,
    marginBottom: 14,
  },

  avatarPlaceholder: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: BORDEAUX,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: 16,
  },

  contactButton: {
    minWidth: 150,
    backgroundColor: BORDEAUX,
    borderRadius: 28,
    paddingVertical: 13,
    paddingHorizontal: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  contactButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "700",
  },

  ratingCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  ratingCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 14,
  },

  averageRow: {
    alignItems: "center",
    marginBottom: 16,
  },

  averageValue: {
    fontSize: 30,
    fontWeight: "800",
    color: BORDEAUX,
    marginBottom: 6,
  },

  averageStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 6,
  },

  averageCount: {
    fontSize: 14,
    color: "#666666",
    fontWeight: "500",
  },

  distributionList: {
    marginTop: 8,
  },

  distributionRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  distributionRowActive: {
    backgroundColor: "#F0E4E7",
    paddingHorizontal: 8,
  },

  distributionLabel: {
    width: 72,
    fontSize: 14,
    color: "#333333",
    fontWeight: "600",
  },

  distributionLabelActive: {
    color: BORDEAUX,
    fontWeight: "700",
  },

  distributionBarTrack: {
    flex: 1,
    height: 9,
    backgroundColor: "#E4E4E4",
    borderRadius: 999,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  distributionBarFill: {
    height: "100%",
    backgroundColor: BORDEAUX,
    borderRadius: 999,
  },

  distributionCount: {
    width: 24,
    textAlign: "right",
    fontSize: 14,
    color: "#555555",
    fontWeight: "600",
  },

  distributionCountActive: {
    color: BORDEAUX,
    fontWeight: "700",
  },

  showAllText: {
    marginTop: 8,
    color: BORDEAUX,
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  },

  commentsHeader: {
    marginBottom: 10,
  },

  commentsTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
  },

  reviewCard: {
    backgroundColor: "#F7F7F7",
    borderRadius: 18,
    padding: 16,
    marginBottom: 12,
  },

  reviewHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 8,
  },

  reviewAuthor: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    marginRight: 10,
  },

  reviewDate: {
    fontSize: 13,
    color: "#777777",
  },

  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewComment: {
    fontSize: 14,
    color: "#333333",
    lineHeight: 21,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: "#666666",
  },

  emptyCommentsContainer: {
    paddingTop: 12,
    alignItems: "center",
  },

  emptyCommentsText: {
    fontSize: 14,
    color: "#777777",
    textAlign: "center",
  },
});