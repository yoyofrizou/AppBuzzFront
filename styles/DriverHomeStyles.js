import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  topContainer: {
    paddingTop: 55,
    paddingHorizontal: 20,
    backgroundColor: colors.background,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logoGroup: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  profileIcon: {},

  searchBar: {
    height: 58,
    borderRadius: 29,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    paddingLeft: 20,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  searchPlaceholder: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
  },

  searchBarIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
  },

  locationWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 10,
  },

  warningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },

  locationWarningText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },

  mapContainer: {
    flex: 1,
    position: "relative",
  },

  map: {
    flex: 1,
  },

  driverMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.white,
  },

  calloutContainer: {
    width: 180,
    padding: 4,
  },

  calloutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  calloutText: {
    fontSize: 12,
    color: "#444",
  },

  switchModeToggle: {
    position: "absolute",
    bottom: 110,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: 4,
    ...shadow.soft,
  },

  switchModeSegment: {
    paddingVertical: 16,
    paddingHorizontal: 32,
    borderRadius: 30,
  },

  switchModeSegmentActive: {
    backgroundColor: colors.mint,
  },

  switchModeSegmentText: {
    color: colors.textPrimary,
    fontSize: 17,
    fontWeight: "500",
  },

  switchModeSegmentTextActive: {
    fontWeight: "800",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "90%",
    maxWidth: 380,
    alignSelf: "center",
    backgroundColor: colors.surface,
    borderRadius: 22,
    padding: 22,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
    textAlign: "center",
  },

  modalText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
  },

  allowButton: {
    flex: 1,
    marginRight: 6,
    backgroundColor: colors.textPrimary,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  allowButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  denyButton: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: colors.neutralLight,
    paddingVertical: 14,
    paddingHorizontal: 8,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  denyButtonText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center",
  },

  driverWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginBottom: 12,
    gap: 10,
  },

  driverWarningText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
  },
});
