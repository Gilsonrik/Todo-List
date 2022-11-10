import { useState} from 'react';
import './App.css';
import {Alert, Container, Form, InputGroup,Button,Card} from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {FontAwesomeIcon}  from '@fortawesome/react-fontawesome'; 
import { faTrashAlt, faCirclePlus, faEdit, faPenToSquare, faSquareCheck} from '@fortawesome/free-solid-svg-icons';


function App() {

const [Lista, setLista] = useState([]);
const [novaTarefa, setNovaTarefa] = useState("")
const [editTarefa, setEditTarefa] = useState(0)

const [showAddAlert,setShowAddAlert] = useState(false);

const adicionarNovaTarefa = () => {
  
  if(!novaTarefa){ 
    return setShowAddAlert(true);
  }else{
    setLista([ {id: new Date().getTime(), nomeTarefa:novaTarefa, completed:false },...Lista]);
    setNovaTarefa("");
    setShowAddAlert(false)
  }
}

const editarTarefa = () => {
  
  if(editTarefa){

    const indx = Lista.find((elem) => elem.id === editTarefa);
    
    const updateLista = Lista.map((list) => list.id === indx.id // se id no array e id encontrado forem identico 
      ?
      (list = { id:list.id, nomeTarefa:novaTarefa, completed: list.completed })//procura no array id encontrado e insere novas tarefas  no array
      :
      ({ id:list.id, nomeTarefa:list.nomeTarefa, completed: list.completed })//se mantem o array igual

    );

    setLista([...updateLista])
    setNovaTarefa("")
    setEditTarefa(0)
    setShowAddAlert(false)
    return
  } 
}

const getTarefa = (id) => {

  const indx = Lista.find((elm) => elm.id === id);
  setNovaTarefa(indx.nomeTarefa)
  setEditTarefa(id)
  setShowAddAlert(false)
}

const tarefaCompleted = (id, complt) => {

  const indx = Lista.findIndex((elm) => elm.id === id)
  const novaLista = [...Lista]
  setShowAddAlert(false)
  
  novaLista[indx].completed = !complt // completed => true

  setLista([...novaLista])
}


const  deletarTarefa = (id) =>{

  const novaLista = Lista.filter((elm) => elm.id !== id);
  setLista([...novaLista])
  setNovaTarefa("")
  setEditTarefa(0) 
}

const clearAll = ()=>{
  setLista([]);
  setNovaTarefa("")
  setEditTarefa(0)
}

  return (
    <div>
      <Container>
      <div className="m-4">
        <h1 className="titulo ">Lista Tarefas</h1>
        </div>
          <Card className="border border-dark bg-dark text-white mt-3 m-4">
            <Card.Body>
                <InputGroup >
                    <Form.Control
                      type="text"
                      onChange={e => setNovaTarefa(e.target.value)}
                      value={novaTarefa}
                      placeholder="Digite tarefas a fazer..."
                    />
                    {
                    editTarefa  ? 
                      <Button
                      onClick={() => editarTarefa()} 
                      variant="outline-warning"
                      size="lg"
                      style={{width: "20%"}}
                      >
                        Editar{' '}
                      <FontAwesomeIcon 
                        icon={faPenToSquare}
                      />
                      </Button>
                    : 
                      <Button
                      type="submit"
                      onClick={() => adicionarNovaTarefa()} 
                      variant="outline-primary"
                      size="lg"
                      style={{width: "20%"}}
                      > 
                        Adicionar{' '}
                        <FontAwesomeIcon 
                        icon={faCirclePlus}
                        />
                      </Button>
                    }
                    
                </InputGroup>
              
              <Alert show={showAddAlert} variant="danger mt-4" onClose={() => setShowAddAlert(false)} style={{height:"55px"}} dismissible>
                  <h5>Digite uma tarefa</h5>
              </Alert> 
              
          </Card.Body>
        </Card>
        <div className="mt-3 m-4">
          <ul className=" ul-lista-tarefa ">
            {Lista.map((lista)=> (
              <li className={lista.completed ? "listItem-completed " : "lisItem"} key={lista.id}>
                <div className="dados-tarefa mb-2 mt-4">
                  <span className="nome-tarefa" >{lista.nomeTarefa}</span>
                  <div className="div-btnOpc">
                  <Button
                      variant="warning"
                      onClick={()=>tarefaCompleted(lista.id, lista.completed)}
                      className="btn-completed"
                      >
                        <FontAwesomeIcon 
                          icon={faSquareCheck}
                        />
                      </Button>{' '}
                    <Button
                      variant="primary"
                      onClick={()=>getTarefa(lista.id)}
                      className="btn-Edit"
                      >
                        <FontAwesomeIcon 
                          icon={faEdit}
                        />
                      </Button>{' '}
                      <Button
                      onClick={()=> deletarTarefa(lista.id)} 
                      variant="danger"
                      className="btn-Delete"
                      >
                        <FontAwesomeIcon 
                          icon={faTrashAlt}
                        />
                      </Button>
                  </div>
                </div>
              </li>
          ))} 
          </ul>
        </div>
        <div className=' mt-0 d-grid gap-6 div-btnDelete'>
          {
          Lista.length > 0 ?
            <Button
            onClick={()=> clearAll()} 
            variant="danger"
            size="lg"
            className="m-4 "
            >
              <h4>Clear</h4>
            </Button>
            
          :
            <></>
          }     
        </div>  
      </Container>
    </div>
  
  ); 
}

export default App;

