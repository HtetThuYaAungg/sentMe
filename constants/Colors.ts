/**
 * Below are the colors that are used in the app. The colors are defined in the light and dark mode.
 * There are many other ways to style your app. For example, [Nativewind](https://www.nativewind.dev/), [Tamagui](https://tamagui.dev/), [unistyles](https://reactnativeunistyles.vercel.app), etc.
 */

const tintColorLight = "#0a7ea4";
const tintColorDark = "#b0b3b8";

const light = {
  text: "#242526",
  background: "#f7f7f7",
  tint: tintColorLight,
  icon: "#242526",
  tabIconDefault: "#687076",
  tabIconSelected: tintColorLight,
  bottomTabBackground: "#3b5998",
  active: "#ffffff",
};

const dark = {
  text: "#b0b3b8",
  background: "#3a3b3c",
  tint: tintColorDark,
  icon: "#b0b3b8",
  tabIconDefault: "#9BA1A6",
  tabIconSelected: tintColorDark,
  bottomTabBackground: "#242526",
  active: "#f7f7f7",
};

export default {
  light,
  dark,
};
