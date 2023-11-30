import { Stack ,Button} from "@mui/material"
import { useNavigate } from "react-router-dom"
import logo from "../assets/banco-pichincha-logo.svg"

const Navbar = () => {
  const navigate=useNavigate()

  return (
   <>
   <Stack   direction="row" justifyContent="space-between" sx={{bgcolor:"white"}} border={0} height="80px" >
       <Stack   margin="10px" alignItems={1}>
       <img  
          src={logo}
          
          alt="no aparece "
          style={{ width: "70%", height: "100%"   }}
          
          onClick={()=>navigate("/")}
        />
       </Stack>
       
       <Stack direction="row" spacing={1} height="50px" marginTop={2} marginRight={5}>
        
          <Button onClick={()=>navigate("/login")} variant="contained"  sx={{color:"black", background:"yellow",
          '&:hover':{
            backgroundColor: 'black',
            color:"white"
         }}} >
              INGRESO
           </Button>
       
        </Stack>
    </Stack>

   </>
  )
};

export default Navbar;
