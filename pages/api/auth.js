import jwt from 'jsonwebtoken'

export default async function githubAuth(request, response) {
  const { authorization } = request.headers
  const tokenDecoded = jwt.decode(authorization)

  if (!tokenDecoded) {
    return response.send({
      isAuthenticated: false,
    })
  }

  const dadosGithub = await fetch(`https://api.github.com/users/${tokenDecoded.githubUser}`)
  .then((resposta) => resposta.json())

  if (dadosGithub.message === "Not Found") {
    response.send({
      isAuthenticated: false,
    })
  } else {
    response.send({
      isAuthenticated: true,
    })
  }

}