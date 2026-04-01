import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
    paddingTop: 35,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  backButton: {
    marginBottom: 20,
  },

  title: {
    fontSize: 24,
    fontWeight: "800",
    color: "#800020",
    marginBottom: 18,
    textAlign: "center",
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    padding: 18,
    borderWidth: 1,
    borderColor: "#EAEAEA",
    shadowColor: "#000000",
    shadowOpacity: 0.05,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },

  inputLabel: {
    fontSize: 13,
    fontWeight: "700",
    color: "#444444",
    marginBottom: 6,
    marginTop: 10,
  },

  input: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 14,
    fontSize: 15,
    backgroundColor: "#FAFAFA",
    marginBottom: 12,
  },

  dropdownBlock: {
    marginBottom: 12,
  },

  dropdownButton: {
    borderWidth: 1,
    borderColor: "#E0E0E0",
    borderRadius: 12,
    backgroundColor: "#FAFAFA",
    minHeight: 52,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  dropdownButtonDisabled: {
    backgroundColor: "#F1F1F1",
    borderColor: "#E5E5E5",
  },

  dropdownButtonText: {
    fontSize: 15,
    color: "#222222",
    flex: 1,
    marginRight: 10,
  },

  dropdownPlaceholder: {
    color: "#9A9A9A",
  },

  dropdownDisabledText: {
    color: "#B0B0B0",
  },

  saveButton: {
    backgroundColor: "#800020",
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: "center",
    marginTop: 30,
    shadowColor: "#800020",
    shadowOpacity: 0.25,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  saveText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 16,
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },

  modalCard: {
    width: "100%",
    maxHeight: "70%",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 18,
  },

  modalTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    textAlign: "center",
    marginBottom: 14,
  },

  modalOption: {
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: "#EFEFEF",
  },

  modalOptionText: {
    fontSize: 16,
    color: "#222222",
  },

  modalCloseButton: {
    marginTop: 14,
    backgroundColor: "#800020",
    borderRadius: 12,
    paddingVertical: 14,
    alignItems: "center",
  },

  modalCloseButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "700",
  },
});