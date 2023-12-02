// components/BoxInfo.tsx
import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

// Importe a imagem localmente
import ImagemLocal from '../assets/images/alerta.png';

interface BoxInfoProps {
  title: string;
  description: string;
}

const BoxInfo: React.FC<BoxInfoProps> = ({ title, description }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {/* Utilize a imagem importada localmente */}
        <Image source={ImagemLocal} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 16,
    margin: 8,
    alignItems: 'center',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  image: {
    width: 50,
    height: 50,
    marginRight: 16,
    alignSelf: 'flex-start',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  description: {
    fontSize: 14,
    color: '#666',
  },
});

export default BoxInfo;
