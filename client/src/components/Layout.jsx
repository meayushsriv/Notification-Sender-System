import {
  Container,
  CssBaseline,
  AppBar,
  Toolbar,
  Typography,
  Button,
} from "@mui/material";
import { Link, Outlet } from "react-router-dom";

export default function Layout() {
  return (
    <>
      <CssBaseline />
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            Notification Service
          </Typography>
          <Button color="inherit" component={Link} to="/">
            Send Notification
          </Button>
        </Toolbar>
      </AppBar>
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Outlet />
      </Container>
    </>
  );
}
