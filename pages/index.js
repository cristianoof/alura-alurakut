import React from 'react'
//import styled from 'styled-components'
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

function ProfileRelationsBox(props) {// #### pra componentizar os amigos, comunidades e seguidores, temos que passar os parametros nas props
  return(
    <ProfileRelationsBoxWrapper>
      <h2 className="smallTitle">{props.title} ({props.items.length})</h2>
      <ul>
        {props.items.map((itemAtual) => {
          return (
            <li key={itemAtual}>
              <a href={itemAtual.html_url} target="_blank">
                <img src={itemAtual.avatar_url} />
                <span>{itemAtual.login}</span>
              </a>
            </li>
          )
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

export default function Home() {
  // Meu Perfil
  const githubUser = 'cristianoof'

  // Meus Amigos
  const pessoasFavoritas = [
    'juunegreiros',
    'omariosouto',
    'peas',
    'rafaballerini',
    'marcobrunodev',
    'felipefialho',
    //'cpelegrin' esse não incorporou no layout, verificar
  ]
  
  // Minhas Comunidades
  const [comunidades, setComunidades] =  React.useState([{
    id: '12334',
    titleComunidade: 'Eu estudo na Alura',
    imageComunidade: 'https://github.com/alura.png',
    urlComunidade: 'https://www.alura.com.br/'
  }])

  // Meus Seguidores
  const [seguidores, setSeguidores] = React.useState([])

  React.useEffect(function(){
    fetch('https://api.github.com/users/cristianoof/followers')
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
                  id: new Date().toISOString,
                  titleComunidade: dadosDoForm.get('titleComunidade'),
                  imageComunidade: dadosDoForm.get('imageComunidade'),
                  urlComunidade: dadosDoForm.get('urlComunidade')
                }
                const atualizaComunidades = [...comunidades, comunidade]
                setComunidades(atualizaComunidades)
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
            <h2 className="smallTitle">Meus Amigos ({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.map((itemAtual) => {
                return (
                  <li key={itemAtual}>
                    <a href={`https://github.com/${itemAtual}`}>
                      <img src={`http://github.com/${itemAtual}.png`} />
                      <span>{itemAtual}</span>
                    </a>
                  </li>
                )
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
            <ul>
              {comunidades.map((itemAtual) => {
                return (
                  <li key={itemAtual.id}>
                    <a href={itemAtual.urlComunidade}>
                      <img src={itemAtual.imageComunidade} />
                      <span>{itemAtual.titleComunidade}</span>
                    </a>
                  </li>
                )
              })}
            </ul>
            <p>
              <a className="boxLink" href="#">
                Ver todos
              </a>
            </p>
          </ProfileRelationsBoxWrapper>

          <ProfileRelationsBox title="Seguidores" items={seguidores}/>
        </div>
      </MainGrid>
    </>
  )
}
