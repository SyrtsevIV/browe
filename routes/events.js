const express = require('express');
const Event = require('../models/event');
const User = require('../models/user');

const auth = require('../middlewares/auth');

const router = express.Router();

// страница с мероприятиями
router.get('/', async (req, res) => {
  const events = await Event.find({ visible: true });
  res.render('events/events', {
    title: 'BRO.WE.COFFE',
    isCoffe: true,
    events,
  });
});

router.get('/edit/:id', async (req, res) => {
  res.render('events/edit');
});

router.get('/new', async (req, res) => {
  res.render('events/new');
});

// записаться
router.post('/signup', auth, async (req, res) => {
  const { userid, eventid } = req.body;
  const event = await Event.findById(eventid);
  const user = await User.findById(userid);
  user.events.push(event);
  await User.findByIdAndUpdate({ _id: userid }, { events: user.events });
  res.redirect('/events');
});

router.delete('/delete/:id', async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    event.visible = false;
    await event.save();
    res.sendStatus(200);
  } catch (err) {
    res.sendStatus(500);
  }
});

module.exports = router;
