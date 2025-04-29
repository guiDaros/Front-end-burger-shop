import { OffersCarousel, CategoryCarousel } from "../../components";
import { Main, Banner, Container } from "./styles";



export function Home() {
  return (
    <Main>
      <Banner>
        <h1>Wellcome!</h1>
      </Banner>
      <Container>
        <div>
          <CategoryCarousel />
          <OffersCarousel />
        </div>
      </Container>
    </Main>

  );
}
