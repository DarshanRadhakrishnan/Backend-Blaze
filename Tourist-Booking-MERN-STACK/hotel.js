import express from "express";
import {
  countByCity,
  countByType,
  createHotel,
  deleteHotel,
  getHotel,
  getHotelRooms,
  getHotels,
  updateHotel,
} from "../controllers/hotelController.js";
import {verifyAdmin} from "../middlewares/verifyToken.js"
const router = express.Router();
//CREATE
router.post("/", verifyAdmin,createHotel);
//UPDATE
router.put("/:id", verifyAdmin,updateHotel);
//DELETE
router.delete("/:id", verifyAdmin,deleteHotel);
//GET
router.get("/find/:id", getHotel);
//GET ALL
router.get("/", getHotels);
router.get("/countByCity", countByCity);
router.get("/countByType", countByType);
router.get("/room/:id", getHotelRooms);
export default router;