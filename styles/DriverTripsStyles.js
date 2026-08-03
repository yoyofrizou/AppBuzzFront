import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  topBar: {
    height: 140,
    backgroundColor: colors.backgroundAlt,
    paddingTop: 55,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarTitle: {
    color: colors.textPrimary,
    fontSize: 22,
    fontWeight: "800",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -16,
  },

  createButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
    ...shadow.soft,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },

  tabsWrapper: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: colors.fill,
    borderRadius: 26,
    padding: 4,
    marginBottom: 22,
    width: "78%",
  },

  tabButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  tabButtonActive: {
    backgroundColor: colors.mint,
  },

  tabButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  tabButtonTextActive: {
    color: colors.textPrimary,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    paddingBottom: 110,
    flexGrow: 1,
  },

  rideCard: {
    backgroundColor: colors.surface,
    borderRadius: 26,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 18,
    ...shadow.card,
  },

  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  rideHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },

  rideRouteText: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 4,
  },

  rideDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 14,
  },

  rideFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ridePrice: {
    fontSize: 24,
    fontWeight: "900",
    color: colors.textPrimary,
  },

  rideSeats: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textSecondary,
  },

  rideDescription: {
    marginTop: 12,
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  passengersSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  passengersSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
  },

  noPassengersText: {
    fontSize: 14,
    color: colors.textSecondary,
    lineHeight: 20,
    marginBottom: 12,
  },

  startRideButton: {
    marginTop: 14,
    backgroundColor: colors.textPrimary,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },

  startRideButtonDisabled: {
    backgroundColor: colors.neutralLight,
    opacity: 0.9,
  },

  startRideButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  startRideButtonTextDisabled: {
    color: colors.textSecondary,
  },

  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 18,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },

  emptyButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
  },

  emptySecondaryButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptySecondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 14,
    fontWeight: "800",
  },

  passengersGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: 12,
  },

  passengerCard: {
    width: "47%",
    backgroundColor: colors.fill,
    borderRadius: 18,
    padding: 12,
    alignItems: "center",
    marginBottom: 10,
    gap: 6,
  },

  passengerAvatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    marginBottom: 10,
  },

  passengerAvatarPlaceholder: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  passengerCardName: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 6,
    maxWidth: "100%",
  },

  passengerCardStatus: {
    fontSize: 12,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 10,
  },

  passengerCardButtons: {
    width: "100%",
    gap: 8,
    alignItems: "center",
  },

  passengerCardPrimaryButton: {
    width: "100%",
    backgroundColor: colors.textPrimary,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  passengerCardPrimaryButtonText: {
    color: colors.white,
    fontSize: 13,
    fontWeight: "800",
    textAlign: "center",
  },

  passengerCardSecondaryButton: {
    width: "100%",
    maxWidth: 140,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  passengerCardSecondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 12,
    fontWeight: "800",
    textAlign: "center",
  },

  lockedRideText: {
    marginTop: 10,
    color: colors.textSecondary,
    fontSize: 13,
    fontWeight: "600",
  },

  rideDateTimeText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "700",
    marginBottom: 6,
  },

  cancelRideButton: {
    marginTop: 10,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.danger,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
  },

  cancelRideButtonDisabled: {
    opacity: 0.6,
  },

  cancelRideButtonText: {
    color: colors.danger,
    fontWeight: "700",
    fontSize: 15,
  },

  cancelRideButtonTextDisabled: {
    color: colors.textSecondary,
  },
});
