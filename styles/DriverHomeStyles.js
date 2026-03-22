import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  topContainer: {
    paddingTop: 55,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },

  logo: {
    fontSize: 38,
    fontWeight: "800",
    color: "#8B2332",
  },

  profileIcon: {},

  searchBar: {
    height: 54,
    borderRadius: 28,
    backgroundColor: "#F3F3F3",
    paddingHorizontal: 18,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  searchPlaceholder: {
    fontSize: 16,
    color: "#7A7A7A",
  },

  locationWarning: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FCECEF",
    borderRadius: 16,
    paddingVertical: 12,
    paddingHorizontal: 12,
    marginBottom: 12,
    gap: 8,
  },

  locationWarningText: {
    flex: 1,
    color: "#8B2332",
    fontSize: 13,
    fontWeight: "500",
  },

  mapContainer: {
    flex: 1,
    position: "relative",
  },

  map: {
    flex: 1,
  },

  driverMarker: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: "#8B2332",
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 3,
    borderColor: "#fff",
  },

  calloutContainer: {
    width: 180,
    padding: 4,
  },

  calloutTitle: {
    fontSize: 14,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  calloutText: {
    fontSize: 12,
    color: "#444",
  },

  switchModeButton: {
    position: "absolute",
    bottom: 40,
    alignSelf: "center",
    backgroundColor: "#8B2332",
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 30,
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 6,
  },

  switchModeButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "700",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.35)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  modalCard: {
    width: "90%",
    maxWidth: 380,
    alignSelf: "center",
    backgroundColor: "#fff",
    borderRadius: 22,
    padding: 22,
  },

  modalTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111",
    marginBottom: 10,
    textAlign: "center",
  },

  modalText: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
    textAlign: "center",
  },

  modalButtons: {
  flexDirection: "row",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
},

  allowButton: {
    flex: 1,
    marginRight: 6,
    backgroundColor: "#8B2332",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  allowButtonText: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "700",
  },

  denyButton: {
    flex: 1,
    marginLeft: 6,
    backgroundColor: "#F1F1F1",
    paddingVertical: 14,
    borderRadius: 14,
    alignItems: "center",
  },

  denyButtonText: {
    color: "#333",
    fontSize: 15,
    fontWeight: "700",
  },
  driverWarning: {
  flexDirection: "row",
  alignItems: "center",
  backgroundColor: "#FCECEF",
  borderRadius: 16,
  paddingVertical: 12,
  paddingHorizontal: 12,
  marginBottom: 12,
  gap: 8,
},

driverWarningText: {
  flex: 1,
  color: "#8B2332",
  fontSize: 13,
  fontWeight: "500",
},
});