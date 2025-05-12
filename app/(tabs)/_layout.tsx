// import { Tabs } from "expo-router";
// import React from "react";
// import { Platform } from "react-native";

// import { HapticTab } from "@/components/HapticTab";
// import { IconSymbol } from "@/components/ui/IconSymbol";
// import TabBarBackground from "@/components/ui/TabBarBackground";
// import { Colors } from "@/constants/Colors";
// import { useColorScheme } from "@/hooks/useColorScheme";

// export default function TabLayout() {
//   const colorScheme = useColorScheme();

//   return (
//     <Tabs
//       screenOptions={{
//         tabBarActiveTintColor: Colors[colorScheme ?? "light"].tint,
//         headerShown: false,
//         tabBarButton: HapticTab,
//         tabBarBackground: TabBarBackground,
//         tabBarStyle: Platform.select({
//           ios: {
//             // Use a transparent background on iOS to show the blur effect
//             position: "absolute",
//           },
//           default: {},
//         }),
//       }}
//     >
//       <Tabs.Screen
//         name="index"
//         options={{
//           title: "Home",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="house.fill" color={color} />
//           ),
//         }}
//       />
//       <Tabs.Screen
//         name="explore"
//         options={{
//           title: "Explore",
//           tabBarIcon: ({ color }) => (
//             <IconSymbol size={28} name="paperplane.fill" color={color} />
//           ),
//         }}
//       />
//     </Tabs>
//   );
// }

import { ThemedText } from "@/components/ThemedText";
import { Colors } from "@/constants";
import { useThemeContext } from "@/contexts/ThemeContext";
import { Theme } from "@/utils/type";
import Ionicons from "@expo/vector-icons/Ionicons";
import React from "react";
import { Animated, Platform, StyleSheet, TouchableOpacity } from "react-native";
import { CurvedBottomBarExpo } from "react-native-curved-bottom-bar";
import HomeScreen from ".";
import TabTwoScreen from "./explore";
import TabMiddleScreen from "./test";

export default function App() {
  const { theme } = useThemeContext();
  const styles = styling(theme);

  const _renderIcon = (routeName: string, selectedTab: string) => {
    let icon = "";

    switch (routeName) {
      case "Home":
        icon = "home-outline";
        break;
      case "Explore":
        icon = "settings-outline";
        break;
    }

    return (
      <Ionicons
        name={icon as any}
        size={25}
        color={
          routeName === selectedTab ? Colors[theme].active : Colors[theme].icon
        }
      />
    );
  };
  const renderTabBar = ({
    routeName,
    selectedTab,
    navigate,
  }: {
    routeName: string;
    selectedTab: string;
    navigate: any;
  }) => {
    return (
      <TouchableOpacity
        onPress={() => navigate(routeName)}
        style={styles.tabbarItem}
      >
        {_renderIcon(routeName, selectedTab)}
        <ThemedText
          type="span"
          style={{
            color:
              routeName === selectedTab
                ? Colors[theme].active
                : Colors[theme].icon,
          }}
        >
          {routeName}
        </ThemedText>
      </TouchableOpacity>
    );
  };

  return (
    <>
      <CurvedBottomBarExpo.Navigator
        type="DOWN"
        style={styles.bottomBar}
        shadowStyle={styles.shawdoweEffect}
        height={65}
        width={400} // Set this to your desired width or use Dimensions.get('window').width
        id="main-bottom-bar"
        borderColor={Colors[theme].tint}
        borderWidth={0} // Set as needed
        circlePosition="CENTER"
        circleWidth={60}
        screenOptions={{ headerShown: false }}
        bgColor={Colors[theme].bottomTabBackground}
        initialRouteName="Home"
        borderTopLeftRight
        renderCircle={({ selectedTab, navigate, routeName }: any) => (
          <Animated.View
            style={[
              styles.btnCircleUp,
              { backgroundColor: Colors[theme].bottomTabBackground },
            ]}
          >
            <TouchableOpacity
              style={styles.button}
              onPress={() => navigate(routeName)}
            >
              <Ionicons
                name={"apps-sharp"}
                color={
                  routeName === selectedTab
                    ? Colors[theme].active
                    : Colors[theme].icon
                }
                size={30}
              />
            </TouchableOpacity>
          </Animated.View>
        )}
        tabBar={renderTabBar}
        backBehavior="initialRoute"
        screenListeners={{}}
        defaultScreenOptions={{}}
      >
        <CurvedBottomBarExpo.Screen
          name="Home"
          position="LEFT"
          component={() => <HomeScreen />}
        />

        <CurvedBottomBarExpo.Screen
          name="Test"
          position="CENTER"
          component={() => <TabMiddleScreen />}
        />

        <CurvedBottomBarExpo.Screen
          name="Explore"
          component={() => <TabTwoScreen />}
          position="RIGHT"
        />
      </CurvedBottomBarExpo.Navigator>
    </>
  );
}

const styling = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    shawdoweEffect: {
      ...Platform.select({
        android: {
          shadowColor: Colors[theme].active,
          elevation: 1,
        },
        ios: {
          shadowColor: Colors[theme].tint,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1,
        },
        web: {
          boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
        },
      }),
    },
    button: {
      flex: 1,
      justifyContent: "center",
    },
    bottomBar: {},
    btnCircleUp: {
      width: 65,
      height: 65,
      borderRadius: 65,
      alignItems: "center",
      justifyContent: "center",
      bottom: 30,
      ...Platform.select({
        android: {
          shadowColor: Colors[theme].tint,
          elevation: 1,
        },
        ios: {
          shadowColor: Colors[theme].tint,
          shadowOffset: {
            width: 0,
            height: 0,
          },
          shadowOpacity: 0.5,
          shadowRadius: 1,
        },
        web: {
          boxShadow: "0 3px 6px rgba(0,0,0,0.16)",
        },
      }),
    },
    tabbarItem: {
      flex: 1,
      alignItems: "center",
      justifyContent: "center",
    },
  });
