import React, { Component, useEffect, useState } from "react";
import SimpleStorageContract from "./contracts/SimpleStorage.json";
import Todo from "./contracts/Todo.json";
import getWeb3 from "./getWeb3";


export default function App(){

  const [state,setState] = useState({}) 
  const [content,setContent] = useState('') 
  const [greeting,setGreeting] = useState('') 
  const [tasks,setTasks] = useState([]) 
  const [loading, setLoading] = useState(false);

  const  addTask = async (e) => {
    e.preventDefault()
    await state.contract.methods.createTask(content).send( {
      from: state.accounts[0]
    })
    getTasks()
  }

  const getTasks = async () => {

 if(state.contract){

  const count =  await state.contract.methods.getCountTasks().call();
      const tasks = [];
      for (let index = 1; index <= count ; index++) {
        const element = await state.contract.methods.tasks(index).call();
        tasks.push(element)
      }
      setTasks(tasks)
    }
  }

  


  useEffect( () => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId()
      const network = Todo.networks[networkId]
      const contract = new web3.eth.Contract( Todo.abi , network && network.address)
      
      setState({
        accounts,
        contract
      })

      const greeting = await contract.methods.getGreeting().call();
      setGreeting(greeting)
      setLoading(true);
    }

    init()

  }  ,[])


  useEffect(() => {  getTasks()} , [loading])


  return <div>
<h1>Hello from react</h1>

<h1>{greeting}</h1>


<form onSubmit={ (e) => addTask(e)  }>

<input onChange={ (e) => setContent(e.target.value) } />
<button type="submit">Add</button>

</form>

<ul>
  { tasks && tasks.length ? tasks.map(t => <li>{t.content}</li>)  : null }
</ul>
</div>
}