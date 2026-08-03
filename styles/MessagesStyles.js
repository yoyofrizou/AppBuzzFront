import { StyleSheet } from "react-native";
import { colors } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  title: {
    fontSize: 28,
    fontWeight: "700",
    textAlign: "center",
    marginTop: 20,
    marginBottom: 20,
    color: colors.textPrimary,
  },

  loader: {
    marginTop: 40,
  },

  emptyText: {
    textAlign: "center",
    marginTop: 40,
    fontSize: 16,
    color: colors.textSecondary,
  },

  listContent: {
    paddingBottom: 20,
  },

  card: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: colors.surface,
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 14,
    borderRadius: 18,
    borderWidth: 1,
    borderColor: colors.border,
    position: "relative",
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  avatarImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    fontSize: 18,
    fontWeight: "700",
    color: colors.textPrimary,
    marginBottom: 4,
  },

  preview: {
    fontSize: 14,
    color: colors.textSecondary,
    marginTop: 4,
  },

  nameUnread: {
    fontWeight: "800",
    color: colors.textPrimary,
  },

  previewUnread: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  unreadDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.danger,
    marginLeft: 8,
    flexShrink: 0,
    alignSelf: "center",
  },
});
