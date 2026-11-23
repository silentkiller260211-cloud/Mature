import mongoose, { Schema, Document } from 'mongoose';

export interface IWarning extends Document {
    guildId: string;
        userId: string;
            moderatorId: string;
                reason: string;
                    date: Date;
                    }

                    const WarningSchema = new Schema<IWarning>({
                        guildId: { type: String, required: true, index: true },
                            userId: { type: String, required: true },
                                moderatorId: { type: String, required: true },
                                    reason: { type: String, required: true },
                                        date: { type: Date, default: Date.now }
                                        });

                                        export default mongoose.model<IWarning>('Warning', WarningSchema);