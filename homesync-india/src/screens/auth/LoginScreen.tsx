import React, { useState } from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import {
  Text,
  Card,
  Button,
  TextInput,
  useTheme,
  ActivityIndicator,
} from "react-native-paper";
import ScreenContainer from "../../components/animations/ScreenContainer";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { authService } from "../../services/auth/AuthService";
import { RootStackParamList } from "../../navigation/AppNavigator";

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

const LoginScreen = () => {
  const navigation = useNavigation<LoginScreenNavigationProp>();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleLogin = async () => {
    if (!email || !password) {
      setError("Email and password are required");
      return;
    }

    setError(null);
    setLoading(true);

    try {
      const response = await authService.login(email, password);

      if (response.error || !response.data) {
        setError(response.error || "Login failed");
        return;
      }

      // Navigate to Home on successful login
      navigation.replace("Home");
    } catch (err) {
      setError("An unexpected error occurred");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const theme = useTheme();

  return (
    <ScreenContainer style={styles.container}>
      <View style={styles.content}>
        <View style={styles.header}>
          <Text variant="headlineMedium" style={styles.title}>
            HomeSync India
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            Welcome back! Sign in to your account
          </Text>
        </View>

        <Card style={styles.card}>
          <Card.Content>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={{ color: theme.colors.error }}>{error}</Text>
              </View>
            )}

            <TextInput
              label="Email"
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              value={email}
              onChangeText={setEmail}
              mode="outlined"
              style={styles.input}
            />

            <TextInput
              label="Password"
              placeholder="Enter your password"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
              mode="outlined"
              style={styles.input}
            />

            <Button
              mode="contained"
              onPress={handleLogin}
              disabled={loading}
              style={styles.loginButton}
              labelStyle={styles.buttonText}
            >
              {loading ? <ActivityIndicator color="white" /> : "Sign In"}
            </Button>

            <TouchableOpacity
              onPress={() => navigation.navigate("ForgotPassword")}
              style={styles.forgotPassword}
            >
              <Text style={{ color: theme.colors.primary }}>
                Forgot Password?
              </Text>
            </TouchableOpacity>
          </Card.Content>
        </Card>

        <View style={styles.footer}>
          <Text variant="bodyMedium" style={styles.footerText}>
            Don't have an account?{" "}
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Register")}>
            <Text style={{ color: theme.colors.primary, fontWeight: "bold" }}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    padding: 16,
  },
  header: {
    alignItems: "center",
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 8,
  },
  subtitle: {
    color: "#666",
    textAlign: "center",
  },
  card: {
    marginBottom: 24,
    elevation: 4,
  },
  errorContainer: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#FFEBEE",
    borderRadius: 4,
    borderWidth: 1,
    borderColor: "#FFCDD2",
  },
  input: {
    marginBottom: 16,
  },
  loginButton: {
    marginVertical: 8,
    paddingVertical: 6,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
  forgotPassword: {
    alignItems: "center",
    marginTop: 8,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  footerText: {
    color: "#666",
  },
});

export default LoginScreen;
