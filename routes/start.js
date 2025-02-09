const express = require('express');
const router = express.Router;
const ProcessingData = require('../utilis/FormattingTerematelData');

router.post('/telemteryData', ProcessingData);