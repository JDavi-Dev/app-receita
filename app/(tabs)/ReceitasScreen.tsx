import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  StyleSheet,
  ScrollView,
  Alert,
} from "react-native";
import ReceitaItem from "@/components/receita/ReceitaItem";
import ModalNovaReceita from "@/components/modals/ModalNovaReceita";
import { Receita } from "@/interfaces/Receita";

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

  const [receitas, setReceitas] = useState<Receita[]>([
    {
      id: "1",
      nome: "Bolo de Chocolate",
      modoPreparo: "Misture tudo e asse.",
      tempoPreparo: "30 min",
      porcoes: "8",
      dificuldade: "fácil",
      categoria: "sobremesa",
    },
    {
      id: "2",
      nome: "Lasanha",
      modoPreparo: "Monte e asse.",
      tempoPreparo: "1h",
      porcoes: "6",
      dificuldade: "médio",
      categoria: "prato principal",
    },
  ]);

  const adicionarReceita = () => {
    const { id, ...receitaSemId } = novaReceita;
    if (id) {
      setReceitas(
        receitas.map((receita) =>
          receita.id === id ? { ...receita, ...receitaSemId } : receita
        )
      );
    } else {
      setReceitas([
        ...receitas,
        { id: Math.random().toString(), ...receitaSemId },
      ]);
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

    // setReceitas(receitas.filter(receita => receita.id !== id))
    Alert.alert(
      "Deletar Receita",
      "Tem certeza que deseja deletar esta receita?",
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Deletar",
          onPress: () =>
            setReceitas(receitas.filter((receita) => receita.id !== id)),
        },
      ]
    );
  };

  return (
    <View style={styles.container}>
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
            onEdit={() => editarReceita(item)}
            onDelete={() => deletarReceita(item.id)}
          />
        ))}
      </ScrollView>

      <ModalNovaReceita
        visible={modalVisible}
        onClose={fecharModal}
        receita={novaReceita}
        onChange={atualizarCampo}
        onSalvar={adicionarReceita}
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
  title: {
    color: "white",
    fontSize: 38,
    fontWeight: "bold",
    marginBottom: 20,
  },
});

export default ReceitasScreen;