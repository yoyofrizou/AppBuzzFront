import React, { useState, useCallback } from "react";
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

      console.timeEnd("front-load-conversations");
      console.log("CONVERSATIONS JSON =", json);

      if (response.ok && json.result) {
        setConversations(json.conversations || []);
      } else {
        console.log("Erreur backend conversations =", json.error);
        // ✅ on garde les anciennes conversations
      }
    } catch (error) {
      console.log("Erreur loadConversations :", error);
      // ✅ on garde les anciennes conversations
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

/*import React, { useEffect, useState, useCallback } from "react";
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

   console.log("TOKEN =", token);
    console.log("URL =", `${API_URL}/conversations/${token}`);

    console.log("CONVERSATIONS RESPONSE =", JSON.stringify(data, null, 2));

const loadConversations = async () => {
  try {
    setIsLoading(true);

    console.log("TOKEN =", token);
    console.log("URL =", `${API_URL}/conversations/${token}`);

    const response = await fetch(`${API_URL}/conversations/${token}`);

    const data = await response.json(); // ⚠️ DOIT être AVANT les console.log

    console.log("CONVERSATIONS RESPONSE =", JSON.stringify(data, null, 2));

    if (data.result) {
      setConversations(data.conversations || []);
    } else {
      console.log("BACK ERROR =", data.error);
      setConversations([]);
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

    console.log("CONVERSATION ITEM =", JSON.stringify(item, null, 2));
console.log("CURRENT USER ID =", currentUserId);

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
}*/