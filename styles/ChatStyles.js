import { StyleSheet } from "react-native";
import { colors } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  header: {
    backgroundColor: colors.surface,
    paddingVertical: 18,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
    alignItems: "center",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 22,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  centerContent: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    fontSize: 16,
    color: colors.textSecondary,
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
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: "88%",
  },

  systemMessageText: {
    fontSize: 13,
    color: colors.textSecondary,
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
    backgroundColor: colors.textPrimary,
  },

  otherMessageBubble: {
    backgroundColor: colors.fill,
  },

  messageText: {
    fontSize: 15,
  },

  myMessageText: {
    color: colors.white,
  },

  otherMessageText: {
    color: colors.textPrimary,
  },

  inputBar: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.border,
  },

  input: {
    flex: 1,
    backgroundColor: colors.fill,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
    fontSize: 15,
    color: colors.textPrimary,
  },

  sendButton: {
    marginLeft: 10,
    backgroundColor: colors.textPrimary,
    borderRadius: 22,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  sendButtonText: {
    color: colors.white,
    fontWeight: "700",
    fontSize: 14,
  },

  backArrow: {
    position: "absolute",
    left: -170,
    fontSize: 24,
    color: colors.textPrimary,
  },
});
