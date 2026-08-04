import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  hero: {
    backgroundColor: colors.background,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    paddingTop: 30,
    paddingBottom: 28,
    alignItems: "center",
    ...shadow.card,
  },

  header: {
    position: "relative",
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
  },

  backButtonWrapper: {
    position: "absolute",
    left: 12,
    top: -6,
    zIndex: 2,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  container: {
    alignItems: "center",
    paddingTop: 24,
    paddingHorizontal: 20,
    paddingBottom: 140,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 14,
  },

  avatar: {
    width: 116,
    height: 116,
    borderRadius: 58,
    borderWidth: 4,
    borderColor: colors.mintSoft,
  },

  avatarPlaceholder: {
    width: 116,
    height: 116,
    borderRadius: 58,
    backgroundColor: colors.placeholder,
    borderWidth: 4,
    borderColor: colors.mintSoft,
  },

  plusBadge: {
    position: "absolute",
    bottom: 2,
    right: 2,
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.background,
    ...shadow.soft,
  },

  plusText: {
    color: colors.textPrimary,
    fontSize: 18,
    fontWeight: "bold",
  },

  verifiedBadge: {
    position: "absolute",
    top: 2,
    left: 2,
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: colors.background,
    ...shadow.soft,
  },

  name: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  sectionLabel: {
    width: "100%",
    fontSize: 13,
    fontWeight: "700",
    color: colors.textSecondary,
    textTransform: "uppercase",
    letterSpacing: 0.6,
    marginBottom: 10,
    marginTop: 26,
  },

  menuCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
    ...shadow.card,
  },

  button: {
    width: "100%",
    minHeight: 62,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    gap: 14,
  },

  menuDivider: {
    height: 1,
    backgroundColor: colors.border,
    marginLeft: 66,
  },

  menuIconBadgeWrapper: {
    position: "relative",
  },

  menuIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  menuIconBadgeDanger: {
    backgroundColor: "#F6E2DF",
  },

  menuWarningDot: {
    position: "absolute",
    top: -2,
    right: -2,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.danger,
    borderWidth: 2,
    borderColor: colors.surface,
  },

  buttonText: {
    flex: 1,
    fontSize: 16,
    fontWeight: "600",
    color: colors.textPrimary,
  },

  buttonTextDanger: {
    color: colors.danger,
  },

  bottomContainer: {
    display: "none",
  },

  logoutText: {
    color: colors.textPrimary,
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  deleteText: {
    color: colors.danger,
    textDecorationLine: "underline",
    fontSize: 15,
    fontWeight: "500",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalBox: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    padding: 22,
    alignItems: "center",
    ...shadow.card,
  },

  modalText: {
    fontSize: 17,
    textAlign: "center",
    marginBottom: 20,
    color: colors.textPrimary,
    lineHeight: 24,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
  },

  modalButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },

  modalButtonText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  buttonLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  warningIcon: {
    marginLeft: 8,
  },
});
