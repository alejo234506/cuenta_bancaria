import { useState } from "react";
import { Urlbase } from "../URL/url";
import Navbar from "../Components/Navbar"
import { LoadingButton } from "@mui/lab";
import { Stack, TextField, Alert } from "@mui/material";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [form, setForm] = useState({
        account : "",
        password: ""
      });
      const [loading, setLoading] = useState(false);
      const [errorMessage, setErrorMessage] = useState("");
      const navigate=useNavigate();
      // Funcion que guarda valores
      const handleChange = ({ target }) => {
        const { value, name } = target;
        setForm((prop) => ({
          ...prop,
          [name]: value,
        }));
        console.log(form);
      };
    
    
      //Funcion submit
      const handleSubmit = async  () => {
        try {
          setLoading(true);
          const { data } = await axios.post(`${Urlbase}/login`, {
           account: form.account,
           password: form.password
    
          });
          console.log(data);
          setLoading(false);
          setErrorMessage("");
          navigate("/cuenta")
        } catch (error) {
          setLoading(false);
          setErrorMessage(error.response.data.msg);
         
        }
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
      };







  return (
    <>
      <Navbar></Navbar>
      <Stack display="flex" alignItems="center" marginTop="50px" spacing={5}>
      <TextField
          p={3}
          sx={{ width:"300px" }}
          name="account"
          label="Email"
          onChange={handleChange}
        ></TextField>
        
        <TextField
          p={3}
          sx={{ width: "300px" }}
          name="password"
          label="contraseña"
          onChange={handleChange}
          type="password"
        ></TextField>
        <LoadingButton
            loading={loading}
            onClick={handleSubmit}
            variant="contained"
        >
            SUBMIT
        </LoadingButton>
        {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
    </Stack>
    </>
  )
}

export default Login

