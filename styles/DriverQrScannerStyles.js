import { StyleSheet } from "react-native";

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },

  camera: {
    ...StyleSheet.absoluteFillObject,
  },

  center: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
    backgroundColor: "#FFFFFF",
  },

  title: {
    fontSize: 22,
    fontWeight: "800",
    color: "#1F1F1F",
    marginBottom: 10,
    textAlign: "center",
  },

  subtitle: {
    fontSize: 15,
    color: "#6F6F6F",
    lineHeight: 22,
    textAlign: "center",
  },

  infoText: {
    marginTop: 12,
    fontSize: 15,
    color: "#6F6F6F",
    textAlign: "center",
  },

  overlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.28)",
    paddingHorizontal: 24,
  },

  scanText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
    marginBottom: 24,
    textAlign: "center",
  },

  scanBox: {
    width: 260,
    height: 260,
    position: "relative",
    justifyContent: "center",
    alignItems: "center",
  },

  cornerTopLeft: {
    position: "absolute",
    top: 0,
    left: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FFFFFF",
    borderTopLeftRadius: 14,
  },

  cornerTopRight: {
    position: "absolute",
    top: 0,
    right: 0,
    width: 40,
    height: 40,
    borderTopWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFFFFF",
    borderTopRightRadius: 14,
  },

  cornerBottomLeft: {
    position: "absolute",
    bottom: 0,
    left: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderLeftWidth: 4,
    borderColor: "#FFFFFF",
    borderBottomLeftRadius: 14,
  },

  cornerBottomRight: {
    position: "absolute",
    bottom: 0,
    right: 0,
    width: 40,
    height: 40,
    borderBottomWidth: 4,
    borderRightWidth: 4,
    borderColor: "#FFFFFF",
    borderBottomRightRadius: 14,
  },

  scanLine: {
    position: "absolute",
    width: 210,
    height: 3,
    backgroundColor: "#FFFFFF",
    borderRadius: 999,
    opacity: 0.95,
  },

  loaderWrapper: {
    alignItems: "center",
    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
    textAlign: "center",
  },

  button: {
    marginTop: 32,
    backgroundColor: "#7A2335",
    borderRadius: 18,
    paddingVertical: 14,
    paddingHorizontal: 22,
    alignItems: "center",
    justifyContent: "center",
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 15,
    fontWeight: "800",
  },

  manualButton: {
  marginTop: 24,
  backgroundColor: "#FFFFFF",
  borderRadius: 18,
  paddingVertical: 14,
  paddingHorizontal: 22,
  alignItems: "center",
  justifyContent: "center",
  minWidth: 220,
},

manualButtonText: {
  color: "#7A2335",
  fontSize: 15,
  fontWeight: "800",
},

manualInfoText: {
  marginTop: 12,
  paddingHorizontal: 12,
  color: "#FFFFFF",
  fontSize: 13,
  lineHeight: 20,
  textAlign: "center",
  maxWidth: 320,
},
});