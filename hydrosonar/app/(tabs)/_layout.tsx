import React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Link, Tabs } from 'expo-router';
import { Pressable, useColorScheme } from 'react-native';

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
    <Link href="/modal" asChild>
      <Pressable>
        {({ pressed }) => (
          <FontAwesome
            name="info-circle"
            size={25}
            color={Colors[colorScheme ?? 'light'].text}
            style={{ marginRight: 15, opacity: pressed ? 0.5 : 1 }}
          />
        )}
      </Pressable>
    </Link>
  );

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        tabBarInactiveTintColor: '#270058', // Cor de roxo mais escuro para ícones desabilitados
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color }) => <TabBarIcon name="home" color={color} />,
          headerRight: () => headerRightComponent,
          headerStyle: { backgroundColor: '#8a2be2' }, // Cor de fundo roxa
          headerTintColor: Colors[colorScheme ?? 'light'].text, // Cor do texto no cabeçalho
          tabBarStyle: { backgroundColor: '#8a2be2', height: 80, paddingTop: 10 },
          tabBarLabelStyle: { fontSize: 25, fontWeight: 'bold', paddingBottom: 10 },
        }}
      />
      <Tabs.Screen
        name="two"
        options={{
          title: 'Tab Two',
          tabBarIcon: ({ color }) => <TabBarIcon name="warning" color={color} />,
          headerRight: () => headerRightComponent, // Copia o componente do cabeçalho da tela "Início"
          headerStyle: { backgroundColor: '#8a2be2' }, // Cor de fundo roxa
          headerTintColor: Colors[colorScheme ?? 'light'].text, // Cor do texto no cabeçalho
          tabBarStyle: { backgroundColor: '#8a2be2', height: 80, paddingTop: 10 },
          tabBarLabelStyle: { fontSize: 25, fontWeight: 'bold', paddingBottom: 10 },
        }}
      />
    </Tabs>
  );
}
