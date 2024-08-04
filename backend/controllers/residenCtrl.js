import AsyncHandler from "express-async-handler";

import { prisma } from '../config/prismaConfig.js'

export const createResidency = AsyncHandler(async(req,res) =>{
    const {title, description, price, address, city, country, image, facilities, userEmail} = req.body.data

    console.log(req.body.data)
    try{
        const residency = await prisma.residency.create({
            data: {
            title, 
            description,
            price, 
            address, 
            city, 
            country, 
            image, 
            facilities, 
            owner : {connect : {email: userEmail}},
        },
    });

     res.send({message: "Residency create Success"});
    }catch(err){
        if(err.code === "P2002")
        {
            throw new Error("A residency with address already there!")
        }
        throw new Error(err.message)
    }
});

//function to get all Residencies
export const getAllResidencies = AsyncHandler(async(req,res) => {
    const residencies = await prisma.residency.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    res.send(residencies);
});

//function to get a specific residency
export const getResidency = AsyncHandler(async(req,res) => {
    const {id} = req.params;

    try{
        const residency = await prisma.residency.findUnique({
            where: {id}
        })
        res.send(residency)
    }catch(err){
        throw new Error(err.message);
    }
})