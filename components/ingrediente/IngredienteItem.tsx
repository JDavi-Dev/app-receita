import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Ingrediente } from "@/interfaces/Ingrediente";
import { Ionicons } from "@expo/vector-icons";

interface IngredienteProps {
  ingrediente: Ingrediente;
  onEdit: () => void;
  onDelete: () => void;
}

function IngredienteItem({ ingrediente, onEdit, onDelete }: IngredienteProps) {
  return (
    <TouchableOpacity style={styles.ingredienteItem} onPress={onEdit}>
      <Text style={styles.ingredienteNome}>{ingrediente.nome}</Text>
      <Text style={styles.camposIngrediente}>
        Quantidade: {ingrediente.quantidade}
      </Text>
      <Text style={styles.camposIngrediente}>Unidade de medida: {ingrediente.unidadeMedida}</Text>
      <Text style={styles.camposIngrediente}>Categoria: {ingrediente.categoria}</Text>
      <TouchableOpacity onPress={onDelete}>
        <Ionicons name="trash" style={styles.deleteIcon} size={34}/>
      </TouchableOpacity>
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
  deleteIcon: {
    color: "#ed0d3e",
    marginTop: 5,
  }
});

export default IngredienteItem;