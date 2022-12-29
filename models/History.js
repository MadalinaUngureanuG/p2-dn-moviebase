import mongoose from 'mongoose';

global.models = global.models || {};

global.models.History =
	global.models.History ||
	mongoose.model('History', {
		id: { type: Number, required: true },
		title: { type: String, required: true },
		overview: { type: String, required: true },
		poster_path: { type: String, required: true },
		vote_average: { type: String, required: true },
		vote_count: { type: String, required: true },
		date: { type: Date, default: Date.now }
	});

export default global.models.History;
