const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { 
  getMyInvitations, 
  getInvitationBySlug, 
  createInvitation, 
  updateInvitation 
} = require('../controllers/invitationController');

router.get('/my', protect, getMyInvitations);
router.get('/slug/:slug', getInvitationBySlug);
router.post('/', protect, createInvitation);
router.patch('/:id', protect, updateInvitation);

module.exports = router;
