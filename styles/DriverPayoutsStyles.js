import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: colors.backgroundAlt,
  },

  backButton: {
    width: 36,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
  },

  headerSpacer: {
    width: 36,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
    flexGrow: 1,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 16,
    marginBottom: 16,
    ...shadow.card,
  },

  dateText: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 8,
  },

  routeText: {
    fontSize: 16,
    fontWeight: "800",
    color: colors.textPrimary,
    lineHeight: 22,
    marginBottom: 14,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  passengersText: {
    fontSize: 13,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  amountText: {
    fontSize: 20,
    fontWeight: "900",
    color: colors.success,
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
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginTop: 18,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 20,
  },
});
