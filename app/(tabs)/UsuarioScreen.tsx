import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import UsuarioItem from "@/components/usuario/UsuarioItem";
import ModalNovoUsuario from "@/components/modals/ModalNovoUsuario";
import { Usuario } from "@/interfaces/Usuario";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

function UsuarioScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoUsuario, setNovoUsuario] = useState<Usuario>({
    id: "",
    email: "",
    senha: ""
  });

  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@UsuariosApp:usuarios");
        const usuariosData = data != null ? JSON.parse(data) : [];
        setUsuarios(usuariosData);
      } catch (e) {}
    }
    getData();
  }, []);

  useEffect(() => {
    (async () => {

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to acess location was denied');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  let text = "Waiting...";
  if (errorMsg) {
    text = errorMsg;
  } else if (location) {
    text = JSON.stringify(location);
  }

  const adicionarUsuario = async () => {
    const { id, ...usuarioSemId } = novoUsuario;
    let updatedUsuario;

    if (id) {
      updatedUsuario = usuarios.map((usuario) =>
        usuario.id === id
          ? { ...usuario, ...usuarioSemId }
          : usuario
      );
    } else {
      updatedUsuario = [
        ...usuarios,
        { id: Math.random().toString(), ...usuarioSemId },
      ];
    }

    setUsuarios(updatedUsuario);

    // Armazena a nova lista de ingredientes no AsyncStorage
    try {
      await AsyncStorage.setItem(
        "@UsuariosApp:usuarios",
        JSON.stringify(updatedUsuario)
      );
    } catch (e) {
      console.error("Erro ao armazenar ingredientes:", e);
    }

    fecharModal();
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovoUsuario({ ...novoUsuario, [campo]: valor });
  };

  const editarUsuario = (usuario: Usuario) => {
    setNovoUsuario(usuario);
    setModalVisible(true);
  };

  const fecharModal = () => {
    setModalVisible(false);
    // Limpa os campos da nova receita ao fechar o modal
    setNovoUsuario({
      id: "",
      email: "",
      senha: ""
    });
  };

  const deletarIngrediente = (id: string) => {
    /* Para funciona na web descomente a 1º linha desse bloco e comente todo Alert */

    const updatedUsuario = usuarios.filter(
      (usuario) => usuario.id !== id
    );


    setUsuarios(updatedUsuario);

    AsyncStorage.setItem(
      "@UsuariosApp:usuarios",
      JSON.stringify(updatedUsuario)
    );
  };

  const deletarUsuarioModal = () => {
    if (novoUsuario.id) {
      deletarIngrediente(novoUsuario.id);
    }
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textGPS}>{text}</Text>
      <Text style={styles.title}>Listagem de Usuarios</Text>
      <Button
        title="Adicionar Novo Usuário"
        onPress={() => setModalVisible(true)}
      />

      <ScrollView>
        {usuarios.map((item) => (
          <UsuarioItem
            key={item.id}
            usuario={item}
            onEdit={() => editarUsuario(item)}
          />
        ))}
      </ScrollView>

      <ModalNovoUsuario
        visible={modalVisible}
        onClose={fecharModal}
        usuario={novoUsuario}
        onChange={atualizarCampo}
        onSalvar={adicionarUsuario}
        onDelete={deletarUsuarioModal}
        titulo={"Criar Novo Usuario"}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    padding: 20,
    backgroundColor: "#393340",
  },
  textGPS: {
    color: "blue",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default UsuarioScreen;
