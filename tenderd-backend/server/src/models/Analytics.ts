import mongoose from 'mongoose';
import { IAnalytics } from '../interface/IAnalytics';

const analyticsSchema = new mongoose.Schema({
    vehicle: { type: mongoose.Schema.Types.ObjectId, ref: 'Vehicle', required: true },
    hoursOperated: { type: Number, required: true },
    distanceTraveled: { type: Number, required: true },
    createdAt: { type: Date, required: true }
});

const Analytics = mongoose.model<IAnalytics>('Analytics', analyticsSchema);
module.exports = { Analytics };
