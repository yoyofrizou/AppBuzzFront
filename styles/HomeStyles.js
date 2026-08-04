import { StyleSheet } from "react-native"
import { colors } from "./theme"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 30,
    paddingTop: 40,
    paddingBottom: 40,
  },

  wordmarkBlock: {
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  wordmarkRow: {
    justifyContent: "center",
    marginBottom: 30,
  },

  routeLine: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    marginBottom: 22,
  },

  dotDeparture: {
    width: 9,
    height: 9,
    borderRadius: 2,
    backgroundColor: colors.textPrimary,
  },

  dotArrival: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: colors.mint,
    borderWidth: 1.5,
    borderColor: colors.textPrimary,
  },

  routeDashes: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
  },

  routeDash: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: colors.border,
  },

  tagline: {
    fontSize: 13,
    fontWeight: "600",
    color: colors.textSecondary,
    textAlign: "center",
    lineHeight: 19,
    maxWidth: 220,
  },

  buttonsBlock: {
    width: "100%",
  },

  primaryButton: {
    width: "100%",
    height: 58,
    marginBottom: 14,
    borderRadius: 16,
    backgroundColor: colors.textPrimary,
    justifyContent: "center",
    alignItems: "center",
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
