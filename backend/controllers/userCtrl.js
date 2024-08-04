import asyncHandler from 'express-async-handler'

import { prisma } from '../config/prismaConfig.js'

export const createUser = asyncHandler(async(req,res) => {
    console.log("creating a user");

    let{email} = req.body;
        const userExists = await prisma.user.findUnique({where: {email: email}})
        if(!userExists) {
            const user = await prisma.user.create({data: req.body})
            res.send({
                message: "User register success",
                user: user,
            });
        }
        else res.status(201).json({message: "User already register"});
});

// book visit to residencies
export const bookVisit = asyncHandler(async(req,res) => {
    const {email, date} = req.body
    const {id} = req.params

    try{
        const alreadyBooked = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })

        if(alreadyBooked.bookedVisits.some((visit) => visit.id === id)) {
            res.status(400).json({message: "This residency is already booked by you"})
        }
        else{
            await prisma.user.update({
                where: {email: email},
                data: {
                    bookedVisits: {push: {id, date}}
                }
            })
        }
        res.send("your visit is booked success");

    }catch(err){
        throw new Error(err.message)
    }
});

// get all booking of a user
export const allBookings = asyncHandler(async(req,res) => {
    const{email} = req.body
    try{
        const bookings = await prisma.user.findUnique({
            where: {email},
            select: {bookedVisits: true}
        })
        res.status(200).send(bookings)
    }catch(err){
        throw new Error(err.message);
    }
})

// cancel bookings
export const ccBooking = asyncHandler(async(req,res) => {
    const {email} = req.body
    const {id} = req.params
    try{
        const user = await prisma.user.findUnique({
            where: {email: email},
            select: {bookedVisits: true}
        })
        const index = user.bookedVisits.findIndex((visit) => visit.id === id)

        if(index === -1){
            res.status(404).json({message: "Booking not found"})
        }else{
            user.bookedVisits.splice(index, 1)
            await prisma.user.update({
                where: {email},
                data: {
                    bookedVisits: user.bookedVisits
                }
            })

            res.send("You successfully cancelled your booking")
        }

    }catch(err){
        throw new Error(err.message);
    }
})

//Favorite List
export const Favlist = asyncHandler(async(req,res) => {
    const {email} = req.body
    const {rid} = req.params

    try{
        const user = await prisma.user.findUnique({
            where: {email}
        })

        if(user.favResidenciesID.includes(rid)){
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID: {
                        set: user.favResidenciesID.filter((id) => id !== rid)
                    }
                }
            });
            res.send({message: "Removed from your favorites", user: updateUser})
        } else{
            const updateUser = await prisma.user.update({
                where: {email},
                data: {
                    favResidenciesID:{
                        push: rid
                    }
                }
            })
            res.send({message: "Updated your favorites", user: updateUser})
        }

    }catch(err){
        throw new Error(err.message)
    }
})

// All Fav
export const allfav = asyncHandler(async(req,res) => {
    const{email} = req.body
    try{
        const favres = await prisma.user.findUnique({
            where: {email},
            select: {favResidenciesID: true}
        })
        res.status(200).send(favres)
    }catch(err){
        throw new Error(err.message);
    }
})