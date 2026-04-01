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
    borderRadius: 24,
    borderWidth: 2,
    borderColor: "#6E2333",
    padding: 18,
    marginBottom: 18,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  tripLeft: {
  width: "100%",
  marginBottom: 14,
},

 tripMiddle: {
  flexDirection: "row",
  alignItems: "center",
  marginBottom: 16,
},

 tripRight: {
  width: "100%",
},

  tripRouteText: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222222",
    fontWeight: "500",
  },

  tripDivider: {
    height: 1,
    backgroundColor: "#E0E0E0",
    marginVertical: 10,
  },

  tripPrice: {
    fontSize: 22,
    fontWeight: "900",
    color: "#1E1E1E",
    marginTop: 4,
  },

  driverImage: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: 12,
  },

  driverPlaceholder: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: "#7A2335",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 12,
  },

  driverName: {
    fontSize: 15,
    fontWeight: "800",
    color: "#222222",
    marginBottom: 4,
  },

  driverCar: {
    fontSize: 12,
    color: "#7B7B7B",
    lineHeight: 17,
  },

  actionButton: {
    backgroundColor: "#7A2335",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 12,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 10,
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
  width: "100%",
},
tripDateTimeText: {
  fontSize: 15,
  color: "#333333",
  fontWeight: "700",
  marginBottom: 6,
},
tripStatus: {
  marginTop: 6,
  fontSize: 13,
  fontWeight: "700",
  color: "#800020",
},
tripStatusCancelled: {
  color: "#8B2332",
},
});