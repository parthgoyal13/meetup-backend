const { initializeDatabase } = require("./db/db.connect");
const Event = require("./models/Event.model");
initializeDatabase();

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "*",
  Credentiala: true,
};

app.use(cors(corsOptions));

async function createEvent(newEvent) {
  try {
    const event = new Event(newEvent);
    const saveEvent = await event.save();
    return saveEvent;
  } catch (error) {
    console.log(error);
  }
}
app.post("/createEvent", async (req, res) => {
  try {
    const savedEvent = await createEvent(req.body);
    res
      .status(201)
      .json({ message: "Event added successfuly", event: savedEvent });
  } catch (error) {
    console.log("Failed to add Event", error);
    res.status(500).json({ error: "Failed to add Event" });
  }
});

async function readAllEvents() {
  try {
    const allEvent = await Event.find();
    return allEvent;
  } catch (error) {
    console.log("Error occurred in reading all events", error);
  }
}

app.get("/readAllEvents", async (req, res) => {
  try {
    const events = await readAllEvents();
    if (events.length != 0) {
      res.json(events);
    } else {
      res.status(404).json({ error: "No events found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error occured in fetching all events." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
