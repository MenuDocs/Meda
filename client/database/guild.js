module.exports = {
    id: String,
    mutes: { type: Array, default: [] },
    cases: { type: Number, default: 0 },
    prefix: { type: String, default: 'a!' },
    modrole: { type: String, default: '0' },
    muterole: { type: String, default: '0'  },
    adminrole: { type: String, default: '0' },
    defvolume: { type: Number, default: 50 },
    logchannel: { type: String, default: '0' },
    cmdchannel: { type: String, default: '0' },
    swearfilter: { type: Boolean, default: false },
    invitefilter: { type: Boolean, default: false },
    leavechannel: { type: String, default: '0' },
    leavemessage: { type: String, default: 'Goodbye **{membertag}**.' },
    welcomechannel: { type: String, default: '0'},
    welcomemessage: { type: String, default: 'Welcome **{membermention}** to **{guildname}**.' }
};