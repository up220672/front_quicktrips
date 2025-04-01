import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const NotFound = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "404 - Página no encontrada";
  }, []);

  return (
    <Container>
      <Stars />
      <CentralContent>
        <Title>404</Title>
        <Subtitle>¡UPS! PÁGINA NO ENCONTRADA</Subtitle>
        <Description>
          Lo sentimos, la página que buscas no existe o ha sido movida.
          <br />
          Mientras tanto, puedes volver al inicio y explorar nuestros contenidos.
        </Description>
        <HomeButton onClick={() => navigate('/')}>Volver al inicio</HomeButton>
      </CentralContent>
      <Astronaut>
        <AstronautImage src="https://assets.codepen.io/1538474/astronaut.svg" alt="Astronauta" />
      </Astronaut>
      <Planet>
        <PlanetImage src="https://cdn-icons-png.flaticon.com/512/2909/2909563.png" alt="Planeta" />
      </Planet>
    </Container>
  );
};

export default NotFound;

// Animaciones
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const blink = keyframes`
  0% { opacity: 1; }
  50% { opacity: 0.3; }
  100% { opacity: 1; }
`;

// Estilos
const Container = styled.div`
  position: relative;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-family: 'Poppins', sans-serif;
  text-align: center;
`;

const Stars = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: url('https://assets.codepen.io/1538474/star.svg') repeat;
  animation: ${blink} 5s infinite;
`;

const CentralContent = styled.div`
  position: relative;
  z-index: 2;
  max-width: 600px;
  padding: 2rem;
`;

const Title = styled.h1`
  font-size: 8rem;
  margin: 0;
  font-weight: 900;
  background: linear-gradient(45deg, #00dbde, #fc00ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  text-shadow: 0 0 20px rgba(0, 219, 222, 0.3);

  @media (max-width: 768px) {
    font-size: 5rem;
  }
`;

const Subtitle = styled.h2`
  font-size: 1.5rem;
  margin: 0.5rem 0 1.5rem;
  color: #e94560;
  text-transform: uppercase;
  letter-spacing: 3px;

  @media (max-width: 768px) {
    font-size: 1.2rem;
  }
`;

const Description = styled.p`
  font-size: 1.1rem;
  line-height: 1.6;
  margin-bottom: 2rem;
  opacity: 0.9;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`;

const HomeButton = styled.button`
  background: linear-gradient(45deg, #3a7bd5, #00d2ff);
  border: none;
  color: white;
  padding: 12px 30px;
  font-size: 1rem;
  border-radius: 50px;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 5px 15px rgba(58, 123, 213, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 600;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 8px 20px rgba(58, 123, 213, 0.6);
    background: linear-gradient(45deg, #00d2ff, #3a7bd5);
  }

  &:active {
    transform: translateY(1px);
  }
`;

const Astronaut = styled.div`
  position: absolute;
  top: 40%;
  right: 10%;
  width: 150px;
  height: 150px;
  animation: ${float} 6s ease-in-out infinite;

  @media (max-width: 768px) {
    width: 100px;
    height: 100px;
    right: 5%;
    top: 30%;
  }
`;

const AstronautImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
`;

const Planet = styled.div`
  position: absolute;
  bottom: -50px;
  left: -50px;
  width: 300px;
  height: 300px;
  opacity: 0.5;

  @media (max-width: 768px) {
    width: 200px;
    height: 200px;
    bottom: -30px;
    left: -30px;
  }
`;

const PlanetImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 0 10px rgba(0, 210, 255, 0.5));
`;