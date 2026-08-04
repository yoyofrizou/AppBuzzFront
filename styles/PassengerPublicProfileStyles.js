import { StyleSheet } from "react-native";
import { colors } from "./theme";

const BORDEAUX = colors.textPrimary;

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
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
    borderWidth: 3,
    borderColor: colors.mintSoft,
  },

  avatarPlaceholder: {
    width: 104,
    height: 104,
    borderRadius: 52,
    backgroundColor: BORDEAUX,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 14,
    borderWidth: 3,
    borderColor: colors.mintSoft,
  },

  name: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
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
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
  },

  ratingCard: {
    backgroundColor: colors.fill,
    borderRadius: 20,
    padding: 18,
    marginBottom: 20,
  },

  ratingCardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
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
    color: colors.textSecondary,
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
    backgroundColor: colors.mintSoft,
    paddingHorizontal: 8,
  },

  distributionLabel: {
    width: 72,
    fontSize: 14,
    color: colors.textPrimary,
    fontWeight: "600",
  },

  distributionLabelActive: {
    color: BORDEAUX,
    fontWeight: "700",
  },

  distributionBarTrack: {
    flex: 1,
    height: 9,
    backgroundColor: colors.border,
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
    color: colors.textSecondary,
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
    color: colors.textPrimary,
  },

  reviewCard: {
    backgroundColor: colors.fill,
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
    color: colors.textPrimary,
    marginRight: 10,
  },

  reviewDate: {
    fontSize: 13,
    color: colors.textSecondary,
  },

  reviewStars: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewComment: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyText: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  emptyCommentsContainer: {
    paddingTop: 12,
    alignItems: "center",
  },

  emptyCommentsText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
  },
});
