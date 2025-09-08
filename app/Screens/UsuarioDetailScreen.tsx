import { ThemedView } from "@/components/ThemedView";
import { Usuario } from "@/interfaces/Usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { router, useLocalSearchParams } from "expo-router";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export default function UsuarioDetailScreen() {
  const { usuarioId } = useLocalSearchParams();
  const [usuarioForDetail, setUsuarioForDetail] = useState<Usuario>();
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [modalVisible, setModalVisible] = useState<boolean>(false);

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ReceitasApp:usuarios");
        const usuariosData: Usuario[] = data != null ? JSON.parse(data) : [];
        setUsuarios(usuariosData);

        usuariosData.forEach((element) => {
          if (element.id.toString() == usuarioId) {
            setUsuarioForDetail(element);
          }
        });
      } catch (e) {}
    }
    getData();
  }, []);

  const deletarUsuario = () => {
    if (usuarioForDetail) {
      const updatedUsuario = usuarios.filter(
        (usuario) => usuario.id !== usuarioForDetail?.id
      );
      setUsuarios(updatedUsuario);
      AsyncStorage.setItem(
        "@ReceitasApp:usuarios",
        JSON.stringify(updatedUsuario)
      );
    }
    router.replace("/UsuarioScreen");
  };

  const abrirModal = () => {
    setModalVisible(true);
  };

  return (
    <View style={styles.box}>
      <ThemedView>
        <TouchableOpacity onPress={() => deletarUsuario()} style={styles.botao}>
          <Text style={styles.textoBotao}>X</Text>
        </TouchableOpacity>
      </ThemedView>
      <View style={styles.usuarioItem}>
        <Text style={styles.usuarioNome}>Usuário</Text>
        <Text style={styles.camposUsuario}>
          Email: {usuarioForDetail ? usuarioForDetail.email : ""}
        </Text>
        <Text style={styles.camposUsuario}>
          Senha: {usuarioForDetail ? usuarioForDetail.senha : ""}
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
  usuarioNome: {
    color: "#820847",
    fontSize: 22,
    fontWeight: "bold",
  },
  camposUsuario: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
});
