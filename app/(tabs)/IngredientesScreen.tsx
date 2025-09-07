import React, { useState } from 'react';
import { View, Text, Button, StyleSheet, ScrollView } from 'react-native';
import IngredienteItem from '@/components/ingrediente/IngredienteItem';
import ModalNovoIngrediente from '@/components/modals/ModalNovoIngrediente';
import { Ingrediente } from '@/interfaces/Ingrediente';

function IngredientesScreen() {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [novoIngrediente, setNovoIngrediente] = useState<Ingrediente>({
    id: '', nome: '', quantidade: '', unidadeMedida: '', categoria: ''
  });

  const [ingredientes, setIngredientes] = useState<Ingrediente[]>([
    { id: '1', nome: 'Tomate', quantidade: '2', unidadeMedida: 'unidades', categoria: 'Hortaliças' },
    { id: '2', nome: 'Creme de Leite', quantidade: '300', unidadeMedida: 'ml', categoria: 'Laticínios' },
  ]);

  const adicionarIngrediente = () => {
    const { id, ...ingredienteSemId } = novoIngrediente;
    setIngredientes([...ingredientes, { id: Math.random().toString(), ...ingredienteSemId }]);
    setModalVisible(false);
    setNovoIngrediente({ id: '', nome: '', quantidade: '', unidadeMedida: '', categoria: '' });
  };

  const atualizarCampo = (campo: string, valor: string) => {
    setNovoIngrediente({ ...novoIngrediente, [campo]: valor });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Listagem de Ingredientes</Text>
      <Button title="Adicionar Novo Ingrediente" onPress={() => setModalVisible(true)} />

      <ScrollView>
        {ingredientes.map((item) => (
          <IngredienteItem key={item.id} ingrediente={item} />
        ))}
      </ScrollView>

      <ModalNovoIngrediente
        visible={modalVisible}
        onClose={() => setModalVisible(false)}
        ingrediente={novoIngrediente}
        onChange={atualizarCampo}
        onSalvar={adicionarIngrediente}
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

export default IngredientesScreen;
