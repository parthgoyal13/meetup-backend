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

async function findEventById(id) {
  try {
    const eventById = await Event.findById(id);
    return eventById;
  } catch (error) {
    console.log(error);
  }
}

app.get("/event/:eventId", async (req, res) => {
  try {
    const eventId = await findEventById(req.params.eventId);
    if (eventId) {
      res.json(eventId);
    } else {
      res.status(404).json({ error: "Event not found" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error in fetching event by id." });
  }
});

async function findEventByType(eventType) {
  try {
    const foundEventByType = await Event.find({ eventType });
    return foundEventByType;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

app.get("/events/:eventType", async (req, res) => {
  try {
    const eventByType = await findEventByType(req.params.eventType);

    if (eventByType.length !== 0) {
      res.status(200).json(eventByType);
    } else {
      res.status(404).json({ error: "No events found for this type" });
    }
  } catch (error) {
    res.status(500).json({ error: "Error fetching events" });
  }
});

async function findEventByTitleAndTag(title, tag) {
  try {
    const eventByTitleAndTag = await Event.find({
      $or: [
        { eventTitle: { $regex: searchQuery, $options: "i" } },
        { eventTags: { $in: [searchQuery] } },
      ],
    });
    return eventByTitleAndTag;
  } catch (error) {
    console.log(error);
  }
}

app.get("//event/titleAndTag/:searchQuery", async (req, res) => {
  try {
    const { searchQuery } = req.params;
    const eventTitleAndTag = await findEventByTitleAndTag(searchQuery);
    if (eventTitleAndTag.length !== 0) {
      res.json(eventTitleAndTag);
    } else {
      res.status(404).json({ error: "No events found by title or tags" });
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error in fetching event by title and tags." });
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
