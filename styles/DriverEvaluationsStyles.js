import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
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
    backgroundColor: colors.backgroundAlt,
  },

  pageTitle: {
    fontSize: 22,
    marginTop: 40,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
  },

  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 28,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 18,
    ...shadow.card,
  },

  averageText: {
    fontSize: 42,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  averageStarsRow: {
    flexDirection: "row",
    marginBottom: 8,
  },

  totalText: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  histogramCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    marginBottom: 18,
    ...shadow.card,
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
    color: colors.textPrimary,
  },

  histogramBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: colors.fill,
    borderRadius: 999,
    marginHorizontal: 12,
    overflow: "hidden",
  },

  histogramBarFill: {
    height: "100%",
    backgroundColor: colors.textPrimary,
    borderRadius: 999,
  },

  histogramCount: {
    width: 20,
    textAlign: "right",
    fontSize: 14,
    color: colors.textSecondary,
  },

  reviewCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    padding: 16,
    flexDirection: "row",
    marginBottom: 14,
    ...shadow.card,
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
    backgroundColor: colors.textPrimary,
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
    color: colors.textPrimary,
    flex: 1,
    marginRight: 8,
  },

  reviewDate: {
    fontSize: 12,
    color: colors.textSecondary,
  },

  reviewStarsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewRatingText: {
    marginLeft: 6,
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  reviewComment: {
    fontSize: 16,
    color: colors.textPrimary,
    lineHeight: 22,
  },
});
