import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useSelector } from "react-redux";
import styles from "../styles/ChatStyles";

const API_URL = process.env.EXPO_PUBLIC_API_URL;

export default function ChatScreen({ route }) {
  const user = useSelector((state) => state.user.value);
  const token = user?.token;
  const currentUserId = user?._id;

  const { conversationId, conversation } = route.params;

  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const headerName =
    String(conversation.driver) === String(currentUserId)
      ? conversation.passengerName
      : conversation.driverName;

  const loadMessages = async () => {
    try {
      setIsLoading(true);

      const response = await fetch(
        `${API_URL}/messages/${conversationId}/${token}`
      );
      const data = await response.json();

      if (data.result) {
        setMessages(data.messages);
      } else {
        setMessages([]);
        console.log(data.error);
      }
    } catch (error) {
      console.log("Erreur loadMessages :", error);
      setMessages([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (token) {
      loadMessages();
    }
  }, [token, conversationId]);

  const sendMessage = async () => {
    if (!text.trim()) return;

    try {
      const response = await fetch(`${API_URL}/messages/add`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          conversationId,
          content: text,
        }),
      });

      const data = await response.json();

      if (data.result) {
        setText("");
        loadMessages();
      } else {
        console.log(data.error);
      }
    } catch (error) {
      console.log("Erreur sendMessage :", error);
    }
  };

  const renderMessage = ({ item }) => {
    const isSystem = item.type === "system";
    const isMine = String(item.sender) === String(currentUserId);

    if (isSystem) {
      return (
        <View style={styles.systemMessageContainer}>
          <View style={styles.systemMessageBubble}>
            <Text style={styles.systemMessageText}>{item.content}</Text>
          </View>
        </View>
      );
    }

    return (
      <View
        style={[
          styles.messageRow,
          isMine ? styles.myMessageRow : styles.otherMessageRow,
        ]}
      >
        <View
          style={[
            styles.messageBubble,
            isMine ? styles.myMessageBubble : styles.otherMessageBubble,
          ]}
        >
          <Text
            style={[
              styles.messageText,
              isMine ? styles.myMessageText : styles.otherMessageText,
            ]}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        <View style={styles.header}>
          <Text style={styles.headerTitle}>{headerName}</Text>
        </View>

        {isLoading ? (
          <View style={styles.centerContent}>
            <Text style={styles.loadingText}>Chargement...</Text>
          </View>
        ) : (
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={renderMessage}
            contentContainerStyle={styles.messagesList}
          />
        )}

        <View style={styles.inputBar}>
          <TextInput
            style={styles.input}
            placeholder="Envoyer un message..."
            value={text}
            onChangeText={setText}
            multiline={false}
          />

          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Text style={styles.sendButtonText}>Envoyer</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}