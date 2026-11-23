import { Events, Interaction, ChatInputCommandInteraction } from 'discord.js';
import { Client } from 'discord.js';

export default (client: Client) => {
    client.on(Events.InteractionCreate, async (interaction: Interaction) => {
            if (!interaction.isChatInputCommand()) return;

                    const command = client.commands.get(interaction.commandName);

                            if (!command) {
                                        console.error(`❌ No command matching ${interaction.commandName} was found.`);
                                                    return;
                                                            }

                                                                    try {
                                                                                await command.execute(interaction as ChatInputCommandInteraction);
                                                                                        } catch (error) {
                                                                                                    console.error(`❌ Error executing ${interaction.commandName}:`, error);

                                                                                                                            const errorMessage = {
                                                                                                                                            embeds: [{
                                                                                                                                                                title: '❌ Command Error',
                                                                                                                                                                                    description: 'There was an error while executing this command!',
                                                                                                                                                                                                        color: 0xef4444
                                                                                                                                                                                                                        }]
                                                                                                                                                                                                                                    };

                                                                                                                                                                                                                                                if (interaction.replied || interaction.deferred) {
                                                                                                                                                                                                                                                                await interaction.followUp({ ...errorMessage, ephemeral: true });
                                                                                                                                                                                                                                                                            } else {
                                                                                                                                                                                                                                                                                            await interaction.reply({ ...errorMessage, ephemeral: true });
                                                                                                                                                                                                                                                                                                        }
                                                                                                                                                                                                                                                                                                                }
                                                                                                                                                                                                                                                                                                                    });
                                                                                                                                                                                                                                                                                                                    };