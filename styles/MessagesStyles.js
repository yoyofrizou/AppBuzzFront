import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F7F7F7",
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: "#A34757",
  },

  loader: {
    marginTop: 40,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: "#666",
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 18,
     position: "relative",
  },

avatarImage: {
  width: 50,
  height: 50,
  borderRadius: 25,
  borderWidth: 2,
  borderColor: "#8B2332",
},

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111",
    marginBottom: 4,
  },

  preview: {
    fontSize: 14,
    color: "#555",
  },
  nameUnread: {
  fontWeight: "800",
  color: "#111111",
},

previewUnread: {
  color: "#111111",
  fontWeight: "600",
},

unreadDot: {
  position: "absolute",
  right: 30,
  top: 32,

  width: 14,
  height: 14,
  borderRadius: 7,

  backgroundColor: "#E53935",
},

nameUnread: {
  fontWeight: "700",
  color: "#111",
},

previewUnread: {
  fontWeight: "600",
  color: "#111",
},

});