import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },

  map: {
    flex: 1,
  },

  topOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    zIndex: 20,
    paddingTop: 55,
    paddingHorizontal: 18,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 14,
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

  profileButton: {
    width: 40,
    alignItems: "flex-end",
    justifyContent: "center",
  },

  searchRecap: {
    minHeight: 52,
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  searchRecapText: {
    marginLeft: 10,
    flex: 1,
    fontSize: 15,
    color: "#444",
    fontWeight: "500",
  },

  priceMarker: {
    minWidth: 62,
    backgroundColor: "#8B2332",
    borderRadius: 16,
    paddingHorizontal: 8,
    paddingVertical: 6,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFFFFF",
    shadowColor: "#000",
    shadowOpacity: 0.18,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 4,
  },

  priceMarkerTop: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  priceMarkerPrice: {
    color: "#FFFFFF",
    fontWeight: "800",
    fontSize: 13,
  },

  priceMarkerTime: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "700",
    marginTop: 2,
  },

  resultsBadge: {
    position: "absolute",
    top: 150,
    alignSelf: "center",
    backgroundColor: "rgba(255,255,255,0.95)",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    zIndex: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },

  resultsBadgeText: {
    color: "#333",
    fontWeight: "700",
    fontSize: 13,
  },

  emptyOverlay: {
    position: "absolute",
    left: 20,
    right: 20,
    top: "35%",
    backgroundColor: "rgba(255,255,255,0.96)",
    borderRadius: 24,
    padding: 22,
    alignItems: "center",
    zIndex: 30,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  emptyTitle: {
    fontSize: 20,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 8,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 14,
    color: "#666",
    lineHeight: 20,
    marginBottom: 18,
  },

  emptyButton: {
    backgroundColor: "#8B2332",
    borderRadius: 16,
    paddingVertical: 14,
    paddingHorizontal: 18,
  },

  emptyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.18)",
    justifyContent: "flex-end",
  },

  modalCard: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 20,
    paddingTop: 12,
    paddingBottom: 30,
    shadowColor: "#000",
    shadowOpacity: 0.12,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: -2 },
    elevation: 8,
  },

  modalHandle: {
    width: 54,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
    alignSelf: "center",
    marginBottom: 14,
  },

  modalTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 14,
  },

  driverCard: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F8F4F5",
    borderRadius: 18,
    padding: 14,
    marginBottom: 18,
    borderWidth: 1,
    borderColor: "#F0E2E5",
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
    marginRight: 12,
    backgroundColor: "#8B2332",
    alignItems: "center",
    justifyContent: "center",
  },

  driverInfo: {
    flex: 1,
  },

  driverLabel: {
    fontSize: 12,
    color: "#777",
    marginBottom: 3,
    fontWeight: "500",
  },

  driverName: {
    fontSize: 17,
    fontWeight: "700",
    color: "#1F1F1F",
  },

  driverRatingRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 6,
    flexWrap: "wrap",
  },

  driverStarsRow: {
    flexDirection: "row",
    marginRight: 6,
  },

  driverRatingText: {
    color: "#8B2332",
    fontSize: 14,
    fontWeight: "700",
    marginRight: 6,
  },

  driverRatingCountText: {
    color: "#666666",
    fontSize: 13,
    fontWeight: "500",
  },

  modalRoute: {
    fontSize: 15,
    color: "#333",
    lineHeight: 22,
    marginBottom: 8,
    fontWeight: "500",
  },

  modalMeta: {
    fontSize: 14,
    color: "#666",
    marginBottom: 16,
  },

  modalPriceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 18,
    paddingVertical: 4,
  },

  modalPrice: {
    fontSize: 30,
    fontWeight: "800",
    color: "#1F1F1F",
  },

  modalSeats: {
    fontSize: 14,
    color: "#666",
    fontWeight: "600",
  },

  modalDescription: {
    fontSize: 14,
    color: "#4F4F4F",
    lineHeight: 21,
    marginBottom: 16,
  },

  validateButton: {
    backgroundColor: "#8B2332",
    borderRadius: 18,
    paddingVertical: 16,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#8B2332",
    shadowOpacity: 0.22,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 4,
  },

  validateButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "800",
  },

  validateButtonDisabled: {
    opacity: 0.7,
  },
});