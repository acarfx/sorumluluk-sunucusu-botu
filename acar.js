const { Client } = require('discord.js');

let client = new Client({
    intents: [32767]
})

let discordlogs = require('discord-logs');
discordlogs(client)

let ids = {
    main: "757651319694557224",
    sorumluluk: "989217196213420072",
    yetkili: "897199470658338826",
}

let s_roles = new Map([
    ["MAİN SUNUCUDA Kİ ROL ID", "SORUMLULUK SUNUCUSUNDA Kİ ROL İD"],
    
])

let y_roles = new Map([
    ["MAİN SUNUCUDA Kİ ROL ID", "YETKİLİ SUNUCUSUNDA Kİ ROL İD"],
  ])

client.on("guildMemberRoleAdd", (member, role) => {
    if(member.guild.id != ids.main) return;
    let main = client.guilds.cache.get(ids.main)
    if(!main) return console.log("YARRAM ÖNCE AMINAKODUMUN SUNUCUSUNA SOK!")
    let sorumluluk = client.guilds.cache.get(ids.sorumluluk)
    if(!sorumluluk) return console.log("YARRAM ÖNCE SORUMLULUK SUNUCUSUNA SOK!")
    let yetkili = client.guilds.cache.get(ids.yetkili)
    if(!yetkili) return console.log("YARRAM ÖNCE YETKİLİ SUNUCUSUNA SOK!")

    let c_member = main.members.cache.get(member.id)
    if(!c_member) return;

    let s_member = sorumluluk.members.cache.get(member.id)
    let y_member = yetkili.members.cache.get(member.id)
    

    // Sorumluluk Sistemi
    if(s_member) {
        let getRoles = s_roles.get(role.id)
        if(getRoles && !s_member.roles.cache.has(getRoles)) s_member.roles.add(getRoles).catch(err => {});
    }
    // Yetkili Sistemi
    if(y_member) {
        let getRoles = y_roles.get(role.id)
        if(getRoles && !y_member.roles.cache.has(getRoles)) y_member.roles.add(getRoles).catch(err => {});
    }

});

client.on("guildMemberRoleRemove", (member, role) => {
    if(member.guild.id != ids.main) return;
    let main = client.guilds.cache.get(ids.main)
    if(!main) return console.log("YARRAM ÖNCE AMINAKODUMUN SUNUCUSUNA SOK!")
    let sorumluluk = client.guilds.cache.get(ids.sorumluluk)
    if(!sorumluluk) return console.log("YARRAM ÖNCE SORUMLULUK SUNUCUSUNA SOK!")
    let yetkili = client.guilds.cache.get(ids.yetkili)
    if(!yetkili) return console.log("YARRAM ÖNCE YETKİLİ SUNUCUSUNA SOK!")
    let c_member = main.members.cache.get(member.id)
    if(!c_member) return;

    let s_member = sorumluluk.members.cache.get(member.id)
    let y_member = yetkili.members.cache.get(member.id)

    // Sorumluluk Sistemi
    if(s_member) {
        let getRoles = s_roles.get(role.id)
        if(getRoles && s_member.roles.cache.has(getRoles)) s_member.roles.remove(getRoles).catch(err => {});
    }
    
    // Yetkili Sistemi
    if(y_member) {
        let getRoles = y_roles.get(role.id)
        if(getRoles && y_member.roles.cache.has(getRoles)) y_member.roles.remove(getRoles).catch(err => {});
    }
});

client.on('guildMemberAdd', async (member) => {
    let main = client.guilds.cache.get(ids.main)
    if(!main) return console.log("YARRAM ÖNCE AMINAKODUMUN SUNUCUSUNA SOK!")
    let sorumluluk = client.guilds.cache.get(ids.sorumluluk)
    if(!sorumluluk) return console.log("YARRAM ÖNCE SORUMLULUK SUNUCUSUNA SOK!")
    let yetkili = client.guilds.cache.get(ids.yetkili)
    if(!yetkili) return console.log("YARRAM ÖNCE YETKİLİ SUNUCUSUNA SOK!")
    let c_member = main.members.cache.get(member.id)
    if(!c_member) return;

    let s_member = sorumluluk.members.cache.get(member.id)
    let y_member = yetkili.members.cache.get(member.id)
  

    // Sorumluluk Sistemi
    if(s_member) {
        s_roles.forEach((sorumluluk, main) => {
            let getRoles = s_roles.get(main)
            if(getRoles && c_member.roles.cache.has(main) && !s_member.roles.cache.has(getRoles)) s_member.roles.add(getRoles).catch(err => {});
        })
    }
    
    // Yetkili Sistemi
    if(y_member) {
        y_roles.forEach((sorumluluk, main) => {
            let getRoles = y_roles.get(main)
            if(getRoles && c_member.roles.cache.has(main) && !y_member.roles.cache.has(getRoles)) y_member.roles.add(getRoles).catch(err => {});
        })
    }

})

client.on('ready', async () => {
    console.log('Sorumluluk Botu Hazır!');
    console.log(client.guilds.cache.map(x => x.name))
    client.user.setActivity('Creatéd by ΛCΛR', { type: 'PLAYING' });
})

client.login("").catch(err => {});
