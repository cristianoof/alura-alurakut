import { SiteClient } from 'datocms-client'

const client = new SiteClient("7fee21eb32228b186e97ede992d2ec")
export default async function createRecord(request, response) {
   if(request.method === 'POST'){
      const record = await client.items.create({
         itemType: "970986",
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