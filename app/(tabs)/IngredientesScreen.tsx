import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import IngredienteItem from "@/components/ingrediente/IngredienteItem";
import ModalNovoIngrediente from "@/components/modals/ModalNovoIngrediente";
import { Ingrediente } from "@/interfaces/Ingrediente";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { router } from "expo-router";

function IngredientesScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoIngrediente, setNovoIngrediente] = useState<Ingrediente>({
    id: "",
    nome: "",
    quantidade: "",
    unidadeMedida: "",
    categoria: "",
  });

  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([]);
  const [location, setLocation] = useState({});
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    async function getData() {
      try {
        const data = await AsyncStorage.getItem("@ReceitasApp:ingredientes");
        const ingredientesData = data != null ? JSON.parse(data) : [];
        setIngredientes(ingredientesData);
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

  const adicionarIngrediente = async () => {
    const { id, ...ingredienteSemId } = novoIngrediente;
    let updatedIngredientes;

    if (id) {
      updatedIngredientes = ingredientes.map((ingrediente) =>
        ingrediente.id === id
          ? { ...ingrediente, ...ingredienteSemId }
          : ingrediente
      );
    } else {
      updatedIngredientes = [
        ...ingredientes,
        { id: Math.random().toString(), ...ingredienteSemId },
      ];
    }

    setIngredientes(updatedIngredientes);

    // Armazena a nova lista de ingredientes no AsyncStorage
    try {
      await AsyncStorage.setItem(
        "@ReceitasApp:ingredientes",
        JSON.stringify(updatedIngredientes)
      );
    } catch (e) {
      console.error("Erro ao armazenar ingredientes:", e);
    }

    fecharModal();
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovoIngrediente({ ...novoIngrediente, [campo]: valor });
  };

  const editarIngrediente = (ingrediente: Ingrediente) => {
    setNovoIngrediente(ingrediente);
    setModalVisible(true);
  };

  
  const fecharModal = () => {
    setModalVisible(false);
    // Limpa os campos da nova receita ao fechar o modal
    setNovoIngrediente({
      id: "",
      nome: "",
      quantidade: "",
      unidadeMedida: "",
      categoria: "",
    });
  };

  const deletarIngrediente = (id: string) => {

    const updatedIngredientes = ingredientes.filter(
      (ingrediente) => ingrediente.id !== id
    ); 

    setIngredientes(updatedIngredientes);
    
    AsyncStorage.setItem(
      "@ReceitasApp:ingredientes",
      JSON.stringify(updatedIngredientes)
    );
  };
  
  const deletarIngredienteModal = () => {
    if (novoIngrediente.id) {
      deletarIngrediente(novoIngrediente.id);
    }
    fecharModal();
  };
  
  const navigateToDetails = (selectedIngrediente: Ingrediente) => {
    router.push({
      pathname: "/Screens/IngredienteDetailScreen",
      params: { ingredienteId: selectedIngrediente.id },
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.textGPS}>{text}</Text>
      <Text style={styles.title}>Listagem de Ingredientes</Text>
      <Button
        title="Adicionar Novo Ingrediente"
        onPress={() => setModalVisible(true)}
      />

      <ScrollView>

        {ingredientes.map((item) => (
          <IngredienteItem
            key={item.id}
            ingrediente={item}
            onPress={() => navigateToDetails(item)}
          />
        ))}
      </ScrollView>

      <ModalNovoIngrediente
        visible={modalVisible}
        onClose={fecharModal}
        ingrediente={novoIngrediente}
        onChange={atualizarCampo}
        onSalvar={adicionarIngrediente}
        onDelete={deletarIngredienteModal}
        titulo={
          novoIngrediente.id
            ? `Editar ${novoIngrediente.nome}`
            : "Criar Novo Ingrediente"
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

export default IngredientesScreen;