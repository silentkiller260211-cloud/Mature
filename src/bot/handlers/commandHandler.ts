import { Client, Collection, REST, Routes } from 'discord.js';
import { readdirSync } from 'fs';
import { join } from 'path';

export const commandHandler = async (client: Client) => {
    const commands: any[] = [];
        client.commands = new Collection();

            const foldersPath = join(__dirname, '../commands');
                const commandFolders = readdirSync(foldersPath);

                    for (const folder of commandFolders) {
                            const commandsPath = join(foldersPath, folder);
                                    const commandFiles = readdirSync(commandsPath).filter(file => file.endsWith('.ts') || file.endsWith('.js'));

                                            for (const file of commandFiles) {
                                                        const filePath = join(commandsPath, file);
                                                                    const command = require(filePath).default || require(filePath);

                                                                                            if ('data' in command && 'execute' in command) {
                                                                                                            client.commands.set(command.data.name, command);
                                                                                                                            commands.push(command.data.toJSON());
                                                                                                                                            console.log(`✅ Loaded command: ${command.data.name}`);
                                                                                                                                                        } else {
                                                                                                                                                                        console.log(`⚠️ Command at ${filePath} is missing "data" or "execute" property.`);
                                                                                                                                                                                    }
                                                                                                                                                                                            }
                                                                                                                                                                                                }

                                                                                                                                                                                                    // Register commands with Discord API
                                                                                                                                                                                                        const rest = new REST({ version: '10' }).setToken(process.env.DISCORD_TOKEN || '');

                                                                                                                                                                                                            try {
                                                                                                                                                                                                                    console.log(`🔄 Started refreshing ${commands.length} application (/) commands.`);
                                                                                                                                                                                                                            await rest.put(
                                                                                                                                                                                                                                        Routes.applicationCommands(process.env.CLIENT_ID || ''),
                                                                                                                                                                                                                                                    { body: commands }
                                                                                                                                                                                                                                                            );
                                                                                                                                                                                                                                                                    console.log('✅ Successfully reloaded application (/) commands.');
                                                                                                                                                                                                                                                                        } catch (error) {
                                                                                                                                                                                                                                                                                console.error('❌ Failed to reload commands:', error);
                                                                                                                                                                                                                                                                                    }
                                                                                                                                                                                                                                                                                    };