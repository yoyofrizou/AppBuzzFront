import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#EFEFEF",
  },

  topContainer: {
    backgroundColor: "#F5F5F5",
    paddingTop: 70,
    paddingHorizontal: 25,
    paddingBottom: 18,
    borderBottomLeftRadius: 34,
    borderBottomRightRadius: 34,
    zIndex: 2,
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 22,
  },

  logo: {
    fontSize: 40,
    fontWeight: "800",
    color: "#8B2332",
  },

  profileIcon: {
    justifyContent: "center",
    alignItems: "center",
  },

  searchBar: {
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 56,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 4,
  },

  searchPlaceholder: {
    fontSize: 20,
    color: "#8A8A8A",
  },

  mapContainer: {
    flex: 1,
    marginTop: -15,
  },

  map: {
    flex: 1,
  },

  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 22,
    backgroundColor: "rgba(0,0,0,0.08)",
  },

  modalCard: {
    width: "100%",
    maxWidth: 335,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.14,
    shadowRadius: 10,
    elevation: 6,
  },

  modalTitle: {
    fontSize: 24,
    fontWeight: "800",
    color: "#111",
    marginBottom: 12,
  },

  modalText: {
    fontSize: 17,
    color: "#666",
    lineHeight: 24,
    marginBottom: 24,
  },

  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 14,
  },

  allowButton: {
    flex: 1,
    backgroundColor: "#8B2332",
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },

  allowButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },

  denyButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    height: 56,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#9C9C9C",
  },

  denyButtonText: {
    color: "#7A7A7A",
    fontSize: 18,
    fontWeight: "600",
  },
  driverModeButton: {
  position: "absolute",
  bottom: 40,
  alignSelf: "center",
  backgroundColor: "#8B2332",
  paddingVertical: 14,
  paddingHorizontal: 28,
  borderRadius: 30,
  elevation: 5,
},

driverModeButtonText: {
  color: "#fff",
  fontSize: 16,
  fontWeight: "700",
},

  footer: {
    height: 85,
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    paddingBottom: 20,
    paddingTop: 6,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 8,
  },

  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 80,
  },

  footerActiveText: {
    marginTop: 6,
    fontSize: 15,
    color: "#8B2332",
    fontWeight: "600",
  },

  footerText: {
    marginTop: 6,
    fontSize: 15,
    color: "#8A8A8A",
    fontWeight: "500",
  },
  locationWarning: {
  marginTop: 14,
  backgroundColor: "#FFF4F5",
  borderRadius: 14,
  paddingVertical: 12,
  paddingHorizontal: 14,
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
},

locationWarningText: {
  color: "#8B2332",
  fontSize: 16,
  fontWeight: "600",
},
locationWarning: {
  marginTop: 14,
  backgroundColor: "#FFF4F5",
  borderRadius: 14,
  paddingVertical: 14,
  paddingHorizontal: 14,
  flexDirection: "row",
  alignItems: "center",
  gap: 8,
  borderWidth: 1,
  borderColor: "#F0C8CE",
},

locationWarningText: {
  color: "#8B2332",
  fontSize: 15,
  fontWeight: "600",
  flex: 1,
  lineHeight: 20,
},
});

export default styles;