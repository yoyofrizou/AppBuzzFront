import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  topContainer: {
    backgroundColor: colors.background,
    paddingTop: 70,
    paddingHorizontal: 25,
    paddingBottom: 18,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    zIndex: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  profileIcon: {
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 29,
    height: 58,
    paddingLeft: 20,
    paddingRight: 6,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
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

  mapContainer: {
    flex: 1,
    marginTop: -15,
  },

  map: {
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
    backgroundColor: colors.overlay,
  },

  modalCard: {
    width: "100%",
    maxWidth: 335,
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 24,
    ...shadow.card,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 12,
  },

  modalText: {
    fontSize: 16,
    color: colors.textSecondary,
    lineHeight: 24,
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  allowButton: {
    flex: 1,
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
  },

  allowButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
    textAlign: "center",
  },

  denyButton: {
    flex: 1,
    backgroundColor: colors.surface,
    borderRadius: 16,
    height: 56,
    paddingHorizontal: 8,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
  },

  denyButtonText: {
    color: colors.textSecondary,
    fontSize: 17,
    fontWeight: "600",
    textAlign: "center",
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

  footer: {
    height: 85,
    backgroundColor: colors.surface,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 6,
    ...shadow.card,
  },

  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },

  footerActiveText: {
    marginTop: 6,
    fontSize: 15,
    color: colors.textPrimary,
    fontWeight: "600",
  },

  footerText: {
    marginTop: 6,
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: "500",
  },

  locationWarning: {
    marginTop: 14,
    backgroundColor: colors.surface,
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    borderWidth: 1,
    borderColor: colors.border,
  },

  warningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
  },

  locationWarningText: {
    color: colors.textPrimary,
    fontSize: 13,
    fontWeight: "500",
    flex: 1,
    lineHeight: 20,
  },
});

export default styles;
