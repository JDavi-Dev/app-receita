import React from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Ingrediente } from "@/interfaces/Ingrediente";

interface ModalNovoIngredienteProps {
  visible: boolean;
  onClose: () => void;
  ingrediente: Ingrediente;
  onChange: (campo: string, valor: string) => void;
  onSalvar: () => void;
}

function ModalNovoIngrediente({ visible, onClose, ingrediente, onChange, onSalvar,}: ModalNovoIngredienteProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Criar Novo Ingrediente</Text>
        <TextInput
          placeholder="Nome do ingrediente"
          value={ingrediente.nome}
          onChangeText={(text) => onChange("nome", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Quantidade"
          value={ingrediente.quantidade}
          onChangeText={(text) => onChange("quantidade", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Unidade de medida"
          value={ingrediente.unidadeMedida}
          onChangeText={(text) => onChange("unidadeMedida", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Categoria"
          value={ingrediente.categoria}
          onChangeText={(text) => onChange("categoria", text)}
          style={styles.input}
        />
        <View style={styles.botoes}>
          <Button title="Cancelar" onPress={onClose} />
          <View style={{ width: 10 }} />
          <Button title="Salvar" onPress={onSalvar} />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 10,
    paddingLeft: 8,
    width: "100%",
  },
  botoes: {
    flexDirection: "row",
    marginTop: 5,
  },
});

export default ModalNovoIngrediente;
