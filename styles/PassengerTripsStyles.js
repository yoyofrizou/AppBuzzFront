import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topBarBack: {
    width: 36,
  },

  topBarTitle: {
    color: colors.textPrimary,
    fontSize: 26,
    fontWeight: "800",
    letterSpacing: 0.2,
  },

  topBarSpacer: {
    width: 36,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -16,
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
    ...shadow.soft,
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
  },

  tripCard: {
    backgroundColor: colors.surface,
    borderRadius: 24,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 18,
    marginBottom: 18,
    ...shadow.elevated,
  },

  tripLeft: {
    width: "100%",
    marginBottom: 14,
  },

  tripMiddle: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },

  tripRight: {
    width: "100%",
  },

  tripRouteText: {
    fontSize: 14,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  routeTimeline: {
    flexDirection: "row",
    marginTop: 10,
    marginBottom: 4,
  },

  routeIndicators: {
    width: 16,
    alignItems: "center",
    paddingVertical: 4,
  },

  routeDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.mint,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },

  routeConnector: {
    width: 2,
    flex: 1,
    minHeight: 18,
    backgroundColor: colors.border,
    marginVertical: 4,
    borderRadius: 1,
  },

  routeDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },

  routeTextColumn: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "space-between",
  },

  routeAddressRow: {
    minHeight: 22,
    justifyContent: "center",
  },

  routeAddressText: {
    fontSize: 14,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  tripDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 10,
  },

  tripPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: colors.textPrimary,
    marginTop: 4,
  },

  driverImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
    borderWidth: 3,
    borderColor: colors.mintSoft,
  },

  driverPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
    borderWidth: 3,
    borderColor: colors.mintSoft,
  },

  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  driverCar: {
    fontSize: 12,
    color: colors.textSecondary,
    lineHeight: 17,
  },

  actionButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
    ...shadow.soft,
  },

  actionButtonText: {
    color: colors.white,
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  emptyContainer: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 28,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
    ...shadow.card,
  },

  emptyIconBadge: {
    width: 88,
    height: 88,
    borderRadius: 44,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 18,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
    paddingTop: 6,
  },

  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },

  footerText: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  footerTextActive: {
    marginTop: 4,
    fontSize: 12,
    color: colors.textPrimary,
    fontWeight: "700",
  },

  actionButtonDisabled: {
    backgroundColor: colors.neutralLight,
  },

  actionButtonTextDisabled: {
    color: colors.textSecondary,
  },

  secondaryActionButton: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
  },

  secondaryActionButtonText: {
    color: colors.textPrimary,
  },

  manualWarningBox: {
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: colors.fill,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    padding: 12,
  },

  manualWarningTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 6,
  },

  manualWarningText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textSecondary,
  },

  validationInfoBox: {
    marginTop: 14,
    marginBottom: 10,
    backgroundColor: colors.mintSoft,
    borderWidth: 1,
    borderColor: colors.mint,
    borderRadius: 14,
    padding: 12,
  },

  validationInfoTitle: {
    fontSize: 14,
    fontWeight: "800",
    color: colors.success,
    marginBottom: 6,
  },

  validationInfoText: {
    fontSize: 12,
    lineHeight: 18,
    color: colors.textPrimary,
  },

  tripMainRow: {
    width: "100%",
  },

  tripDateTimeText: {
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "700",
    marginBottom: 6,
  },

  tripStatus: {
    marginTop: 6,
    fontSize: 13,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  tripStatusCancelled: {
    color: colors.danger,
  },
});
