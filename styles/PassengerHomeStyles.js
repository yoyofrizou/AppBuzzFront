import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

export const ACCENT = "#A855F7";
export const ACCENT_DARK = "#1C1030";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  floatButton: {
    position: "absolute",
    top: 54,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: colors.white,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 5,
    ...shadow.soft,
  },

  floatButtonLeft: {
    left: 16,
  },

  floatButtonRight: {
    right: 16,
  },

  mapContainer: {
    flex: 1,
    position: "relative",
  },

  map: {
    flex: 1,
  },

  pinColumn: {
    alignItems: "center",
  },

  pinBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    backgroundColor: ACCENT_DARK,
    borderRadius: 12,
    paddingVertical: 7,
    paddingHorizontal: 12,
    ...shadow.soft,
  },

  pinBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },

  pinDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: ACCENT_DARK,
    marginTop: 4,
  },

  panel: {
    backgroundColor: ACCENT,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    marginTop: -22,
    paddingHorizontal: 22,
    paddingTop: 24,
    paddingBottom: 110,
    zIndex: 4,
    ...shadow.elevated,
  },

  panelTopRow: {
    marginBottom: 16,
  },

  switchModeToggle: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: colors.surface,
    borderRadius: 30,
    padding: 4,
    zIndex: 5,
    ...shadow.soft,
  },

  switchModeSegment: {
    paddingVertical: 14,
    paddingHorizontal: 26,
    borderRadius: 26,
  },

  switchModeSegmentActive: {
    backgroundColor: ACCENT,
  },

  switchModeSegmentText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "500",
  },

  switchModeSegmentTextActive: {
    color: colors.white,
    fontWeight: "800",
  },

  headline: {
    fontSize: 24,
    fontWeight: "900",
    textTransform: "uppercase",
    color: colors.white,
    lineHeight: 28,
    marginBottom: 18,
  },

  searchBar: {
    height: 56,
    borderRadius: 18,
    backgroundColor: colors.white,
    paddingLeft: 20,
    paddingRight: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  searchPlaceholder: {
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  searchBarIcon: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: ACCENT_DARK,
    justifyContent: "center",
    alignItems: "center",
  },

  locationWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.14)",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 14,
    marginTop: 12,
    gap: 10,
  },

  locationWarningText: {
    flex: 1,
    color: colors.white,
    fontSize: 13,
    fontWeight: "500",
  },

  warningDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.danger,
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
});

export default styles;
