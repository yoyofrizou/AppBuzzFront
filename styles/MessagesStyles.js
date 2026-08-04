import { StyleSheet } from "react-native";
import { colors, shadow } from "./theme";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  titleRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    marginTop: 20,
    marginBottom: 20,
  },

  titleIconBadge: {
    width: 34,
    height: 34,
    borderRadius: 17,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 26,
    fontWeight: "800",
    color: colors.textPrimary,
  },

  loader: {
    marginTop: 40,
  },

  emptyContainer: {
    alignItems: "center",
    marginTop: 60,
    paddingHorizontal: 30,
  },

  emptyIconBadge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 16,
  },

  emptyText: {
    textAlign: "center",
    fontSize: 16,
    color: colors.textSecondary,
  },

  listContent: {
    paddingBottom: 110,
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
    ...shadow.card,
  },

  cardUnread: {
    backgroundColor: colors.mintSoft,
    borderColor: colors.mint,
  },

  avatar: {
    width: 52,
    height: 52,
    borderRadius: 26,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    borderWidth: 3,
    borderColor: colors.white,
  },

  avatarText: {
    fontSize: 20,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  avatarImage: {
    width: "100%",
    height: "100%",
  },

  textContainer: {
    marginLeft: 14,
    flex: 1,
  },

  name: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.textPrimary,
  },

  nameUnread: {
    fontWeight: "800",
  },

  previewRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
    gap: 6,
  },

  previewIconBadge: {
    width: 18,
    height: 18,
    borderRadius: 9,
    backgroundColor: colors.mintSoft,
    alignItems: "center",
    justifyContent: "center",
    flexShrink: 0,
  },

  preview: {
    flexShrink: 1,
    fontSize: 14,
    color: colors.textSecondary,
  },

  previewUnread: {
    color: colors.textPrimary,
    fontWeight: "600",
  },

  unreadBadge: {
    minWidth: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.mint,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 7,
    marginLeft: 8,
  },

  unreadBadgeText: {
    fontSize: 12,
    fontWeight: "800",
    color: colors.textPrimary,
  },
});
