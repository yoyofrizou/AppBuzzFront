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
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  topBarBack: {
    width: 36,
  },

  topBarTitle: {
    color: "#FFFFFF",
    fontSize: 22,
    fontWeight: "800",
  },

  topBarSpacer: {
    width: 36,
  },

  content: {
    flex: 1,
    paddingHorizontal: 16,
    marginTop: -16,
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
  },

  tripCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 26,
    borderWidth: 2,
    borderColor: "#6E2333",
    padding: 16,
    marginBottom: 18,
    flexDirection: "row",
    alignItems: "stretch",
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  tripLeft: {
    flex: 1.2,
    justifyContent: "space-between",
    paddingRight: 14,
  },

  tripMiddle: {
    flex: 1.1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 14,
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "#E4E4E4",
  },

  tripRight: {
    flex: 1,
    justifyContent: "center",
    paddingLeft: 14,
    gap: 12,
  },

  tripRouteText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    lineHeight: 22,
  },

  tripDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 14,
  },

  tripPrice: {
    fontSize: 24,
    fontWeight: "900",
    color: "#1E1E1E",
  },

  driverImage: {
    width: 82,
    height: 82,
    borderRadius: 41,
    marginBottom: 12,
  },

  driverPlaceholder: {
    width: 82,
    height: 82,
    borderRadius: 41,
    marginBottom: 12,
    backgroundColor: "#7A2335",
    alignItems: "center",
    justifyContent: "center",
  },

  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222222",
    textAlign: "center",
    marginBottom: 4,
  },

  driverCar: {
    fontSize: 12,
    color: "#7B7B7B",
    textAlign: "center",
    lineHeight: 18,
  },

  actionButton: {
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

  actionButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "800",
    textAlign: "center",
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
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: "#6F6F6F",
    textAlign: "center",
    lineHeight: 20,
  },

  footer: {
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    height: 84,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#ECECEC",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingBottom: 10,
    paddingTop: 6,
  },

  footerItem: {
    alignItems: "center",
    justifyContent: "center",
    minWidth: 70,
  },

  footerText: {
    marginTop: 4,
    fontSize: 12,
    color: "#9B9B9B",
    fontWeight: "600",
  },

  footerTextActive: {
    marginTop: 4,
    fontSize: 12,
    color: "#7A2335",
    fontWeight: "700",
  },
  actionButtonDisabled: {
  backgroundColor: "#D9D9D9",
},

actionButtonTextDisabled: {
  color: "#7A7A7A",
},

secondaryActionButton: {
    marginTop: 8,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#7A2335",
  },

  secondaryActionButtonText: {
    color: "#7A2335",
  },

  manualWarningBox: {
  marginTop: 14,
  marginBottom: 10,
  backgroundColor: "#FFF4E5",
  borderWidth: 1,
  borderColor: "#E7C38A",
  borderRadius: 14,
  padding: 12,
},

manualWarningTitle: {
  fontSize: 14,
  fontWeight: "800",
  color: "#7A2335",
  marginBottom: 6,
},

manualWarningText: {
  fontSize: 12,
  lineHeight: 18,
  color: "#5C4A2D",
},

validationInfoBox: {
  marginTop: 14,
  marginBottom: 10,
  backgroundColor: "#EAF6EA",
  borderWidth: 1,
  borderColor: "#9DCC9D",
  borderRadius: 14,
  padding: 12,
},

validationInfoTitle: {
  fontSize: 14,
  fontWeight: "800",
  color: "#2E6B3A",
  marginBottom: 6,
},

validationInfoText: {
  fontSize: 12,
  lineHeight: 18,
  color: "#355B3D",
},
tripMainRow: {
  flexDirection: "row",
  alignItems: "stretch",
},
});