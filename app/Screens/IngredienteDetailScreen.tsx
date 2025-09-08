import { ThemedView } from "@/components/ThemedView";
import { Ingrediente } from "@/interfaces/Ingrediente";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function IngredienteDetailScreen() {
  const { ingredienteId } = useLocalSearchParams();
  const [ingredienteForDetail, setIngredienteForDetail] =
    useState<Ingrediente>();
  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ReceitasApp:ingredientes");
        const ingredientesData: Ingrediente[] =
          data != null ? JSON.parse(data) : [];
        setIngredientes(ingredientesData);

        ingredientesData.forEach((element) => {
          if (element.id.toString() == ingredienteId) {
            setIngredienteForDetail(element);
          }
        });
      } catch (e) {}
    }
    getData();
  }, []);

  const deletarIngrediente = () => {
    if (ingredienteForDetail) {
      const updatedIngredientes = ingredientes.filter(
        (ingrediente) => ingrediente.id !== ingredienteForDetail?.id
      );
      setIngredientes(updatedIngredientes);
      AsyncStorage.setItem(
        "@ReceitasApp:ingredientes",
        JSON.stringify(updatedIngredientes)
      );
    }
    router.replace("/IngredientesScreen");
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.box}>
      <ThemedView>
        <TouchableOpacity
          onPress={() => deletarIngrediente()}
          style={styles.botao}
        >
          <Text style={styles.textoBotao}>X</Text>
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.ingredienteItem}>
        <Text style={styles.ingredienteNome}>
          {ingredienteForDetail ? ingredienteForDetail.nome : ""}
        </Text>
        <Text style={styles.camposIngrediente}>
          Quantidade:{" "}
          {ingredienteForDetail ? ingredienteForDetail.quantidade : ""}
        </Text>
        <Text style={styles.camposIngrediente}>
          Unidade de medida:{" "}
          {ingredienteForDetail ? ingredienteForDetail.unidadeMedida : ""}
        </Text>
        <Text style={styles.camposIngrediente}>
          Categoria:{" "}
          {ingredienteForDetail ? ingredienteForDetail.categoria : ""}
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
    backgroundColor: "#ff4d4d",
    marginTop: 10,
    width: 75,
    borderRadius: 5,
    padding: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  textoBotao: {
    color: "white",
    fontWeight: "bold",
    fontSize: 25,
  },
  ingredienteItem: {
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
  ingredienteNome: {
    color: "#820847",
    fontSize: 22,
    fontWeight: "bold",
  },
  camposIngrediente: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
