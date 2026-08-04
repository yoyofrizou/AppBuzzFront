import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

const PRIMARY = colors.textPrimary;
const BACKGROUND = colors.backgroundAlt;
const WHITE = colors.surface;
const TEXT = colors.textPrimary;
const MUTED = colors.textSecondary;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  container: {
    flex: 1,
    padding: 20,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 22,
    fontWeight: "700",
    color: TEXT,
  },

  placeholder: {
    width: 38,
  },

  card: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 22,
    marginBottom: 24,
    ...shadow.card,
  },

  amountLabel: {
    fontSize: 15,
    color: MUTED,
    marginBottom: 8,
  },

  amountValue: {
    fontSize: 30,
    fontWeight: "800",
    color: TEXT,
    marginBottom: 14,
  },

  description: {
    fontSize: 15,
    color: MUTED,
    lineHeight: 22,
  },

  payButton: {
    backgroundColor: PRIMARY,
    borderRadius: 999,
    minHeight: 56,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.elevated,
  },

  payButtonDisabled: {
    opacity: 0.6,
  },

  payButtonText: {
    color: colors.white,
    fontSize: 17,
    fontWeight: "700",
  },

  helperText: {
    marginTop: 18,
    textAlign: "center",
    fontSize: 13,
    color: MUTED,
    lineHeight: 19,
  },
});
