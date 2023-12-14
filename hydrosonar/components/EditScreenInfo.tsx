import React from 'react';
import { StyleSheet } from 'react-native';

import Colors from '../constants/Colors';
import { ExternalLink } from './ExternalLink';
import { MonoText } from './StyledText';
import { Text, View } from './Themed';


export default function EditScreenInfo({ path }: { path: string }) {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          Este é um guia para você poder usar esse aplicativo!
        </Text>
        <Text></Text>
        <Text></Text>
        <Text></Text>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          A pagina "Início" possui alguns cards informando:  
        </Text>
        <Text>* Nível da água em porcentagem e em litros</Text>
        <Text>* Gráfico mostrando os últimos registros de consumo com horário</Text>
        <Text>* Estado da válvula: ligado ou desligado</Text>
        <Text></Text>
        <Text></Text>

        <Text
          style={styles.getStartedText}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)">
          A página "Alertas" nos mostra notificações com base no nível atual da caixa d'água:  
        </Text>
  
        <Text>* Nível muito alto (Acima de 90%)</Text>
        <Text>* Nível alto (Entre 80% e 90%)</Text>
        <Text>* Nível baixo (Entre 10% e 20%)</Text>
        <Text>* Nível muito baixo (Abaixo de 10%)</Text>


      </View>

      <View style={styles.helpContainer}>
        <ExternalLink
          style={styles.helpLink}
          href="https://github.com/GtOliv3r/hydro_sonar_front.git">
          <Text style={styles.helpLinkText} lightColor={Colors.light.tint}>
            Para mais informações, poderá acessar nosso repositório no GitHub clicando aqui
          </Text>
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightContainer: {
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: 'center',
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: 'center',
  },
});
