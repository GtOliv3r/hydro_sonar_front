import React from 'react';
import { View, Pressable, useColorScheme, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs, Link } from 'expo-router';
import Colors from '../../constants/Colors';
import IndexScreen from './index';
import AlertsScreen from './two';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


const Tab = createBottomTabNavigator();

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

// Função para o ícone customizado com imagem
const CustomTabIcon = ({ imageSource, color }: { imageSource: any; color: string }) => (
  <Image source={imageSource} style={{ width: 40, height: 40, tintColor: color }} />
);

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color }) => {
            let iconName = 'code'; // Default icon name

            if (route.name === 'Alerts') {
              iconName = 'bell'; // Change to the icon name you want for Alerts
            }

            return <TabBarIcon name={'code'} color={color} />;
          },
          tabBarStyle: {
            backgroundColor: '#5900CB',
            flexDirection: 'row',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
          },
          tabBarActiveTintColor: Colors.light.tint,
        })}
      >
        <Tab.Screen
          name="Index"
          component={IndexScreen}
          options={{ title: 'Página Inicial' }}
        />

        <Tab.Screen
          name="Alerts"
          component={AlertsScreen}
          options={{ title: 'Alertas' }}
        />
      </Tab.Navigator>
  );
}
