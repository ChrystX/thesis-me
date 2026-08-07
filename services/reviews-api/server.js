import express from "express";
import axios from "axios";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());

app.get("/api/reviews", async (req, res) => {
    const placeId = "ChIJVeLlTadXei4RfpT-bpUgjpU";
    const fields = "reviews";
    const key = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;


    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${placeId}&fields=${fields}&key=${key}`;

    try {
        const response = await axios.get(url);
        const data = response.data;

        if (data.result?.reviews) {
            res.json(data.result.reviews);
        } else {
            res.status(500).json({ error: "No reviews found" });
        }
    } catch {
        res.status(500).json({ error: "Failed to fetch Google API" });
    }
});

app.listen(5000, () => {
    console.log("API running on http://localhost:5000");
});
