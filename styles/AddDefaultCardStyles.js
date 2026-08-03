import { StyleSheet } from "react-native";
import { colors } from "./theme";

const PRIMARY = colors.textPrimary;
const BACKGROUND = colors.backgroundAlt;
const WHITE = colors.surface;
const TEXT = colors.textPrimary;
const MUTED = colors.textSecondary;
const BORDER = colors.border;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 28,
  },

  backText: {
    fontSize: 28,
    color: PRIMARY,
    fontWeight: "400",
  },

  title: {
    fontSize: 23,
    fontWeight: "700",
    color: TEXT,
    textAlign: "center",
  },

  placeholder: {
    width: 24,
  },

  card: {
    backgroundColor: WHITE,
    borderRadius: 24,
    padding: 22,
    borderWidth: 1,
    borderColor: BORDER,
  },

  description: {
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    textAlign: "center",
    marginBottom: 24,
  },

  addButton: {
    backgroundColor: PRIMARY,
    minHeight: 56,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 18,
  },

  addButtonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "800",
    textAlign: "center",
  },

  testCard: {
    marginTop: 20,
    fontSize: 12,
    color: MUTED,
    textAlign: "center",
    lineHeight: 18,
  },
});
