import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  keyboard: {
    flex: 1,
  },

  scrollContent: {
    paddingHorizontal: 18,
    paddingBottom: 32,
  },

  header: {
    marginTop: 8,
    marginBottom: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  backButton: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  logo: {
    fontSize: 34,
    fontWeight: "800",
    color: colors.mint,
    letterSpacing: 1,
  },

  headerRightSpacer: {
    width: 40,
  },

  card: {
    backgroundColor: colors.surface,
    borderRadius: 28,
    padding: 18,
    ...shadow.card,
  },

  sectionTitle: {
    marginTop: 4,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  fieldBlock: {
    marginBottom: 16,
    zIndex: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textSecondary,
  },

  inputRow: {
    minHeight: 60,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: colors.textPrimary,
  },

  suggestionsLoader: {
    marginTop: 10,
  },

  suggestionsBox: {
    marginTop: 8,
    backgroundColor: colors.surface,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: colors.border,
    overflow: "hidden",
  },

  suggestionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  suggestionText: {
    flex: 1,
    color: colors.textPrimary,
    fontSize: 14,
    lineHeight: 20,
  },

  dateTimeButton: {
    minHeight: 64,
    backgroundColor: colors.surface,
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  dateTimeText: {
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "500",
  },

  dateTimeActions: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },

  smallDateButton: {
    flex: 1,
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  smallDateButtonText: {
    color: colors.textSecondary,
    fontSize: 14,
    fontWeight: "700",
  },

  twoColumnsRow: {
    flexDirection: "row",
    gap: 12,
  },

  halfField: {
    flex: 1,
  },

  createButton: {
    height: 62,
    borderRadius: 22,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    ...shadow.soft,
  },

  createButtonDisabled: {
    opacity: 0.7,
  },

  createButtonText: {
    color: colors.white,
    fontSize: 18,
    fontWeight: "800",
  },

  dateTimeCard: {
    backgroundColor: colors.surface,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    ...shadow.card,
  },

  dateTimeMainButton: {
    flexDirection: "row",
    alignItems: "center",
  },

  dateTimeContent: {
    flex: 1,
    marginLeft: 12,
  },

  dateTimeMainLabel: {
    fontSize: 13,
    color: colors.textSecondary,
    marginBottom: 4,
  },

  dateTimeMainValue: {
    fontSize: 16,
    color: colors.textPrimary,
    fontWeight: "700",
  },

  dateTimeQuickActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14,
  },

  dateChip: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  dateChipText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  pickerModalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: colors.surface,
    borderRadius: 24,
    padding: 18,
  },

  pickerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 10,
  },

  iosPicker: {
    alignSelf: "center",
  },

  pickerActions: {
    flexDirection: "row",
    gap: 12,
    marginTop: 10,
  },

  pickerSecondaryButton: {
    flex: 1,
    backgroundColor: colors.neutralLight,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  pickerSecondaryButtonText: {
    color: colors.textPrimary,
    fontSize: 15,
    fontWeight: "700",
  },

  pickerPrimaryButton: {
    flex: 1,
    backgroundColor: colors.textPrimary,
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  pickerPrimaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "700",
  },
});
