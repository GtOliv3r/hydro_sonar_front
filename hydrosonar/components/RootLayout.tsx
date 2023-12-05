import React, { useEffect } from 'react';
import { Image, Pressable, useColorScheme } from 'react-native';
import { DarkTheme, DefaultTheme, ThemeProvider, Stack, SplashScreen, Tabs } from 'expo-router';
import { useFonts } from 'expo-font';
import FontAwesome from '@expo/vector-icons/FontAwesome';

export {
  ErrorBoundary,
} from 'expo-router';

export const unstable_settings = {
  initialRouteName: '(tabs)',
};

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
    ...FontAwesome.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return <RootLayoutNav />;
}

const CustomTabIcon = ({ imageSource, color }: { imageSource: any; color: string }) => (
  <Image source={imageSource} style={{ width: 28, height: 28, tintColor: color }} />
);

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Stack>
        <Tabs.Navigator tabBar={(props) => <CustomTab {...props} />} >
          <Tabs.Screen
            name="index"
            component={ScreenComponentOne}
            options={{ title: 'Tab One' }}
          />
          <Tabs.Screen
            name="two"
            component={ScreenComponentTwo}
            options={{ title: 'Tab Two' }}
          />
        </Tabs.Navigator>
        <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
      </Stack>
    </ThemeProvider>
  );
}
