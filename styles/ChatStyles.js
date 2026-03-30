import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAFAFA",
  },

  header: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: "#EAEAEA",
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: "#111",
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 16,
    color: "#666",
  },

  messagesList: {
    paddingHorizontal: 10,
    paddingVertical: 12,
  },

  systemMessageContainer: {
    alignItems: "center",
    marginVertical: 8,
  },

  systemMessageBubble: {
    backgroundColor: "#EEEEEE",
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: "88%",
  },

  systemMessageText: {
    fontSize: 13,
    color: "#555",
    textAlign: "center",
  },

  messageRow: {
    marginVertical: 5,
    flexDirection: "row",
  },

  myMessageRow: {
    justifyContent: "flex-end",
  },

  otherMessageRow: {
    justifyContent: "flex-start",
  },

  messageBubble: {
    maxWidth: "78%",
    borderRadius: 18,
    paddingVertical: 12,
    paddingHorizontal: 14,
  },

  myMessageBubble: {
    backgroundColor: "#A34757",
  },

  otherMessageBubble: {
    backgroundColor: "#F0F0F0",
  },

  messageText: {
    fontSize: 15,
  },

  myMessageText: {
    color: "#FFFFFF",
  },

  otherMessageText: {
    color: "#111111",
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#FFFFFF",
    borderTopWidth: 1,
    borderTopColor: "#EAEAEA",
  },

  input: {
    flex: 1,
    backgroundColor: "#F2F2F2",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: "#111",
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: "#A34757",
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sendButtonText: {
    color: "#FFFFFF",
    fontWeight: "700",
    fontSize: 14,
  },
  backArrow: {
  position: "absolute",
  left: -170,
  fontSize: 24,
}
});