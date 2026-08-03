import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 20,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.backgroundAlt,
    paddingHorizontal: 24,
  },

  emptyText: {
    fontSize: 18,
    color: colors.textPrimary,
    fontWeight: "600",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 12,
    paddingTop: 10,
  },

  backButton: {
    width: 36,
  },

  headerSpacer: {
    width: 36,
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    flex: 1,
    marginHorizontal: 8,
  },

  stepText: {
    fontSize: 15,
    color: colors.textSecondary,
    fontWeight: "500",
    textAlign: "center",
    marginBottom: 16,
  },

  summaryCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 20,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 18,
    ...shadow.card,
  },

  summaryTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: colors.textPrimary,
    marginBottom: 6,
    textAlign: "center",
  },

  summarySubtitle: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 12,
    textAlign: "center",
  },

  paidAmountLabel: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  paidAmountValue: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.success,
  },

  passengerCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingVertical: 22,
    paddingHorizontal: 18,
    alignItems: "center",
    marginBottom: 22,
    ...shadow.card,
  },

  avatar: {
    width: 96,
    height: 96,
    borderRadius: 48,
    marginBottom: 16,
  },

  avatarFallback: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },

  passengerName: {
    fontSize: 19,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
  },

  question: {
    fontSize: 21,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 18,
  },

  starsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 26,
  },

  commentLabel: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 10,
  },

  input: {
    minHeight: 120,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 14,
    fontSize: 16,
    color: colors.textPrimary,
    textAlignVertical: "top",
    marginBottom: 24,
  },

  submitButton: {
    backgroundColor: colors.textPrimary,
    borderRadius: 16,
    paddingVertical: 18,
    alignItems: "center",
    marginBottom: 20,
    ...shadow.soft,
  },

  submitButtonText: {
    color: colors.white,
    fontSize: 16,
    fontWeight: "700",
    textAlign: "center",
  },

  scrollContent: {
    flexGrow: 1,
    paddingBottom: 40,
  },
});
