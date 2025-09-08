import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ingrediente } from "@/interfaces/Ingrediente";

interface IngredienteProps {
  ingrediente: Ingrediente;
  onPress: () => void;
}

function IngredienteItem({ ingrediente, onPress, }: IngredienteProps) {
  return (
    <TouchableOpacity style={styles.ingredienteItem} onPress={onPress}>
      <Text style={styles.ingredienteNome}>{ingrediente.nome}</Text>
      <Text style={styles.camposIngrediente}>
        Quantidade: {ingrediente.quantidade}
      </Text>
      <Text style={styles.camposIngrediente}>Unidade de medida: {ingrediente.unidadeMedida}</Text>
      <Text style={styles.camposIngrediente}>Categoria: {ingrediente.categoria}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
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

export default IngredienteItem;