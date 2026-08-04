import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

const PRIMARY = colors.textPrimary;
const PRIMARY_LIGHT = colors.textSecondary;
const BACKGROUND = colors.backgroundAlt;
const WHITE = colors.surface;
const TEXT = colors.textPrimary;
const MUTED = colors.textSecondary;
const BORDER = colors.border;
const ERROR = colors.danger;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 22,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 24,
    fontWeight: "700",
    color: TEXT,
  },

  amountBox: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 20,
    marginBottom: 22,
    ...shadow.card,
  },

  amountLabel: {
    fontSize: 14,
    color: MUTED,
    marginBottom: 8,
  },

  amountValue: {
    fontSize: 30,
    fontWeight: "800",
    color: TEXT,
    marginBottom: 8,
  },

  amountHelper: {
    fontSize: 14,
    lineHeight: 20,
    color: MUTED,
  },

  scroll: {
    flex: 1,
  },

  sectionTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: TEXT,
    marginBottom: 14,
  },

  cardBox: {
    backgroundColor: PRIMARY,
    borderRadius: 20,
    padding: 18,
    marginBottom: 14,
    ...shadow.card,
  },

  cardChip: {
    width: 30,
    height: 20,
    borderRadius: 5,
    backgroundColor: colors.mintSoft,
    marginBottom: 14,
  },

  cardText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 6,
  },

  cardMeta: {
    fontSize: 14,
    color: colors.onDarkMuted,
  },

  linkRow: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: WHITE,
    borderRadius: 14,
    paddingVertical: 14,
    paddingHorizontal: 16,
    marginBottom: 10,
    ...shadow.card,
  },

  linkRowText: {
    flex: 1,
    fontSize: 15,
    fontWeight: "600",
    color: TEXT,
    marginLeft: 12,
  },

  primaryButton: {
    backgroundColor: PRIMARY,
    minHeight: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
    paddingHorizontal: 16,
    ...shadow.card,
  },

  primaryButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  secondaryButton: {
    backgroundColor: WHITE,
    minHeight: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.border,
    paddingHorizontal: 16,
  },

  secondaryButtonText: {
    color: PRIMARY,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  mainButton: {
    backgroundColor: PRIMARY,
    minHeight: 58,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    paddingHorizontal: 18,
    ...shadow.elevated,
  },

  mainButtonText: {
    color: WHITE,
    fontSize: 17,
    fontWeight: "800",
  },

  errorText: {
    color: ERROR,
    marginTop: 14,
    fontSize: 14,
    lineHeight: 20,
  },
});
