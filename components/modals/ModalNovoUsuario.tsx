import React from "react";
import { Modal, View, Text, TextInput, Button, StyleSheet } from "react-native";
import { Usuario } from "@/interfaces/Usuario";

interface ModalNovoUsuarioProps {
  visible: boolean;
  onClose: () => void;
  usuario: Usuario;
  onChange: (campo: string, valor: string) => void;
  onSalvar: () => void;
  onDelete: () => void;
  titulo: string
}

function ModalNovoUsario({ visible, onClose, usuario, onChange, onSalvar, onDelete, titulo}: ModalNovoUsuarioProps) {
  return (
    <Modal animationType="slide" transparent={true} visible={visible} onRequestClose={onClose}>
      <View style={styles.modalView}>
      <Text style={styles.modalTitle}>{titulo}</Text>
        <TextInput
          placeholder="Email de usuário"
          value={usuario.email}
          onChangeText={(text) => onChange("email", text)}
          style={styles.input}
        />
        <TextInput
          placeholder="Senha"
          value={usuario.senha}
          onChangeText={(text) => onChange("senha", text)}
          style={styles.input}
        />
        <View style={styles.botoes}>
          <Button color="#edb410" title="Cancelar" onPress={onClose} />
          <View style={{ width: 10 }} />
          <Button color="#61eb2b" title="Salvar" onPress={onSalvar} />
          <View style={{ width: 10 }} />
          <Button color="#ed0d3e" title="Deletar" onPress={onDelete} />
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

export default ModalNovoUsario;
