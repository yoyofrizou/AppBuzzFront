import { StyleSheet } from "react-native";

const PRIMARY = "#8E2C47";
const BACKGROUND = "#F6F6F8";
const WHITE = "#FFFFFF";
const TEXT = "#111111";
const MUTED = "#6E6E73";
const BORDER = "#E5E5EA";

export default StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: BACKGROUND,
  },

  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 24,
    paddingVertical: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: "800",
    color: TEXT,
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 15,
    lineHeight: 22,
    color: MUTED,
    textAlign: "center",
    marginBottom: 28,
  },

  qrCard: {
    backgroundColor: WHITE,
    borderRadius: 28,
    padding: 24,
    borderWidth: 1,
    borderColor: BORDER,
    marginBottom: 22,
  },

  bookingIdText: {
    fontSize: 14,
    color: MUTED,
    textAlign: "center",
  },

  button: {
    marginTop: 28,
    backgroundColor: PRIMARY,
    minHeight: 54,
    minWidth: 200,
    paddingHorizontal: 22,
    borderRadius: 999,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: WHITE,
    fontSize: 16,
    fontWeight: "800",
  },
  secondaryButton: {
  marginTop: 12,
  minHeight: 54,
  minWidth: 200,
  paddingHorizontal: 22,
  borderRadius: 999,
  alignItems: "center",
  justifyContent: "center",
  borderWidth: 1.5,
  borderColor: PRIMARY,
  backgroundColor: WHITE,
},

secondaryButtonText: {
  color: PRIMARY,
  fontSize: 16,
  fontWeight: "800",
},
});