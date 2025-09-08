import { ThemedView } from "@/components/ThemedView";
import { Receita } from "@/interfaces/Receita";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
// import { ReceitaItem } from "@/components/Receita/ReceitaItem";

export default function ReceitaDetailScreen() {
  const { receitaId } = useLocalSearchParams();
  const [receitaForDetail, setReceitaForDetail] = useState<Receita>();
  const [receitas, setReceitas] = useState<Receita[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ReceitasApp:receitas");
        const receitasData: Receita[] = data != null ? JSON.parse(data) : [];
        setReceitas(receitasData);

        receitasData.forEach((element) => {
          if (element.id.toString() == receitaId) {
            setReceitaForDetail(element);
          }
        });
      } catch (e) {}
    }
    getData();
  }, []);

  const deletarReceita = () => {
    if (receitaForDetail) {
      const updatedReceita = receitas.filter(
        (receita) => receita.id !== receitaForDetail?.id
      );
      setReceitas(updatedReceita);
      AsyncStorage.setItem(
        "@ReceitasApp:receitas",
        JSON.stringify(updatedReceita)
      );
    }
    router.replace("/ReceitasScreen");
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.box}>
      <ThemedView>
        <TouchableOpacity onPress={() => deletarReceita()} style={styles.botao}>
          <Text style={styles.textoBotao}>X</Text>
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.receitaItem}>
        <Text style={styles.receitaNome}>
          {receitaForDetail ? receitaForDetail.nome : ""}
        </Text>
        <Text style={styles.camposReceita}>
          Modo de preparo:{" "}
          {receitaForDetail ? receitaForDetail.modoPreparo : ""}
        </Text>
        <Text style={styles.camposReceita}>
          Tempo de preparo:{" "}
          {receitaForDetail ? receitaForDetail.tempoPreparo : ""}
        </Text>
        <Text style={styles.camposReceita}>
          Porções: {receitaForDetail ? receitaForDetail.porcoes : ""}
        </Text>
        <Text style={styles.camposReceita}>
          Dificuldade: {receitaForDetail ? receitaForDetail.dificuldade : ""}
        </Text>
        <Text style={styles.camposReceita}>
          Categoria: {receitaForDetail ? receitaForDetail.categoria : ""}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  box: {
    alignItems: "center",
  },
  botao: {
    backgroundColor: '#ff4d4d',
    marginTop: 10,
    width: 75,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textoBotao: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 25,
  },
  receitaItem: {
    width: 300,
    padding: 10,
    marginTop: 7,
    marginBottom: 3,
    borderRadius: 5,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
    alignItems: "center",
    backgroundColor: "#9a5ff7",
  },
  receitaNome: {
    color: "#820847",
    fontSize: 22,
    fontWeight: "bold",
  },
  camposReceita: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
