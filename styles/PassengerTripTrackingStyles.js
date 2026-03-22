import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F3F3F3",
  },

  topBar: {
    backgroundColor: "#8B2332",
    paddingTop: 58,
    paddingBottom: 20,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topBarBack: {
    width: 36,
    alignItems: "flex-start",
  },

  topBarTitle: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "800",
  },

  topBarSpacer: {
    width: 36,
  },

  map: {
    width: "100%",
    height: 360,
  },

  startDot: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: "#FFFFFF",
    borderWidth: 6,
    borderColor: "#2D9CDB",
  },

  destinationPinWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  carMarker: {
    width: 42,
    height: 42,
  },

  carMarkerContainer: {
  backgroundColor: "#FFFFFF",
  padding: 6,
  borderRadius: 20,
  alignItems: "center",
  justifyContent: "center",
  shadowColor: "#000",
  shadowOpacity: 0.2,
  shadowRadius: 4,
  elevation: 3,
},

  bottomSheet: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    marginTop: -16,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    paddingHorizontal: 18,
    paddingTop: 22,
    paddingBottom: 18,
  },

  etaTitle: {
    fontSize: 28,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 4,
  },

  etaSubtitle: {
    fontSize: 16,
    color: "#8A8A8A",
    marginBottom: 22,
  },

  sectionTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#111111",
    marginBottom: 16,
  },

  passengersRow: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginBottom: 24,
  },

  passengerItem: {
    alignItems: "center",
    width: 120,
  },

  avatarCircle: {
    width: 84,
    height: 84,
    borderRadius: 42,
    backgroundColor: "#EFEFEF",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    marginBottom: 10,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  passengerName: {
    fontSize: 15,
    fontWeight: "700",
    color: "#111111",
    textAlign: "center",
    marginBottom: 4,
  },

  passengerState: {
    fontSize: 13,
    color: "#8A8A8A",
    textAlign: "center",
  },

  securityButton: {
    backgroundColor: "#9AD14B",
    borderRadius: 14,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 12,
  },

  securityButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  primaryButton: {
    backgroundColor: "#8B2332",
    borderRadius: 14,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  primaryButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "700",
    color: "#111111",
    marginBottom: 16,
  },
  arrivedButton: {
  backgroundColor: "#6CC04A",
  paddingVertical: 14,
  borderRadius: 28,
  alignItems: "center",
  marginTop: 16,
},

arrivedButtonText: {
  color: "#FFFFFF",
  fontSize: 17,
  fontWeight: "700",
},
});