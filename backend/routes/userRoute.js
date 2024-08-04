import express from 'express';
import { allBookings,allfav,bookVisit,ccBooking,createUser, Favlist } from '../controllers/userCtrl.js';
const router = express.Router()

router.post("/register", createUser);
router.post("/bookVisit/:id", bookVisit)
router.post("/allBookings", allBookings)
router.post("/removeBooking/:id", ccBooking)
router.post("/Favlist/:rid", Favlist)
router.post("/allfav", allfav)

export {router as userRoute}
