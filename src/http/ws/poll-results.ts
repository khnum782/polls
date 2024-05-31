import { FastifyInstance } from "fastify";
import z from "zod";
import { voting } from "../../utils/voting-pub-sub";

 export async function pollResults(app: FastifyInstance){
  app.get('/polls/:pollid/results',{websocket: true}, (connection, request) =>{
      connection.socket.on('message', (message: string) =>{
        const getPollParams = z.object({
            pollID: z.string().uuid(),
          })
       
        const { pollID} = getPollParams.parse(request.params)
        
        
        voting.subscribe(pollID, (message) => {
            connection.socket.send(JSON.stringify(message))
        })
      })
  })
 }