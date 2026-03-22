import { StyleSheet } from "react-native";

export default StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  topBar: {
    height: 140,
    backgroundColor: "#7A2335",
    paddingTop: 55,
    paddingHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
  },

  topBarTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -16,
  },

  createButton: {
    backgroundColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  createButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  tabsWrapper: {
    alignSelf: "center",
    flexDirection: "row",
    backgroundColor: "#EFEFEF",
    borderRadius: 26,
    padding: 4,
    marginBottom: 22,
    width: "78%",
  },

  tabButton: {
    flex: 1,
    paddingVertical: 14,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  tabButtonActive: {
    backgroundColor: "#7A2335",
  },

  tabButtonText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#3C3C3C",
  },

  tabButtonTextActive: {
    color: "#FFFFFF",
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    paddingBottom: 110,
    flexGrow: 1,
  },

  rideCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#6E2333",
    padding: 16,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  rideHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  rideHeaderLeft: {
    flex: 1,
    marginRight: 12,
  },

  rideRouteText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 22,
    marginBottom: 4,
  },

  rideDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 14,
  },

  rideFooterRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  ridePrice: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E1E1E",
  },

  rideSeats: {
    fontSize: 14,
    fontWeight: "600",
    color: "#7B7B7B",
  },

  rideDescription: {
    marginTop: 12,
    fontSize: 13,
    color: "#6F6F6F",
    lineHeight: 20,
  },

  passengersSection: {
    marginTop: 16,
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "#E4E4E4",
  },

  passengersSectionTitle: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 12,
  },

  noPassengersText: {
    fontSize: 14,
    color: "#6F6F6F",
    lineHeight: 20,
    marginBottom: 12,
  },

  passengerRow: {
    backgroundColor: "#F8F8F8",
    borderRadius: 16,
    padding: 12,
    marginBottom: 10,
  },

  passengerInfo: {
    marginBottom: 10,
  },

  passengerName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222222",
  },

  passengerStatus: {
    marginTop: 4,
    fontSize: 13,
    color: "#6F6F6F",
  },

  passengerActions: {
    flexDirection: "row",
    gap: 8,
  },

  passengerActionButton: {
    flex: 1,
    backgroundColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  passengerActionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  passengerSecondaryActionButton: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  passengerSecondaryActionButtonText: {
    color: "#7A2335",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  startRideButton: {
    marginTop: 14,
    backgroundColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 10,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },

  startRideButtonDisabled: {
    backgroundColor: "#D9D9D9",
  },

  startRideButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
  },

  startRideButtonTextDisabled: {
    color: "#7A7A7A",
  },

  emptyContainer: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 24,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 12,
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: "800",
    color: "#1F1F1F",
    marginTop: 18,
    marginBottom: 8,
    textAlign: "center",
  },

  emptyText: {
    fontSize: 14,
    color: "#6F6F6F",
    textAlign: "center",
    lineHeight: 20,
    marginBottom: 24,
  },

  emptyButton: {
    backgroundColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
  },

  emptySecondaryButton: {
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 16,
    paddingHorizontal: 24,
    alignItems: "center",
    justifyContent: "center",
  },

  emptySecondaryButtonText: {
    color: "#7A2335",
    fontSize: 14,
    fontWeight: "800",
  },
});