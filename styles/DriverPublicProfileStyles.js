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
    paddingHorizontal: 16,
    paddingBottom: 30,
  },

  profileCard: {
    backgroundColor: "#FFFFFF",
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
    color: "#1F1F1F",
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
    color: "#666666",
    fontWeight: "600",
    marginBottom: 14,
  },

  carBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F4F5",
    borderRadius: 16,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },

  carText: {
    marginLeft: 8,
    fontSize: 13,
    color: "#333333",
    fontWeight: "600",
    flexShrink: 1,
  },

  sectionCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 18,
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 14,
  },

  histogramRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },

  histogramLabel: {
    width: 28,
    fontSize: 14,
    fontWeight: "700",
    color: "#333333",
  },

  histogramBarBackground: {
    flex: 1,
    height: 10,
    backgroundColor: "#ECECEC",
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
    width: 22,
    textAlign: "right",
    fontSize: 13,
    color: "#666666",
    fontWeight: "700",
  },

  reviewCard: {
    backgroundColor: "#FAFAFA",
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
    color: "#1F1F1F",
  },

  reviewDate: {
    fontSize: 12,
    color: "#777777",
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
    color: "#444444",
    lineHeight: 20,
  },

  rideCard: {
    backgroundColor: "#FAFAFA",
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
    color: "#2E2E2E",
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
    color: "#1F1F1F",
  },

  rideSeats: {
    fontSize: 13,
    color: "#666666",
    fontWeight: "700",
  },

  emptyText: {
    fontSize: 14,
    color: "#666666",
    lineHeight: 20,
  },
});