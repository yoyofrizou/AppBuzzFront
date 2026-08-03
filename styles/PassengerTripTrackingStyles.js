import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  topBar: {
    backgroundColor: colors.textPrimary,
    paddingTop: 58,
    paddingBottom: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topBarBack: {
    width: 36,
    alignItems: "flex-start",
  },

  topBarTitle: {
    color: colors.white,
    fontSize: 26,
    fontWeight: "800",
  },

  topBarSpacer: {
    width: 36,
  },

  map: {
    width: "100%",
    height: 300,
  },

  startDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.white,
    borderWidth: 6,
    borderColor: "#2D9CDB",
  },

  destinationPinWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  carMarker: {
    width: 42,
    height: 42,
  },

  carMarkerContainer: {
    backgroundColor: colors.white,
    padding: 6,
    borderRadius: 20,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },

  bottomSheet: {
    backgroundColor: colors.surface,
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 28,
    minHeight: 280,
  },

  etaTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  etaSubtitle: {
    fontSize: 16,
    color: colors.textSecondary,
    marginBottom: 18,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 16,
  },

  passengersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  passengerItem: {
    alignItems: "center",
    width: 120,
  },

  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: colors.fill,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  passengerName: {
    fontSize: 15,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 4,
  },

  passengerState: {
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: "center",
  },

  primaryButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "800",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 16,
  },

  infoCard: {
    backgroundColor: colors.fill,
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 14,
    marginBottom: 12,
  },

  infoTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  infoText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 2,
  },

  infoSubtext: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  arrivedButton: {
    backgroundColor: colors.textPrimary,
    paddingVertical: 13,
    borderRadius: 28,
    alignItems: "center",
    marginTop: 8,
  },

  arrivedButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },
});
