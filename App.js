
import React, { useEffect, useState } from 'react';
import { StyleSheet,ActivityIndicator, FlatList, Text, View, TouchableOpacity,TextInput } from 'react-native';
import axios from 'axios';

export default function App ()  {
  const [isLoading, setLoading] = useState(true);
  const[idsearch,setIdsearch] = useState('');
 // const[name,setName] = useState('');
  //const[username,setUsername] = useState('');
  const [nombre,setNombre] = useState('')
  const [apellidos,setApellidos] = useState('')
  const [data, setData] = useState([]);

  //const getUsers = async () => {
    // try {
     // const response = await fetch('https://jsonplaceholder.typicode.com/users');
      //const json = await response.json();
      //setData(json);
    //} catch (error) {
    //  console.error(error);
   // } finally {
    //  setLoading(false);
    //}
  //}

//   const getUserById  = async (id) => {
//     try {
//      const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
//      const json = await response.json();
//      setData(json);
//      //chequear si se encuentra el id
//      if(json.name != null ){
//       setName(json.name)// actualizar el estado name
//       setUsername(json.username)// actualizar el estado username
//      }
//      else{
//       alert("Identificacion no existe... Intentelo con otra")
//      }
//    } catch (error) {
//      console.error(error);
//    } finally {
//      setLoading(false);
//    }
//  }
const getClientes = async () => {
  try{
    const url = `http://172.16.58.127:3000/api/clientes`;
    const response = await axios.get(url);
    setData(response.data)

  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const getClientePorId = async (id) => {
  try{
    const url = `http://172.16.58.127:3000/api/clientes/${id}`;
    const response = await axios.get(url);
    //setData(response.data)
    setNombre(response.data.nombre);
    setApellidos(response.data.apellidos);
  }
  catch(error){
    console.log(error)
  }
  finally{
    setLoading(false)
  }
};

const saveCliente = async () => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.post(`http://172.16.58.127:3000/api/clientes`, {
      nombre,
      apellidos,
    });
    alert("Cliente agregado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};
 
const updateCliente = async (id) => {
  if (!nombre.trim() || !apellidos.trim()) {
    alert("Nombre y usuario inválido");
    return;
  }
  setLoading(true);
  try {
    const response = await axios.put(`http:///172.16.58.127:3000/api/clientes/${id}`, {
      nombre,
      apellidos,
    });
    alert("Cliente actualizado correctamente ...")
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};
const deleteCliente = async (id) => {
  try {
    if(confirm("Estas seguro de borar este cliente?")){
      const response = await axios.delete(`http://172.16.58.127:3000/api/clientes/${id}`,
      alert("Cliente Eliminado exitosamente ...")
      )}

   
   
   
  } catch (error) {
    console.log(error)
  }
  finally{
    setLoading(false);
  }
};


  useEffect(() => {
   // getUsers();
   // getMovies();// al cargar el componente por primera vez 
  }, []);

  return (
    <View style={{ flex: 1, padding: 24 }}>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'blue'}]} 
        onPress={getClientes}
        >
          

<Text style ={{color:'white',fontSize:22}}> Listado De clientes</Text>

      </TouchableOpacity>
      <View>
        <Text> clientes</Text>
          <TextInput
          placeholder='Ingrese id a buscar '
          style = {[styles.inputs]}
          onChangeText={idsearch => setIdsearch(idsearch)}
          value= {idsearch}
          />
           <TextInput

          style = {styles.inputs}
          value= {nombre}
          onChangeText = {nombre =>setNombre(nombre)}
          />
          <TextInput
          style = {styles.inputs}
          value= {apellidos}
          onChangeText = {apellidos=> setApellidos(apellidos)}
          />

      </View>
      
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'green'}]} 
        onPress={() => saveCliente()}
        >
          

<Text style ={{color:'white',fontSize:22}}> Guardar</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'purple'}]} 
        onPress={() => updateCliente(idsearch)}
        >
          

<Text style ={{color:'white',fontSize:22}}> actualizar</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'red'}]} 
        onPress={() => getClientePorId(idsearch)}
        >
          

<Text style ={{color:'white',fontSize:22}}> Buscar por Id</Text>

      </TouchableOpacity>
      <TouchableOpacity
        style = {[styles.buttons,{backgroundColor:'purple'}]} 
        onPress={() => deleteCliente(idsearch)}
        >
          

<Text style ={{color:'white',fontSize:22}}> Eliminar</Text>

      </TouchableOpacity>
       
       
      {isLoading ? <ActivityIndicator size="large" color="#00ff00" /> : (
        <FlatList
          data={data}
          keyExtractor={({ id }, index) => id}
          renderItem={({ item }) => (
            <TouchableOpacity
            style = {[styles.buttons,{backgroundColor:'orange'}]}
            onPress = { () =>{
              alert(item.nombre)
            }}
            >
              

            <Text style={{color:'white'}}>{item.id} - {item.nombre} - {item.apellidos}</Text>
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
