
import React, { useEffect, useState } from 'react';
import { StyleSheet,ActivityIndicator, FlatList, Text, View, TouchableOpacity,TextInput } from 'react-native';

export default function App ()  {
  const [isLoading, setLoading] = useState(true);
  const[idsearch,setIdsearch] = useState('');
  const[name,setName] = useState('');
  const[username,setUsername] = useState('');
  const [data, setData] = useState([]);

  const getUsers = async () => {
     try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  const getUserById  = async (id) => {
    try {
     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
     const json = await response.json();
     setData(json);
     //chequear si se encuentra el id
     if(json.name != null ){
      setName(json.name)// actualizar el estado name
      setUsername(json.username)// actualizar el estado username
     }
     else{
      alert("Identificacion no existe... Intentelo con otra")
     }
   } catch (error) {
     console.error(error);
   } finally {
     setLoading(false);
   }
 }


  useEffect(() => {
   // getUsers();
   // getMovies();// al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'blue'}]} 
        onPress={getUsers}
        >
          

<Text style ={{color:'white',fontSize:22}}> Listado De usuario</Text>

      </TouchableOpacity>
      <View>
        <Text> Usuarios</Text>
          <TextInput
          placeholder='Ingrese id a buscar '
          style = {[styles.inputs]}
          onChangeText={idsearch => setIdsearch(idsearch)}
          value= {idsearch}
          />
           <TextInput

          style = {styles.inputs}
          value= {name}
          />
          <TextInput
          style = {styles.inputs}
          value= {username}
          />

      </View>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'red'}]} 
        onPress={() => getUserById(idsearch)}
        >
          

<Text style ={{color:'white',fontSize:22}}> Buscar</Text>

      </TouchableOpacity>
       
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
            style = {[styles.buttons,{backgroundColor:'orange'}]}
            onPress = { () =>{
              alert(item.email)
            }}
            >
              

            <Text>{item.name}, {item.username}</Text>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },

  buttons :{
    
    borderRadius:10, 
    alignItems:'center', 
    marginTop:10,
    height:50,
    justifyContent:'center'
  },

  inputs:{
    borderRadius:8, 
    textAlign:'center',
    height:40, 
    borderWidth:2, 
    borderColor:'green',
    marginTop:5
  }
});
