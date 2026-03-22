import { StyleSheet } from "react-native";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  screen: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 10,
    paddingBottom: 18,
    backgroundColor: "#F7F7F7",
  },

  backButton: {
    width: 36,
    justifyContent: "center",
    alignItems: "flex-start",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#7A2335",
    textAlign: "center",
  },

  headerSpacer: {
    width: 36,
  },

  loaderContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },

  listContent: {
    paddingHorizontal: 16,
    paddingTop: 8,
    paddingBottom: 30,
    flexGrow: 1,
  },

  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    borderWidth: 2,
    borderColor: "#6E2333",
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },

  dateText: {
    fontSize: 13,
    color: "#6F6F6F",
    marginBottom: 8,
  },

  routeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#1F1F1F",
    lineHeight: 22,
    marginBottom: 14,
  },

  bottomRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  passengersText: {
    fontSize: 13,
    color: "#6F6F6F",
    fontWeight: "600",
  },

  amountText: {
    fontSize: 20,
    fontWeight: "900",
    color: "#7A2335",
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
  },
});