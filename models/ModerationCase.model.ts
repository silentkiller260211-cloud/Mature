import mongoose, { Schema, Document } from 'mongoose';

export interface IModerationCase extends Document {
    guildId: string;
        userId: string;
            moderatorId: string;
                type: 'BAN' | 'KICK' | 'WARN' | 'TIMEOUT';
                    reason: string;
                        createdAt: Date;
                        }

                        const ModerationCaseSchema = new Schema<IModerationCase>({
                            guildId: { type: String, required: true, index: true },
                                userId: { type: String, required: true },
                                    moderatorId: { type: String, required: true },
                                        type: { type: String, enum: ['BAN', 'KICK', 'WARN', 'TIMEOUT'], required: true },
                                            reason: { type: String, required: true },
                                                createdAt: { type: Date, default: Date.now }
                                                });

                                                export default mongoose.model<IModerationCase>('ModerationCase', ModerationCaseSchema);