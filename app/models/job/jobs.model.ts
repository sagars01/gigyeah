import mongoose, { Schema, Document } from 'mongoose';

interface IJob extends Document {
    createdBy: mongoose.Schema.Types.ObjectId;
    title: string;
    description: string; // RTF data as HTML
    requirements: string[]; // Array with a maximum of 3 items
    postedAt: Date;
    status: 'active' | 'expired';
    location: {
        city: string;
        country: string;
    };
    payRange: {
        currency: string; // ISO Currency Codes 
        min: number,
        max: number
    };
    remote: boolean;
}

const JobSchema = new Schema<IJob>({
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    title: { type: String, required: true },
    description: { type: String, required: true, maxlength: 300 }, // Max 300 characters
    requirements: {
        type: [{ type: String, required: true }],
        validate: [arrayLimit, 'Requirements exceeds the limit of 3'] // Custom validator
    },
    location: {
        city: { type: String, maxlength: 20 },
        country: { type: String, maxlength: 40 }
    },
    remote: { type: Boolean, default: true },
    payRange: {
        currency: {
            type: String,
            required: true
        },
        min: {
            type: Number,
            required: true,
        },
        max: {
            type: Number,
            required: true,
        },
    },
    postedAt: { type: Date, default: Date.now },
    status: { type: String, required: true, default: 'active' }
});

function arrayLimit(val: string[]) {
    return val.length <= 3;
}

JobSchema.pre('save', function (next) {
    if (this.payRange.min >= this.payRange.max) {
        next(new Error('Minimum pay range must be less than the maximum pay range'));
    } else {
        next();
    }
});

export default mongoose.models.Job || mongoose.model<IJob>('Job', JobSchema);
