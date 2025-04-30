// const ParkingRequest = require('../models/ParkingRequest');
// const Resident = require('../models/Resident');
// const ApprovedParkingRequest = require('../models/ApprovedParkingRequest');
// const RejectedParkingRequest = require('../models/RejectedParkingRequest');


// exports.submitRequest = async (req, res) => {
//   const { residentName, apartment, email } = req.body;

//   try {
//     const existing = await ParkingRequest.findOne({ email, status: { $in: ['pending', 'approved'] } });
//     if (existing) {
//       return res.status(400).json({ message: 'You already have a pending or approved parking request.' });
//     }

//     const newRequest = new ParkingRequest({ residentName, apartment, email });
//     await newRequest.save();
//     res.status(200).json({ message: 'Parking request submitted.' });
//   } catch (error) {
//     res.status(500).json({ error: 'Server error submitting request.' });
//   }
// };

// exports.getAllRequests = async (req, res) => {
//   try {
//     const requests = await ParkingRequest.find();
//     res.status(200).json(requests);
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to fetch requests.' });
//   }
// };

// // Approve Request
// exports.approveRequest = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const request = await ParkingRequest.findById(id);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found.' });
//     }

//     // Check if resident exists and if they have paid maintenance
//     const resident = await Resident.findOne({ email: request.email });
//     if (!resident && !resident.hasPaidMaintenance) {
//       return res.status(403).json({ message: 'Cannot approve. Maintenance not paid.' });
//     }

//     // Generate parking number and approve the request
//     request.status = 'approved';
//     request.parkingNumber = `P-${Math.floor(Math.random() * 1000)}`;
//     await request.save();

//     // Save the approved request into the ApprovedParkingRequest collection
//     const approvedRequest = new ApprovedParkingRequest({
//       residentName: request.residentName,
//       apartment: request.apartment,
//       email: request.email,
//       status: 'approved',
//       parkingNumber: request.parkingNumber
//     });
//     await approvedRequest.save();

//     // Delete the original request from the ParkingRequest collection
//     await ParkingRequest.findByIdAndDelete(id);

//     res.status(200).json({ message: 'Request approved and stored in approved table.' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to approve request.' });
//   }
// };

// // Reject Request
// exports.rejectRequest = async (req, res) => {
//   const { id } = req.params;
//   try {
//     const request = await ParkingRequest.findById(id);
//     if (!request) {
//       return res.status(404).json({ message: 'Request not found.' });
//     }

//     // Move the request to the RejectedParkingRequest collection
//     const rejectedRequest = new RejectedParkingRequest({
//       residentName: request.residentName,
//       apartment: request.apartment,
//       email: request.email,
//       status: 'rejected'
//     });
//     await rejectedRequest.save();

//     // Delete the original request from the ParkingRequest collection
//     await ParkingRequest.findByIdAndDelete(id);

//     res.status(200).json({ message: 'Request rejected and stored in rejected table.' });
//   } catch (err) {
//     res.status(500).json({ error: 'Failed to reject request.' });
//   }
// };

// // Get all accepted parking requests
// exports.getAcceptedRequests = async (req, res) => {
//     try {
//       const requests = await ApprovedParkingRequest.find({ status: 'approved' });
//       res.status(200).json(requests);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch accepted requests.' });
//     }
//   };
  
//   // Get all rejected parking requests
//   exports.getRejectedRequests = async (req, res) => {
//     try {
//       const requests = await RejectedParkingRequest.find({ status: 'rejected' });
//       res.status(200).json(requests);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch rejected requests.' });
//     }
//   };
//   // Get accepted parking request for specific email
// exports.getAcceptedRequestByEmail = async (req, res) => {
//     const { email } = req.params;
//     try {
//       const request = await ApprovedParkingRequest.findOne({ email });
//       if (!request) {
//         return res.status(404).json({ message: 'No accepted parking request found for this email.' });
//       }
//       res.status(200).json(request);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch accepted request by email.' });
//     }
//   };
//   exports.getRejectedRequestByEmail = async (req, res) => {
//     const { email } = req.params;
//     try {
//       const request = await RejectedParkingRequest.findOne({ email });
//       if (!request) {
//         return res.status(404).json({ message: 'No accepted parking request found for this email.' });
//       }
//       res.status(200).json(request);
//     } catch (err) {
//       res.status(500).json({ error: 'Failed to fetch accepted request by email.' });
//     }
//   };
  
  
const ParkingRequest = require('../models/ParkingRequest');
const Resident = require('../models/Resident');
const ApprovedParkingRequest = require('../models/ApprovedParkingRequest');
const RejectedParkingRequest = require('../models/RejectedParkingRequest');

// Submit a new parking request
exports.submitRequest = async (req, res) => {
  const { residentName, apartment, email } = req.body;

  try {
    const existing = await ParkingRequest.findOne({ email, status: { $in: ['pending', 'approved'] } });
    if (existing) {
      return res.status(400).json({ message: 'You already have a pending or approved parking request.' });
    }

    const newRequest = new ParkingRequest({ residentName, apartment, email, status: 'pending' });
    await newRequest.save();
    res.status(200).json({ message: 'Parking request submitted.' });
  } catch (error) {
    res.status(500).json({ error: 'Server error submitting request.' });
  }
};

// Get all pending requests
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await ParkingRequest.find({ status: 'pending' });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch requests.' });
  }
};

// Approve a request
exports.approveRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await ParkingRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    const resident = await Resident.findOne({ email: request.email });
    if (!resident && !resident.hasPaidMaintenance) {
      return res.status(403).json({ message: 'Cannot approve. Maintenance not paid.' });
    }

    const parkingNumber = `P-${Math.floor(1000 + Math.random() * 9000)}`;

    const approvedRequest = new ApprovedParkingRequest({
      residentName: request.residentName,
      apartment: request.apartment,
      email: request.email,
      status: 'approved',
      parkingNumber
    });

    await approvedRequest.save();
    await ParkingRequest.findByIdAndDelete(id);

    res.status(200).json({ message: 'Request approved and stored in approved table.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to approve request.' });
  }
};

// Reject a request
exports.rejectRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = await ParkingRequest.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found.' });
    }

    const rejectedRequest = new RejectedParkingRequest({
      residentName: request.residentName,
      apartment: request.apartment,
      email: request.email,
      status: 'rejected',
      reason: 'Not available'
    });

    await rejectedRequest.save();
    await ParkingRequest.findByIdAndDelete(id);

    res.status(200).json({ message: 'Request rejected and stored in rejected table.' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to reject request.' });
  }
};

// Get all approved requests
exports.getAcceptedRequests = async (req, res) => {
  try {
    const requests = await ApprovedParkingRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved requests.' });
  }
};

// Get all rejected requests
exports.getRejectedRequests = async (req, res) => {
  try {
    const requests = await RejectedParkingRequest.find();
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rejected requests.' });
  }
};

// Get approved request by email
exports.getAcceptedRequestByEmail = async (req, res) => {
  try {
    const request = await ApprovedParkingRequest.findOne({ email: req.params.email });
    res.status(200).json(request || {});
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch approved request.' });
  }
};

// Get rejected requests by email
exports.getRejectedRequestByEmail = async (req, res) => {
  try {
    const requests = await RejectedParkingRequest.find({ email: req.params.email });
    res.status(200).json(requests);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch rejected requests.' });
  }
};
