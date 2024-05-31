import { useEffect, useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.css'
import { db } from '../firebase-config'
import { getDocs, collection, doc, deleteDoc, addDoc, updateDoc } from 'firebase/firestore'





function App() {

  const[fetched, setFetched] = useState([])
  const [name, setName]=useState('')
  const [age, setAge]=useState('')
  const [displayAddUser, setDisplayAddUser] = useState(false)
  const [updateId, setId] = useState('')




  const collectionRef = collection(db, "users")

  useEffect(()=>{
     const getDocuments = async () =>
      {try {
      const data = await getDocs(collectionRef)
      const documents = data.docs.map((doc)=>({id:doc.id, ...doc.data()}))
      setFetched(documents)
     } catch(err){
      console.log(err)
     }}
     getDocuments()
  },[])



  const handleDelete = async (id)=>{

    try{

      const userDoc = doc(collectionRef, id);
      await deleteDoc(userDoc);
      alert(`${id} was deleted successfully`)
      const data = await getDocs(collectionRef)
      const documents = data.docs.map((doc)=>({id:doc.id, ...doc.data()}))
      setFetched(documents)

    }catch(err){
      console.log(err)
    }
  }



  const handleAdd = async(e)=>{
    e.preventDefault() 
    await addDoc(collectionRef, {name, age})
    alert(`${name} was added successfully`)
    setName('')
    setAge('')
      const data = await getDocs(collectionRef)
      const documents = data.docs.map((doc)=>({id:doc.id, ...doc.data()}))
      setFetched(documents)

  }



  const handleUpdate = async ()=>{

    try{
       const id = updateId
      const userDoc = doc(collectionRef, id);
      await updateDoc(userDoc, {name, age});
      alert(`${id} was update successfully`)
      setName('')
      setAge('')
      setId('')
  
      const data = await getDocs(collectionRef)
      const documents = data.docs.map((doc)=>({id:doc.id, ...doc.data()}))
      setFetched(documents)

    }catch(err){
      console.log(err)
    }
  }



   

  return (
   
       <div className='d-flex justify-content-center vh-100 bg-primary align-items-center'>
           <div className='w-50 bg-secondary p-3 rounded'> 
                <div
                  className="table-responsive"
                >
                 <h2>Current Users</h2>

                  <table
                    className="table table-primary"
                  >
                    <thead>
                      <tr>
                        <th scope="col">Sl. No.</th>
                        <th scope="col">Name</th>
                        <th scope="col">Age</th>
                        <th scope='col' >Actions 1</th>
                        <th scope='col' >Action 2</th>
                      </tr>
                    </thead>
                   { fetched.map((doc)=>(<tbody>
                      <tr id={doc.id}>
                        <td scope="row">{doc.id}</td>
                        <td>{doc.name}</td>
                        <td>{doc.age}</td>
                        <td><a
                          name=""
                          id=""
                          className="btn btn-danger"
                          href="#"
                          role="button"
                          onClick={()=>handleDelete(doc.id)}
                          >Delete</a
                        >
                        </td>
                        <td><a
                          name=""
                          id=""
                          className="btn btn-warning"
                          href="#"
                          role="button"
                          onClick={()=>{
                            setDisplayAddUser(!displayAddUser)
                            setId(doc.id)}}
                          >Edit</a
                        >
                        </td>
                      </tr>
                    </tbody>))}
                  </table>
                    
               {displayAddUser? (  
                    <div className=' bg-white p-3 rounded'>

                    <h2>Add User</h2>
                    <form onSubmit={handleAdd}>
                    <div className="mb-3">
                      <label for="" className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        value={name}
                        onChange={(e)=>setName(e.target.value)}
                        placeholder="Enter your name"
                      />
                    </div>
         
                    <div className="mb-3">
                      <label for="" className="form-label">Age</label>
                      <input
                        type="text"
                        className="form-control"
                        name=""
                        id=""
                        aria-describedby="helpId"
                        value={age}
                        onChange={(e)=>setAge(e.target.value)}
                        placeholder="Enter your age"
                      />
                    </div>
                    <button
                      name=""
                      id=""
                      className="btn btn-primary"
                      href="#"
                      type="submit"

                      >Add User</button>
                    </form>
                    
         
                    </div>):(
                          <div className=' bg-white p-3 rounded'>

                                      <h2>Update User</h2>
                                      <form onSubmit={handleUpdate}>
                                      <div className="mb-3">
                                        <label for="" className="form-label">Name</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name=""
                                          id=""
                                          aria-describedby="helpId"
                                          value={name}
                                          onChange={(e)=>setName(e.target.value)}
                                          placeholder="Enter your name"
                                        />
                                      </div>
                          
                                      <div className="mb-3">
                                        <label for="" className="form-label">Age</label>
                                        <input
                                          type="text"
                                          className="form-control"
                                          name=""
                                          id=""
                                          aria-describedby="helpId"
                                          value={age}
                                          onChange={(e)=>setAge(e.target.value)}
                                          placeholder="Enter your age"
                                        />
                                      </div>
                                      <button
                                        name=""
                                        id=""
                                        className="btn btn-primary"
                                        href="#"
                                        type="submit"

                                        >Update User</button>
                                      </form>
                                      </div>
                            )}
         
         
                

           
            </div>
          </div>
       </div>

  )
}

export default App
