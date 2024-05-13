import { Troubleshoot } from "@mui/icons-material";

export async function getToken(){
  try {
    const response = await fetch("http://localhost:5000/api/checkToken", {
      method: "GET",
      // headers: {
      //   "content-Type": "application/json",
      // },
      credentials: "include",
    });
    if (response.ok) {
      const data = await response.json();
      const token = data.token;
    //   console.log(token)
      return true
    }else{
        return false
    }
  } catch (error) {
    //   console.error("Login failed");
      return false
  }
};
