import { StyleSheet } from "react-native"
import { colors, shadow } from "./theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.background,
    overflow: "hidden",
  },

  blobTop: {
    position: "absolute",
    top: -140,
    right: -60,
    width: 320,
    height: 320,
    borderRadius: 160,
    backgroundColor: colors.mintSoft,
  },

  blobBottom: {
    position: "absolute",
    bottom: -100,
    left: -80,
    width: 240,
    height: 240,
    borderRadius: 120,
    backgroundColor: colors.backgroundAlt,
  },

  card: {
    width: "85%",
    alignItems: "center",
  },

  logo: {
    fontSize: 56,
    fontWeight: "800",
    letterSpacing: 1,
    color: colors.mint,
    marginBottom: 8,
  },

  tagline: {
    fontSize: 15,
    color: colors.textSecondary,
    textAlign: "center",
    marginBottom: 64,
  },

  primaryButton: {
    width: "100%",
    height: 58,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
    ...shadow.soft,
  },

  primaryButtonText: {
    fontSize: 17,
    fontWeight: "700",
    color: colors.white,
  },

  secondaryButton: {
    width: "100%",
    height: 58,
    borderRadius: 16,
    borderWidth: 1.5,
    borderColor: colors.border,
    justifyContent: "center",
    alignItems: "center",
  },

  secondaryButtonText: {
    fontSize: 17,
    fontWeight: "600",
    color: colors.textPrimary,
  },
})

export default styles
