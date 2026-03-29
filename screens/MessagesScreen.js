import React, { useEffect, useState, useCallback } from "react";
import {
  View,
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

  const loadConversations = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(`${API_URL}/conversations/${token}`);
      const data = await response.json();

      if (data.result) {
        setConversations(data.conversations);
      } else {
        setConversations([]);
        console.log(data.error);
      }
    } catch (error) {
      console.log("Erreur loadConversations :", error);
      setConversations([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadConversations();
    }
  }, [token]);

  useFocusEffect(
    useCallback(() => {
      if (token) {
        loadConversations();
      }
    }, [token])
  );

  const renderConversation = ({ item }) => {
  const isCurrentUserDriver =
    String(item.driver?._id || item.driver) === String(currentUserId);

  const otherUser = isCurrentUserDriver ? item.passenger : item.driver;

  const otherUserName =
    `${otherUser?.prenom || otherUser?.firstname || ""} ${otherUser?.nom || otherUser?.lastname || ""}`.trim() ||
    (isCurrentUserDriver ? item.passengerName : item.driverName) ||
    "Utilisateur";

  const previewText = isCurrentUserDriver
    ? item.lastMessagePreviewDriver
    : item.lastMessagePreviewPassenger;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() =>
        navigation.navigate("Chat", {
          conversationId: item._id,
          conversation: item,
        })
      }
    >
      <View style={styles.avatar}>
        <Text style={styles.avatarText}>
          {otherUserName ? otherUserName.charAt(0).toUpperCase() : "?"}
        </Text>
      </View>

      <View style={styles.textContainer}>
        <Text style={styles.name}>{otherUserName}</Text>
        <Text style={styles.preview} numberOfLines={1}>
          {previewText || "Aucun message"}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Messages</Text>

      {isLoading ? (
        <ActivityIndicator size="large" color="#A34757" style={styles.loader} />
      ) : conversations.length === 0 ? (
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