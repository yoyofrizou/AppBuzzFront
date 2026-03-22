// Pour afficher prénom + nom dans une autre page
import { useSelector } from "react-redux";
import { View, Text } from "react-native";

export default function ProfilScreen() {
  const user = useSelector((state) => state.user.value);

  return (
    <View>
      <Text>{user.prenom} {user.nom}</Text>
      <Text>{user.email}</Text>
    </View>
  );
}