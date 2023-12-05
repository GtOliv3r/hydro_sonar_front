import { StyleSheet } from 'react-native';
import { Text, View } from '../../components/Themed';

export default function TabOneScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.rect} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },
  rect: {
    position: 'absolute',
    top: 0,
    left: 0,
    backgroundColor: '#5900CB',
    height: 100,
    width: '100%',
    borderBottomLeftRadius: 70,
  },
});
