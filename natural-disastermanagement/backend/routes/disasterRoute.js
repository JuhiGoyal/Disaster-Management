const express = require('express');
const router = express.Router();
const disasterController = require('../controllers/disasterController');
const { upload, handleUploadError } = require('../middleware/upload');
const authenticateToken = require('../middleware/auth');

// Apply upload error handling middleware
router.use(handleUploadError);

// Create a new disaster - user report (no files)
router.post('/', authenticateToken, disasterController.addDisaster);

// Create a new disaster with file uploads - admin only
router.post('/addDisaster', authenticateToken, upload.array('files', 5), disasterController.addDisaster);

// Get all disasters
router.get('/', disasterController.getDisasters);

// Get distinct disaster types
router.get('/types', disasterController.getDisasterTypes);

// Get disaster by ID
router.get('/:id', disasterController.getDisasterById);

// Update disaster
router.put('/:id', disasterController.updateDisaster);

// Delete disaster
router.delete('/:id', disasterController.deleteDisaster);

// Download file from disaster
router.get('/:disasterId/files/:fileId/download', disasterController.downloadFile);

// Delete specific file from disaster
router.delete('/:disasterId/files/:fileId', disasterController.deleteFile);

module.exports = router;