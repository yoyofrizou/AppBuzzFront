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


      const getPreviewInfo = (text) => {
  if (!text) {
    return { text: "Aucun message", isSystem: false };
  }

  if (text.startsWith("Bonjour, Un passager")) {
    return { text: "Nouvelle réservation", isSystem: true, icon: "person-add-outline", iconColor: colors.textPrimary };
  }

  if (text.startsWith("Merci d’avoir réservé")) {
    return { text: "Réservation confirmée", isSystem: true, icon: "checkmark-circle-outline", iconColor: colors.success };
  }

  if (text.startsWith("Le conducteur")) {
    return { text: "Trajet annulé", isSystem: true, icon: "close-circle-outline", iconColor: colors.danger };
  }

  return { text, isSystem: false };
};

  const previewTextRaw = isCurrentUserDriver
    ? item.lastMessagePreviewDriver
    : item.lastMessagePreviewPassenger;

  const previewInfo = getPreviewInfo(previewTextRaw);

const hasUnread = (item.unreadCount || 0) > 0;

    return (
      <TouchableOpacity
        style={[styles.card, hasUnread && styles.cardUnread]}
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

          <View style={styles.previewRow}>
            {previewInfo.isSystem && (
              <View style={styles.previewIconBadge}>
                <Ionicons name={previewInfo.icon} size={11} color={previewInfo.iconColor} />
              </View>
            )}

            <Text
              style={[styles.preview, hasUnread && styles.previewUnread]}
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {previewInfo.text}
            </Text>
          </View>
        </View>

        {hasUnread && (
          <View style={styles.unreadBadge}>
            <Text style={styles.unreadBadgeText}>
              {item.unreadCount > 9 ? "9+" : item.unreadCount}
            </Text>
          </View>
        )}
      </TouchableOpacity>
    );
  };

  const shouldShowEmpty = !isLoading && conversations.length === 0;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.titleRow}>
        <View style={styles.titleIconBadge}>
          <Ionicons name="chatbubbles" size={18} color={colors.textPrimary} />
        </View>
        <Text style={styles.title}>Messages</Text>
      </View>

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