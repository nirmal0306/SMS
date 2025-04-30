// const express = require('express');
// const router = express.Router();
// const Maintenance = require('../models/Maintenance');

// router.post('/pay', async (req, res) => {
//   try {
//     const { residentName, email, apartment, month } = req.body;

//     // Check if payment for this resident (name, email, month) already exists
//     const existingPayment = await Maintenance.findOne({  email, month });
//     if (existingPayment) {
//       return res.status(400).send({ message: 'Maintenance already paid for this resident for the selected month' });
//     }

//     // Create new payment with fixed amount 5000
//     const payment = new Maintenance({
//       residentName,
//       email,
//       apartment,
//       amount: 5000,
//       month
//     });
//     await payment.save();

//     res.status(201).send({ message: 'Payment recorded successfully' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to record payment' });
//   }
// });

// // Existing status endpoint remains unchanged
// router.get('/status/:email', async (req, res) => {
//   try {
//     const email = req.params.email;
//     const payments = await Maintenance.find({ email }).sort({ month: 1 });
//     const paidMonths = payments.map(p => p.month);
//     const currentMonth = new Date().toLocaleString('default', { month: 'long' }); // e.g., "April"
//     const currentYear = new Date().getFullYear(); // 2025
//     const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

//     if (paidMonths.length === 12) {
//       return res.json({ status: 'All month maintenance paid' });
//     }

//     const currentMonthIndex = allMonths.indexOf(currentMonth);
//     const paidUpToDate = allMonths.slice(0, currentMonthIndex + 1).every(month => paidMonths.includes(month));

//     if (paidUpToDate) {
//       return res.json({ status: 'Up to date' });
//     }

//     const unpaidMonths = allMonths.slice(0, currentMonthIndex).filter(month => !paidMonths.includes(month));
//     if (unpaidMonths.length > 0) {
//       return res.json({ status: 'Maintenance baki hai', unpaidMonths });
//     }

//     res.json({ status: 'No unpaid maintenance before current month' });
//   } catch (error) {
//     res.status(500).send({ error: 'Failed to check payment status' });
//   }
// });

// module.exports = router;
const express = require('express');
const router = express.Router();
const Maintenance = require('../models/Maintenance');

// POST route to handle maintenance payment (single month or whole year)
router.post('/pay', async (req, res) => {
  try {
    const { residentName, email, apartment, month, amount } = req.body;

    // Check if payment for this resident (email, month) already exists
    const existingPayment = await Maintenance.findOne({ email, month });
    if (existingPayment) {
      return res.status(400).send({ message: `Maintenance already paid for this resident for ${month === 'Whole Year' ? 'the whole year' : 'the selected month'}` });
    }

    // Check if a whole year payment already exists for this resident
    if (month !== 'Whole Year') {
      const wholeYearPayment = await Maintenance.findOne({ email, month: 'Whole Year' });
      if (wholeYearPayment) {
        return res.status(400).send({ message: 'Whole year maintenance already paid for this resident' });
      }
    }

    // Create new payment
    const payment = new Maintenance({
      residentName,
      email,
      apartment,
      amount,
      month,
      paymentDate: new Date()
    });
    await payment.save();

    res.status(201).send({ message: `Payment of ${amount} for ${month === 'Whole Year' ? 'the whole year' : month} recorded successfully` });
  } catch (error) {
    res.status(500).send({ error: 'Failed to record payment' });
  }
});

// GET route to check payment status
router.get('/status/:email', async (req, res) => {
  try {
    const email = req.params.email;
    const payments = await Maintenance.find({ email }).sort({ month: 1 });
    const paidMonths = payments.map(p => p.month);
    const currentMonth = new Date().toLocaleString('default', { month: 'long' }); // e.g., "April"
    const currentYear = new Date().getFullYear(); // 2025
    const allMonths = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    // Check for whole year payment
    if (paidMonths.includes('Whole Year')) {
      return res.json({ status: 'Whole year maintenance paid' });
    }

    if (paidMonths.length === 12) {
      return res.json({ status: 'All month maintenance paid' });
    }

    const currentMonthIndex = allMonths.indexOf(currentMonth);
    const paidUpToDate = allMonths.slice(0, currentMonthIndex + 1).every(month => paidMonths.includes(month));

    if (paidUpToDate) {
      return res.json({ status: 'Up to date' });
    }

    const unpaidMonths = allMonths.slice(0, currentMonthIndex).filter(month => !paidMonths.includes(month));
    if (unpaidMonths.length > 0) {
      return res.json({ status: 'Maintenance baki hai', unpaidMonths });
    }

    res.json({ status: 'No unpaid maintenance before current month' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to check payment status' });
  }
});

// GET route to fetch all maintenance payments
router.get('/payments', async (req, res) => {
  try {
    const payments = await Maintenance.find().sort({ paymentDate: -1 });
    res.status(200).json(payments);
  } catch (error) {
    res.status(500).send({ error: 'Failed to fetch maintenance payments' });
  }
});

// DELETE route to remove a maintenance payment by ID
router.delete('/payment/:id', async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await Maintenance.findByIdAndDelete(id);
    if (!payment) {
      return res.status(404).send({ error: 'Payment not found' });
    }
    res.status(200).send({ message: 'Payment deleted successfully' });
  } catch (error) {
    res.status(500).send({ error: 'Failed to delete payment' });
  }
});

router.get('/:email', async (req, res) => {
  try {
    const records = await Maintenance.find({ email: req.params.email });
    res.json(records);
  } catch (error) {
    res.status(500).send('Error retrieving maintenance records');
  }
});


module.exports = router;