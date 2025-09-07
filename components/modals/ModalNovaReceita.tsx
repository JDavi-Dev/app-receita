import React from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Receita } from "@/interfaces/Receita";

interface ModalNovaReceitaProps {
  visible: boolean;
  onClose: () => void;
  receita: Receita;
  onChange: (campo: string, valor: string) => void;
  onSalvar: () => void;
}

function ModalNovaReceita({ visible, onClose, receita, onChange, onSalvar,}: ModalNovaReceitaProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
        <Text style={styles.modalTitle}>Criar Nova Receita</Text>
        <TextInput
          placeholder="Nome da Receita"
          value={receita.nome}
          onChangeText={(text) => onChange("nome", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Modo de Preparo"
          value={receita.modoPreparo}
          onChangeText={(text) => onChange("modoPreparo", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Tempo de Preparo"
          value={receita.tempoPreparo}
          onChangeText={(text) => onChange("tempoPreparo", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Porções"
          value={receita.porcoes}
          onChangeText={(text) => onChange("porcoes", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Dificuldade"
          value={receita.dificuldade}
          onChangeText={(text) => onChange("dificuldade", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Categoria"
          value={receita.categoria}
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

export default ModalNovaReceita;
