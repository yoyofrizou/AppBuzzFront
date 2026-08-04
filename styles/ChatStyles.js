import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },

  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 6,
  },

  headerAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },

  headerAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  headerAvatarText: {
    fontSize: 16,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  headerTitle: {
    fontSize: 18,
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
    ...shadow.card,
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
});
