import { StyleSheet } from "react-native";
import { colors } from "./theme";

const BORDEAUX = colors.textPrimary;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  header: {
    height: 64,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  headerSpacer: {
    width: 42,
    height: 42,
  },

  closeButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    justifyContent: "center",
    alignItems: "center",
  },

  pageTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  content: {
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  profileCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    marginBottom: 16,
  },

  driverImage: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 14,
  },

  driverPlaceholder: {
    width: 92,
    height: 92,
    borderRadius: 46,
    marginBottom: 14,
    backgroundColor: BORDEAUX,
    alignItems: "center",
    justifyContent: "center",
  },

  driverName: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },

  starsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  averageText: {
    fontSize: 18,
    fontWeight: "800",
    color: BORDEAUX,
    marginBottom: 4,
  },

  totalText: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
    marginBottom: 14,
  },

  carBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.fill,
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  carText: {
    marginLeft: 8,
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: "600",
    flexShrink: 1,
  },

  sectionCard: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  histogramRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },

  histogramRowActive: {
    backgroundColor: colors.mintSoft,
    paddingHorizontal: 8,
  },

  histogramLabel: {
    width: 72,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  histogramLabelActive: {
    color: BORDEAUX,
    fontWeight: "800",
  },

  histogramBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: colors.fill,
    borderRadius: 999,
    overflow: "hidden",
    marginHorizontal: 10,
  },

  histogramBarFill: {
    height: 10,
    backgroundColor: BORDEAUX,
    borderRadius: 999,
  },

  histogramCount: {
    width: 24,
    textAlign: "right",
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "700",
  },

  histogramCountActive: {
    color: BORDEAUX,
    fontWeight: "800",
  },

  showAllText: {
    marginTop: 10,
    color: BORDEAUX,
    fontSize: 14,
    fontWeight: "700",
    textDecorationLine: "underline",
    alignSelf: "flex-start",
  },

  reviewCard: {
    backgroundColor: colors.fill,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },

  reviewHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  reviewAvatarWrapper: {
    marginRight: 10,
  },

  reviewAvatar: {
    width: 42,
    height: 42,
    borderRadius: 21,
  },

  reviewAvatarFallback: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: BORDEAUX,
    alignItems: "center",
    justifyContent: "center",
  },

  reviewHeaderContent: {
    flex: 1,
  },

  reviewerName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  reviewDate: {
    fontSize: 12,
    color: colors.textSecondary,
    marginTop: 2,
  },

  reviewStarsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },

  reviewRatingText: {
    marginLeft: 4,
    fontSize: 13,
    fontWeight: "700",
    color: BORDEAUX,
  },

  reviewComment: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  rideCard: {
    backgroundColor: colors.fill,
    borderRadius: 18,
    padding: 14,
    marginBottom: 12,
  },

  rideDate: {
    fontSize: 14,
    fontWeight: "800",
    color: BORDEAUX,
    marginBottom: 10,
  },

  rideRouteLabel: {
    fontSize: 12,
    fontWeight: "800",
    color: BORDEAUX,
    marginBottom: 3,
    marginTop: 6,
  },

  rideRouteText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  rideFooter: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 14,
  },

  ridePrice: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  rideSeats: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
  },
});
