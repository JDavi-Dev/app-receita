import React from "react";
import { Text, StyleSheet, TouchableOpacity } from "react-native";
import { Usuario } from "@/interfaces/Usuario";

interface UsuarioProps {
  usuario: Usuario;
  onPress: () => void;
}

function UsuarioItem({ usuario, onPress, }: UsuarioProps) {
  return (
    <TouchableOpacity style={styles.usuarioItem} onPress={onPress}>
      <Text style={styles.camposUsuario}>Email: {usuario.email}</Text>
      <Text style={styles.camposUsuario}>Senha: {usuario.senha}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  usuarioItem: {
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
  camposUsuario: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default UsuarioItem;
