import express from 'express';
import Event from '../models/Event.js';

const router = express.Router();

// Check for overlapping events
      const checkForOverlap = async (venue, date, startTime, endTime) => {
        try {
          // Find events on the same date and venue
          const startOfDay = new Date(date);
      startOfDay.setHours(0, 0, 0, 0);

      const endOfDay = new Date(date);
      endOfDay.setHours(23, 59, 59, 999);

      const events = await Event.find({
        venue,
        date: {
          $gte: startOfDay,
          $lte: endOfDay
        }
      });


    // Convert the input time range to Date objects
    const startDate = new Date(`${date}T${startTime}:00`);
    const endDate = new Date(`${date}T${endTime}:00`);

    for (const event of events) {
      // Convert stored event start and end times to Date objects
      const eventStartDate = new Date(`${event.date}T${event.startTime}:00`);
      const eventEndDate = new Date(`${event.date}T${event.endTime}:00`);

      // Check if times overlap
      const isOverlapping =
        (startDate >= eventStartDate && startDate < eventEndDate) || // New event starts before the existing one ends
        (endDate > eventStartDate && endDate <= eventEndDate) ||   // New event ends after the existing one starts
        (startDate <= eventStartDate && endDate >= eventEndDate);   // New event fully encompasses the existing one

      if (isOverlapping) {
        return true; // Return true if any overlap is detected
      }
    }
    return false; // No overlap
  } catch (error) {
    throw new Error('Error checking for overlapping events: ' + error.message);
  }
};

// Check availability
router.get('/availability', async (req, res) => {
  const { venue, date, startTime, endTime } = req.query;

  try {
    const isOverlapping = await checkForOverlap(venue, date, startTime, endTime);
    res.status(200).json({ isAvailable: !isOverlapping });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
});

// Create an event
// Create an event
router.post("/", async (req, res) => {
    const { title, category, date, venue, startTime, endTime, description } = req.body;
  
    try {
      const isOverlapping = await checkForOverlap(venue, date, startTime, endTime);
  
      if (isOverlapping) {
        return res.status(400).json({ message: "Venue is already booked during this time" });
      }
  
      const newEvent = new Event({
        title,
        category,
        date,
        venue,
        startTime,
        endTime,
        description,
      });
  
      await newEvent.save();
  
      // Send a response or redirect
      res.redirect(303, "http://localhost:5173/dashboard/events"); // Change to your desired URL
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  });
  

export default router;
