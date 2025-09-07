import { Image, StyleSheet } from "react-native";

import ParallaxScrollView from "@/components/ParallaxScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";

export default function Receita() {
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: "#A1CEDC", dark: "#1D3D47" }}
      headerImage={
        <Image
          source={require("@/assets/images/bolinho-de-bacalhau.jpg")}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">🐟 Bolinho de Bacalhau Tradicional</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🍽️ Rendimento</ThemedText>
        <ThemedText>Aproximadamente 25 bolinhos médios</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🧂 Ingredientes</ThemedText>
        <ThemedText>
          ● 500g de bacalhau dessalgado, cozido e desfiado{'\n'}
          ● 500g de batata (inglesa), cozida e espremida{'\n'}
          ● 1 cebola média bem picada{'\n'}
          ● 2 dentes de alho amassados{'\n'}
          ● 2 colheres (sopa) de salsinha picada{'\n'}
          ● 2 colheres (sopa) de cebolinha picada (opcional){'\n'}
          ● 2 ovos inteiros{'\n'}
          ● Sal e pimenta-do-reino a gosto{'\n'}
          ● Óleo para fritar (suficiente para imersão)
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">🍴 Utensílios</ThemedText>
        <ThemedText>
          ▪ Panela média (para cozinhar o bacalhau e as batatas){'\n'}
          ▪ Tigela grande (para misturar os ingredientes){'\n'}
          ▪ Espremedor de batatas ou garfo{'\n'}
          ▪ Faca e tábua de corte{'\n'}
          ▪ Colher de sopa (para modelar){'\n'}
          ▪ Frigideira funda ou panela para fritura{'\n'}
          ▪ Escumadeira{'\n'}
          ▪ Prato com papel-toalha (para escorrer os bolinhos){'\n'}
          ▪ Colher de pau ou espátula
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">👩‍🍳 Modo de Preparo</ThemedText>
        <ThemedText>
          1. Preparar o bacalhau: Se ainda não estiver dessalgado, deixe o bacalhau de molho por 24 a 48 horas na geladeira, trocando a água de 3 em 3 horas. Cozinhe o bacalhau em água por cerca de 10 minutos. Escorra, retire peles e espinhas e desfie bem.{'\n'}
          2. Cozinhar as batatas: Cozinhe as batatas até ficarem bem macias. Esprema ainda quentes ou amasse com garfo até virar um purê liso.{'\n'}
          3. Misturar os ingredientes: Em uma tigela, misture o bacalhau desfiado, a batata amassada, a cebola, o alho, a salsinha e a cebolinha. Adicione os ovos um a um e misture bem até obter uma massa homogênea. Tempere com sal (cuidado, o bacalhau já tem sal) e pimenta-do-reino a gosto.{'\n'}
          4. Modelar os bolinhos: Com a ajuda de duas colheres ou com as mãos levemente untadas, modele os bolinhos em formato oval ou redondinho, como preferir.{'\n'}
          5. Fritar: Aqueça o óleo em fogo médio-alto. Frite os bolinhos aos poucos, virando para dourar por igual. Retire com escumadeira e escorra em papel-toalha.
        </ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">💡 Dicas especiais</ThemedText>
        <ThemedText>
          ● Não precisa empanar! O bolinho de bacalhau tradicional não leva farinha nem empanamento.{'\n'}
          ● Quer bolinho mais sequinho? Escorra bem as batatas antes de amassar e não exagere no ovo.{'\n'}
          ● Textura perfeita: Se a massa estiver mole demais, adicione um pouco de farinha de rosca ou mais batata.{'\n'}
          ● Congele cru ou frito: Os bolinhos podem ser congelados depois de modelados ou já fritos. Na hora de usar, frite diretamente do congelador ou aqueça no forno.{'\n'}
          ● Para dar um toque especial: Raspinhas de limão-siciliano na massa ou pimenta dedo-de-moça picadinha podem dar um charme a mais!
        </ThemedText>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    width: "100%",
    position: "absolute",
  },
});
