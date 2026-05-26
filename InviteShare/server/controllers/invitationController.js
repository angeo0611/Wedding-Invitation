const Invitation = require('../models/Invitation');

exports.getMyInvitations = async (req, res) => {
  try {
    const invitations = await Invitation.find({ user: req.user.id });
    res.json(invitations);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.getInvitationBySlug = async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndUpdate(
      { slug: req.params.slug },
      { $inc: { 'stats.views': 1 } },
      { new: true }
    );
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
    res.json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.createInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.create({
      ...req.body,
      user: req.user.id
    });
    res.status(201).json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.updateInvitation = async (req, res) => {
  try {
    const invitation = await Invitation.findOneAndUpdate(
      { _id: req.params.id, user: req.user.id },
      req.body,
      { new: true, runValidators: true }
    );
    if (!invitation) return res.status(404).json({ message: 'Invitation not found' });
    res.json(invitation);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
