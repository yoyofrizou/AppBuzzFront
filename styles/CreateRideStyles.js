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

  sectionTitle: {
    marginTop: 4,
    marginBottom: 18,
    textAlign: "center",
    fontSize: 24,
    fontWeight: "800",
    color: "#8B2332",
  },

  fieldBlock: {
    marginBottom: 16,
    zIndex: 20,
  },

  label: {
    marginBottom: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#4B4B4B",
  },

  inputRow: {
    minHeight: 60,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
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
    marginLeft: 12,
    fontSize: 16,
    color: "#222",
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

  dateTimeButton: {
    minHeight: 64,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
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
    marginLeft: 12,
    flex: 1,
    fontSize: 16,
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
    backgroundColor: "#8B2332",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
    shadowColor: "#8B2332",
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 3,
  },

  createButtonDisabled: {
    opacity: 0.7,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "800",
  },
  dateTimeCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#ECECEC",
    padding: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
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
    color: "#7B7B7B",
    marginBottom: 4,
  },

  dateTimeMainValue: {
    fontSize: 16,
    color: "#222",
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
    backgroundColor: "#F7F1F3",
    borderRadius: 14,
    paddingVertical: 12,
    paddingHorizontal: 10,
  },

  dateChipText: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: "700",
    color: "#8B2332",
  },

  pickerOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  pickerModalCard: {
    width: "100%",
    maxWidth: 380,
    backgroundColor: "#FFFFFF",
    borderRadius: 24,
    padding: 18,
  },

  pickerTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#8B2332",
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
    backgroundColor: "#F1F1F1",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  pickerSecondaryButtonText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "700",
  },

  pickerPrimaryButton: {
    flex: 1,
    backgroundColor: "#8B2332",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
  },

  pickerPrimaryButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});