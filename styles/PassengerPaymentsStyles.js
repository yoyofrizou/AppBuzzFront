import { StyleSheet } from "react-native";
import { colors } from "./theme";

const BORDEAUX = colors.textPrimary;
const BG = colors.backgroundAlt;
const WHITE = colors.surface;
const TEXT = colors.textPrimary;
const SUBTEXT = colors.textSecondary;
const BORDER = colors.border;

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: WHITE,
  },

  container: {
    flex: 1,
    backgroundColor: BG,
  },

  header: {
    height: 56,
    backgroundColor: WHITE,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backWrapper: {
    width: 40,
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
  },

  scroll: {
    flex: 1,
  },

  scrollContent: {
    padding: 20,
    paddingBottom: 28,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: TEXT,
    marginBottom: 8,
  },

  sectionSubtitle: {
    fontSize: 14,
    color: SUBTEXT,
    marginBottom: 14,
  },

  loadingBox: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 10,
    color: SUBTEXT,
    fontSize: 14,
  },

  cardBox: {
    backgroundColor: colors.textPrimary,
    borderRadius: 20,
    padding: 20,
    elevation: 6,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowOffset: { width: 0, height: 8 },
    shadowRadius: 16,
  },

  cardChip: {
    width: 32,
    height: 22,
    borderRadius: 5,
    backgroundColor: colors.mintSoft,
    marginBottom: 16,
  },

  cardTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 14,
    gap: 12,
  },

  cardBrand: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.white,
    marginBottom: 6,
    letterSpacing: 0.5,
  },

  cardMeta: {
    fontSize: 14,
    color: colors.onDarkMuted,
  },

  defaultBadge: {
    backgroundColor: colors.mintSoft,
    borderWidth: 1,
    borderColor: colors.mint,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 999,
  },

  defaultBadgeText: {
    color: colors.success,
    fontSize: 12,
    fontWeight: "700",
  },

  primaryAction: {
    backgroundColor: BORDEAUX,
    borderRadius: 14,
    paddingVertical: 13,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  primaryActionText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },

  primaryActionOnDark: {
    backgroundColor: colors.mint,
    borderRadius: 14,
    paddingVertical: 13,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 4,
  },

  primaryActionOnDarkText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },

  emptyCardBox: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
  },

  emptyIconBadge: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyCardTitle: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  emptyCardText: {
    fontSize: 14,
    lineHeight: 20,
    color: SUBTEXT,
    textAlign: "center",
    marginBottom: 16,
  },

  divider: {
    height: 1,
    backgroundColor: colors.border,
    marginVertical: 24,
  },

  emptyHistoryBox: {
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 18,
    borderWidth: 1,
    borderColor: BORDER,
    alignItems: "center",
  },

  emptyHistoryTitle: {
    marginTop: 12,
    marginBottom: 6,
    fontSize: 16,
    fontWeight: "700",
    color: TEXT,
  },

  emptyHistoryText: {
    fontSize: 14,
    lineHeight: 20,
    color: SUBTEXT,
    textAlign: "center",
  },

  historyCard: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    backgroundColor: WHITE,
    borderRadius: 16,
    padding: 16,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 12,
  },

  historyIconBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  historyContent: {
    flex: 1,
  },

  historyTopRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
    gap: 10,
  },

  historyTitle: {
    flex: 1,
    fontSize: 15,
    fontWeight: "700",
    color: TEXT,
  },

  historyAmount: {
    fontSize: 17,
    fontWeight: "800",
    color: TEXT,
  },

  historyDate: {
    fontSize: 13,
    color: SUBTEXT,
    marginBottom: 8,
  },

  errorText: {
    color: colors.danger,
    fontSize: 14,
    fontWeight: "600",
    marginTop: 12,
  },
});
