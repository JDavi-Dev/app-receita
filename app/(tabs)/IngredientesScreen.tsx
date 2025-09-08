import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import IngredienteItem from "@/components/ingrediente/IngredienteItem";
import ModalNovoIngrediente from "@/components/modals/ModalNovoIngrediente";
import { Ingrediente } from "@/interfaces/Ingrediente";

function IngredientesScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoIngrediente, setNovoIngrediente] = useState<Ingrediente>({
    id: "",
    nome: "",
    quantidade: "",
    unidadeMedida: "",
    categoria: "",
  });

  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    {
      id: "1",
      nome: "Tomate",
      quantidade: "2",
      unidadeMedida: "unidades",
      categoria: "Hortaliças",
    },
    {
      id: "2",
      nome: "Creme de Leite",
      quantidade: "300",
      unidadeMedida: "ml",
      categoria: "Laticínios",
    },
  ]);

  const adicionarIngrediente = () => {
    const { id, ...ingredienteSemId } = novoIngrediente;
    if (id) {
      setIngredientes(
        ingredientes.map((ingrediente) =>
          ingrediente.id === id
            ? { ...ingrediente, ...ingredienteSemId }
            : ingrediente
        )
      );
    } else {
      setIngredientes([
        ...ingredientes,
        { id: Math.random().toString(), ...ingredienteSemId },
      ]);
    }
    fecharModal()
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
    /* Para funciona na web descomente a 1º linha desse bloco e comente todo Alert */

    // setIngredientes(ingredientes.filter(ingrediente => ingrediente.id !== id))
    Alert.alert(
      "Deletar Ingrediente",
      "Tem certeza que deseja deletar este ingrediente?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () =>
            setIngredientes(
              ingredientes.filter((ingrediente) => ingrediente.id !== id)
            ),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
            onEdit={() => editarIngrediente(item)}
            onDelete={() => deletarIngrediente(item.id)}
          />
        ))}
      </ScrollView>

      <ModalNovoIngrediente
        visible={modalVisible}
        onClose={fecharModal}
        ingrediente={novoIngrediente}
        onChange={atualizarCampo}
        onSalvar={adicionarIngrediente}
        titulo={novoIngrediente.id ? `Editar ${novoIngrediente.nome}` : "Criar Novo Ingrediente"}
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
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default IngredientesScreen;