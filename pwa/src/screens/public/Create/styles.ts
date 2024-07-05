import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0042a5" },
  containerHeader: {
    flex: 1,
    justifyContent: "center",
    marginLeft: 20,
  },
  headerTitle: { fontSize: 26, fontWeight: "600", color: "#fff" },
  main: {
    flex: 3,
    borderTopRightRadius: 18,
    borderTopLeftRadius: 18,
    backgroundColor: "#cecece",
    padding: 20,
    gap: 20,
  },
  mainForm: {
    gap: 8,
  },
  extraOptions: {
    alignItems: "center",
    gap: 10,
  },
  footer: {
    justifyContent: "center",
    alignItems: "center",
  },
});

export default styles;
