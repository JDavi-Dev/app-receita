import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import ReceitaItem from "@/components/receita/ReceitaItem";
import ModalNovaReceita from "@/components/modals/ModalNovaReceita";
import { Receita } from "@/interfaces/Receita";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { router } from "expo-router";

function ReceitasScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novaReceita, setNovaReceita] = useState<Receita>({
    id: "",
    nome: "",
    modoPreparo: "",
    tempoPreparo: "",
    porcoes: "",
    dificuldade: "",
    categoria: "",
    imagem: "",
  });

  const [receitas, setReceitas] = useState<Receita[]>([]);

  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ReceitasApp:receitas");
        const receitasData = data != null ? JSON.parse(data) : [];
        setReceitas(receitasData);
      } catch (e) {}
    }
    getData();
  }, []);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to acess location was denied");
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

  const adicionarReceita = async () => {
    const { id, ...receitaSemId } = novaReceita;
    let updatedReceitas;
    if (id) {
      updatedReceitas = receitas.map((receita) =>
        receita.id === id ? { ...receita, ...receitaSemId } : receita
      );
    } else {
      updatedReceitas = [
        ...receitas,
        { id: Math.random().toString(), ...receitaSemId },
      ];
    }

    setReceitas(updatedReceitas);

    // Armazena a nova lista de receitas no AsyncStorage
    try {
      await AsyncStorage.setItem(
        "@ReceitasApp:receitas",
        JSON.stringify(updatedReceitas)
      );
    } catch (e) {
      console.error("Erro ao armazenar receitas:", e);
    }

    fecharModal();
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovaReceita({ ...novaReceita, [campo]: valor });
  };

  const editarReceita = (receita: Receita) => {
    setNovaReceita(receita);
    setModalVisible(true);
  };

  const navigateToDetails = (selectedReceita: Receita) => {
    router.push({
      pathname: "/Screens/ReceitaDetailScreen",
      params: { receitaId: selectedReceita.id },
    });
  };

  const fecharModal = () => {
    setModalVisible(false);
    // Limpa os campos da nova receita ao fechar o modal
    setNovaReceita({
      id: "",
      nome: "",
      modoPreparo: "",
      tempoPreparo: "",
      porcoes: "",
      dificuldade: "",
      categoria: "",
      imagem: "",
    });
  };

  const deletarReceita = (id: string) => {
    /* Para funciona na web descomente a 1º linha desse bloco e comente todo Alert */

    const updatedReceitas = receitas.filter((receita) => receita.id !== id);

    setReceitas(updatedReceitas);

    AsyncStorage.setItem(
      "@ReceitasApp:receitas",
      JSON.stringify(updatedReceitas)
    );
  };

  const deletarReceitaModal = () => {
    if (novaReceita.id) {
      deletarReceita(novaReceita.id);
    }
    fecharModal();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textGPS}>{text}</Text>
      <Text style={styles.title}>Listagem de Receitas</Text>
      <Button
        title="Adicionar Nova Receita"
        onPress={() => setModalVisible(true)}
      />

      <ScrollView>
        {receitas.map((item) => (
          <ReceitaItem
            key={item.id}
            receita={item}
            onPress={() => navigateToDetails(item)}
          />
        ))}
      </ScrollView>

      <ModalNovaReceita
        visible={modalVisible}
        onClose={fecharModal}
        receita={novaReceita}
        onChange={atualizarCampo}
        onSalvar={adicionarReceita}
        onDelete={deletarReceitaModal}
        titulo={
          novaReceita.id ? `Editar ${novaReceita.nome}` : "Criar Nova Receita"
        }
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

export default ReceitasScreen;