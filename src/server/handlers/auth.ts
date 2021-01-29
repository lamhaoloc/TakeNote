import {Request,Response} from 'express';

export default {
    login:async (request:Request,response:Response) => {
        try{
            response.status(200).send({data:"check"})
        }catch(error){
            response.status(400).send({ message: error.message })
        }     
    } 
}