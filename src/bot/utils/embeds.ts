import { EmbedBuilder } from 'discord.js';

export const createModEmbed = (title: string, description: string, color: number, fields: { name: string, value: string, inline?: boolean }[] = []) => {
    const embed = new EmbedBuilder()
            .setTitle(title)
                    .setDescription(description)
                            .setColor(color)
                                    .setTimestamp()
                                            .setFooter({ text: 'Mature Bot • Moderation System' });

                                                fields.forEach(field => {
                                                        embed.addFields({ name: field.name, value: field.value, inline: field.inline || false });
                                                            });

                                                                return embed;
                                                                };