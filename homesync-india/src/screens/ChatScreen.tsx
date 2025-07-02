import React, { useState, useRef } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import ScreenContainer from "../components/animations/ScreenContainer";
import { Ionicons } from "@expo/vector-icons";
import aiService from "../services/ai/AIService";
import { AIMessage } from "../services/api/types";

const ChatScreen = () => {
  const [messages, setMessages] = useState<AIMessage[]>([
    {
      role: "assistant",
      content:
        "Hello! I am your HomeSync assistant. How can I help manage your household today?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const flatListRef = useRef<FlatList>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: AIMessage = {
      role: "user",
      content: input.trim(),
    };

    // Update UI with user message immediately
    setMessages((prevMessages) => [...prevMessages, userMessage]);
    setInput("");
    setLoading(true);

    try {
      // Call AI service
      const response = await aiService.generateCompletion({
        messages: [...messages, userMessage],
        provider: aiService.getProvider(),
      });

      if (response.data) {
        // Add AI response to messages
        const aiMessage: AIMessage = {
          role: "assistant",
          content: response.data.content,
        };
        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } else if (response.error) {
        // Show error message
        const errorMessage: AIMessage = {
          role: "assistant",
          content: `Sorry, I encountered an error: ${response.error}`,
        };
        setMessages((prevMessages) => [...prevMessages, errorMessage]);
      }
    } catch (error) {
      console.error("AI service error:", error);
      // Show generic error message
      const errorMessage: AIMessage = {
        role: "assistant",
        content:
          "Sorry, I encountered an unexpected error. Please try again later.",
      };
      setMessages((prevMessages) => [...prevMessages, errorMessage]);
    } finally {
      setLoading(false);

      // Scroll to bottom after a short delay to ensure the new message is rendered
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 100);
    }
  };

  // Render individual message
  const renderMessage = ({ item }: { item: AIMessage }) => {
    const isUser = item.role === "user";

    return (
      <View
        className={`px-4 py-3 rounded-lg max-w-[80%] mb-3 ${
          isUser
            ? "bg-primary-500 self-end rounded-tr-none"
            : "bg-gray-200 self-start rounded-tl-none"
        }`}
      >
        <Text className={`${isUser ? "text-white" : "text-gray-800"}`}>
          {item.content}
        </Text>
      </View>
    );
  };

  return (
    <ScreenContainer style={{ backgroundColor: "#f3f4f6" }}>
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
      >
        {/* Messages */}
        <FlatList
          ref={flatListRef}
          data={messages}
          keyExtractor={(_, index) => index.toString()}
          renderItem={renderMessage}
          contentContainerClassName="p-4"
          onLayout={() => flatListRef.current?.scrollToEnd({ animated: false })}
        />

        {/* Input area */}
        <View className="border-t border-gray-200 p-2 bg-white flex-row items-center">
          <TextInput
            className="flex-1 bg-gray-100 rounded-full px-4 py-2 mr-2"
            placeholder="Type a message..."
            value={input}
            onChangeText={setInput}
            multiline
            maxLength={500}
          />

          <TouchableOpacity
            onPress={sendMessage}
            disabled={loading || !input.trim()}
            className={`w-10 h-10 rounded-full items-center justify-center ${
              loading || !input.trim() ? "bg-gray-300" : "bg-primary"
            }`}
          >
            {loading ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Ionicons name="send" size={20} color="#fff" />
            )}
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenContainer>
  );
};

export default ChatScreen;
