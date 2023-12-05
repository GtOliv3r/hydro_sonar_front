import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { format } from 'date-fns'; // Importa a função 'format' do date-fns

interface BoxInfoProps {
  percentagem: number;
  onRemove: () => void;
}


const BoxInfo: React.FC<BoxInfoProps> = ({ percentagem, onRemove }) => {
  const formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };
  
  const shouldRenderBoxInfo = percentagem <= 20 || percentagem >= 80;

  if (!shouldRenderBoxInfo) {
    return null;
  }

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

  // Obtém a data e hora atual
  const currentDateTime = new Date();

  // Formata a data e hora para exibição
  const formattedDateTime = format(currentDateTime, 'dd/MM/yyyy HH:mm:ss');

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.content}>
        <Image source={require('../assets/images/alerta.png')} style={styles.image} />
        <View style={styles.textContainer}>
          <Text style={styles.description}>{description}</Text>
          {/* Exibe a hora no canto direito inferior */}
          <Text style={styles.dateTime}>{formattedDateTime}</Text>
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
  dateTime: {
    fontSize: 12,
    color: '#888', // Cor para a hora
    marginTop: 5,
    alignSelf: 'flex-end', // Alinha no canto direito inferior
  },
});

export default BoxInfo;
