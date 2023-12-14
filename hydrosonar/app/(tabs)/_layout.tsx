import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme, Image, View, Text } from 'react-native';

import Colors from '../../constants/Colors';

function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome>['name'];
  color: string;
}) {
  return <FontAwesome size={28} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();

  const headerRightComponent = (
    <Link href="/Ajuda" asChild>
      <Pressable>
        {({ pressed }) => (
          <Image
          source={require('../../assets/images/hydronsonar.jpg')} // Substitua com o caminho da sua imagem
          style={{ width: 50, height: 50, borderRadius: 15, marginRight: 10 }}
        />
        )}
      </Pressable>
    </Link>
  );

  const headerTitleComponent = (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Text style={{fontWeight: 'bold', color: 'white', fontSize: 24}}>Hydro Sonar</Text>
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#270058',
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => headerRightComponent,
          headerTitle: () => headerTitleComponent,
          headerTitleContainerStyle: { alignItems: 'center' }, // Centraliza o título e a imagem
          headerStyle: { backgroundColor: '#8a2be2' },
          headerTintColor: Colors[colorScheme ?? 'light'].text,
          tabBarStyle: { backgroundColor: '#8a2be2', height: 70, paddingTop: 10 },
          tabBarLabelStyle: { fontSize: 25, fontWeight: 'bold', paddingBottom: 3 },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Alertas',
          tabBarIcon: ({ color }) => <TabBarIcon name="warning" color={color} />,
          headerRight: () => headerRightComponent,
          headerTitle: () => headerTitleComponent,
          headerTitleContainerStyle: { alignItems: 'center' }, // Centraliza o título e a imagem
          headerStyle: { backgroundColor: '#8a2be2' },
          headerTintColor: Colors[colorScheme ?? 'light'].text,
          tabBarStyle: { backgroundColor: '#8a2be2', height: 70, paddingTop: 10 },
          tabBarLabelStyle: { fontSize: 25, fontWeight: 'bold', paddingBottom: 3 },
        }}
      />
    </Tabs>
  );
}
