import { Client, GatewayIntentBits, Partials } from 'discord.js';
import dotenv from 'dotenv';
import connectDB from '../../connections/mongodb';

dotenv.config();

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildVoiceStates,
    ],
    partials: [Partials.Channel, Partials.Message, Partials.Reaction]
});

// Bot Ready Event
client.once('ready', () => {
    console.log(` Mature Bot is Online as ${client.user?.tag}`);
});

// Start Bot Function
async function startBot() {
    try {
        // 1. Connect Database
        await connectDB();
        
        // 2. Load Handlers (Hum Phase 2 mein uncomment karenge)
        // await commandHandler(client);
        // await eventHandler(client);

        // 3. Login to Discord
        await client.login(process.env.DISCORD_TOKEN);
    } catch (error) {
        console.error('Failed to start bot:', error);
    }
}

startBot();
