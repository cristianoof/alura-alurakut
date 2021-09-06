import { SiteClient } from 'datocms-client'

const client = new SiteClient("token")
export default async function createRecord(request, response) {
   if(request.method === 'POST'){
      const record = await client.items.create({
         itemType: "id",
         ...request.body,
      })

      response.json({
         dados: 'Comunidade Cadastrada',
         registroCriado: record,
      })
      return
   }
   response.status(404).json({
      message: "Comunidade não criada."
   })
}
