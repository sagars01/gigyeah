import mongoose, { Schema, Document } from 'mongoose';

const CreatedBySchema = new Schema<CreatedByType>({
    name: { type: String, required: true },
    id: { type: String, required: true },
    profileImg: { type: String, required: false },
    company: {
        name: String,
        description: String
    }

})

const JobSchema = new Schema<IJob>({
    createdBy: CreatedBySchema,
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


interface IJob extends Document {
    createdBy: CreatedByType;
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
    company: {
        name: string;
        description: string;
    }
}

export type CreatedByType = {
    id: string;
    name: string;
    profileImg?: string;
    company?: {
        name: string;
        description: string;
    }
}