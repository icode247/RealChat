import React from "react";
import Button from "@material-ui/core/Button";
import CssBaseline from "@material-ui/core/CssBaseline";
import TextField from "@material-ui/core/TextField";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";

import Rooms from "./components/Rooms/Rooms";
import "./styles.css";

function LoginPage(props) {
  const [name, setName] = React.useState("");
  function handleSubmit() {
    props.setUser(() => name);
    props.setLogged((prev) => !prev);
  }
  function handleChange(e) {
    const { value } = e.target;
    setName(() => value);
  }
  const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(1)
    },
    submit: {
      margin: theme.spacing(3, 0, 2)
    }
  }));
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {/* <Avatar className=classes.avatar}>
          <LockOutlinedIcon />
        </Avatar> */}
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form
          className={classes.form}
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            onChange={handleChange}
            value={name}
          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            type="submit"
          >
            Sign In
          </Button>
        </form>
      </div>
      <Box mt={8}></Box>
    </Container>
  );
}
function App() {
  const [logged, setLogged] = React.useState(false);
  const [user, setUser] = React.useState(null);
 
  function handleLog(){
     setLogged(prev => !prev)
     setUser(()=>null)
  }
  return (
    <div>
      {logged ? (
        <Rooms activeUser={user} handleLog={handleLog}/>
      ) : (
        <LoginPage setLogged={setLogged} setUser={setUser} />
      )}
    </div>
  );
}

module.exports = App;
