import { StyleSheet } from "react-native"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f4f4f4",
  },

  card: {
    width: "85%",
    alignItems: "center",
  },

  logo: {
    fontSize: 52,
    fontWeight: "800",
    color: "#A7333F",
    marginBottom: 90,
  },
  homeButton: {
    width: "100%",
    height: 60,
    marginBottom: 18,
    borderWidth: 2,
    borderColor: "#555",
    borderRadius: 12,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },

  homeButtonText: {
    fontSize: 18,
    fontWeight: "600",
    color: "#444",
  },
})

export default styles