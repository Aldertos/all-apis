// This is for information extraction by a discord bot

const { Client, GatewayIntentBits, EmbedBuilder } = require('discord.js');
const axios = require('axios');
const ayarlar = require('./settings.js')

const client = new Client({
    intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent]
});

client.on('ready', () => {
    console.log(`Bot ${client.user.tag} olarak giriş yaptı!`);
});

client.on('messageCreate', async (message) => {
    if (!message.content.startsWith(`${ayarlar.prefix}get`) || message.author.bot) return;

    const args = message.content.split(' ');
    const userId = args[1];
    if (!userId) return message.reply('Bir kullanıcı ID\'si belirtmelisin!');

    try {
        const { data } = await axios.get(`https://discord.com/api/v9/users/${userId}/profile`, {
            headers: {
                Authorization: ayarlar.getUserToken,
            }
        });

        const user = data.user;
        const profile = data.user_profile;

        const avatarFormat = user.avatar && user.avatar.startsWith('a_') ? 'gif' : 'png';
        const bannerFormat = user.banner && user.banner.startsWith('a_') ? 'gif' : 'png';

        const avatarURL = user.avatar
            ? `https://cdn.discordapp.com/avatars/${user.id}/${user.avatar}.${avatarFormat}?size=2048`
            : null;

        const bannerURL = user.banner
            ? `https://cdn.discordapp.com/banners/${user.id}/${user.banner}.${bannerFormat}?size=2048`
            : null;

        const embed = new EmbedBuilder()
            .setTitle('📌 User Info')
            .setDescription(
                `**🏷️ Adı:** ${user.username}\n` +
                `**🆔 ID:** ${user.id}\n` +
                `**🌍 Görünen Adı:** ${user.global_name ?? 'Yok'}\n` +
                `**📝 Hakkında:** ${profile.bio ?? 'Yok'}\n` +
                `**🏳️ Hitaplar:** ${profile.pronouns ?? 'Yok'}`
            )
            .setColor(0x5865F2);

        if (avatarURL) embed.setThumbnail(avatarURL);
        if (bannerURL) embed.setImage(bannerURL);

        message.reply({ embeds: [embed] });

    } catch (error) {
        console.error(error.response?.data || error.message);
        message.reply('Kullanıcı bilgileri alınırken bir hata oluştu. ID doğru mu veya botun gerekli izinleri var mı kontrol et.');
    }
});

client.login(ayarlar.token);
