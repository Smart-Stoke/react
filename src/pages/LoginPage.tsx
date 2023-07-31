import { IconButton } from "@mui/material";
import { useAuthContext } from "src/auth/useAuthContext";
import Iconify from "src/components/iconify";

export default function LoginPage() {
  const { loginWithGoogle } = useAuthContext();

  const handleGoogleLogin = async () => {
    try {
      const login = await loginWithGoogle();
      console.log(login);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <IconButton onClick={handleGoogleLogin}>
      <Iconify icon="eva:google-fill" color="#DF3E30" />
    </IconButton>
  );
}
