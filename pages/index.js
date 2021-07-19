import React from 'react'
import nookies from 'nookies'
import jwt from 'jsonwebtoken'
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, AlurakutProfileSidebarMenuDefault, OrkutNostalgicIconSet } from '../src/lib/AlurakutCommons'
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'

function ProfileSideBar(props) {
  return (
    <Box as="aside">
      <img src={`https://github.com/${props.githubUser}.png`}/>
      <hr />
      <p>
        <a className="boxLink" href={`https://github.com/${props.githubUser}`}>
          @{props.githubUser}
        </a>
      </p>
      <hr />

      <AlurakutProfileSidebarMenuDefault />
    </Box>
  )
}

function ProfileRelationsBox(props) {// #### componentizar os amigos, comunidades e seguidores, temos que passar os parametros nas props, verificar pra trabalhar isso no map
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
      <ul>
        {props.items.map((itemAtual, i) => {
          while(i<6){
            return (
              <li key={itemAtual}>
                <a href={itemAtual.html_url} target="_blank">
                  <img src={itemAtual.avatar_url} />
                  <span>{itemAtual.login}</span>
                </a>
              </li>
            )
          }
        })}
      </ul>
      <p>
        <a className="boxLink" href="#">
          Ver todos
        </a>
      </p>
    </ProfileRelationsBoxWrapper>
  )
}

export default function Home(props) {
  // Perfil do Usuário
  const githubUser = props.githubUser

  // Amigos do Usuário
  const [amigos, setAmigos] = React.useState([])
    
  // Comunidades do Usuário
  const [comunidades, setComunidades] =  React.useState([])

  // Seguidores do Usuário
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function(){
    // GET API Github - Seguindo
    fetch(`https://api.github.com/users/${githubUser}/following`)
    .then(function (respostaServidor) {
        if(respostaServidor.ok) {
            return respostaServidor.json()
        }
        throw new Error('Temos um problema, possível erro: ' + respostaServidor.status)
    })
    .then(function (respostaCompleta){
        setAmigos(respostaCompleta)
    })
    .catch(function (erro){
        console.error(erro)
    })

    // GET API Github - Seguidores 
    fetch(`https://api.github.com/users/${githubUser}/followers`)
    .then(function (respostaServidor) {
        if(respostaServidor.ok) {
            return respostaServidor.json()
        }
        throw new Error('Temos um problema, possível erro: ' + respostaServidor.status)
    })
    .then(function (respostaCompleta){
        setSeguidores(respostaCompleta)
    })
    .catch(function (erro){
        console.error(erro)
    })

    // POST API Dato com GraphQL
    fetch('https://graphql.datocms.com/',{
      method: 'POST',
      headers: {
        'Authorization': '16044616d4c22ebc112a2e0a621486',
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      },
      body: JSON.stringify({"query": `query {
        allCommunities (filter: {creatorUser: {eq: "${githubUser}"}}) {
          id
          titleComunidade
          imageComunidade
          urlComunidade
          creatorUser
          }
        }`})
    })
    .then((response) => response.json())
    .then((responseComplete) => {
      const comunidadesDato = responseComplete.data.allCommunities
      setComunidades(comunidadesDato)
    })

  }, [])
  
  return (
    <>
      <AlurakutMenu githubUser={githubUser}/>
      <MainGrid>
        <div className="profileArea">
          <ProfileSideBar githubUser={githubUser}/>
        </div>

        <div className="welcomeArea">
          <Box>
            <h1 className="title">Bem vindo(a)</h1>

            <OrkutNostalgicIconSet />
          </Box>
          
          <Box>
            <h2 className="subTitle">O que você deseja fazer?</h2>
            <form onSubmit={
              function handleCriaComunidade(e){
                e.preventDefault()
                const dadosDoForm = new FormData(e.target)

                const comunidade = {
                  titleComunidade: dadosDoForm.get('titleComunidade'),
                  imageComunidade: dadosDoForm.get('imageComunidade'),
                  urlComunidade: dadosDoForm.get('urlComunidade'),
                  creatorUser: githubUser,
                }

                fetch('api/comunidades', {
                  method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  },
                  body: JSON.stringify(comunidade)
                })
                .then(async (response) => {
                  const dados = await response.json()
                  const comunidade = dados.registroCriado
                  const atualizaComunidades = [...comunidades, comunidade]
                  setComunidades(atualizaComunidades)
                })
              }
            }>
              <div>
                <input
                  type="text"
                  name="titleComunidade"
                  placeholder="Qual será o nome da sua comunidade"
                  aria-label="Qual será o nome da sua comunidade"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="imageComunidade"
                  placeholder="Url para usar de capa"
                  aria-label="Url para usar de capa"
                />
              </div>
              <div>
                <input
                  type="text"
                  name="urlComunidade"
                  placeholder="Url link para Comunidade"
                  aria-label="Url link para Comunidade"
                />
              </div>
              <button>
                Criar comunidade
              </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea">
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Amigos ({amigos.length})</h2>
            <ul>
              {amigos.map((itemAtual, i) => {
                while(i<6){
                  return (
                    <li key={itemAtual}>
                      <a href={itemAtual.html_url} target="_blank">
                        <img src={itemAtual.avatar_url} />
                        <span>{itemAtual.login}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
            <p>
              <a className="boxLink" href="#">
                Ver todos
              </a>
            </p>
          </ProfileRelationsBoxWrapper>
          
          <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Minhas Comunidades ({comunidades.length})</h2>
            {comunidades.length == 0 ? <spam>Crie sua Primeira Comunidade!</spam>:''}
            <ul>
              {comunidades.map((itemAtual, i) => {
                while(i<6){
                  return (
                    <li key={itemAtual.id}>
                      <a href={itemAtual.urlComunidade} target="_blank">
                        <img src={itemAtual.imageComunidade} />
                        <span>{itemAtual.titleComunidade}</span>
                      </a>
                    </li>
                  )
                }
              })}
            </ul>
            <p>
              <a className="boxLink" href="#">
                Ver todos
              </a>
            </p>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={seguidores} link="itemAtual.html_url" />
        </div>
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) {
  const cookies = nookies.get(context)
  const token = cookies.USER_TOKEN

  const { isAuthenticated } = await fetch("http://localhost:3000/api/auth", {
    headers: {
      Authorization: token,
    },
  })
  .then((resposta) => resposta.json())

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
  
  const { githubUser } = jwt.decode(token)

  return {
    props: {
      githubUser
    },
  }
}



/* 
Fazendo autenticação validando com github (problema é o número de requests limitado) 
  const dadosGithub = await fetch(`https://api.github.com/users/${githubUser}`)
  .then((resposta) => resposta.json())

  if(dadosGithub.message == 'Not Found') {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }

  Versão da Alura, está retornando todos como true
  const { isAuthenticated } = await fetch('https://alurakut.vercel.app/api/auth', {
    headers: {
        Authorization: token
      }
  })
  .then((resposta) => resposta.json())

  console.log(isAuthenticated)

  if(!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      }
    }
  }
 */