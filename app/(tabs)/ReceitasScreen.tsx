import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import ReceitaItem from '@/components/receita/ReceitaItem';
import ModalNovaReceita from '@/components/modal/ModalNovaReceita';
import { Receita } from '@/interfaces/Receita';

function ReceitasScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novaReceita, setNovaReceita] = useState<Receita>({
    id: '', nome: '', modoPreparo: '', tempoPreparo: '', porcoes: '', dificuldade: '', categoria: '', imagem: ''
  });

  const [receitas, setReceitas] = useState<Receita[]>([
    { id: '1', nome: 'Bolo de Chocolate', modoPreparo: 'Misture tudo e asse.', tempoPreparo: '30 min', porcoes: '8', dificuldade: 'fácil', categoria: 'sobremesa' },
    { id: '2', nome: 'Lasanha', modoPreparo: 'Monte e asse.', tempoPreparo: '1h', porcoes: '6', dificuldade: 'médio', categoria: 'prato principal' },
  ]);

  const adicionarReceita = () => {
    const { id, ...receitaSemId } = novaReceita;
    setReceitas([...receitas, { id: Math.random().toString(), ...receitaSemId }]);
    setModalVisible(false);
    setNovaReceita({ id: '', nome: '', modoPreparo: '', tempoPreparo: '', porcoes: '', dificuldade: '', categoria: '', imagem: '' });
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovaReceita({ ...novaReceita, [campo]: valor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Receitas</Text>
      <Button title="Adicionar Nova Receita" onPress={() => setModalVisible(true)} />

      <ScrollView>
        {receitas.map((item) => (
          <ReceitaItem key={item.id} receita={item} />
        ))}
      </ScrollView>

      <ModalNovaReceita
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        receita={novaReceita}
        onChange={atualizarCampo}
        onSalvar={adicionarReceita}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#393340'
  },
  title: {
    color: 'white',
    fontSize: 38,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default ReceitasScreen;
