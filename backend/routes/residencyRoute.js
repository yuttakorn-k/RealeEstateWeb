import express from 'express';
import { createResidency, getAllResidencies, getResidency } from '../controllers/residenCtrl.js';
const router = express.Router()

router.post("/create", createResidency)
router.get("/allres", getAllResidencies)
router.get("/:id", getResidency)

export {router as residencyRoute}