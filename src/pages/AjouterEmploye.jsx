import { useState } from "react";
import {
  Container,
  TextField,
  Button,
  Typography,
  Paper,
  Box,
  Grid,
  Alert
} from "@mui/material";

function AjouterEmploye() {
  const [nom, setNom] = useState("");
  const [prenom, setPrenom] = useState("");
  const [tel, setTel] = useState("");
  const [email, setEmail] = useState("");
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleAddEmploye = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setMessage("❌ Les mots de passe ne correspondent pas.");
      return;
    }

    const user = JSON.parse(localStorage.getItem("user"));
    if (!user) {
      setMessage("❌ Vous devez être connecté.");
      return;
    }

    const entrepriseId = user.entreprise_id;

    try {
      const response = await fetch("https://istock-backend-p2uc.onrender.com/add-employee", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nom,
          prenom,
          tel,
          email,
          login,
          password,
          entreprise_id: entrepriseId,
          role: "employe"
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("✅ Employé créé avec succès !");
        setNom("");
        setPrenom("");
        setTel("");
        setEmail("");
        setLogin("");
        setPassword("");
        setConfirmPassword("");
      } else {
        setMessage(`❌ ${data.message}`);
      }
    } catch (error) {
      console.error(error);
      setMessage("Erreur lors de la connexion à l'API.");
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          👤 Ajouter un employé
        </Typography>

        <Box component="form" onSubmit={handleAddEmploye}>
          <Grid container spacing={2}>
            <Grid xs={12} sm={6}>
              <TextField
                label="Nom"
                fullWidth
                value={nom}
                onChange={(e) => setNom(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12} sm={6}>
              <TextField
                label="Prénom"
                fullWidth
                value={prenom}
                onChange={(e) => setPrenom(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Téléphone"
                fullWidth
                value={tel}
                onChange={(e) => setTel(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Email"
                fullWidth
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Login"
                fullWidth
                value={login}
                onChange={(e) => setLogin(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Mot de passe"
                fullWidth
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>
            <Grid xs={12}>
              <TextField
                label="Confirmer mot de passe"
                fullWidth
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </Grid>
          </Grid>

          <Button
            variant="contained"
            color="primary"
            type="submit"
            fullWidth
            sx={{ marginTop: 3 }}
          >
            ➕ Créer l'employé
          </Button>

          {message && (
            <Alert
              severity={message.startsWith("✅") ? "success" : "error"}
              sx={{ marginTop: 2 }}
            >
              {message}
            </Alert>
          )}
        </Box>
      </Paper>
    </Container>
  );
}

export default AjouterEmploye;
