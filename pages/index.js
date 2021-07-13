import styled from 'styled-components'

const Box = styled.div`
  background: #FFFFFF;
  border-radius: 8px;
  margin-top: 10px;
`

const MainGrid = styled.main`
  display: grid;
  grid-gap: 10px;
  padding: 16px;

  @media(min-width: 860px) {
    grid-template-areas: "profileArea welcomeArea profileRelationsArea";
    grid-template-columns: 160px 1fr 312px;
  }
`

export default function Home() {
  return (
    <MainGrid>
      <div className="profileArea">
        <Box>
          <img src="https://github.com/cristianoof.png"/>
        </Box>
      </div>

      <div className="welcomeArea">
        <Box>
          Bem vindo
        </Box>
        <Box>
          O que deseja fazer?
        </Box>
      </div>

      <div className="profileRelationsArea">
        <Box>
          Meus Amigos
        </Box>
        <Box>
          Minhas Comunidades
        </Box>
      </div>
    </MainGrid>
  )
}
