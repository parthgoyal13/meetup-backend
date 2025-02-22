const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    eventTitle: {
      type: String,
      required: true,
    },
    eventDate: {
      type: Date,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    eventType: {
      type: String,
      enum: ["Online", "Offline", "Both"],
      required: true,
    },
    eventVenue: {
      type: String,
      required: true,
    },
    eventPrice: {
      type: Number,
      required: true,
    },
    eventDescription: {
      type: String,
      required: true,
    },
    eventImage: {
      type: String,
    },
    eventTags: {
      type: [String],
      required: true,
    },
    eventSpeakerName: {
      type: [String],
      required: true,
    },
    eventSpeakerDesignation: {
      type: [String],
      required: true,
    },
    eventSpeakerImage: {
      type: [String],
    },
  },
  { timestamps: true }
);
const EventModel = mongoose.model("Event Model", eventSchema);

module.exports = EventModel;
