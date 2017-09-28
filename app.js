const Discord = require('discord.js');
const client = new Discord.Client();

const Input = require('node-microphone');
let mic = new Input();

const prefix = '!bot '

client.on('ready', () => {
	console.log('I am ready!');
});

client.on('message', msg => {
	if(!msg.content.startsWith(prefix)){
		return;
	}

	if(msg.channel.type === 'dm'){
		msg.reply('I don\'t support commands in direct messages.');
		return;
	}

	if(msg.member.user.id !== '148081083492073472'){
		msg.reply('I only respond to the great poffeloff for commands. You could say I\'m quite Båring…');
		setTimeout(()=>{
			msg.reply('hehe…');
		}, 2500);
		return;	
	}

	if (msg.content.startsWith(prefix + 'join')) {
    	const voiceChannel = typeof msg.member.voiceChannel !== 'undefined' ? msg.member.voiceChannel : false;

    	if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I couldn\'t connect to your voice channel…');
    	voiceChannel.join().then((channel)=>{
    		msg.reply('Joining channel: ' + voiceChannel.name);
    		let micStream = mic.startRecording();
    		msg.guild.voiceConnection.playStream(micStream);
    	});
	}

	if (msg.content.startsWith(prefix + 'leave')) {
		const voiceChannel = typeof msg.member.voiceChannel !== 'undefined' ? msg.member.voiceChannel : false;
		if (!voiceChannel || voiceChannel.type !== 'voice') return msg.reply('I\'m not connected to any channels…');
		mic.stopRecording();
		voiceChannel.leave();
		msg.reply('Left channel: ' + voiceChannel.name + '.');
	}
});

// client.joinVoiceChannel()

client.login('MzYyOTQyNTE1MTY0MzQ4NDE3.DK6C8w.pd6Es3Alla2YZdkl7BygTeZnXB4');