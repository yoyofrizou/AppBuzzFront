import { StyleSheet } from "react-native";
import { colors, radii, shadow } from "./theme";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.backgroundAlt,
  },

  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 40,
  },

  card: {
    width: "88%",
    alignItems: "center",
    backgroundColor: colors.surface,
    borderRadius: radii.card,
    paddingTop: 44,
    paddingBottom: 28,
    paddingHorizontal: 24,
    marginTop: -10,
    position: "relative",
    ...shadow.card,
  },

  logo: {
    fontSize: 32,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.mint,
    marginBottom: 6,
  },

  title: {
    fontSize: 17,
    fontWeight: "500",
    color: colors.textPrimary,
    marginBottom: 20,
  },

  avatarWrapper: {
    position: "relative",
    marginBottom: 20,
  },

  avatarPlaceholder: {
    width: 90,
    height: 90,
    borderRadius: 45,
    backgroundColor: colors.placeholder,
    borderWidth: 3,
    borderColor: colors.border,
  },

  avatar: {
    width: 90,
    height: 90,
    borderRadius: 45,
    borderWidth: 3,
    borderColor: colors.border,
  },

  plusBadge: {
    position: "absolute",
    right: -2,
    bottom: 4,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: colors.mint,
    justifyContent: "center",
    alignItems: "center",
  },

  plusText: {
    color: colors.textPrimary,
    fontSize: 16,
    fontWeight: "700",
  },

  inputRow: {
    width: "100%",
    height: 50,
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 12,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  inputField: {
    flex: 1,
    height: "100%",
    color: colors.textPrimary,
    fontSize: 15,
  },

  passwordContainer: {
    width: "100%",
    height: 50,
    backgroundColor: colors.fill,
    borderRadius: 14,
    paddingHorizontal: 16,
    marginBottom: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },

  passwordInput: {
    flex: 1,
    height: "100%",
    color: colors.textPrimary,
    fontSize: 15,
  },

  passwordInfo: {
    width: "100%",
    color: colors.textSecondary,
    fontSize: 12,
    lineHeight: 17,
    marginTop: -2,
    marginBottom: 12,
  },

  passwordInfoError: {
    color: colors.danger,
  },

  error: {
    width: "100%",
    color: colors.danger,
    marginBottom: 10,
    marginTop: -4,
    fontSize: 13,
  },

  backButton: {
    position: "absolute",
    top: 14,
    left: 14,
    zIndex: 20,
    padding: 6,
  },
});

export default styles;
