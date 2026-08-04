import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  map: {
    flex: 1,
  },

  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingTop: 55,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
  },

  backButton: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  logo: {
    fontSize: 28,
    fontWeight: "800",
    color: colors.mint,
    letterSpacing: 1,
  },

  profileButton: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  searchRecap: {
    minHeight: 52,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    ...shadow.card,
  },

  searchRecapText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "500",
  },

  priceMarker: {
    minWidth: 62,
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: colors.white,
    ...shadow.soft,
  },

  priceMarkerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  priceMarkerPrice: {
    color: colors.white,
    fontWeight: "800",
    fontSize: 13,
  },

  priceMarkerTime: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },

  resultsBadge: {
    position: "absolute",
    top: 150,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    zIndex: 15,
    ...shadow.card,
  },

  resultsBadgeText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 13,
  },

  emptyOverlay: {
    position: "absolute",
    left: 20,
    right: 20,
    top: "35%",
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    zIndex: 30,
    ...shadow.card,
  },

  emptyIconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 14,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 18,
  },

  emptyButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },

  emptyButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "800",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    ...shadow.card,
  },

  modalHandle: {
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: colors.border,
    alignSelf: "center",
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.fill,
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: colors.border,
  },

  driverImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  driverPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
  },

  driverInfo: {
    flex: 1,
  },

  driverLabel: {
    fontSize: 12,
    color: colors.textSecondary,
    marginBottom: 3,
    fontWeight: "500",
  },

  driverName: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  driverRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
    alignSelf: "flex-start",
  },

  driverStarsRow: {
    flexDirection: "row",
    marginRight: 6,
  },

  driverRatingText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "700",
    marginRight: 6,
  },

  driverRatingCountText: {
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "500",
  },

  modalDateTime: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 14,
  },

  modalAddressBlock: {
    marginBottom: 12,
  },

  modalAddressLabel: {
    fontSize: 13,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  modalAddressText: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 20,
  },

  modalRoute: {
    fontSize: 15,
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: "500",
  },

  modalMeta: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 16,
  },

  modalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 18,
    paddingVertical: 4,
  },

  modalPrice: {
    fontSize: 30,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  modalSeats: {
    fontSize: 14,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  modalDescription: {
    fontSize: 14,
    color: colors.textPrimary,
    lineHeight: 21,
    marginBottom: 16,
  },

  validateButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },

  validateButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },

  validateButtonDisabled: {
    opacity: 0.7,
  },

  addressRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 4,
  },

  walkingTimeText: {
    fontSize: 13,
    color: colors.textPrimary,
    fontWeight: "600",
  },
});
