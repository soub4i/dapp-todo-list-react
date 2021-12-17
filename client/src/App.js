import React, { useEffect, useState } from "react";
import Todo from "./contracts/Todo.json";
import getWeb3 from "./getWeb3";

export default function App() {
  const [state, setState] = useState({});
  const [content, setContent] = useState("");
  const [greeting, setGreeting] = useState("");
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);

  const addTask = async (e) => {};

  const getTasks = async () => {};

  useEffect(() => {
    const init = async () => {
      const web3 = await getWeb3();
      const accounts = await web3.eth.getAccounts();
      const networkId = await web3.eth.net.getId();
      const network = Todo.networks[networkId];
      const contract = new web3.eth.Contract(
        Todo.abi,
        network && network.address
      );

      setState({
        accounts,
        contract,
      });
    };

    init();
  }, []);

  return (
    <div>
      <h1>Hello from react</h1>

      <h1>{greeting}</h1>

      <form onSubmit={(e) => addTask(e)}>
        <input onChange={(e) => setContent(e.target.value)} />
        <button type="submit">Add</button>
      </form>

      <ul>
        {tasks && tasks.length ? tasks.map((t) => <li>{t.content}</li>) : null}
      </ul>
    </div>
  );
}
