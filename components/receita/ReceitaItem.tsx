import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Receita } from "@/interfaces/Receita";

interface ReceitaProps {
  receita: Receita;
}

function ReceitaItem({ receita }: ReceitaProps) {
  return (
    <View style={styles.receitaItem}>
      <Text style={styles.receitaNome}>{receita.nome}</Text>
      <Text style={styles.camposReceita}>
        Tempo de Preparo: {receita.tempoPreparo}
      </Text>
      <Text style={styles.camposReceita}>Porções: {receita.porcoes}</Text>
      <Text style={styles.camposReceita}>
        Dificuldade: {receita.dificuldade}
      </Text>
      <Text style={styles.camposReceita}>Categoria: {receita.categoria}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
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

export default ReceitaItem;
