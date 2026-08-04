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
    borderWidth: 2,
    borderColor: colors.mintSoft,
  },

  headerAvatarFallback: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
    borderWidth: 2,
    borderColor: colors.mintSoft,
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
    backgroundColor: colors.mintSoft,
    borderRadius: 14,
    paddingVertical: 10,
    paddingHorizontal: 14,
    maxWidth: "88%",
  },

  dateSeparatorContainer: {
    alignItems: "center",
    marginVertical: 14,
  },

  dateSeparatorPill: {
    backgroundColor: colors.mintSoft,
    borderRadius: 999,
    paddingVertical: 6,
    paddingHorizontal: 14,
  },

  dateSeparatorText: {
    fontSize: 12,
    fontWeight: "700",
    color: colors.textPrimary,
    textTransform: "capitalize",
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
    backgroundColor: colors.mint,
  },

  otherMessageBubble: {
    backgroundColor: colors.fill,
  },

  messageText: {
    fontSize: 15,
  },

  myMessageText: {
    color: colors.textPrimary,
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
    borderWidth: 1.5,
    borderColor: "transparent",
  },

  inputFocused: {
    borderColor: colors.mint,
    backgroundColor: colors.surface,
  },

  sendButton: {
    marginLeft: 10,
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
  },

  sendButtonDisabled: {
    backgroundColor: colors.fill,
  },
});
