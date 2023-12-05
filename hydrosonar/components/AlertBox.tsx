import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';

interface BoxInfoProps {
  percentagem: number;
}

const BoxInfo: React.FC<BoxInfoProps> = ({ percentagem }) => {
  // Lógica para determinar se o BoxInfo deve ser renderizado
  const shouldRenderBoxInfo = percentagem <= 20 || percentagem >= 80;

  if (!shouldRenderBoxInfo) {
    // Se não deve ser renderizado, retornamos nulo (nada será renderizado)
    return null;
  }

  // Títulos e mensagens com base na porcentagem
  let title = '';
  let description = '';

  if (percentagem >= 80 && percentagem < 90) {
    title = 'Nível alto';
    description = 'O nível de água está acima de 80%';
  } else if (percentagem >= 90) {
    title = 'Nível muito alto';
    description = 'O nível de água está acima de 90%';
  } else if (percentagem <= 20 && percentagem > 11) {
    title = 'Nível baixo';
    description = 'O nível de água está abaixo de 20%';
  } else if (percentagem <= 10) {
    title = 'Nível muito baixo';
    description = 'O nível de água está abaixo de 10%';
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        {/* Utilize a imagem importada localmente */}
        <Image source={require('../assets/images/alerta.png')} style={styles.image} />
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
    width: 40,
    height: 40,
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
