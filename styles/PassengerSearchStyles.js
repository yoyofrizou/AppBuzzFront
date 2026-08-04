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

  fieldBlock: {
    marginBottom: 16,
    zIndex: 20,
  },

  inputRow: {
    minHeight: 74,
    backgroundColor: colors.surface,
    borderRadius: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  input: {
    flex: 1,
    marginLeft: 14,
    fontSize: 17,
    color: colors.textPrimary,
  },

  inlineSearchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  routeCard: {
    marginBottom: 20,
    backgroundColor: colors.surface,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: colors.border,
    paddingVertical: 8,
    paddingHorizontal: 14,
    zIndex: 20,
    ...shadow.card,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "stretch",
  },

  routeIndicatorColumn: {
    width: 16,
    alignItems: "center",
    paddingTop: 26,
    paddingBottom: 26,
  },

  routeDotStart: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.mint,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },

  routeConnectorVertical: {
    width: 2,
    flex: 1,
    minHeight: 26,
    backgroundColor: colors.border,
    marginVertical: 6,
    borderRadius: 1,
  },

  routeDotEnd: {
    width: 10,
    height: 10,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },

  routeInputsColumn: {
    flex: 1,
    marginLeft: 12,
    marginRight: 6,
  },

  routeInputBlock: {
    minHeight: 60,
    justifyContent: "center",
  },

  routeInput: {
    fontSize: 16,
    fontWeight: "500",
    color: colors.textPrimary,
    paddingVertical: 8,
  },

  routeInputDivider: {
    height: 1,
    backgroundColor: colors.border,
  },

  swapButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
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

  sectionTitle: {
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  advancedToggle: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingVertical: 14,
    marginBottom: 4,
  },

  advancedToggleIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  advancedToggleText: {
    flex: 1,
    fontSize: 14,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  advancedSection: {
    marginBottom: 6,
    paddingTop: 6,
  },

  sliderSection: {
    marginBottom: 26,
  },

  sliderHeaderRow: {
    marginBottom: 6,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  sliderTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  sliderMax: {
    fontSize: 16,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  sliderWrapper: {
    paddingTop: 44,
  },

  sliderBadge: {
    position: "absolute",
    top: 0,
    width: 190,
    backgroundColor: colors.textPrimary,
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  sliderBadgeText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800",
  },

  slider: {
    width: "100%",
    height: 40,
  },

  sliderScaleRow: {
    marginTop: -4,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  sliderScaleText: {
    fontSize: 12,
    color: colors.textSecondary,
    fontWeight: "600",
  },

  dateTimeButton: {
    minHeight: 72,
    marginTop: 2,
    backgroundColor: colors.surface,
    borderRadius: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: colors.border,
    ...shadow.card,
  },

  dateTimeText: {
    marginLeft: 14,
    flex: 1,
    fontSize: 18,
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

  infoText: {
    marginTop: 18,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 13,
    color: colors.textSecondary,
    lineHeight: 20,
  },

  searchButton: {
    height: 66,
    borderRadius: 24,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },

  searchButtonDisabled: {
    opacity: 0.7,
  },

  searchButtonText: {
    color: colors.white,
    fontSize: 20,
    fontWeight: "800",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: colors.overlay,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  pickerCard: {
    width: "100%",
    backgroundColor: colors.surface,
    borderRadius: 20,
    padding: 20,
  },

  pickerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    textAlign: "center",
    marginBottom: 12,
  },

  pickerButtonsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 16,
    gap: 12,
  },

  pickerSecondaryButton: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.surface,
  },

  pickerSecondaryButtonText: {
    color: colors.textPrimary,
    fontWeight: "700",
    fontSize: 15,
  },

  pickerPrimaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: colors.textPrimary,
  },

  pickerPrimaryButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 15,
  },
});
