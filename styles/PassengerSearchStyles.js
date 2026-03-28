import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F6F6F6",
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
    color: "#8B2332",
    letterSpacing: 1,
  },

  headerRightSpacer: {
    width: 40,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 28,
    padding: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 4,
  },

  fieldBlock: {
    marginBottom: 16,
    zIndex: 20,
  },

  inputRow: {
    minHeight: 74,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  input: {
    flex: 1,
    marginLeft: 14,
    fontSize: 17,
    color: "#222",
  },

  inlineSearchButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#8B2332",
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  suggestionsLoader: {
    marginTop: 10,
  },

  suggestionsBox: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "#EFEFEF",
    overflow: "hidden",
  },

  suggestionItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 14,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#F1F1F1",
  },

  suggestionText: {
    flex: 1,
    color: "#333",
    fontSize: 14,
    lineHeight: 20,
  },

  sectionTitle: {
    marginTop: 10,
    marginBottom: 12,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#8B2332",
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
    color: "#2F2F2F",
  },

  sliderMax: {
    fontSize: 16,
    color: "#666",
    fontWeight: "600",
  },

  sliderWrapper: {
    paddingTop: 44,
  },

  sliderBadge: {
    position: "absolute",
    top: 0,
    width: 190,
    backgroundColor: "#F4B63C",
    borderRadius: 22,
    paddingVertical: 10,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    zIndex: 2,
  },

  sliderBadgeText: {
    color: "#FFFFFF",
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
    color: "#9B9B9B",
    fontWeight: "600",
  },

  dateTimeButton: {
    minHeight: 72,
    marginTop: 2,
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ECECEC",
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },

  dateTimeText: {
    marginLeft: 14,
    flex: 1,
    fontSize: 18,
    color: "#5B5B5B",
    fontWeight: "500",
  },

  dateTimeActions: {
    marginTop: 10,
    flexDirection: "row",
    gap: 10,
  },

  smallDateButton: {
    flex: 1,
    backgroundColor: "#F3F3F3",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  smallDateButtonText: {
    color: "#6B6B6B",
    fontSize: 14,
    fontWeight: "700",
  },

  infoText: {
    marginTop: 18,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 13,
    color: "#8E8E8E",
    lineHeight: 20,
  },

  searchButton: {
    height: 66,
    borderRadius: 24,
    backgroundColor: "#8B2332",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B2332",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  searchButtonDisabled: {
    opacity: 0.7,
  },

  searchButtonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "800",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  pickerCard: {
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
  },

  pickerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111111",
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
    borderColor: "#8B2332",
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
  },

  pickerSecondaryButtonText: {
    color: "#8B2332",
    fontWeight: "700",
    fontSize: 15,
  },

  pickerPrimaryButton: {
    flex: 1,
    borderRadius: 14,
    paddingVertical: 12,
    alignItems: "center",
    backgroundColor: "#8B2332",
  },

  pickerPrimaryButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 15,
  },
});