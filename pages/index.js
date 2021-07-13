//import styled from 'styled-components'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props) {
  return (
    <Box>
      <img src={`https://github.com/${props.gitHubUser}.png`}/>
    </Box>
  )
}

export default function Home() {
  const gitHubUser = 'cristianoof'

  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    //'cpelegrin' esse não incorporou no layout, verificar
  ]

  return (
    <>
      <AlurakutMenu />
      <MainGrid>
        <div className="profileArea">
          <ProfileSideBar gitHubUser={gitHubUser}/>
        </div>

        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          <Box>
            O que deseja fazer?
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Amigos ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((amigos) => {
                return (
                  <li>
                    <a href={`/users/${amigos}`} key={amigos}>
                      <img src={`https://github.com/${amigos}.png`} />
                      <span>{amigos}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box>
            Minhas Comunidades
          </Box>
        </div>
      </MainGrid>
    </>
  )
}
