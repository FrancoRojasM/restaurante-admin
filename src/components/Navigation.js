
import { Navbar, Container,Nav } from "react-bootstrap"
import {Link} from "react-router-dom"
import logorest from '../images/logorest.png';


export default function Navigation() {
  return (
    <Navbar variant="dark" expand="lg" sticky="top"
    style={{
      background:"#000000"
    }}>
      <Container>
      <Link className="nav-link" to="/">
        <Navbar.Brand>      
        <img src={logorest} style={{width:"130px",height:"100px"}}></img>
          </Navbar.Brand>
          </Link>
          <Navbar.Toggle aria-controls="navbar"/>
            <Navbar.Collapse id="navbar">
            <Nav className="me-auto">
            <Link className="nav-link" to="/">
              Inicio
            </Link>
            <Link className="nav-link" to="/categorias">
              Ver Categorias
            </Link>
            <Link className="nav-link" to="/productos">
              Ver Productos
            </Link>
            </Nav>
            </Navbar.Collapse>         
      </Container>
    </Navbar>
  )
}
