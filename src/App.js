import './App.css';
import { Button } from '@mui/material';
import { Link, Route, Switch, useHistory } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  return (
    <div className="App">
      <Main />
    </div>
  );
}

function Main() {
  return (
    <>
      <div className="title">
        <Link to="/" id="heading"><p id="heading">CRUD Operations</p></Link>

        <Switch>
          <Route exact path="/">
            <Home />
          </Route>
          <Route path="/edit">
            <Edit />
          </Route>
          <Route path="/create">
            <Create />
          </Route>
        </Switch>

      </div>
    </>
  );
}

function Home() {

  //get
  const [get, setGet] = useState([]);

  useEffect(async () => {
    await axios.get("https://612dbcd5e579e1001791dcef.mockapi.io/crud")
      .then(response => setGet(response.data))
  }, [])

  //delete
  const onDelete = async (id) => {
    await axios.delete(`https://612dbcd5e579e1001791dcef.mockapi.io/crud/${id}`)
      .then(() => load())
  }

  const load = async () => await axios.get("https://612dbcd5e579e1001791dcef.mockapi.io/crud").then(response => setGet(response.data));

  const selectUser = (id) => {
    console.log(id);
  }

  
  return (
    <>
      <Link to="/create" id="create"><Button id="createbutton" variant="outlined">Create User</Button></Link>

      <div className="box">

        {get.map((data,index) =>
          <div className="card" key={index} >
            <img src={data.pic}  alt="profile_pic" id="profile_pic" width="140rem" height="120rem" />
            <p>{data.name}</p>
            <p>{data.email}</p>
            
            <Link to="/"></Link>
            <Link to={`/edit/?id=${data.id}`} id="edit" ><Button variant="outlined" onClick={() => selectUser(data.id)}>Edit Profile</Button></Link><br />
            <form><Button variant="outlined" style={{ marginTop: ".5rem" }} onClick={() => onDelete(data.id)} >Delete</Button></form>
          </div>
        )}
      </div >
    </>
  );

}

function Edit() {

  const history = useHistory();

  //put
  const load = async () => await axios.get("https://612dbcd5e579e1001791dcef.mockapi.io/crud").then(response => setGet(response.data));

  const onPut = async () => {
    await axios.put(`https://612dbcd5e579e1001791dcef.mockapi.io/crud/${id}`,get)
      .then(() => load())
      .then(() => history.goBack())
  }

  //get
  const [get, setGet] = useState([]);

  useEffect(async () => {
    await axios.get(`https://612dbcd5e579e1001791dcef.mockapi.io/crud/${id}`)
      .then(response => setGet(response.data))
  }, [])

  const handleChange = (event) => {
    const { name, value } = event.target;
    setGet({ ...get, [name]: value });
  }

  //to get id from localhost url
  const queryParams = new URLSearchParams(window.location.search);
  const id = queryParams.get("id");
  console.log(id);

  console.log("get",get)

  return (
    <>
      <p id="createhead">Edit User</p>
      <div className="edit-box">
        <form>
          <input type="text" onChange={handleChange} name="pic" value={get.pic} placeholder="Pic-url" /><br />
          <input type="text" onChange={handleChange} name="name" value={get.name} placeholder="Name" /><br />
          <input type="text" onChange={handleChange} name="email" value={get.email} placeholder="Email" /><br />
          <input type="text" onChange={handleChange} name="address" value={get.address} placeholder="Address" /><br />
          <input type="text" onChange={handleChange} name="city" value={get.city} placeholder="City" /><br />
          <input type="text" onChange={handleChange} name="country" value={get.country} placeholder="Country" /><br />
          <Button variant="outlined" style={{ marginTop: "1rem" }}
          onClick={()=>onPut(get)}
          >Save</Button>
        </form>
      </div>
    </>
  );
}

function Create() {

  const history = useHistory();

  const [post, setPost] = useState(
    {
      pic: "",
      name: "",
      email: "",
      address: "",
      city: "",
      country: ""
    });

  const handleChange = event => {
    const { name, value } = event.target;
    setPost({ ...post, [name]: value });
  }

  const postData = async () => {
    await axios.post('https://612dbcd5e579e1001791dcef.mockapi.io/crud', post)
    .then(() => history.goBack())
  }
  return (
    <>
      <p id="createhead">Create User</p>
      <div className="edit-box">
        {console.log("post", post)}
        <form>
          <input type="text" onChange={handleChange} name="pic" value={post.pic} placeholder="Pic-url" /><br />
          <input type="text" onChange={handleChange} name="name" value={post.name} placeholder="Name" /><br />
          <input type="text" onChange={handleChange} name="email" value={post.email} placeholder="Email" /><br />
          <input type="text" onChange={handleChange} name="address" value={post.address} placeholder="Address" /><br />
          <input type="text" onChange={handleChange} name="city" value={post.city} placeholder="City" /><br />
          <input type="text" onChange={handleChange} name="country" value={post.country} placeholder="Country" /><br />
          <Button variant="outlined" style={{ marginTop: "1rem" }} onClick={postData} >Create</Button>
        </form>
      </div>
    </>
  );
}


export default App;
