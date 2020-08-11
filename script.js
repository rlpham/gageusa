const axios = require('axios');
const Discord = require('discord.js');
const client = new Discord.Client();

const URL = 'https://dutchie.com/graphql?operationName=FilteredProducts&variables={"productsFilter":{"dispensaryId":"5e28b8bbe67a5300752a2c02","bypassOnlineThresholds":false},"useCache":false}&extensions={"persistedQuery":{"version":1,"sha256Hash":"fa668eab39a89ea41f0278b2f73096d50c7362d0c5d539d83d6e5894ed11b751"}}'

client.on('ready', () => {
  console.log('Ready!')
})

client.on('message', (msg) => {
  if(msg.content.substring(0,1) === "!") {
    if(containsKeyword(msg, 'flowers')) {
      getData('flower')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'flowers');
        })
    } else if(containsKeyword(msg, 'prerolls')) {
      getData('pre-rolls')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'prerolls')
        })
    } else if(containsKeyword(msg, 'vaporizers')) {
      getData('vaporizers')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'vaporizers')
        })
    } else if(containsKeyword(msg, 'concentrates')) {
      getData('concentrate')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'concentrates')
        })
    } else if(containsKeyword(msg, 'edibles')) {
      getData('edible')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'edibles')
        })
    } else if(containsKeyword(msg, 'topicals')) {
      getData('topicals')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'topicals')
        })
    } else if(containsKeyword(msg, 'tinctures')) {
      getData('tincture')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'tinctures')
        })
    } else if(containsKeyword(msg, 'cbd')) {
      getData('cbd')
        .then((data) => {
          console.log(data.length);
          sendMessage(data, msg, 'cbd')
        })
    } else {
      msg.channel.send("Command Not Found")
    }
  }
})

client.login('NzQyNDI0NjkzMzYwODIwMzU2.XzF64A.ZmOkL5Pe21JWOqiCMfzLgEHYN9s')


function containsKeyword(msg, kw) {
  if(msg.content.substring(1, msg.content.length).toLowerCase() === kw.toLowerCase()) {
    return true
  } else {
    return false
  }

}

function getData(keyword) {
  var items = [];
  return axios.get(URL)
    .then((response) => {
      var data = response.data.data.filteredProducts.products;
      data.forEach((value) => {
        if(value.type.toLowerCase() == keyword.toLowerCase()) {
          items.push(value);
        }
      })
      return items;
    })
}

//Display Name, THC%, Price, Pic, Name of Straing, Hybrid/Indica/Sativa

function sendMessage(data, msg, kw) {

  msg.channel.send(new Discord.MessageEmbed()
  .setTitle(`FOUND ${data.length} OF ${kw.toUpperCase()}, LOADING NOW.....`)
  .setTimestamp()
  .setFooter('Developed by Bompton#7777'))

  data.forEach((value, index) => {
    var embed = new Discord.MessageEmbed()
      .setColor('#228B22')
      .setTitle(`${kw.toUpperCase()} - Item #${index+1}`)
      .setURL(`https://gageusa.com/cookies/?dtche=%2Fembedded-menu%2Fcookies-detroit%2Fmenu%2F${value._id}`)
      .setThumbnail(`https://images.dutchie.com/${value.Image.substring(value.Image.indexOf('dutchie-images/')+15 ,value.Image.length)}`)
      .addFields(
        {name: `Name`, value: `${value.Name}`},
        {name: `Brand`, value: `${value.brandName}`},
        {name: `THC %`, value: `${value.THCContent.value}%`, inline: true},
        {name: `Weight`, value: `${value.Options[0]}`, inline: true},
        {name: `Price`, value: '$'+ value.Prices[0], inline: true},
        {name: `Type`, value: `${value.strainType}`, inline: true}
      )
      .setTimestamp()
      .setFooter('Developed by Bompton#7777');
      msg.channel.send(embed);
  })
  
  msg.channel.send(new Discord.MessageEmbed()
    .setTitle(`END OF ${kw.toUpperCase()}`)
    .setTimestamp()
    .setFooter('Developed by Bompton#7777'))

}