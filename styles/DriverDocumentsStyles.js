import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  container: {
    paddingHorizontal: 24,
    paddingTop: 20,
    paddingBottom: 40,
    paddingTop: 35,
  },

  backButton: {
    marginBottom: 18,
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#800020",
    marginBottom: 12,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 14,
    color: "#6B6B6B",
    lineHeight: 20,
    textAlign: "center",
    marginBottom: 24,
  },

  rowCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingVertical: 18,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: "#E5E5E5",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
    elevation: 2,
  },

  rowLeft: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginRight: 12,
  },

  rowIcon: {
    marginRight: 10,
  },

  rowTitle: {
    fontSize: 16,
    color: "#222",
    fontWeight: "500",
    flexShrink: 1,
  },

  actionButton: {
    backgroundColor: "#800020",
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 10,
    minWidth: 95,
    alignItems: "center",
  },

  actionButtonDone: {
    backgroundColor: "#4B6E52",
  },

  actionButtonText: {
    color: "#fff",
    fontWeight: "600",
    fontSize: 14,
  },

  helperText: {
    marginTop: 10,
    fontSize: 14,
    lineHeight: 20,
    color: "#6B6B6B",
    textAlign: "center",
  },

  saveButton: {
    backgroundColor: "#800020",
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 28,
  },

  saveButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  saveButtonDisabled: {
  opacity: 0.5,
},
});