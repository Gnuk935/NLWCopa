import Fastify from "fastify";
import cors from '@fastify/cors'
import jwt from '@fastify/jwt'
import { poolRoutes } from "./routes/pool";
import { userRoutes } from "./routes/user";
import { guessRoutes } from "./routes/guess";
import { authRoutes } from "./routes/auth";
import { gameRoutes } from "./routes/game";

async function bootstrap(){
    const fastify = Fastify({
        logger: true,
    })

    await fastify.register(cors, {
        origin: true, //coloca o dominio ou oq pode acessar
    })

    //TODO em pd isso deve ser uma var abiente
    await fastify.register(jwt, {
        secret: 'nlwcopa'
    })

    await fastify.register(poolRoutes)   
    await fastify.register(authRoutes)
    await fastify.register(gameRoutes)
    await fastify.register(guessRoutes)
    await fastify.register(userRoutes)
    
    await fastify.listen({port: 3333})
}

bootstrap()