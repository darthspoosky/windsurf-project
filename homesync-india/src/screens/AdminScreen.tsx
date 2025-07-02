import React, { useState, useCallback } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  TouchableOpacity,
  RefreshControl,
  Dimensions,
} from "react-native";
import {
  Text,
  useTheme,
  Card,
  IconButton,
  Button,
  ActivityIndicator,
} from "react-native-paper";
import ScreenContainer from "../components/animations/ScreenContainer";
import { useNavigation } from "@react-navigation/native";

type Screen = {
  name: string;
  route: string;
  icon: string;
};

type ModuleSection = {
  title: string;
  screens: Screen[];
};

const { width: screenWidth } = Dimensions.get("window");

const AdminScreen: React.FC = () => {
  const theme = useTheme();
  const navigation = useNavigation<any>();
  const [refreshing, setRefreshing] = useState(false);

  // Statistics data
  const stats = [
    { label: "Staff Members", value: "4" },
    { label: "Bills Due", value: "7" },
    { label: "Today's Events", value: "3" },
  ];

  // Handle refresh
  const onRefresh = useCallback(() => {
    setRefreshing(true);
    // Simulate fetching data
    setTimeout(() => {
      // Update your data here if needed
      setRefreshing(false);
    }, 2000);
  }, []);

  // Module sections data
  const sections: ModuleSection[] = [
    {
      title: "Home Management",
      screens: [
        { name: "Staff", route: "Staff", icon: "account-group" },
        { name: "Bills", route: "Bills", icon: "file-document" },
        { name: "Grocery", route: "Grocery", icon: "cart" },
        { name: "Calendar", route: "Calendar", icon: "calendar" },
      ],
    },
    {
      title: "Family & Finance",
      screens: [
        { name: "Vehicle", route: "Vehicle", icon: "car" },
        { name: "Finance", route: "FinanceOverview", icon: "currency-inr" },
        { name: "Family", route: "FamilyList", icon: "account-multiple" },
        { name: "Documents", route: "DocumentList", icon: "folder" },
      ],
    },
    {
      title: "Health & Services",
      screens: [
        { name: "Health", route: "HealthDashboard", icon: "heart-pulse" },
        { name: "Analytics", route: "Analytics", icon: "chart-bar" },
        { name: "Chat", route: "Chat", icon: "message" },
        { name: "Settings", route: "AISettings", icon: "cog" },
      ],
    },
  ];

  const navigateTo = (routeName: string) => {
    navigation.navigate(routeName);
  };

  // Define screen preview type
  type ScreenPreview = {
    title: string;
    icon: string;
    route: string;
    description: string;
  };

  // Get the available routes from the navigation state
  const getAvailableScreens = () => {
    const state = navigation.getState();
    return state.routeNames;
  };

  // All possible screens for the carousel
  const allScreenPreviews: ScreenPreview[] = [
    {
      title: "Home",
      icon: "home",
      route: "Home",
      description: "Landing page with login options",
    },
    {
      title: "Staff",
      icon: "account-group",
      route: "Staff",
      description: "Manage household staff",
    },
    {
      title: "Bills",
      icon: "file-document",
      route: "Bills",
      description: "Track and pay bills",
    },
    {
      title: "Grocery",
      icon: "cart",
      route: "Grocery",
      description: "Shopping lists and inventory",
    },
    {
      title: "Calendar",
      icon: "calendar",
      route: "Calendar",
      description: "Events and reminders",
    },
    {
      title: "Health",
      icon: "heart-pulse",
      route: "HealthDashboard",
      description: "Family health records",
    },
    {
      title: "Finance",
      icon: "currency-inr",
      route: "FinanceOverview",
      description: "Budget and expenses",
    },
    {
      title: "Family",
      icon: "account-group",
      route: "FamilyList",
      description: "Family members management",
    },
    {
      title: "Documents",
      icon: "file-document",
      route: "DocumentList",
      description: "Important documents",
    },
    {
      title: "Settings",
      icon: "cog",
      route: "Settings",
      description: "App preferences",
    },
    {
      title: "Analytics",
      icon: "chart-bar",
      route: "Analytics",
      description: "Household insights",
    },
    {
      title: "Login",
      icon: "login",
      route: "Login",
      description: "User authentication",
    },
  ];

  // Filter to only available screens
  const availableRoutes = getAvailableScreens();
  const screenPreviews: ScreenPreview[] = allScreenPreviews.filter((screen) =>
    availableRoutes.includes(screen.route),
  );

  // No carousel render item needed with simple ScrollView

  return (
    <ScreenContainer style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[theme.colors.primary]}
            tintColor={theme.colors.primary}
          />
        }
      >
        <View style={styles.headerContainer}>
          <Text variant="headlineLarge" style={styles.title}>
            Admin Dashboard
          </Text>
          <Text variant="bodyMedium" style={styles.subtitle}>
            HomeSync India Management Console
          </Text>
        </View>

        {/* Quick Stats Section */}
        <View style={styles.statsContainer}>
          {stats.map((stat, index) => (
            <Card key={index} style={styles.statCard}>
              <Card.Content style={styles.statContent}>
                <Text variant="headlineMedium" style={styles.statValue}>
                  {stat.value}
                </Text>
                <Text variant="bodySmall" style={styles.statLabel}>
                  {stat.label}
                </Text>
              </Card.Content>
            </Card>
          ))}
        </View>

        {/* Module Sections */}
        {sections.map((section, sectionIndex) => (
          <View key={sectionIndex} style={styles.sectionContainer}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              {section.title}
            </Text>
            <View style={styles.moduleGrid}>
              {section.screens.map((screen, screenIndex) => (
                <TouchableOpacity
                  key={screenIndex}
                  style={styles.moduleCard}
                  onPress={() => navigateTo(screen.route)}
                >
                  <Card style={styles.moduleCardInner}>
                    <Card.Content style={styles.moduleCardContent}>
                      <IconButton
                        icon={screen.icon}
                        size={32}
                        iconColor={theme.colors.primary}
                        style={styles.moduleIcon}
                      />
                      <Text variant="bodyMedium" style={styles.moduleTitle}>
                        {screen.name}
                      </Text>
                    </Card.Content>
                  </Card>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}

        {/* Recent Notifications Preview */}
        <View style={styles.notificationsSection}>
          <View style={styles.notificationsHeader}>
            <Text variant="titleMedium" style={styles.sectionTitle}>
              Recent Notifications
            </Text>
            <Button mode="text" onPress={() => {}}>
              View All
            </Button>
          </View>
          <Card style={styles.notificationCard}>
            <Card.Content>
              <Text variant="bodyMedium">
                Staff attendance updated for Ramesh
              </Text>
              <Text variant="bodySmall" style={styles.notificationTime}>
                2 hours ago
              </Text>
            </Card.Content>
          </Card>
          <Card style={styles.notificationCard}>
            <Card.Content>
              <Text variant="bodyMedium">Electricity bill due tomorrow</Text>
              <Text variant="bodySmall" style={styles.notificationTime}>
                5 hours ago
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Screen Carousel */}
        <View style={styles.carouselSection}>
          <Text variant="titleMedium" style={styles.sectionTitle}>
            Available Screens
          </Text>
          <Text variant="bodySmall" style={styles.carouselSubtitle}>
            Swipe to preview and navigate
          </Text>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.carouselContainer}
            pagingEnabled
            decelerationRate="fast"
          >
            {screenPreviews.map((item, index) => (
              <View key={index} style={styles.carouselItemContainer}>
                <Card style={styles.carouselCard}>
                  <Card.Content style={styles.carouselCardContent}>
                    <IconButton
                      icon={item.icon}
                      size={40}
                      iconColor={theme.colors.primary}
                    />
                    <Text variant="titleMedium" style={styles.carouselTitle}>
                      {item.title}
                    </Text>
                    <Text
                      variant="bodySmall"
                      style={styles.carouselDescription}
                    >
                      {item.description}
                    </Text>
                    <Button
                      mode="contained"
                      style={styles.carouselButton}
                      onPress={() => navigation.navigate(item.route)}
                    >
                      Open Screen
                    </Button>
                  </Card.Content>
                </Card>
              </View>
            ))}
          </ScrollView>
        </View>

        <View style={styles.spacer} />
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f8f9fa",
  },
  scrollContent: {
    padding: 16,
  },
  headerContainer: {
    marginBottom: 24,
  },
  title: {
    fontWeight: "bold",
    marginBottom: 4,
    color: "#333",
    flexWrap: "wrap",
  },
  subtitle: {
    color: "#666",
    flexWrap: "wrap",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 24,
  },
  statCard: {
    flex: 1,
    marginHorizontal: 4,
    elevation: 2,
  },
  statContent: {
    alignItems: "center",
    padding: 8,
  },
  statValue: {
    fontWeight: "bold",
    color: "#333",
  },
  statLabel: {
    color: "#666",
    textAlign: "center",
    flexWrap: "wrap",
  },
  sectionContainer: {
    marginBottom: 24,
  },
  sectionTitle: {
    marginBottom: 12,
    color: "#333",
    fontWeight: "600",
  },
  moduleGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginHorizontal: -4,
  },
  moduleCard: {
    width: "25%",
    paddingHorizontal: 4,
    marginBottom: 16,
  },
  moduleCardInner: {
    elevation: 2,
    height: 96,
  },
  moduleCardContent: {
    alignItems: "center",
    justifyContent: "center",
    padding: 8,
    height: "100%",
  },
  moduleIcon: {
    margin: 0,
    padding: 0,
  },
  moduleTitle: {
    textAlign: "center",
    flexWrap: "wrap",
    fontSize: 12,
    marginTop: 4,
  },
  notificationsSection: {
    marginBottom: 24,
  },
  notificationsHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  notificationCard: {
    marginBottom: 8,
    elevation: 2,
  },
  notificationTime: {
    color: "#999",
    marginTop: 4,
  },
  spacer: {
    height: 32,
  },
  carouselSection: {
    marginVertical: 24,
  },
  carouselContainer: {
    paddingHorizontal: 8,
  },
  carouselItemContainer: {
    width: screenWidth * 0.8,
    paddingHorizontal: 8,
  },
  carouselSubtitle: {
    color: "#666",
    marginBottom: 16,
    textAlign: "center",
  },
  carouselCard: {
    elevation: 4,
    marginVertical: 8,
    height: 220,
  },
  carouselCardContent: {
    alignItems: "center",
    justifyContent: "center",
    height: "100%",
    padding: 16,
  },
  carouselTitle: {
    fontWeight: "bold",
    marginVertical: 8,
    textAlign: "center",
  },
  carouselDescription: {
    textAlign: "center",
    marginBottom: 16,
    color: "#666",
  },
  carouselButton: {
    marginTop: 8,
  },
});

export default AdminScreen;
