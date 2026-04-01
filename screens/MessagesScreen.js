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
import { useFocusEffect } from "@react-navigation/native";
import { useSelector } from "react-redux";
import styles from "../styles/MessagesStyles";

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
      console.time("front-load-conversations");

      const response = await fetch(`${API_URL}/conversations/${token}`);
  
      const json = await response.json();

       console.log(
  "UNREAD COUNTS FRONT =",
  json?.conversations?.map((c) => ({
    id: c._id,
    unreadCount: c.unreadCount,
  }))
);
      console.log("CONVERSATIONS FULL =", JSON.stringify(json, null, 2));

      if (response.ok && json.result) {
        setConversations(json.conversations || []);
      } else {
        console.log("Erreur backend conversations =", json.error);
      }
    } catch (error) {
      console.log("Erreur loadConversations :", error);
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

    const previewText = isCurrentUserDriver
      ? item.lastMessagePreviewDriver
      : item.lastMessagePreviewPassenger;

   const hasUnread = (item.unreadCount || 0) > 0;

   console.log("HAS UNREAD UI =", item._id, hasUnread);

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
        <ActivityIndicator size="large" color="#A34757" style={styles.loader} />
      ) : shouldShowEmpty ? (
        <Text style={styles.emptyText}>Aucune conversation</Text>
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