import React from 'react';
import { View, Pressable, useColorScheme, Image } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Tabs } from 'expo-router';
import Colors from '../../constants/Colors';

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
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarStyle: {
          flexDirection: 'row',
          backgroundColor: '#5900CB',
          justifyContent: 'space-between',
          paddingHorizontal: 20,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon
              imageSource={require('../../assets/images/home.png')} // Caminho da primeira imagem
              color={color}
            />
          ),
        }}
      />
      <View style={{ width: 1, backgroundColor: '#fff' }} /> {/* Divisão branca vertical */}
      <Tabs.Screen
        name="two"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color }) => (
            <CustomTabIcon
              imageSource={require('../../assets/images/alertas.png')} // Caminho da segunda imagem
              color={color}
            />
          ),
        }}
      />
    </Tabs>
  );
}
