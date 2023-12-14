import React from 'react';
import { View, Text, Image, StyleSheet, Button ,TouchableOpacity} from 'react-native';
import { format } from 'date-fns';

export interface Alert {
  timestamp: number;
  percentagem: number;
  message: string;
}

interface BoxInfoProps {
  alert: Alert;
  onRemove: () => void;
}

class BoxInfo extends React.Component<BoxInfoProps> {
  handleRemove = () => {
    const { onRemove } = this.props;
    if (onRemove) {
      onRemove();
    }
  };

  formatTime = (timestamp: number) => {
    const date = new Date(timestamp);
    return `${date.getHours()}:${String(date.getMinutes()).padStart(2, '0')}`;
  };

  render() {
    const { alert } = this.props;

    const shouldRenderBoxInfo = alert.percentagem <= 20 || alert.percentagem >= 80;

    if (!shouldRenderBoxInfo) {
      return null;
    }

    let title = '';
    let description = '';

    if (alert.percentagem >= 80 && alert.percentagem < 90) {
      title = 'Nível alto';
      description = 'O nível de água está acima de 80%';
    } else if (alert.percentagem >= 90) {
      title = 'Nível muito alto';
      description = 'O nível de água está acima de 90%';
    } else if (alert.percentagem <= 20 && alert.percentagem > 11) {
      title = 'Nível baixo';
      description = 'O nível de água está abaixo de 20%';
    } else if (alert.percentagem <= 10) {
      title = 'Nível muito baixo';
      description = 'O nível de água está abaixo de 10%';
    }

    const formattedDateTime = format(alert.timestamp, 'dd/MM/yyyy HH:mm:ss');

    return (
      <View style={styles.container}>
        <Text style={styles.title}>{title}</Text>
        <View style={styles.content}>
          <Image source={require('../assets/images/alerta.png')} style={styles.image} />
          <View style={styles.textContainer}>
            <Text style={styles.description}>{description}</Text>
            <TouchableOpacity
              style={styles.removeButton}
              onPress={this.handleRemove}
            >
              <Text style={styles.buttonText}>Remover</Text>
            </TouchableOpacity>
            <Text style={styles.dateTime}>{formattedDateTime}</Text>
          </View>
        </View>
      </View>
    );
  }
}

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
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: '5%',
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  dateTime: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
    alignSelf: 'flex-end',
  },
  removeButton: {
    backgroundColor: '#8a2be2', // Defina a cor verde desejada
    padding: 10,
    borderRadius: 5,
    marginTop: 10,
    width: '80%',
  },
  buttonText: {
    color: 'white', // Cor do texto do botão
    textAlign: 'center',
    fontSize: 16,
  },
});

export default BoxInfo;
