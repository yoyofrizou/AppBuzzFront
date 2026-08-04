import React, { useCallback, useState } from "react";
import {
  View,
  Image,
  Text,
  FlatList,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles/MessagesStyles";
import { colors } from "../styles/theme";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function MessagesScreen({ navigation }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;
  const currentUserId = user?._id;

  const [conversations, setConversations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadConversations = useCallback(async () => {
    if (!token || !API_URL) {
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
       

      const response = await fetch(`${API_URL}/conversations/${token}`);
      const json = await response.json();

      if (response.ok && json.result) {
        setConversations(json.conversations || []);
      } else {
      
      }
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      loadConversations();
    }, [loadConversations])
  );

  const renderConversation = ({ item }) => {
    const isCurrentUserDriver =
      String(item.driver?._id || item.driver) === String(currentUserId);

    const otherUser = isCurrentUserDriver ? item.passenger : item.driver;

    const otherUserName =
      `${otherUser?.prenom || ""} ${otherUser?.nom || ""}`.trim() ||
      (isCurrentUserDriver ? item.passengerName : item.driverName) ||
      "Utilisateur";


      const formatPreview = (text) => {
  if (!text) return "Aucun message";

  if (text.startsWith("Bonjour, Un passager")) {
    return "Nouvelle réservation";
  }

  if (text.startsWith("Merci d’avoir réservé")) {
    return "Réservation confirmée";
  }

  if (text.startsWith("Le conducteur")) {
    return "Trajet annulé";
  }

  return text;
};

  const previewTextRaw = isCurrentUserDriver
    ? item.lastMessagePreviewDriver
    : item.lastMessagePreviewPassenger;

  const previewText = formatPreview(previewTextRaw);

const hasUnread = (item.unreadCount || 0) > 0;

    return (
      <TouchableOpacity
        style={styles.card}
        onPress={() =>
          navigation.navigate("ChatScreen", {
            conversationId: item._id,
            conversation: item,
          })
        }
      >
       <View style={styles.avatar}>
  {otherUser?.profilePhoto ? (
    <Image
      source={{ uri: otherUser.profilePhoto }}
      style={styles.avatarImage}
    />
  ) : (
    <Text style={styles.avatarText}>
      {otherUserName ? otherUserName.charAt(0).toUpperCase() : "?"}
    </Text>
  )}
</View>

        <View style={styles.textContainer}>
          <Text style={[styles.name, hasUnread && styles.nameUnread]}>
            {otherUserName}
          </Text>

          <Text
  style={[styles.preview, hasUnread && styles.previewUnread]}
            numberOfLines={1}
            ellipsizeMode="tail"
          >
            {previewText || "Aucun message"}
          </Text>
        </View>

        {hasUnread && <View style={styles.unreadDot} />}

      </TouchableOpacity>
    );
  };

  const shouldShowEmpty = !isLoading && conversations.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      {isLoading && conversations.length === 0 ? (
        <ActivityIndicator size="large" color={colors.textPrimary} style={styles.loader} />
      ) : shouldShowEmpty ? (
        <View style={styles.emptyContainer}>
          <View style={styles.emptyIconBadge}>
            <Ionicons name="chatbubble-ellipses-outline" size={36} color={colors.textPrimary} />
          </View>
          <Text style={styles.emptyText}>Aucune conversation</Text>
        </View>
      ) : (
        <FlatList
          data={conversations}
          keyExtractor={(item) => item._id}
          renderItem={renderConversation}
          contentContainerStyle={styles.listContent}
        />
      )}
    </SafeAreaView>
  );
}