import './font.css';

import Header from "./components/Header";
import Todos from "./components/Todos";

import Container from '@mui/material/Container';

function App() {
  return (
    <Container maxWidth='md'>
      <Header />
      <Todos />
    </Container>
  );
}

export default App;
