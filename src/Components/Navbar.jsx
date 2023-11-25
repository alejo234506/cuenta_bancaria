import { Stack ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/icons8-grupo-de-usuarios-mujer-mujer-94.png"

const Navbar = () => {
  const navigate=useNavigate()

  return (
   <>
   <Stack direction="row" justifyContent="space-between" border={1} height="80px" >
       <Stack marginleft={3} marginTop={1}>
       <img 
          src={logo}
          alt="no aparece "
          style={{ width: "50px", height: "50px"   }}
          onClick={()=>navigate("/")}
        />
       </Stack>
       
       <Stack direction="row" spacing={1} height="50px" marginTop={2} marginRight={5}>
        
          <Button onClick={()=>navigate("/login")} variant="contained"  sx={{color:"white", background:"black"}} >
              INGRESO
           </Button>
       
        </Stack>
    </Stack>

   </>
  )
};

export default Navbar;
