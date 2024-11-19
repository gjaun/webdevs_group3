import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

function Home(props) {
  const navigate = useNavigate();

  return (
    <Container>
      <h1>Home Page</h1>
      <p>
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Aperiam
        molestiae distinctio non voluptatem nam corrupti tempora maiores optio
        impedit? Exercitationem quod dolorem dolor fugiat delectus cupiditate ea
        labore explicabo deserunt! Lorem ipsum dolor sit, amet consectetur
        adipisicing elit. Aspernatur distinctio impedit molestias accusantium
        earum cupiditate tenetur nesciunt omnis blanditiis ex. Quod, a at? Sunt
        voluptatem eligendi delectus soluta, corrupti harum.
      </p>
      <p>
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque debitis
        eligendi voluptas saepe error dignissimos, totam ea facilis, distinctio
        reiciendis beatae fuga eum repudiandae delectus culpa voluptates aperiam
        dolor pariatur.
      </p>
      <div style={{ display: 'flex', justifyContent: 'end' }}>
        <Button
          variant="outline-dark"
          size="md"
          onClick={() => navigate('/login')}
        >
          Log In
        </Button>
        <Button
          variant="outline-dark"
          size="md"
          onClick={() => navigate('/registration')}
        >
          Registration
        </Button>
      </div>
    </Container>
  );
}

export default Home;
