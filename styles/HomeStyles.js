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

  heroCard: {
    width: "85%",
    backgroundColor: colors.surface,
    borderRadius: 28,
    paddingVertical: 30,
    paddingHorizontal: 20,
    alignItems: "center",
    marginBottom: 40,
    ...shadow.card,
  },

  routeRow: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 16,
  },

  routeDotStart: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: colors.mint,
    borderWidth: 2,
    borderColor: colors.textPrimary,
  },

  routeDotEnd: {
    width: 12,
    height: 12,
    borderRadius: 3,
    backgroundColor: colors.textPrimary,
  },

  routeDots: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 8,
  },

  routeDot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },

  routeCarBadge: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: colors.textPrimary,
    alignItems: "center",
    justifyContent: "center",
    ...shadow.soft,
  },

  heroCaption: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textAlign: "center",
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
