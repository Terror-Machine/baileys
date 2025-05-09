const {
  default: makeWASocket,
  delay,
  PHONENUMBER_MCC,
  makeCacheableSignalKeyStore,
  useMultiFileAuthState,
  DisconnectReason,
  fetchLatestBaileysVersion,
  generateForwardMessageContent,
  prepareWAMessageMedia, 
  generateWAMessageFromContent,
  generateMessageID,
  ownloadContentFromMessage,
  makeInMemoryStore,
  jidDecode,
  proto,
  Browsers,
  getContentType
} = require("@whiskeysockets/baileys")

const {
  RemoveBgResult,
  removeBackgroundFromImageBase64
} = require('remove.bg')

const {
  createWriteStream
} = require('fs-extra')

const readline = require("readline")
const { parsePhoneNumber } = require("libphonenumber-js")
const NodeCache = require("node-cache")
const path = "./session/";
const pino = require('pino');
const Pino = require("pino")
const chalk = require('chalk')
const FileType = require('file-type')
const PhoneNumber = require('awesome-phonenumber')
const mime = require('mime-types');
const process = require('process');
const fs = require('fs-extra')
const util = require('util')
const moment = require('moment-timezone')
const moments = require('moment')
const ms = require('parse-ms')
const toMs = require('ms')
const momenSetup = require('moment-duration-format');
const axios = require('axios')
const fetch = require('node-fetch')
const request = require('request')
const difflib = require('difflib');
const figlet = require('figlet');
const cron = require('node-cron');
const sharp = require('sharp')
const fromBuffer = require('file-type')
const FormData = require('form-data')
const sort = require('arr-sort')
const { execSync } = require('child_process');
const pukimaki = "fnbots"
momenSetup(moments);

let silent = false
let origin = false
let repeat = false
let blocked = []
let mychat = []
let mygroup = []
let dataFamily100 = {}
let debugs = false
let timeStart = Date.now() / 1000;
let helpmaster = new Map()
let helpowner = new Map()
let helpvip = new Map()
let helppremium = new Map()
let helpmedia = new Map()
let helpmanage = new Map()
let ctype = ""
let Mid = "none"
let suggestWord = []
let cooldown = []
let mediaCooldown = []
let mekimeki = false
let suggested = false
let dbfile = 'db/' + pukimaki + '.fnbots.json'
let comsfile = 'coms/' + pukimaki + '.fnbots.json'
if (!fs.existsSync(dbfile)) {
  fs.copyFile('db/db.json', dbfile, (err) => {
    if (err) throw err;
  })
};
if (!fs.existsSync(comsfile)) {
  fs.copyFile('coms/master.json', comsfile, (err) => {
    if (err) throw err;
  })
};
let coms = fs.readJSONSync(comsfile);
let settings = fs.readJSONSync(dbfile);
let InitUser = fs.readJSONSync('db/' + pukimaki + '.master.json');
let levels = fs.readJSONSync('db/' + pukimaki + '.levels.json')
let x1 = fs.readJSONSync('db/' + pukimaki + '.image.json');
let x2 = fs.readJSONSync('db/' + pukimaki + '.video.json');
let x3 = fs.readJSONSync('db/' + pukimaki + '.contact.json');
let x4 = fs.readJSONSync('db/' + pukimaki + '.limit.json');
let x5 = fs.readJSONSync('db/' + pukimaki + '.chat.json');
let x6 = fs.readJSONSync('db/' + pukimaki + '.sticker.json');
let x7 = fs.readJSONSync('db/' + pukimaki + '.count.json');
let x8 = fs.readJSONSync('db/' + pukimaki + '.muted.json');
let x9 = fs.readJSONSync('db/' + pukimaki + '.welcome.json');
let x0 = fs.readJSONSync('db/' + pukimaki + '.bacot.json');
let xa = fs.readJSONSync('db/' + pukimaki + '.premium.json');
let xb = fs.readJSONSync('db/' + pukimaki + '.5w1h.json');
let xc = fs.readJSONSync('db/' + pukimaki + '.vip.json');
let xd = fs.readJSONSync('db/' + pukimaki + '.filter.json');
let xe = fs.readJSONSync('db/' + pukimaki + '.simi.json');
let xf = fs.readJSONSync('db/' + pukimaki + '.whitelist.json');
let xg = fs.readJSONSync('db/' + pukimaki + '.afk.json');
let xh = fs.readJSONSync('db/' + pukimaki + '.welcomemessage.json');
let xi = fs.readJSONSync('db/' + pukimaki + '.limitgame.json');
let {
  kataapa,
  katadimana,
  katakapan,
  katasiapa,
  katakenapa,
  katabagaimana
} = xb
let {
  muted,
  mutelist
} = x8
let {
  admin,
  memec,
  filter,
  changer,
  totalhitcount,
  premium,
  banChats,
  autojoin,
  banned,
  restartState: isRestart,
  mtc: mtcState,
  whitelist,
  sAdmin,
  limitCount,
  limitCountPrem,
  memberLimit,
  groupLimit,
} = settings
var recentcmd = new Set();
var fspamm = new Set();
var sban = new Set();
var stickerspam = new Set();
var stp = new Set();
var loaded = 0;
var counter = 0;
const isMediaCooldown = (serial) => mediaCooldown.includes(serial) ? true : false
const isWhite = (serial) => whitelist.includes(serial) ? true : false

async function dumpSet() {
  fs.writeJSONSync('db/' + pukimaki + '.fnbots.json', settings, {
    spaces: 2
  })
};

async function dumpBacot() {
  fs.writeJSONSync('db/' + pukimaki + '.bacot.json', x0, {
    spaces: 2
  })
};

async function dumpImage() {
  fs.writeJSONSync('db/' + pukimaki + '.image.json', x1, {
    spaces: 2
  })
};

async function dumpVideo() {
  fs.writeJSONSync('db/' + pukimaki + '.video.json', x2, {
    spaces: 2
  })
};

async function dumpContact() {
  fs.writeJSONSync('db/' + pukimaki + '.contact.json', x3, {
    spaces: 2
  })
};

async function dumpLimit() {
  fs.writeJSONSync('db/' + pukimaki + '.limit.json', x4, {
    spaces: 2
  })
};

async function dumpChat() {
  fs.writeJSONSync('db/' + pukimaki + '.chat.json', x5, {
    spaces: 2
  })
};

async function dumpsticker() {
  fs.writeJSONSync('db/' + pukimaki + '.sticker.json', x6, {
    spaces: 2
  })
};

async function dumpCount() {
  fs.writeJSONSync('db/' + pukimaki + '.count.json', x7, {
    spaces: 2
  })
};

async function dumpMute() {
  fs.writeJSONSync('db/' + pukimaki + '.muted.json', x8, {
    spaces: 2
  })
};

async function dumpWelcome() {
  fs.writeJSONSync('db/' + pukimaki + '.welcome.json', x9, {
    spaces: 2
  })
};

async function dumpMessageWelcom() {
  fs.writeJSONSync('db/' + pukimaki + '.welcomemessage.json', xh, {
    spaces: 2
  })
};

async function dumpKata() {
  fs.writeJSONSync('db/' + pukimaki + '.5w1h.json', xb, {
    spaces: 2
  })
};

async function dumpFilter() {
  fs.writeJSONSync('db/' + pukimaki + '.filter.json', xd, {
    spaces: 2
  })
};

async function dumpSimi() {
  fs.writeJSONSync('db/' + pukimaki + '.simi.json', xe, {
    spaces: 2
  })
};

async function dumpWhite() {
  fs.writeJSONSync('db/' + pukimaki + '.whitelist.json', xf, {
    spaces: 2
  })
};

async function dumpMaster() {
  fs.writeJSONSync('db/' + pukimaki + '.master.json', InitUser, {
    spaces: 2
  })
};

async function dumpComs() {
  fs.writeJSONSync('coms/' + pukimaki + '.fnbots.json', coms, {
    spaces: 2
  })
};

async function dumpLimitGame() {
  fs.writeJSONSync('db/' + pukimaki + '.limitgame.json', xi, {
    spaces: 2
  })
};

const Premapikey = settings.vhkey
const apikkk = settings.itechkey
const autocommand = settings.autocommand
const BotName = settings.botname

//---------------------canvacord----------------------//

const spawn = require('child_process').exec;
const exec = require('child_process').exec;
const ffmpeg = require('fluent-ffmpeg')
const canvacord = require('canvacord')
const stackBlur = require('stackblur-canvas');
const canvas = canvacord.Canvas
const {
  createCanvas,
  loadImage,
  registerFont
} = require('canvas');
registerFont('./fonts/Impact.ttf', {
  family: 'Impact'
});
registerFont('./fonts/Noto-Regular.ttf', {
  family: 'Noto'
});
registerFont('./fonts/Noto-CJK.otf', {
  family: 'Noto'
});
registerFont('./fonts/Noto-Emoji.ttf', {
  family: 'Noto'
});
registerFont('./fonts/oldengl.ttf', {
  family: 'Old English Text MT'
});

function greyscale(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
    data.data[i] = brightness;
    data.data[i + 1] = brightness;
    data.data[i + 2] = brightness;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function invert(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    data.data[i] = 255 - data.data[i];
    data.data[i + 1] = 255 - data.data[i + 1];
    data.data[i + 2] = 255 - data.data[i + 2];
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function silhouette(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    data.data[i] = 0;
    data.data[i + 1] = 0;
    data.data[i + 2] = 0;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function sepia(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < data.data.length; i += 4) {
    const brightness = (0.34 * data.data[i]) + (0.5 * data.data[i + 1]) + (0.16 * data.data[i + 2]);
    data.data[i] = brightness + 100;
    data.data[i + 1] = brightness + 50;
    data.data[i + 2] = brightness;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function contrast(ctx, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  const factor = (259 / 100) + 1;
  const intercept = 128 * (1 - factor);
  for (let i = 0; i < data.data.length; i += 4) {
    data.data[i] = (data.data[i] * factor) + intercept;
    data.data[i + 1] = (data.data[i + 1] * factor) + intercept;
    data.data[i + 2] = (data.data[i + 2] * factor) + intercept;
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function desaturate(ctx, level, x, y, width, height) {
  const data = ctx.getImageData(x, y, width, height);
  for (let i = 0; i < height; i++) {
    for (let j = 0; j < width; j++) {
      const dest = ((i * width) + j) * 4;
      const grey = Number.parseInt(
        (0.2125 * data.data[dest]) + (0.7154 * data.data[dest + 1]) + (0.0721 * data.data[dest + 2]), 10
      );
      data.data[dest] += level * (grey - data.data[dest]);
      data.data[dest + 1] += level * (grey - data.data[dest + 1]);
      data.data[dest + 2] += level * (grey - data.data[dest + 2]);
    }
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function distort(ctx, amplitude, x, y, width, height, strideLevel = 4) {
  const data = ctx.getImageData(x, y, width, height);
  const temp = ctx.getImageData(x, y, width, height);
  const stride = width * strideLevel;
  for (let i = 0; i < width; i++) {
    for (let j = 0; j < height; j++) {
      const xs = Math.round(amplitude * Math.sin(2 * Math.PI * 3 * (j / height)));
      const ys = Math.round(amplitude * Math.cos(2 * Math.PI * 3 * (i / width)));
      const dest = (j * stride) + (i * strideLevel);
      const src = ((j + ys) * stride) + ((i + xs) * strideLevel);
      data.data[dest] = temp.data[src];
      data.data[dest + 1] = temp.data[src + 1];
      data.data[dest + 2] = temp.data[src + 2];
    }
  }
  ctx.putImageData(data, x, y);
  return ctx;
}

function fishEye(ctx, level, x, y, width, height) {
  const frame = ctx.getImageData(x, y, width, height);
  const source = new Uint8Array(frame.data);
  for (let i = 0; i < frame.data.length; i += 4) {
    const sx = (i / 4) % frame.width;
    const sy = Math.floor(i / 4 / frame.width);
    const dx = Math.floor(frame.width / 2) - sx;
    const dy = Math.floor(frame.height / 2) - sy;
    const dist = Math.sqrt((dx * dx) + (dy * dy));
    const x2 = Math.round((frame.width / 2) - (dx * Math.sin(dist / (level * Math.PI) / 2)));
    const y2 = Math.round((frame.height / 2) - (dy * Math.sin(dist / (level * Math.PI) / 2)));
    const i2 = ((y2 * frame.width) + x2) * 4;
    frame.data[i] = source[i2];
    frame.data[i + 1] = source[i2 + 1];
    frame.data[i + 2] = source[i2 + 2];
    frame.data[i + 3] = source[i2 + 3];
  }
  ctx.putImageData(frame, x, y);
  return ctx;
}

function pixelize(ctx, canvas, image, level, x, y, width, height) {
  ctx.imageSmoothingEnabled = false;
  ctx.drawImage(image, x, y, width * level, height * level);
  ctx.drawImage(canvas, x, y, width * level, height * level, x, y, width, height);
  ctx.imageSmoothingEnabled = true;
  return ctx;
}

function hasAlpha(image) {
  const canvas = createCanvas(image.width, image.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(image, 0, 0);
  const data = ctx.getImageData(0, 0, canvas.width, canvas.height);
  let hasAlphaPixels = false;
  for (let i = 3; i < data.data.length; i += 4) {
    if (data.data[i] < 255) {
      hasAlphaPixels = true;
      break;
    }
  }
  return hasAlphaPixels;
}

function drawImageWithTint(ctx, image, color, x, y, width, height) {
  const {
    fillStyle,
    globalAlpha
  } = ctx;
  ctx.fillStyle = color;
  ctx.drawImage(image, x, y, width, height);
  ctx.globalAlpha = 0.5;
  ctx.fillRect(x, y, width, height);
  ctx.fillStyle = fillStyle;
  ctx.globalAlpha = globalAlpha;
}

function shortenText(ctx, text, maxWidth) {
  let shorten = false;
  while (ctx.measureText(`${text}...`).width > maxWidth) {
    if (!shorten) shorten = true;
    text = text.substr(0, text.length - 1);
  }
  return shorten ? `${text}...` : text;
}

function wrapText(ctx, text, maxWidth) {
  return new Promise(resolve => {
    if (ctx.measureText(text).width < maxWidth) return resolve([text]);
    if (ctx.measureText('W').width > maxWidth) return resolve(null);
    const words = text.split(' ');
    const lines = [];
    let line = '';
    while (words.length > 0) {
      let split = false;
      while (ctx.measureText(words[0]).width >= maxWidth) {
        const temp = words[0];
        words[0] = temp.slice(0, -1);
        if (split) {
          words[1] = `${temp.slice(-1)}${words[1]}`;
        } else {
          split = true;
          words.splice(1, 0, temp.slice(-1));
        }
      }
      if (ctx.measureText(`${line}${words[0]}`).width < maxWidth) {
        line += `${words.shift()} `;
      } else {
        lines.push(line.trim());
        line = '';
      }
      if (words.length === 0) lines.push(line.trim());
    }
    return resolve(lines);
  });
}

function centerImage(base, data) {
  const dataRatio = data.width / data.height;
  const baseRatio = base.width / base.height;
  let {
    width,
    height
  } = data;
  let x = 0;
  let y = 0;
  if (baseRatio < dataRatio) {
    height = data.height;
    width = base.width * (height / base.height);
    x = (data.width - width) / 2;
    y = 0;
  } else if (baseRatio > dataRatio) {
    width = data.width;
    height = base.height * (width / base.width);
    x = 0;
    y = (data.height - height) / 2;
  }
  return {
    x,
    y,
    width,
    height
  };
}

function centerImagePart(data, maxWidth, maxHeight, widthOffset, heightOffest) {
  let {
    width,
    height
  } = data;
  if (width > maxWidth) {
    const ratio = maxWidth / width;
    width = maxWidth;
    height *= ratio;
  }
  if (height > maxHeight) {
    const ratio = maxHeight / height;
    height = maxHeight;
    width *= ratio;
  }
  const x = widthOffset + ((maxWidth / 2) - (width / 2));
  const y = heightOffest + ((maxHeight / 2) - (height / 2));
  return {
    x,
    y,
    width,
    height
  };
}

function silhouetteImage(data) {
  if (!hasAlpha(data)) return data;
  const canvas = createCanvas(data.width, data.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(data, 0, 0);
  silhouette(ctx, 0, 0, data.width, data.height);
  return canvas;
}

const triggered = (buffer, id) => new Promise((resolve) => {
  canvas.trigger(buffer).then(async res => {
    await sleep(4000)
    await fs.writeFile(`./image/asu.gif`, res).then(async () => {
      ffmpeg({
        source: './image/asu.gif'
      })
        .inputFormat('gif')
        .addOutputOptions("-vcodec", "libwebp", "-vf", "crop=w='min(min(iw,ih),512)':h='min(min(iw,ih),512)',scale=150:150,setsar=1,fps=10", '-lossless', '1', "-loop", "1", "-preset", "default", "-an", "-vsync", "0", "-s", "200:200")
        .save(`./image/asu.webp`)
        .on('end', () => {
          let mediaData = (fs.readFileSync(`./image/asu.webp`)).toString('base64')
          fs.unlink(`./image/asu.webp`, () => { })
          return resolve(mediaData)
        })
        .on('error', (err) => console.log(err))
    })
  })
})

const wasted = (buffer) => new Promise((resolve) => {
  canvas.wasted(buffer).then(res => {
    const formated = `data:image/png;base64,${res.toString('base64')}`
    return resolve(formated)
  })
})

const wanted = (buffer) => new Promise((resolve) => {
  canvas.wanted(buffer).then(res => {
    const formated = `data:image/png;base64,${res.toString('base64')}`
    return resolve(formated)
  })
})

const rainbow = (buffer) => new Promise((resolve) => {
  canvas.rainbow(buffer).then(res => {
    const formated = `data:image/png;base64,${res.toString('base64')}`
    return resolve(formated)
  })
})

const facepalm = (buffer) => new Promise((resolve) => {
  canvas.facepalm(buffer).then(res => {
    const formated = `data:image/png;base64,${res.toString('base64')}`
    return resolve(formated)
  })
})

const fuse = (buffer1, buffer2) => new Promise((resolve) => {
  canvas.fuse(buffer1, buffer2).then(res => {
    const formated = `data:image/png;base64,${res.toString('base64')}`
    return resolve(formated)
  })
})

const deepfry = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    desaturate(ctx, -20, 0, 0, data.width, data.height);
    contrast(ctx, 0, 0, data.width, data.height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const glitch = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    distort(ctx, 20, 0, 0, data.width, data.height, 5);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const mataikan = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    fishEye(ctx, 15, 0, 0, data.width, data.height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const mirror = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const random = ['x', 'y', 'both'];
    const type = randomChoice(random)
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    if (type === 'x') {
      ctx.translate(canvas.width, 0);
      ctx.scale(-1, 1);
    } else if (type === 'y') {
      ctx.translate(0, canvas.height);
      ctx.scale(1, -1);
    } else if (type === 'both') {
      ctx.translate(canvas.width, canvas.height);
      ctx.scale(-1, -1);
    }
    ctx.drawImage(data, 0, 0);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const ghost = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, data.width, data.height);
    ctx.globalAlpha = 0.25;
    ctx.drawImage(data, 0, 0);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const blur = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    stackBlur.canvasRGBA(canvas, 0, 0, canvas.width, canvas.height, 30);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const approved = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const besa = fs.readFileSync('./image/approved.png')
    const base = await loadImage(besa);
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const {
      x,
      y,
      width,
      height
    } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const challenge = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const besa = fs.readFileSync('./image/challenger.png')
    const base = await loadImage(besa);
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const {
      x,
      y,
      width,
      height
    } = centerImagePart(data, 256, 256, 484, 98);
    ctx.drawImage(silhouette ? silhouetteImage(data) : data, x, y, width, height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const beautiful = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const besa = fs.readFileSync('./image/beautiful.png')
    const base = await loadImage(besa);
    const avatar = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, base.height);
    ctx.drawImage(avatar, 249, 24, 105, 105);
    ctx.drawImage(avatar, 249, 223, 105, 105);
    ctx.drawImage(base, 0, 0);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const rejected = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const besa = fs.readFileSync('./image/rejected.png')
    const base = await loadImage(besa);
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    const {
      x,
      y,
      width,
      height
    } = centerImage(base, data);
    ctx.drawImage(base, x, y, width, height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const subtitle = (buffer, text) => new Promise(async (resolve, reject) => {
  try {
    const base = await loadImage(buffer);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const fontSize = Math.round(base.height / 15);
    ctx.font = `${fontSize}px Noto`;
    ctx.fillStyle = 'yellow';
    ctx.textAlign = 'center';
    const lines = await wrapText(ctx, text, base.width - 10);
    if (!lines) return reject('There\'s not enough width to subtitle this image.');
    ctx.textBaseline = 'bottom';
    const initial = base.height - ((lines.length - 1) * fontSize) - (fontSize / 2) - ((lines.length - 1) * 10);
    for (let i = 0; i < lines.length; i++) {
      const textHeight = initial + (i * fontSize) + (i * 10);
      ctx.strokeStyle = 'black';
      const rounded = Math.round(base.height / 100);
      ctx.lineWidth = rounded < 1 ? 1 : rounded;
      ctx.strokeText(lines[i], base.width / 2, textHeight);
      ctx.fillStyle = 'yellow';
      ctx.fillText(lines[i], base.width / 2, textHeight);
    }
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    if (Buffer.byteLength(attachment) > 8e+6) return reject('Resulting image was above 8 MB.');
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const memegen = (top, bottom, image) => new Promise(async (resolve, reject) => {
  try {
    const base = await loadImage(image);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(base, 0, 0);
    const fontSize = Math.round(base.height / 10);
    ctx.font = `${fontSize}px Impact`;
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    const topLines = await wrapText(ctx, top, base.width - 10);
    if (!topLines) return reject('There\'s not enough width to make a meme with this image.');
    for (let i = 0; i < topLines.length; i++) {
      const textHeight = (i * fontSize) + (i * 10);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.strokeText(topLines[i], base.width / 2, textHeight);
      ctx.fillStyle = 'white';
      ctx.fillText(topLines[i], base.width / 2, textHeight);
    }
    const bottomLines = await wrapText(ctx, bottom, base.width - 10);
    if (!bottomLines) return reject('There\'s not enough width to make a meme with this image.');
    ctx.textBaseline = 'bottom';
    const initial = base.height - ((bottomLines.length - 1) * fontSize) - ((bottomLines.length - 1) * 10);
    for (let i = 0; i < bottomLines.length; i++) {
      const textHeight = initial + (i * fontSize) + (i * 10);
      ctx.strokeStyle = 'black';
      ctx.lineWidth = 5;
      ctx.strokeText(bottomLines[i], base.width / 2, textHeight);
      ctx.fillStyle = 'white';
      ctx.fillText(bottomLines[i], base.width / 2, textHeight);
    }
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const thuglife = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const base = await loadImage('./image/thug-life.png');
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    ctx.drawImage(data, 0, 0);
    greyscale(ctx, 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = data.width / 2;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, (data.width / 2) - (width / 2), data.height - height, width, height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const burn = (burn) => new Promise(async (resolve) => {
  const base = await loadImage('./image/spongebob-burn.png');
  const canvas = createCanvas(base.width, base.height);
  const ctx = canvas.getContext('2d');
  ctx.drawImage(base, 0, 0);
  ctx.fillStyle = 'black';
  ctx.textBaseline = 'top';
  ctx.font = '35px Noto';
  let fontSize = 35;
  while (ctx.measureText(burn).width > 400) {
    fontSize--;
    ctx.font = `${fontSize}px Noto`;
  }
  const lines = await wrapText(ctx, burn, 180);
  ctx.fillText(lines.join('\n'), 55, 103);
  const formated = `data:image/jpeg;base64,${canvas.toBuffer().toString('base64')}`
  return resolve(formated)
})

const tobecontinue = (buffer) => new Promise(async (resolve, reject) => {
  try {
    const base = await loadImage('./image/to-be-continued.png');
    const data = await loadImage(buffer);
    const canvas = createCanvas(data.width, data.height);
    const ctx = canvas.getContext('2d');
    drawImageWithTint(ctx, data, '#704214', 0, 0, data.width, data.height);
    const ratio = base.width / base.height;
    const width = canvas.width / 2;
    const height = Math.round(width / ratio);
    ctx.drawImage(base, 0, canvas.height - height, width, height);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

const memegen2 = (buffer, text) => new Promise(async (resolve, reject) => {
  try {
    const base = await loadImage(buffer);
    const canvas = createCanvas(base.width, base.height);
    const ctx = canvas.getContext('2d');
    ctx.font = '40px Noto';
    const lines = await wrapText(ctx, text, base.width - 10);
    const lineBreakLen = text.split('\n').length;
    const linesLen = (40 * lines.length) +
      (40 * (lineBreakLen - 1)) +
      (14 * lines.length) +
      (14 * (lineBreakLen - 1)) +
      14;
    canvas.height += linesLen;
    ctx.font = '40px Noto';
    ctx.textBaseline = 'top';
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, base.width, linesLen);
    ctx.fillStyle = 'black';
    ctx.fillText(lines.join('\n'), 5, 5);
    ctx.drawImage(base, 0, linesLen);
    const attachment = canvas.toBuffer();
    const formated = `data:image/jpeg;base64,${attachment.toString('base64')}`
    return resolve(formated)
  } catch (err) {
    return reject(`Oh no, an error occurred: \`${err.message}\`. Try again later!`);
  }
})

//------------------------text&&------------------------//

const emoju = {
  "a": "🇦",
  "b": "🇧",
  "c": "🇨",
  "d": "🇩",
  "e": "🇪",
  "f": "🇫",
  "g": "🇬",
  "h": "🇭",
  "i": "🇮",
  "j": "🇯",
  "k": "🇰",
  "l": "🇱",
  "m": "🇲",
  "n": "🇳",
  "o": "🇴",
  "p": "🇵",
  "q": "🇶",
  "r": "🇷",
  "s": "🇸",
  "t": "🇹",
  "u": "🇺",
  "v": "🇻",
  "w": "🇼",
  "x": "🇽",
  "y": "🇾",
  "z": "🇿",
  "0": ":zero:",
  "1": ":one:",
  "2": ":two:",
  "3": ":three:",
  "4": ":four:",
  "5": ":five:",
  "6": ":six:",
  "7": ":seven:",
  "8": ":eight:",
  "9": ":nine:",
  "?": "❓",
  "!": "❗",
  "#": "#⃣"
}

const fancy = {
  "a": "𝔞",
  "b": "𝔟",
  "c": "𝔠",
  "d": "𝔡",
  "e": "𝔢",
  "f": "𝔣",
  "g": "𝔤",
  "h": "𝔥",
  "i": "𝔦",
  "j": "𝔧",
  "k": "𝔨",
  "l": "𝔩",
  "m": "𝔪",
  "n": "𝔫",
  "o": "𝔬",
  "p": "𝔭",
  "q": "𝔮",
  "r": "𝔯",
  "s": "𝔰",
  "t": "𝔱",
  "u": "𝔲",
  "v": "𝔳",
  "w": "𝔴",
  "x": "𝔵",
  "y": "𝔶",
  "z": "𝔷",
  "A": "𝔄",
  "B": "𝔅",
  "C": "ℭ",
  "D": "𝔇",
  "E": "𝔈",
  "F": "𝔉",
  "G": "𝔊",
  "H": "ℌ",
  "I": "ℑ",
  "J": "𝔍",
  "K": "𝔎",
  "L": "𝔏",
  "M": "𝔐",
  "N": "𝔑",
  "O": "𝔒",
  "P": "𝔓",
  "Q": "𝔔",
  "R": "ℜ",
  "S": "𝔖",
  "T": "𝔗",
  "U": "𝔘",
  "V": "𝔙",
  "W": "𝔚",
  "X": "𝔛",
  "Y": "𝔜",
  "Z": "ℨ",
  "1": "𝟙",
  "2": "ϩ",
  "3": "Ӡ",
  "4": "५",
  "5": "Ƽ",
  "6": "Ϭ",
  "7": "7",
  "8": "𝟠",
  "9": "९",
  "0": "⊘"
}

const cursiv = {
  "a": "𝒶",
  "b": "𝒷",
  "c": "𝒸",
  "d": "𝒹",
  "e": "𝑒",
  "f": "𝒻",
  "g": "𝑔",
  "h": "𝒽",
  "i": "𝒾",
  "j": "𝒿",
  "k": "𝓀",
  "l": "𝓁",
  "m": "𝓂",
  "n": "𝓃",
  "o": "𝑜",
  "p": "𝓅",
  "q": "𝓆",
  "r": "𝓇",
  "s": "𝓈",
  "t": "𝓉",
  "u": "𝓊",
  "v": "𝓋",
  "w": "𝓌",
  "x": "𝓍",
  "y": "𝓎",
  "z": "𝓏",
  "A": "𝒜",
  "B": "𝐵",
  "C": "𝒞",
  "D": "𝒟",
  "E": "𝐸",
  "F": "𝐹",
  "G": "𝒢",
  "H": "𝐻",
  "I": "𝐼",
  "J": "𝒥",
  "K": "𝒦",
  "L": "𝐿",
  "M": "𝑀",
  "N": "𝒩",
  "O": "𝒪",
  "P": "𝒫",
  "Q": "𝒬",
  "R": "𝑅",
  "S": "𝒮",
  "T": "𝒯",
  "U": "𝒰",
  "V": "𝒱",
  "W": "𝒲",
  "X": "𝒳",
  "Y": "𝒴",
  "Z": "𝒵"
}

const broni = {
  "hand": "hoof",
  "hands": "hooves",
  "foot": "hoof",
  "feet": "hooves",
  "ass": "flank",
  "asses": "flanks",
  "butt": "flank",
  "butts": "flanks",
  "anyone": "anypony",
  "cowboy": "cowpony",
  "cowboys": "cowponies",
  "cowgirl": "cowpony",
  "cowgirls": "cowponies",
  "person": "pony",
  "people": "ponies",
  "persons": "ponies",
  "hell": "hay",
  "heck": "hay",
  "nail": "hoof",
  "nails": "hooves",
  "arm": "hoof",
  "arms": "hooves",
  "brofist": "brohoof",
  "fist": "hoof",
  "fists": "hooves",
  "ladies": "mares",
  "lady": "mare",
  "gentlemen": "stallions",
  "gentleman": "stallion",
  "shit": "horseapples",
  "shits": "horseapples",
  "naysayer": "neigh-sayer",
  "naysayers": "neigh-sayers",
  "nay": "neigh",
  "noone": "nopony",
  "nobody": "nopony",
  "nobodies": "noponies",
  "fuck": "horseapples",
  "fucks": "horseapples",
  "fucking": "horseappling",
  "fucker": "horseappler",
  "fuckers": "horseapplers",
  "scaredy-cat": "scaredy-pony",
  "scaredy-cats": "scaredy-ponies",
  "single-handedly": "single-hoofedly",
  "singlehandedly": "singlehoofedly",
  "second-hand": "second-hoof",
  "secondhand": "secondhoof",
  "handed": "hoofed",
  "someone": "somepony",
  "somebody": "somepony",
  "somebodies": "someponies",
  "god": "Celestia",
  "world": "Ponyville",
  "fan": "brony",
  "fans": "bronies",
  "fap": "clop",
  "porn": "clopfic",
  "porno": "clopfic",
  "pornography": "clopfic",
  "empty-handed": "empty-hoofed",
  "emptyhanded": "emptyhoofed",
  "girlfriend": "fillyfriend",
  "girlfriends": "fillyfriends",
  "boyfriend": "coltfriend",
  "boyfriends": "coltfriends",
  "childhood": "fillyhood",
  "child": "filly",
  "children": "fillies",
  "kid": "filly",
  "kids": "fillies",
  "first-hand": "first-hoof",
  "firsthand": "firsthoof",
  "footsteps": "hoofsteps",
  "footstep": "hoofstep",
  "hair": "mane",
  "trolling": "paraspriting",
  "troll": "parasprite",
  "hater": "parasprite",
  "parasite": "parasprite",
  "mankind": "ponykind",
  "stalemate": "stalemare",
  "handjob": "hoofjob",
  "hand-job": "hoof-job",
  "gay": "coltcuddler",
  "gays": "coltcuddlers",
  "lesbian": "fillyfooler",
  "lesbians": "fillyfoolers",
  "adopt": "claim",
  "adoption": "claiming",
  "baby": "foal",
  "babies": "foals",
  "knuckle": "fetlock",
  "knuckles": "fetlocks",
  "girl": "filly",
  "girls": "fillies",
  "boy": "colt",
  "boys": "colts",
  "toddler": "yearling",
  "toddlers": "yearlings",
  "man": "stallion",
  "men": "stallions",
  "male": "stallion",
  "males": "stallions",
  "woman": "mare",
  "women": "mares",
  "female": "mare",
  "females": "mares",
  "teleport": "wink",
  "teleporting": "winking",
  "everybody": "everypony",
  "everyone": "everypony",
  "son": "colt",
  "sons": "colts",
  "daughter": "filly",
  "daughters": "fillies"
}

const braille = {
  "a": "⠁",
  "b": "⠃",
  "c": "⠉",
  "d": "⠙",
  "e": "⠑",
  "f": "⠋",
  "g": "⠛",
  "h": "⠓",
  "i": "⠊",
  "j": "⠚",
  "k": "⠅",
  "l": "⠇",
  "m": "⠍",
  "n": "⠝",
  "o": "⠕",
  "p": "⠏",
  "q": "⠟",
  "r": "⠗",
  "s": "⠎",
  "t": "⠞",
  "u": "⠥",
  "v": "⠧",
  "w": "⠺",
  "x": "⠭",
  "y": "⠽",
  "z": "⠵",
  "A": "⠠⠁",
  "B": "⠠⠃",
  "C": "⠠⠉",
  "D": "⠠⠙",
  "E": "⠠⠑",
  "F": "⠠⠋",
  "G": "⠠⠛",
  "H": "⠠⠓",
  "I": "⠠⠊",
  "J": "⠠⠚",
  "K": "⠠⠅",
  "L": "⠠⠇",
  "M": "⠠⠍",
  "N": "⠠⠝",
  "O": "⠠⠕",
  "P": "⠠⠏",
  "Q": "⠠⠟",
  "R": "⠠⠗",
  "S": "⠠⠎",
  "T": "⠠⠞",
  "U": "⠠⠥",
  "V": "⠠⠧",
  "W": "⠠⠺",
  "X": "⠠⠭",
  "Y": "⠠⠽",
  "Z": "⠠⠵",
  "0": "⠼⠚",
  "1": "⠼⠁",
  "2": "⠼⠃",
  "3": "⠼⠉",
  "4": "⠼⠙",
  "5": "⠼⠑",
  "6": "⠼⠋",
  "7": "⠼⠛",
  "8": "⠼⠓",
  "9": "⠼⠊",
  ".": "⠲",
  ",": "⠂",
  "!": "⠖",
  "?": "⠦",
  "'": "⠄",
  "\"": "⠄⠶",
  ":": "⠒",
  ";": "⠆",
  "-": "⠤",
  "(": "⠐⠣",
  ")": "⠐⠜"
}

const suuiper = {
  "a": "ᵃ",
  "b": "ᵇ",
  "c": "ᶜ",
  "d": "ᵈ",
  "e": "ᵉ",
  "f": "ᶠ",
  "g": "ᵍ",
  "h": "ʰ",
  "i": "ᶦ",
  "j": "ʲ",
  "k": "ᵏ",
  "l": "ˡ",
  "m": "ᵐ",
  "n": "ⁿ",
  "o": "ᵒ",
  "p": "ᵖ",
  "q": "ᑫ",
  "r": "ʳ",
  "s": "ˢ",
  "t": "ᵗ",
  "u": "ᵘ",
  "v": "ᵛ",
  "w": "ʷ",
  "x": "ˣ",
  "y": "ʸ",
  "z": "ᶻ",
  "A": "ᴬ",
  "B": "ᴮ",
  "C": "ᶜ",
  "D": "ᴰ",
  "E": "ᴱ",
  "F": "ᶠ",
  "G": "ᴳ",
  "H": "ᴴ",
  "I": "ᴵ",
  "J": "ᴶ",
  "K": "ᴷ",
  "L": "ᴸ",
  "M": "ᴹ",
  "N": "ᴺ",
  "O": "ᴼ",
  "P": "ᴾ",
  "R": "ᴿ",
  "S": "ˢ",
  "T": "ᵀ",
  "U": "ᵁ",
  "V": "ⱽ",
  "W": "ᵂ",
  "X": "ˣ",
  "Y": "ʸ",
  "Z": "ᶻ",
  "0": "⁰",
  "1": "¹",
  "2": "²",
  "3": "³",
  "4": "⁴",
  "5": "⁵",
  "6": "⁶",
  "7": "⁷",
  "8": "⁸",
  "9": "⁹"
}

const zalgo = {
  "up": [
    "̍",
    "̎",
    "̄",
    "̅",
    "̿",
    "̑",
    "̆",
    "̐",
    "͒",
    "͗",
    "͑",
    "̇",
    "̈",
    "̊",
    "͂",
    "̓",
    "̈",
    "͊",
    "͋",
    "͌",
    "̃",
    "̂",
    "̌",
    "͐",
    "̀",
    "́",
    "̋",
    "̏",
    "̒",
    "̓",
    "̔",
    "̽",
    "̉",
    "ͣ",
    "ͤ",
    "ͥ",
    "ͦ",
    "ͧ",
    "ͨ",
    "ͩ",
    "ͪ",
    "ͫ",
    "ͬ",
    "ͭ",
    "ͮ",
    "ͯ",
    "̾",
    "͛",
    "͆",
    "̚"
  ],
  "middle": [
    "̕",
    "̛",
    "̀",
    "́",
    "͘",
    "̡",
    "̢",
    "̧",
    "̨",
    "̴",
    "̵",
    "̶",
    "͜",
    "͝",
    "͞",
    "͟",
    "͠",
    "͢",
    "̸",
    "̷",
    "͡",
    "҉"
  ],
  "down": [
    "̖",
    "̗",
    "̘",
    "̙",
    "̜",
    "̝",
    "̞",
    "̟",
    "̠",
    "̤",
    "̥",
    "̦",
    "̩",
    "̪",
    "̫",
    "̬",
    "̭",
    "̮",
    "̯",
    "̰",
    "̱",
    "̲",
    "̳",
    "̹",
    "̺",
    "̻",
    "̼",
    "ͅ",
    "͇",
    "͈",
    "͉",
    "͍",
    "͎",
    "͓",
    "͔",
    "͕",
    "͖",
    "͙",
    "͚",
    "̣"
  ]
}

//-----------------------process-----------------------//

function encode_utf8(s) {
  return unescape(encodeURIComponent(s));
}

function decode_utf8(s) {
  return decodeURIComponent(escape(s));
}

function bufferToStream(buffer) {
  const readable = new Readable()
  readable._read = () => { }
  readable.push(buffer)
  readable.push(null)
  return readable
}

const sendGif = (id, buffers) => new Promise((resolve) => {
  const stream = bufferToStream(buffers)
  ffmpeg(stream)
    .inputFormat('mp4')
    .addOutputOptions("-vcodec", "libwebp", "-vf", "scale='min(150,iw)':min'(150,ih)':force_original_aspect_ratio=decrease, format=rgba, fps=10, pad=150:150:-1:-1:color=#00000000", '-lossless', '1', "-loop", "0", "-preset", "default", "-an", "-vsync", "0", "-s", "150:150")
    .save(`./database/${id}.webp`)
    .on('end', () => {
      stream.destroy()
      let mediaData = (fs.readFileSync(`./database/${id}.webp`)).toString('base64')
      fs.unlink(`./database/${id}.webp`, () => { })
      return resolve(mediaData)
    })
})

const wait = async (media) => new Promise(async (resolve, reject) => {
  const attachmentData = `data:image/jpeg;base64,${media.toString('base64')}`
  const response = await fetch("https://trace.moe/api/search", {
    method: "POST",
    body: JSON.stringify({
      image: attachmentData
    }),
    headers: {
      "Content-Type": "application/json"
    }
  });
  if (!response.ok) reject(`Gambar tidak ditemukan!`);
  const result = await response.json()
  let ecch = () => result.docs[0].is_adult ? "Iya" : "Tidak"
  let dat = `*Whats Anime is That?\n`
  dat += `Ecchi           : *${ecch()}*\n`
  dat += `Judul Jepang    : *${result.docs[0].title}*\n`
  dat += `Ejaan Judul     : *${result.docs[0].title_romaji}*\n`
  dat += `Ejaan Inggris   : *${result.docs[0].title_english}*\n`
  dat += `Episode         : *${result.docs[0].episode}*\n`
  dat += `Season          : *${result.docs[0].season}*\n`
  dat += autocommand
  resolve(dat);
})

const resizeImage = (buff, encode) => new Promise(async (resolve, reject) => {
  const {
    mime
  } = await fromBuffer(buffData)
  sharp(buff, {
    failOnError: false
  })
    .resize(512, 512)
    .toBuffer()
    .then(resizedImageBuffer => {
      if (!encode) return resolve(resizedImageBuffer)
      const resizedImageData = resizedImageBuffer.toString('base64')
      const resizedBase64 = `data:${mime};base64,${resizedImageData}`
      resolve(resizedBase64)
    })
    .catch(error => reject(error))
})

const uploadImages = (buffData, type) => {
  return new Promise(async (resolve, reject) => {
    const {
      ext
    } = await fromBuffer(buffData)
    const filePath = './media/tmp.' + ext
    const _buffData = type ? await resizeImage(buffData, false) : buffData
    fs.writeFile(filePath, _buffData, {
      encoding: 'base64'
    }, (err) => {
      if (err) return reject(err)
      const fileData = fs.readFileSync(filePath)
      const form = new FormData()
      form.append('file', fileData, 'tmp.' + ext)
      fetch('https://telegra.ph/upload', {
        method: 'POST',
        body: form
      })
        .then(res => res.json())
        .then(res => {
          if (res.error) return reject(res.error)
          resolve('https://telegra.ph' + res[0].src)
        })
        .then(() => fs.unlinkSync(filePath))
        .catch(err => reject(err))
    })
  })
}

async function getBase64(url) {
  return new Promise((resolve, reject) => {
    fetch(url, {
      headers: {
        'User-Agent': 'okhttp/4.5.0'
      }
    })
      .then((response) => response.buffer())
      .then((result) => {
        const videoBase64 = `data:${result.headers.get('content-type')};base64,` + result.toString('base64')
        if (result) resolve(videoBase64)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

async function GetImage(url, path) {
  const res = await fetch(url)
  const fileStream = createWriteStream(path)
  await new Promise((resolve, reject) => {
    res.body.pipe(fileStream)
    res.body.on('error', (err) => {
      reject(err)
    })
    fileStream.on('finish', function () {
      resolve()
    })
  })
};

async function fetchJson(url, options) {
  return new Promise(async (resolve, reject) => {
    await fetch(url, options)
      .then(response => response.json())
      .then(json => {
        resolve(json)
      })
      .catch((err) => {
        reject(err)
      })
  })
};

async function fetchText(url, options) {
  return new Promise(async (resolve, reject) => {
    await fetch(url, options)
      .then(response => response.text())
      .then(text => {
        resolve(text)
      })
      .catch((err) => {
        reject(err)
      })
  })
};

async function fetchMeme() {
  return new Promise((resolve, reject) => {
    const subreddit = ['dankmemes', 'wholesomeanimemes', 'wholesomememes', 'AdviceAnimals', 'MemeEconomy', 'memes', 'terriblefacebookmemes', 'teenagers', 'historymemes']
    const randSub = subreddit[Math.random() * subreddit.length | 0]
    fetch('https://meme-api.herokuapp.com/gimme/' + randSub)
      .then(response => response.json())
      .then((result) => {
        resolve(result)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

const fetchBase64 = (url, mimetype) => {
  return new Promise((resolve, reject) => {
    return fetch(url)
      .then((res) => {
        const _mimetype = mimetype || res.headers.get('content-type')
        res.buffer()
          .then((result) => resolve(`data:${_mimetype};base64,` + result.toString('base64')))
      })
      .catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

async function shortener(url) {
  return new Promise((resolve, reject) => {
    fetch(`https://tinyurl.com/api-create.php?url=${url}`)
      .then(response => response.text())
      .then(json => {
        resolve(json)
      })
      .catch((err) => {
        reject(err)
      })
  })
}

async function liriklagu(lagu) {
  const response = await fetch('http://scrap.terhambar.com/lirik?word=' + lagu)
  if (!response.ok) throw new Error(`unexpected response ${response.statusText}`);
  const json = await response.json()
  if (json.status) return `Lirik Lagu ${lagu}\n\n${json.result.lirik}`
}

async function removebg(base64img) {
  return new Promise(async (resolve, reject) => {
    await removeBackgroundFromImageBase64({
      base64img,
      apiKey: settings.nobg,
      size: 'preview',
      type: 'auto',
      format: 'jpg'
    })
      .then((result = RemoveBgResult) => resolve(`data:image/jpeg;base64,${result.base64img}`))
      .catch((err) => reject(JSON.stringify(err)))
  })
}

async function getZodiak(nama, tgl) {
  return new Promise(async (resolve, reject) => {
    axios
      .get(`https://script.google.com/macros/exec?service=AKfycbw7gKzP-WYV2F5mc9RaR7yE3Ve1yN91Tjs91hp_jHSE02dSv9w&nama=${nama}&tanggal=${tgl}`)
      .then((response) => {
        const {
          lahir,
          usia,
          ultah,
          zodiak
        } = response.data.data;
        let text = `*Nama*: ${nama}\n`;
        text += `*Lahir*: ${lahir}\n`;
        text += `*Usia*: ${usia}\n`;
        text += `*Ultah*: ${ultah}\n`;
        text += `*Zodiak*: ${zodiak}`;
        resolve(text);
      })
      .catch((error) => reject(error));
  })
}

async function cekResi(ekspedisi, resi) {
  return new Promise(async (resolve, reject) => {
    await fetchJson(`https://api.terhambar.com/resi?resi=${resi}&kurir=${ekspedisi}`)
      .then((result) => {
        if (result.status.code != 200 && result.status.description != 'OK') return resolve(result.status.description)
        const {
          result: {
            summary,
            details,
            delivery_status,
            manifest
          }
        } = result
        const manifestText = manifest.map(x => `┌ ⏰ ${x.manifest_date} ${x.manifest_time}\n├ ${x.city_name}\n└ ${x.manifest_description}`)
        let resultText = `┌ 📦 Data Ekspedisi\n`
        resultText += `├ ${summary.courier_name}\n`
        resultText += `├ Nomor: ${summary.waybill_number}\n`
        resultText += `└ Dikirim Pada: ${details.waybill_date} ${details.waybill_time}\n\n`
        resultText += `┌ 💁🏼‍♂️ Data Pengirim\n`
        resultText += `├ Nama: ${details.shippper_name}\n`
        resultText += `└ Alamat: ${details.shipper_address1} ${details.shipper_city}\n\n`
        resultText += `┌ 🎯 Data Penerima\n`
        resultText += `├ Nama: ${details.receiver_name}\n`
        resultText += `└ Alamat: ${details.receiver_address1} ${details.receiver_city}\n\n`
        resultText += `┌ 📮 Status Pengiriman\n`
        resultText += `├ ${delivery_status.status}\n`
        resultText += `├ ${delivery_status.pod_receiver}\n`
        resultText += `└ ${delivery_status.pod_date} ${delivery_status.pod_time}\n\n`
        resultText += `🚧 POD Detail\n`
        resultText += `${manifestText.join('\n')}`
        resolve(resultText)
      }).catch((err) => {
        console.error(err)
        reject(err)
      })
  })
}

const color = (text, color) => {
  switch (color) {
    case 'red':
      return '\x1b[31m' + text + '\x1b[0m'
    case 'yellow':
      return '\x1b[33m' + text + '\x1b[0m'
    default:
      return '\x1b[32m' + text + '\x1b[0m' // default is green
  }
}

const armpits = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animearmpits')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const feets = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animefeets')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const thighs = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animethighss')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const booty = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animebooty')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const boobs = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/biganimetiddies')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const necks = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animenecks')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const belly = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/animebellybutton')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const sideboobs = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/sideoppai')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const ahegao = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/ahegao')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const BDSM = () => new Promise((resolve, reject) => {
  fetchJson('https://meme-api.herokuapp.com/gimme/BDSM')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

const custom = async (imageUrl, top, bottom) => new Promise((resolve, reject) => {
  topText = top.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
  bottomText = bottom.trim().replace(/\s/g, '_').replace(/\?/g, '~q').replace(/\%/g, '~p').replace(/\#/g, '~h').replace(/\//g, '~s')
  fetchBase64(`https://api.memegen.link/images/custom/${topText}/${bottomText}.png?background=${imageUrl}`, 'image/png')
    .then((result) => resolve(result))
    .catch((err) => {
      console.error(err)
      reject(err)
    })
})

function formatTrue(target) {
  if (target == true) {
    return 'Ya'
  } else if (target == false) {
    return 'Tidak'
  }
}

function os_spawn() {
  this.execCommand = function (txt) {
    return new Promise((resolve, reject) => {
      spawn(txt, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout)
      });
    })
  }
}

function os_exec() {
  this.execCommand = function (cmd) {
    return new Promise((resolve, reject) => {
      exec(cmd, (error, stdout, stderr) => {
        if (error) {
          reject(error);
          return;
        }
        resolve(stdout)
      });
    })
  }
}

//---------------Util Function--------------------------//

const {
  Readable,
  Writable
} = require('stream')

String.prototype.format = function () {
  var a = this;
  for (var k in arguments) {
    a = a.replace(new RegExp("\\{" + k + "\\}", 'g'), arguments[k]);
  }
  return a
}

function waktu(seconds) {
  seconds = Number(seconds)
  var y = Math.floor(seconds % (60 * 60 * 24 * 30 * 12 * 256) / (60 * 60 * 24 * 30 * 12))
  var b = Math.floor(seconds % (60 * 60 * 24 * 30 * 12) / (60 * 60 * 24 * 30))
  var w = Math.floor(seconds % (60 * 60 * 24 * 7) / (60 * 60 * 24 * 7))
  var d = Math.floor(seconds % (60 * 60 * 24 * 30) / (60 * 60 * 24))
  var h = Math.floor(seconds % (60 * 60 * 24) / (60 * 60))
  var m = Math.floor(seconds % (60 * 60) / 60)
  var s = Math.floor(seconds % 60)
  var yDisplay = y > 0 ? y + (y == 1 ? " year, " : " years, ") : "";
  var bDisplay = b > 0 ? b + (b == 1 ? " month, " : " months, ") : "";
  var wDisplay = w > 0 ? w + (w == 1 ? " week, " : " weeks, ") : "";
  var dDisplay = d > 0 ? d + (d == 1 ? " day, " : " days, ") : "";
  var hDisplay = h > 0 ? h + (h == 1 ? " hour, " : " hours, ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " minute, " : " minutes, ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return yDisplay + bDisplay + wDisplay + dDisplay + hDisplay + mDisplay + sDisplay;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function shuffle(arr) {
  let i = arr.length - 1;
  for (; i > 0; i--) {
    const j = Math.floor(Math.random() * i)
    const temp = arr[i]
    arr[i] = arr[j]
    arr[j] = temp
  }
  return arr;
}

function noop() { }

function stream2Buffer(cb = noop) {
  return new Promise(resolve => {
    let write = new Writable()
    write.data = []
    write.write = function (chunk) {
      this.data.push(chunk)
    }
    write.on('finish', function () {
      resolve(Buffer.concat(this.data))
    })

    cb(write)
  })
}

function buffer2Stream(buffer) {
  const readable = new Readable()
  readable._read = () => { }
  readable.push(buffer)
  readable.push(null)
  return readable
}

function baseURI(buffer, metatype) {
  return `data:${metatype};base64,${buffer.toString('base64')}`
}

function firstUpperCase(text, split = ' ') {
  return text.split(split).map(word => `${word.charAt(0).toUpperCase()}${word.slice(1)}`).join(' ');
}

function formatNumber(number, minimumFractionDigits = 0) {
  return Number.parseFloat(number).toLocaleString(undefined, {
    minimumFractionDigits,
    maximumFractionDigits: 2
  });
}

function list(arr, conj = 'and') {
  const len = arr.length;
  if (len === 0) return '';
  if (len === 1) return arr[0];
  return `${arr.slice(0, -1).join(', ')}${len > 1 ? `${len > 2 ? ',' : ''} ${conj} ` : ''}${arr.slice(-1)}`;
}

function ulang(str, num) {
  return (new Array(num + 1)).join(str);
}

function randomChoice(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function arrayRemove(arr, value) {
  return arr.filter(function (ele) {
    return ele != value;
  });
}

function formatin(duit) {
  let reverse = duit.toString().split('').reverse().join('');
  let ribuan = reverse.match(/\d{1,3}/g);
  ribuan = ribuan.join('.').split('').reverse().join('');
  return ribuan;
}

function archimed(s, list) {
  let ln = list.length;
  let ls = [];
  let ind = [];
  let hasil = [];
  if (s.includes(",")) {
    let logics = s.split(",")
    for (let logic of logics) {
      if (logic.includes(">")) {
        let su = logic.replace(">", "");
        let si = parseInt(su);
        si -= 1;
        for (let i = (si + 1); i > si && i <= ln; i++) {
          ls.push(i)
        }
      } else if (logic.includes("<")) {
        let su = logic.replace("<", "");
        let si = parseInt(su);
        si -= 1;
        for (let i = 0; i <= si; i++) {
          ls.push(i)
        }
      } else if (logic.includes("-")) {
        let las = logic.split("-");
        let si = las[0];
        let siu = parseInt(si);
        siu -= 1;
        let sa = las[1];
        let sau = parseInt(sa);
        sau -= 1;
        for (let i = siu; i >= siu && i <= sau; i++) {
          ls.push(i)
        }
      } else {
        let sau = parseInt(logic);
        sau -= 1;
        ls.push(sau);
      }
    }
  } else {
    let logic = s;
    if (logic.includes(">")) {
      let su = logic.replace(">", "");
      let si = parseInt(su);
      si -= 1;
      for (let i = (si + 1); i > si && i <= ln; i++) {
        ls.push(i)
      }
    } else if (logic.includes("<")) {
      let su = logic.replace("<", "");
      let si = parseInt(su);
      si -= 1;
      for (let i = 0; i <= si; i++) {
        ls.push(i)
      }
    } else if (logic.includes("-")) {
      let las = logic.split("-");
      let si = las[0];
      let siu = parseInt(si);
      siu -= 1;
      let sa = las[1];
      let sau = parseInt(sa);
      sau -= 1;
      for (let i = siu; i >= siu && i <= sau; i++) {
        ls.push(i)
      }
    } else {
      let sau = parseInt(logic);
      sau -= 1;
      ls.push(sau);
    }
  }
  for (let dos of ls) {
    if (!ind.includes(dos) && dos < ln) {
      let jo = list[dos];
      ind.push(dos);
      hasil.push(jo);
    }
  }
  return hasil;
};

//----------------------------------------------------------------//

moment.tz.setDefault('Asia/Jakarta').locale('id')
moments.locale('id')
const errorurl = settings.errorurl
const warna = ['white', 'teal', 'aqua', 'black', 'silver', 'gray', 'yellow', 'olive', 'lime', 'green', 'fuchsia', 'purple']
const ctmp = [
  {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent',
    output: 'dataURL'
  }
]
const t2img = [
  {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px Arbutus',
    localFontPath: './fonts/Arbutus.ttf',
    localFontName: 'Arbutus',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px SpicyRice',
    localFontPath: './fonts/SpicyRice.otf',
    localFontName: 'SpicyRice',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }, {
    font: '400px Bangers',
    localFontPath: './fonts/Bangers.ttf',
    localFontName: 'Bangers',
    color: randomChoice(warna), //'white',
    strokeWidth: 10, //14, //14 if color white
    strokeColor: 'black', //'black',
    textAlign: 'center',
    lineSpacing: 30,
    padding: 300,
    backgroundColor: 'transparent'
  }
]

async function textMatch(client, opp, lt, serial) {
  const ops = opp;
  let ohmatch = [];
  for (let x of lt) {
    let mt = new Map();
    helpmaster.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    helpowner.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    helpvip.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    helppremium.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    helpmedia.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    helpmanage.forEach((y, key) => {
      let s = new difflib.SequenceMatcher(null, x, y)
      let r = s.ratio();
      if (r > 0.7) {
        mt.set(y, r)
      }
    })
    if (mt.size > 1) {
      const srt = new Map([...mt.entries()].sort((a, b) => b[1] - a[1]));
      for (let o of srt.keys()) {
        ohmatch.push(o);
        break;
      }
    } else if (mt.size === 1) {
      for (let o of mt.keys()) {
        ohmatch.push(o)
      }
    }
  }
  if (ohmatch.length != 0) {
    let ttx = "{0} ".format(settings.rname);
    let ts = "mungkinkah yang kamu maksud adalah ";
    let om = ohmatch.length;
    if (om === 1) {
      ts += ohmatch[0];
      ttx += ohmatch[0];
    } else {
      for (let i of ohmatch) {
        ts += "{0}, ".format(i);
        ttx += i;
      }
    }
    ts += "?";
    ops.body = ttx
    if (settings.autocorrect == 2) {
      await fnbots(client, ops, true)
    } else {
      client.sendMessage(serial, ts, MessageType.text)
    }
  }
};

function upComs(word, val) {
  if (coms.hasOwnProperty(word)) {
    coms[word]["coms"] = val;
    dumpComs();
  }
};

function cekComs(word) {
  if (coms.hasOwnProperty(word)) {
    return true;
  }
  return false;
};

async function getTxt(txt) {
  if (txt.startsWith(settings.rname)) {
    txt = txt.replace(settings.rname, "")
  } else if (txt.startsWith(settings.sname)) {
    txt = txt.replace(settings.sname, "")
  }
  if (txt.includes(".silent")) {
    txt = txt.replace(".silent", "")
    silent = true;
  }
  if (txt.includes(".repeat")) {
    txt = txt.replace(".repeat", "")
    repeat = true;
  }
  if (txt.includes(".default")) {
    txt = txt.replace(".default", "")
    origin = true;
  }
  txt = txt.trim();
  return txt;
};

function getComs(txt, word) {
  if (!coms.hasOwnProperty(word)) {
    coms[word] = {
      "coms": word,
      "pkg": "",
      "id": ""
    };
    dumpComs();
  }
  if (ctype == "master") {
    helpmaster.set(word, coms[word]["coms"])
  } else if (ctype == "owner") {
    helpowner.set(word, coms[word]["coms"])
  } else if (ctype == "vip") {
    helpvip.set(word, coms[word]["coms"])
  } else if (ctype == "premium") {
    helppremium.set(word, coms[word]["coms"])
  } else if (ctype == "manage") {
    helpmanage.set(word, coms[word]["coms"])
  } else if (ctype == "media") {
    helpmedia.set(word, coms[word]["coms"])
  }
  if (origin) {
    if (txt == word) {
      suggestWord = arrayRemove(suggestWord, txt);
      return true
    }
  }
  if (txt == coms[word]["coms"]) {
    suggestWord = arrayRemove(suggestWord, txt);
    return true
  }
  return false;
}

function getPrefix(txt, word) {
  if (!coms.hasOwnProperty(word)) {
    coms[word] = {
      "coms": word,
      "pkg": "",
      "id": ""
    };
    dumpComs();
  }
  if (origin) {
    if (txt.startsWith(word)) {
      suggestWord = arrayRemove(suggestWord, txt);
      return true
    }
  }
  if (ctype == "master") {
    helpmaster.set(word, coms[word]["coms"])
  } else if (ctype == "owner") {
    helpowner.set(word, coms[word]["coms"])
  } else if (ctype == "vip") {
    helpvip.set(word, coms[word]["coms"])
  } else if (ctype == "premium") {
    helppremium.set(word, coms[word]["coms"])
  } else if (ctype == "manage") {
    helpmanage.set(word, coms[word]["coms"])
  } else if (ctype == "media") {
    helpmedia.set(word, coms[word]["coms"])
  }
  if (txt.startsWith(coms[word]["coms"])) {
    suggestWord = arrayRemove(suggestWord, txt);
    return true
  }
  return false;
}

function mycmd(word) {
  let words = [];
  let tw = [];
  if (word.includes(",")) {
    tw = word.split(",");
  } else if (word.includes("&")) {
    tw = word.split("&");
  } else if (word.includes(";")) {
    tw = word.split(";");
  } else {
    words.push(word)
  }
  for (let c of tw) {
    let yc = c.trim()
    words.push(yc);
  }
  return words;
};

const isWhiteList = (serial) => {
  if (x8.muted.includes(serial)) return false
  if (whitelist.includes(serial)) {
    return true
  } else {
    return false
  }
}

const isMuted = (serial) => {
  if (x8.muted.includes(serial)) {
    return false
  } else {
    return true
  }
}

function banChat() {
  if (banChats == true) {
    return false
  } else {
    return true
  }
}

if (typeof Array.prototype.splice === 'undefined') {
  Array.prototype.splice = function (index, howmany, elemes) {
    howmany = typeof howmany === 'undefined' || this.length;
    var elems = Array.prototype.slice.call(arguments, 2),
      newArr = this.slice(0, index),
      last = this.slice(index + howmany);
    newArr = newArr.concat.apply(newArr, elems);
    newArr = newArr.concat.apply(newArr, last);
    return newArr;
  }
}

//---------------------level-----------------------//

const getDescRank = () => sort(levels, [{
  attr: 'xp',
  asc: false
}])
const getScore = () => sort(levels, [{
  attr: 'balance',
  asc: false
}])
const rawLevel = (id) => {
  return {
    id: id,
    balance: 0,
    xp: 0,
    level: 1
  }
}
const hasLevel = (id) => {
  const i = levels.findIndex(x => x.id == id)
  if (i !== -1) {
    return i
  } else {
    const formated = rawLevel(id)
    levels.push(formated)
    return levels.length - 1
  }
}
const addXp = (id) => {
  let i = hasLevel(id)
  switch (levels[i].level) {
    case 1:
      levels[i].xp += 5
      if (levels[i].xp > 1250) {
        levels[i].level = 2
        return `Congratulations you are now level *2*\n\nNew Role: *Intermediate*`
      }
      break;
    case 2:
      levels[i].xp += 4
      if (levels[i].xp > 3800) {
        levels[i].level = 3
        return `Congratulations you are now level *3*\n\nNew Role: *Public*`
      }
      break;
    case 3:
      levels[i].xp += 3
      if (levels[i].xp > 5400) {
        levels[i].level = 4
        return `Congratulations you are now level *4*\n\nNew Role: *Pro*`
      }
      break;
    case 4:
      levels[i].xp += 2
      if (levels[i].xp > 7600) {
        levels[i].level = 5
        return `Congratulations you are now level *5*\n\nNew Role: *Expert*`
      }
      break;
    case 5:
      levels[i].xp += 1
      if (levels[i].xp > 9300) {
        levels[i].level = 6
        return `Congratulations you are now level *6*\n\nNew Role: *Master*`
      }
      break;
    case 6:
      levels[i].xp += 1
      if (levels[i].xp > 12000) {
        levels[i].level = 7
        return `Congratulations you are now level *7*\n\nNew Role: *Grandmaster*`
      }
      break;
    case 7:
      levels[i].xp += 1
      if (levels[i].xp > 18000) {
        levels[i].level = 8
        return `Congratulations you are now level *8*\n\nNew Role: *Epic*`
      }
      break;
    case 8:
      levels[i].xp += 1
      if (levels[i].xp > 24000) {
        levels[i].level = 9
        return `Congratulations you are now level *9*\n\nNew Role: *Legend*`
      }
      break;
    case 9:
      levels[i].xp += 1
      if (levels[i].xp > 30000) {
        levels[i].level = 10
        return `Congratulations you level are *max*\n\nNew Role: *Mythic*`
      }
      break;
    default:
      return
      break;
  }
}
const addBal = (id, peler) => {
  let i = hasLevel(id)
  levels[i].balance += parseInt(peler)
}
const minBal = (id, peler) => {
  let i = hasLevel(id)
  levels[i].balance -= parseInt(peler)
}
const getMaxXp = (level) => {
  switch (parseInt(level)) {
    case 1:
      return 1250
      break;
    case 2:
      return 3800
      break;
    case 3:
      return 5400
      break;
    case 4:
      return 7600
      break;
    case 5:
      return 9300
      break;
    case 6:
      return 12000
      break;
    case 7:
      return 18000
      break;
    case 8:
      return 24000
      break;
    case 9:
      return 30000
      break;
    default:
      return 50000
      break;
  }
}
const score = () => {
  const sorted = getScore()
  if (sorted.length < 25) {
    let ranks = '┌──┤ *TOP ' + BotName + ' LEADERBOARD*\n',
      counter = 1;
    for (let i of sorted) {
      ranks += `├ *${counter++}.* @${i.id.replace('@s.whatsapp.net', '')}\n├    *Balance: $` + formatin(i.balance) + `*\n`
    }
    return ranks += '└──┤ Total Player: ' + `${sorted.length + 43253}`
  } else {
    let ranks = '┌──┤ *TOP ' + BotName + ' LEADERBOARD*\n',
      counter = 1;
    for (let i = 0; i < 25; i++) {
      ranks += `├ *${counter++}.* @${sorted[i].id.replace('@s.whatsapp.net', '')}\n├    *Balance: $` + formatin(sorted[i].balance) + `*\n`
    }
    return ranks += '└──┤ Total Player: ' + `${sorted.length + 43253}`
  }
}
const rank = () => {
  const sorted = getDescRank()
  if (sorted.length < 30) {
    let ranks = '┌──┤ *TOP ' + BotName + ' LEADERBOARD*\n',
      counter = 1;
    for (let i of sorted) {
      ranks += `├ *${counter++}.* @${i.id.replace('@s.whatsapp.net', '')}\n├    *XP: ${i.xp}/${getMaxXp(i.level)}*\n`
    }
    return ranks += '└──┤ Total Player: ' + `${sorted.length + 43253}`
  } else {
    let ranks = '┌──┤ *TOP ' + BotName + ' LEADERBOARD*\n',
      counter = 1;
    for (let i = 0; i < 30; i++) {
      ranks += `├ *${counter++}.* @${sorted[i].id.replace('@s.whatsapp.net', '')}\n├    *XP: ${sorted[i].xp}/${getMaxXp(sorted[i].level)}*\n`
    }
    return ranks += '└──┤ Total Player: ' + `${sorted.length + 43253}`
  }
}
const getLevelName = (level) => {
  switch (parseInt(level)) {
    case 1:
      return 'Beginner'
      break;
    case 2:
      return 'Intermediate'
      break;
    case 3:
      return 'Public'
      break;
    case 4:
      return 'Pro'
      break;
    case 5:
      return 'Expert'
      break;
    case 6:
      return 'Master'
      break;
    case 7:
      return 'Grandmaster'
      break;
    case 8:
      return 'Epic'
      break;
    case 9:
      return 'Legend'
      break;
    default:
      return 'Mythic'
      break;
  }
}
const getMyRank = (id) => {
  const sorted = getDescRank()
  let anjay = sorted.findIndex(x => x.id == id)
  return anjay + 1
}
const getLevelFormat = (id) => {
  let i = hasLevel(id)
  return {
    xp: `${levels[i].xp}/${getMaxXp(levels[i].level)}`,
    role: getLevelName(levels[i].level),
    balance: `${levels[i].balance}`
  }
}
const getMyLevel = (id, username, buffer) => new Promise((resolve, reject) => {
  let i = hasLevel(id)
  const ajg = levels[i]
  const rank = new canvacord.Rank()
    .setAvatar(buffer)
    .setCurrentXP(ajg.xp)
    .setRequiredXP(getMaxXp(ajg.level))
    .setLevel(ajg.level)
    .setRank(parseInt(getMyRank(ajg.id)), getLevelName(ajg.level), true)
    .setStatus('online')
    .setProgressBar("#a254e3", "COLOR")
    .setUsername(username)
    .setDiscriminator('0000')
  rank.build().then(res => {
    return resolve({
      xp: `${ajg.xp}/${getMaxXp(ajg.level)}`,
      role: getLevelName(ajg.level),
      balance: `${ajg.balance}`,
      buffer: res
    })
  })
})
const trigger = (buffer) => new Promise((resolve) => {
  const asu = new canvacord.Canvas().trigger(buffer)
  asu.then(res => {
    return resolve(res)
  })
})

let gamematematika = {}
let gametebakan = {}
let modes = {
  noob: [-3, 3, -3, 3, '+-', 10000, 10],
  easy: [-10, 10, -10, 10, '+-', 10000, 50],
  medium: [-40, 40, -40, 40, '*/+-', 10000, 100],
  hard: [-100, 100, -100, 100, '*/*/', 8000, 500],
  extreme: [-999999, 999999, -999999, 999999, '*/', 5000, 10000]
}
let operators = {
  '+': '+',
  '-': '-',
  '*': '×',
  '/': '÷'
}
function genMath(mode) {
  let [a1, a2, b1, b2, ops, time, bonus] = modes[mode]
  let a = randomInt(a1, a2)
  let b = randomInt(b1, b2)
  let op = pickRandom([...ops])
  let result = (new Function(`return ${a} ${op.replace('/', '*')} ${b < 0 ? `(${b})` : b}`))()
  if (op == '/') [a, result] = [result, a]
  return {
    str: `${a} ${operators[op]} ${b}`,
    mode,
    time,
    bonus,
    result
  }
}
function randomInt(from, to) {
  if (from > to) [from, to] = [to, from]
  from = Math.floor(from)
  to = Math.floor(to)
  return Math.floor((to - from) * Math.random() + from)
}
function pickRandom(list) {
  return list[Math.floor(Math.random() * list.length)]
}

//--------------premium-------------//

const addPremiumUser = (userId, expired, _dir) => {
  const obj = {
    id: userId,
    expired: Date.now() + toMs(expired)
  }
  _dir.push(obj)
  fs.writeJSONSync('db/' + pukimaki + '.premium.json', _dir, {
    spaces: 2
  })
}
const getPremiumPosition = (userId, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i
    }
  })
  if (position !== null) {
    return position
  }
}
const getPremiumExpired = (userId, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i
    }
  })
  if (position !== null) {
    return _dir[position].expired
  }
}
const checkPremiumUser = (userId, _dir) => {
  let status = false
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      status = true
    }
  })
  return status
}
const expiredCheck = (_dir) => {
  setInterval(() => {
    let position = null
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i
      }
    })
    if (position !== null) {
      console.log(`Premium expired: ${_dir[position].id}`)
      _dir.splice(position, 1)
      fs.writeJSONSync('db/' + pukimaki + '.premium.json', _dir, {
        spaces: 2
      })
    }
  }, 1000)
}

//----------------vip-----------------//

const addUserVIP = (userId, expired, _dir) => {
  const obj = {
    id: userId,
    expired: Date.now() + toMs(expired)
  }
  _dir.push(obj)
  fs.writeJSONSync('db/' + pukimaki + '.vip.json', _dir, {
    spaces: 2
  })
}
const getVIPposition = (userId, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i
    }
  })
  if (position !== null) {
    return position
  }
}
const getVIPexpired = (userId, _dir) => {
  let position = null
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      position = i
    }
  })
  if (position !== null) {
    return _dir[position].expired
  }
}
const checkUserVIP = (userId, _dir) => {
  let status = false
  Object.keys(_dir).forEach((i) => {
    if (_dir[i].id === userId) {
      status = true
    }
  })
  return status
}
const expiredVIPcheck = (_dir) => {
  setInterval(() => {
    let position = null
    Object.keys(_dir).forEach((i) => {
      if (Date.now() >= _dir[i].expired) {
        position = i
      }
    })
    if (position !== null) {
      _dir.splice(position, 1)
      fs.writeJSONSync('db/' + pukimaki + '.vip.json', _dir, {
        spaces: 2
      })
    }
  }, 1000)
}

//----------------afk-----------------//

const addAfkUser = (toId, userId, time, reason, xg) => {
  const obj = {
    mid: toId,
    id: userId,
    time: time,
    reason: reason
  }
  xg.push(obj)
  fs.writeJSONSync('db/' + pukimaki + '.afk.json', xg, {
    spaces: 2
  })
}
const checkAfkUser = (toId, userId, xg) => {
  let status = false
  Object.keys(xg).forEach((i) => {
    if ((xg[i].id === userId) && (xg[i].mid === toId)) {
      status = true
    }
  })
  return status
}
const getAfkReason = (toId, userId, xg) => {
  let position = null
  Object.keys(xg).forEach((i) => {
    if ((xg[i].id === userId) && (xg[i].mid === toId)) {
      position = i
    }
  })
  if (position !== null) {
    return xg[position].reason
  }
}
const getAfkTime = (toId, userId, xg) => {
  let position = null
  Object.keys(xg).forEach((i) => {
    if ((xg[i].id === userId) && (xg[i].mid === toId)) {
      position = i
    }
  })
  if (position !== null) {
    return xg[position].time
  }
}
const getAfkId = (toId, userId, xg) => {
  let position = null
  Object.keys(xg).forEach((i) => {
    if ((xg[i].id === userId) && (xg[i].mid === toId)) {
      position = i
    }
  })
  if (position !== null) {
    return xg[position].id
  }
}
const getAfkPosition = (toId, userId, xg) => {
  let position = null
  Object.keys(xg).forEach((i) => {
    if ((xg[i].id === userId) && (xg[i].mid === toId)) {
      position = i
    }
  })
  return position
}
const convertSticker = function (shape, author, pack, mediaData, type) {
  return new Promise((resolve, reject) => {
    var upfile = "sticker." + type;
    var metadata = {
      "pack": pack,
      "author": author,
      "shape": shape,
      "api_key": "JDJiJDEwJGdmVUtWUHk4eldkYlBhcUJZLklRMHV2eHVUc2Z1M1hrOVZSN1N6eWZFeEN0aWloOUpNT2RX",
    };
    var url = "https://stickerman.org/api/convert";
    var boundary = "sticker";
    let data = "";
    for (var i in metadata) {
      if ({}.hasOwnProperty.call(metadata, i)) {
        data += "--" + boundary + "\r\n";
        data += "Content-Disposition: form-data; name=" + i + "; \r\n\r\n" + metadata[i] + "\r\n";
      }
    };
    data += "--" + boundary + "\r\n";
    data += "Content-Disposition: form-data; name=sticker; filename=" + upfile + "\r\n";
    data += "Content-Type:application/octet-stream\r\n\r\n";
    var payload = Buffer.concat([
      Buffer.from(data, "utf8"),
      new Buffer(mediaData, 'binary'),
      Buffer.from("\r\n--" + boundary + "--\r\n", "utf8"),
    ]);
    var options = {
      method: 'post',
      url: url,
      headers: {
        "Content-Type": "multipart/form-data; boundary=" + boundary
      },
      body: payload,
      encoding: null
    };
    request(options, function (error, response, body) {
      if (error) {
        reject(error)
      } else {
        resolve(body)
      }
    });
  });
}

const stickerPackID = "com.snowcorp.stickerly.android.stickercontentprovider b5e7275f-f1de-4137-961f-57becfad34f2";
const googleLink = "https://play.google.com/store/apps/details?id=com.marsconstd.stickermakerforwhatsapp";
const appleLink = "https://itunes.apple.com/app/sticker-maker-studio/id1443326857";

async function createExif(packname, author) {
  const json = {
    "sticker-pack-id": stickerPackID,
    "sticker-pack-name": packname,
    "sticker-pack-publisher": author,
    "android-app-store-link": googleLink,
    "ios-app-store-link": appleLink
  };

  let length = JSON.stringify(json).length;
  const f = Buffer.from([0x49, 0x49, 0x2A, 0x00, 0x08, 0x00, 0x00, 0x00, 0x01, 0x00, 0x41, 0x57, 0x07, 0x00]);
  const code = [
    0x00,
    0x00,
    0x16,
    0x00,
    0x00,
    0x00
  ];
  if (length > 256) {
    length = length - 256;
    code.unshift(0x01);
  } else {
    code.unshift(0x00);
  }
  const fff = Buffer.from(code);
  const ffff = Buffer.from(JSON.stringify(json));

  if (length < 16) {
    length = length.toString(16);
    length = "0" + length;
  } else {
    length = length.toString(16);
  }

  const ff = Buffer.from(length, "hex");
  const buffer = Buffer.concat([f, ff, fff, ffff]);
  await fs.writeFileSync('./image/p.exif', buffer, function (err) {
    if (err) return console.error(err);
  });
}

function modifExif(buffer, id, callback) {
  fs.writeFileSync('./image/' + id + '.webp', buffer)
  spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
    .on('exit', () => {
      callback(fs.readFileSync('./image/' + id + '.webp'))
      fs.unlink('./image/' + id + '.webp').then(() => { })
    })
}

function bufferToStream(buffer) {
  const readable = new Readable()
  readable._read = () => { }
  readable.push(buffer)
  readable.push(null)
  return readable
}

const modifWebp = (id, buffers) => new Promise((resolve) => {
  const stream = bufferToStream(buffers)
  ffmpeg(stream)
    .inputFormat('mp4')
    .addOutputOptions("-vcodec", "libwebp", "-vf", "scale='min(150,iw)':min'(150,ih)':force_original_aspect_ratio=decrease, format=rgba, fps=10, pad=150:150:-1:-1:color=#00000000", '-lossless', '1', "-loop", "1", "-preset", "default", "-an", "-vsync", "0", "-s", "150:150")
    .save(`./image/${id}.webp`)
    .on('end', () => {
      stream.destroy()
      spawn('webpmux', ['-set', 'exif', './image/p.exif', './image/' + id + '.webp', '-o', './image/' + id + '.webp'])
        .on('exit', () => {
          let mediaData = (fs.readFileSync('./image/' + id + '.webp'))
          fs.unlink('./image/' + id + '.webp').then(() => { })
          return resolve(mediaData)
        })
    })
})

const store = makeInMemoryStore({
  logger: pino().child({
    level: 'silent',
    stream: 'store'
  })
})

let phoneNumber = "6281286118629"

const pairingCode = !!phoneNumber || process.argv.includes("--pairing-code")
const useMobile = process.argv.includes("--mobile")

const rl = readline.createInterface({ input: process.stdin, output: process.stdout })
const question = (text) => new Promise((resolve) => rl.question(text, resolve))

//-----------------------core--------------------//
async function starts() {
  let { version, isLatest } = await fetchLatestBaileysVersion()
  const { state, saveCreds } = await useMultiFileAuthState(`./session`)
  const msgRetryCounterCache = new NodeCache() // for retry message, "waiting message"

  const client = makeWASocket({
    printQRInTerminal: !pairingCode,
    logger: pino({
      level: 'silent' 
    }),
    auth: {
      creds: state.creds,
      keys: makeCacheableSignalKeyStore(state.keys, Pino({ level: "fatal" }).child({ level: "fatal" })),
    },
    getMessage: async (key) => {
      let jid = jidNormalizedUser(key.remoteJid)
      let msg = await store.loadMessage(jid, key.id)

      return msg?.message || ""
    },
    markOnlineOnConnect: true,
    generateHighQualityLinkPreview: true,
    version: [2, 3000, 1019430034],
    browser: ['Ubuntu', 'Firefox', '20.0.00'],
    msgRetryCounterCache,
    syncFullHistory: true,
    retryRequestDelayMs: 10,
    transactionOpts: {
        maxCommitRetries: 10,
        delayBetweenTriesMs: 10
    },
    maxMsgRetryCount: 15,
    appStateMacVerification: {
        patch: true,
        snapshot: true
    }
  })

  store.bind(client.ev)

  if (pairingCode && !client.authState.creds.registered) {
    setTimeout(async () => {
      let code = await client.requestPairingCode(phoneNumber)
      code = code?.match(/.{1,4}/g)?.join("-") || code
      console.log(chalk.black(chalk.bgGreen(`Your Pairing Code : `)), chalk.black(chalk.white(code)))
    }, 3000)
  }

  client.ev.on('creds.update', saveCreds)

  client.ev.on("connection.update", async (s) => {
    const { connection, lastDisconnect } = s
    if (connection == "open") {
      setInterval(() => {
        fs.readdir(path, (err, files) => {
          if (err) return console.error("❌ Error membaca folder session:", err);

          let deletedFiles = [];

          files.forEach(file => {
            if (file !== "creds.json") {
              fs.unlink(`${path}/${file}`, (err) => {
                if (!err) deletedFiles.push(file);
              });
            }
          });

          setTimeout(() => {
            if (deletedFiles.length > 0) {
              console.log(`🗑️ Menghapus ${deletedFiles.length} file session`);
            }
          }, 1000);
        });
      }, 5 * 60 * 1000);
      console.log(chalk.yellow(`🌿Connected to => ` + JSON.stringify(client.user, null, 2)))
      await delay(1999)
      console.log('---------------------------------------------------------------------------')
      console.log(color(figlet.textSync('FN BOTS WA', {
        horizontalLayout: 'full',
        verticalLayout: 'full'
      })))
      console.log('---------------------------------------------------------------------------')
    }
    if (
      connection === "close" &&
      lastDisconnect &&
      lastDisconnect.error &&
      lastDisconnect.error.output.statusCode != 401
    ) {
      starts()
    }
  })

  client.ev.on('messages.upsert', async ({ type, messages }) => {
    try {
      if (type !== "notify") return
      for (let m of messages) {
        if (!m.message) continue
        m.message = m.message?.ephemeralMessage?.message || m.message
        if (store.groupMetadata && !Object.keys(store.groupMetadata).length) {
          store.groupMetadata = await client.groupFetchAllParticipating()
        }
        await fnbots(client, m, false)
      }
    } catch (error) {
      console.log(error.message)
    }
  });

  cron.schedule("* * * * * *", async function () {
    fs.writeJSONSync('./db/' + pukimaki + '.levels.json', levels)
  })

  cron.schedule("0 0 21 * * *", function () {
    let meki = []
    for (let i of xc) {
      let asu = {
        id: i.id,
        limit: '∞'
      }
      meki.push(asu)
    }
    x4.limit = meki
    xi.limitgame = meki
    dumpLimitGame()
    dumpLimit()
  })

  client.decodeJid = (jid) => {
    if (!jid) return jid
    if (/:\d+@/gi.test(jid)) {
      let decode = jidDecode(jid) || {}
      return decode.user && decode.server && decode.user + '@' + decode.server || jid
    } else return jid
  }

  client.ev.on('contacts.update', update => {
    for (let contact of update) {
      let id = client.decodeJid(contact.id)
      if (store && store.contacts) store.contacts[id] = {
        id,
        name: contact.notify
      }
    }
  })

  client.getName = (jid, withoutContact = false) => {
    id = client.decodeJid(jid)
    withoutContact = client.withoutContact || withoutContact
    let v
    if (id.endsWith("@g.us")) return new Promise(async (resolve) => {
      v = store.contacts[id] || {}
      if (!(v.name || v.subject)) v = client.groupMetadata(id) || {}
      resolve(v.name || v.subject || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international'))
    })
    else v = id === '0@s.whatsapp.net' ? {
      id,
      name: 'WhatsApp'
    } : id === client.decodeJid(client.user.id) ?
      client.user :
      (store.contacts[id] || {})
    return (withoutContact ? '' : v.name) || v.subject || v.verifiedName || PhoneNumber('+' + jid.replace('@s.whatsapp.net', '')).getNumber('international')
  }

  client.sendText = (jid, text, quoted = '', options) => client.sendMessage(jid, {
    text: text,
    ...options
  }, {
    quoted,
    ...options
  })

  client.sendReply = async (jid, text, quoted = null) => client.sendMessage(jid, { 
    text: text 
  }, { 
    quoted: quoted 
  });

  client.sendTextWithMentions = async (jid, text, quoted, options = {}) => client.sendMessage(jid, {
    text: text,
    mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'),
    ...options
  }, {
    quoted
  })

  client.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifImg(buff, options)
    } else {
      buffer = await imageToWebp(buff)
    }

    await client.sendMessage(jid, {
      sticker: {
        url: buffer
      },
      ...options
    }, {
      quoted
    })
    return buffer
  }

  client.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
    let buff = Buffer.isBuffer(path) ? path : /^data:.*?\/.*?;base64,/i.test(path) ? Buffer.from(path.split`,`[1], 'base64') : /^https?:\/\//.test(path) ? await (await getBuffer(path)) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0)
    let buffer
    if (options && (options.packname || options.author)) {
      buffer = await writeExifVid(buff, options)
    } else {
      buffer = await videoToWebp(buff)
    }

    await client.sendMessage(jid, {
      sticker: {
        url: buffer
      },
      ...options
    }, {
      quoted
    })
    return buffer
  }

  client.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
    let quoted = message.msg ? message.msg : message
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(quoted, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }
    let type = await FileType.fromBuffer(buffer)
    trueFileName = attachExtension ? (filename + '.' + type.ext) : filename
    // save to file
    await fs.writeFileSync(trueFileName, buffer)
    return trueFileName
  }

  client.downloadMediaMessage = async (message) => {
    let mime = (message.msg || message).mimetype || ''
    let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0]
    const stream = await downloadContentFromMessage(message, messageType)
    let buffer = Buffer.from([])
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk])
    }

    return buffer
  }

  client.sendImageMessage = async (jid, text, imagePath, quoted = null) => {
    try {
      await client.sendMessage(jid, {
        image: { stream: fs.createReadStream(imagePath) },
        caption: text,
      }, { quoted: quoted });

    } catch (error) {
      console.error("❌ Error saat mengirim gambar:", error);
    }
};

  client.sendContact = async (jid, text, nomor, quoted = null) => {
    var vcard = 'BEGIN:VCARD\n' + 'VERSION:3.0\n' + 'FN:' + text + '\n' + 'ORG:' + text + ';\n' + 'TEL;type=CELL;type=VOICE;waid=' + nomor + ':+' + nomor + '\n' + 'END:VCARD'
    client.sendMessage(jid, {
      contacts: {
        displayName: text,
        contacts: [{
          vcard
        }]
      }
    }, {
      quoted: quoted
    })
  }

}
//-----------------------util--------------------//
async function fnbots(client, m, asu) {
  silent = false;
  origin = false;
  if (asu) {
    suggested = true
  } else {
    suggested = false
  }
  try {
    const messageContent = JSON.stringify(m, undefined, 2)
    // console.log(messageContent)
    const {
      key,
      messageTimestamp,
      broadcast,
      pushName,
      message
    } = messageContent
    if (debugs) {
      if (m.key.remoteJid === settings.admin) {
        console.log(m)
      }
    }
    if (m.key && m.key.remoteJid == 'status@broadcast') return
    /*
    if (m.key.fromMe) return
    */
    const toId = m.key.remoteJid
    const type = getContentType(m.message);
    const body = m.message.conversation || m.message.imageMessage?.caption || m.message.videoMessage?.caption || m.message.extendedTextMessage?.text || m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.message.templateButtonReplyMessage?.selectedId || (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply?.selectedRowId || m.text) || "";
    let txt = body.toLowerCase()
    const getGroupAdmins = (participants) => {
      admins = []
      for (let i of participants) {
        i.isAdmin ? admins.push(i.jid) : ''
      }
      return admins
    }
    const args = body.slice(settings.rname.length).trim().split(/ +/).slice(1) || body.slice(settings.sname.length).trim().split(/ +/).slice(1)
    const arg = body.trim().substring(body.indexOf(' ') + 1)
    const argh = body.trim().split(' ')
    const argsa = body.trim().split(/ +/).slice(1)
    const q = argsa.join(' ')
    const ar = argsa.map((v) => v.toLowerCase())
    const processTime = now => moments.duration(now - moment(messageTimestamp * 1000)).asSeconds()
    const time = moment().format('LTS')
    const timen = moment(messageTimestamp * 1000).format('DD/MM/YY HH:mm:ss')
    const jam = moment.tz('Asia/Jakarta').format('HH:mm:ss')
    const botNumber = "6281286118629@s.whatsapp.net"
    const isGroup = toId.endsWith('@g.us')
    const sender = isGroup ? m.key.participant : m.key.remoteJid
    const groupMetadata = isGroup ? await client.groupMetadata(toId) : ''
    const groupName = isGroup ? groupMetadata.subject : ''
    const groupId = isGroup ? groupMetadata.jid : ''
    const groupMembers = isGroup ? groupMetadata.participants : ''
    const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
    const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
    const isGroupAdmins = groupAdmins.includes(sender) || false
    const isMedia = (type === 'imageMessage' || type === 'videoMessage')
    const isQuotedMsg = type === 'extendedTextMessage' && messageContent.includes('quotedMessage')
    const isQuotedExtendedMessage = type === 'extendedTextMessage' && messageContent.includes('extendedTextMessage')
    const isQuotedMessage = type === 'extendedTextMessage' && messageContent.includes('conversation')
    const isQuotedImage = type === 'extendedTextMessage' && messageContent.includes('imageMessage')
    const isQuotedAudio = type === 'extendedTextMessage' && messageContent.includes('audioMessage')
    const isQuotedVideo = type === 'extendedTextMessage' && messageContent.includes('videoMessage')
    const isQuotedSticker = type === 'extendedTextMessage' && messageContent.includes('stickerMessage')
    const isMediaImage = (type === 'imageMessage')
    const isMediaVideo = (type === 'videoMessage')
    const finebotline = "created by: fnbots"
    const finebotwhatsapp = "instagram.com/wa.bot"
    let serial = ""
    if (isGroup) {
      serial = m.key.participant
    } else {
      serial = m.key.remoteJid
    }
    const mtcState = settings.mtc
    const isBanned = x8.mutelist.includes(sender)
    const isSadmin = settings.sAdmin.includes(sender)
    const master = InitUser.master.includes(sender)
    const isBot = settings.premium.includes(sender)
    const vip = checkUserVIP(sender, xc)
    const premium = checkPremiumUser(sender, xa)
    const isAfkOn = checkAfkUser(toId, sender, xg)
    const randomNomor = ['6281111111111@s.whatsapp.net', '0@s.whatsapp.net', '6281112000147@s.whatsapp.net', '628551000185@s.whatsapp.net', '6281578150000@s.whatsapp.net']

    const sendReplyWithMentions = (toId, teks, mid, m) => {
      const tag = {
        text: teks,
        contextInfo: {
          mentionedJid: mid,
          participant: randomChoice(randomNomor),
          quotedMessage: {
            conversation: 'Nama: FnBOTS\nInstagram: instagram.com/wa.bot\nGithub: github.com/Terror-Machine'
          }
        }
      }
      client.sendMessage(toId, tag, text)
    }

    await expiredVIPcheck(xc)
    await expiredCheck(xa)

    const isUrl = (url) => {
      return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
    }
    const isCmd = body.startsWith(settings.rname) || body.startsWith(settings.sname)
    const msgs = (x) => {
      if (!x) return
      if (x.length >= 10) {
        return `${x.substr(0, 40)}`
      } else {
        return `${x}`
      }
    }

    function addCooldown(serial) {
      mediaCooldown.push(serial)
      setTimeout(() => {
        let i = mediaCooldown.indexOf(serial)
        mediaCooldown.splice(i, 1)
      }, 2000)
    }

    function isLimitGame(serial) {
      if (isSadmin) {
        return false;
      } else if (master) {
        let found = false;
        for (let i of xi.limitgame) {
          if (i.id === serial) {
            let limits = i.limit;
            if (limits <= 0) {
              found = true;
              client.sendReply(serial, 'silakan bermain game besok lagi', m)
              return true;
            } else {
              xi.limitgame
              found = true;
              return false;
            }
          }
        }
        if (found === false) {
          let obj = {
            id: `${serial}`,
            limit: 30
          };
          xi.limitgame.push(obj);
          dumpLimitGame()
          return false;
        }
      }
      let found = false;
      for (let i of xi.limitgame) {
        if (i.id === serial) {
          let limits = i.limit;
          if (limits <= 0) {
            found = true;
            let tst = 'silakan bermain game kembali besok. anda telah mencapai batas'
            client.sendReply(serial, tst, m)
            return true;
          } else {
            xi.limitgame
            found = true;
            return false;
          }
        }
      }
      if (found === false) {
        let obj = {
          id: `${serial}`,
          limit: 30
        };
        xi.limitgame.push(obj);
        dumpLimitGame()
        return false;
      }
    }

    function limitAddGame(serial) {
      if (isSadmin || master || vip) {
        return
      }
      var found = false;
      Object.keys(xi.limitgame).forEach((i) => {
        if (xi.limitgame[i].id == serial) {
          found = i
        }
      })
      if (found !== false) {
        xi.limitgame[found].limit -= 1;
        dumpLimitGame()
      }
    }

    function isLimit(serial) {
      if (isSadmin || master || vip) {
        return false;
      } else if (premium) {
        let found = false;
        for (let i of x4.limit) {
          if (i.id === serial) {
            let limits = i.limit;
            if (limits <= 0) {
              found = true;
              client.sendReply(serial, 'limit anda telah habis', m)
              return true;
            } else {
              x4.limit
              found = true;
              return false;
            }
          }
        }
        if (found === false) {
          let obj = {
            id: `${serial}`,
            limit: settings.limitCountPrem
          };
          x4.limit.push(obj);
          dumpLimit()
          return false;
        }
      }
      let found = false;
      for (let i of x4.limit) {
        if (i.id === serial) {
          let limits = i.limit;
          if (limits <= 0) {
            found = true;
            let tst = 'limit anda telah habis, pergunakanlah bot dengan bijak sesuai kebutuhan anda\n'
            tst += 'ketik ' + settings.sname + 'order untuk menambah limit\n'
            tst += 'ketik ' + settings.rname + 'rules untuk mengetahui Term & Condition\n'
            tst += autocommand
            client.sendReply(serial, tst, m)
            return true;
          } else {
            x4.limit
            found = true;
            return false;
          }
        }
      }
      if (found === false) {
        let obj = {
          id: `${serial}`,
          limit: settings.limitCount
        };
        x4.limit.push(obj);
        dumpLimit()
        return false;
      }
    }

    function limitAdd(serial) {
      if (isSadmin || master || vip) {
        return
      }
      var found = false;
      Object.keys(x4.limit).forEach((i) => {
        if (x4.limit[i].id == serial) {
          found = i
        }
      })
      if (found !== false) {
        x4.limit[found].limit -= 1;
        dumpLimit()
      }
    }

    function limitcok(serial) {
      if (isSadmin || master || vip) {
        return
      }
      var found = false;
      Object.keys(x4.limit).forEach((i) => {
        if (x4.limit[i].id == serial) {
          found = i
        }
      })
      if (found !== false) {
        x4.limit[found].limit -= 50;
        dumpLimit()
      }
    }

    function isCount(serial) {
      let found = false;
      for (let i of x7.hitcount) {
        if (i.id === serial) {
          let limits = i.counts;
          if (limits <= 99999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999999) {
            found = true;
            return false;
          } else {
            x7.hitcount
            found = true;
            return false;
          }
        }
      }
      if (found === false) {
        let obj = {
          id: `${serial}`,
          counts: 0
        };
        x7.hitcount.push(obj);
        dumpCount()
        return false;
      }
    }

    function counthit(serial) {
      var found = false;
      Object.keys(x7.hitcount).forEach((i) => {
        if (x7.hitcount[i].id == serial) {
          found = i
        }
      })
      if (found !== false) {
        x7.hitcount[found].counts += 1;
        dumpCount()
      }
    }

    function jancokasuceleng() {
      settings.totalhitcount += 1;
      dumpSet()
    }

    const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor
    if ((body || '').startsWith('.return ')) {
      if (!isSadmin) return
      let ctype = Function
      if (/await/.test(body)) ctype = AsyncFunction
      let func = new ctype(
        'print',
        'client',
        'toId',
        'm',
        'body',
        'require',
        !/^return /.test(body.slice(8)) && body.slice(8).split('\n').length === 1 ? 'return ' + body.slice(8) : body.slice(2))
      let output
      try {
        output = func((...args) => {
          client.sendReply(toId, util.format(...args), m)
        }, client, toId, m, body, require, teks => teks.replace(/^(async function|function|async).+\(.+?\).+{/, `case 'command':`).replace(/this\.(teks|url|args)/g, (_, teks) => {
          switch (txt) {
            case 'teks':
              return "args.join(' ')"
              break
            case 'args':
              return "args"
              break
            case 'url':
              return "args[0]"
              break
            default:
              return _
          }
        }).replace(/}$/, '    break'))
        client.sendReply(toId, util.format(output), m)
      } catch (e) {
        client.sendReply(toId, util.format(e), m)
      }
    } else if ((body || '').startsWith('.exec ')) {
      if (!isSadmin) return
      if (args.length === 0) return
      var pesan = body.slice(5).replace(';', '').replace('\&\&', '');
      try {
        const stdout = execSync(pesan, {
          timeout: 30000,
          encoding: 'utf8'
        });
        return client.sendReply(toId, stdout, m)
      } catch (err) {
        return client.sendReply(toId, err.stderr, m)
      }
    }

    if (body == "rname") {
      jancokasuceleng()
      if (isCount(serial)) {
        return
      } else {
        counthit(serial)
      }
      client.sendText(toId, settings.rname)
    } else if (body == "sname") {
      jancokasuceleng()
      if (isCount(serial)) {
        return
      } else {
        counthit(serial)
      }
      client.sendText(toId, settings.sname)
    } else if ((body == settings.sname + "creator") || (body == settings.rname + "creator")) {
      let a = '```NAMA: Fn```\n'
      a += '```INSTAGRAM:``` *https://instagram.com/fnbots*\n'
      a += '```GITHUB:``` *https://github.com/Terror-Machine*'
      client.sendImageMessage(toId, a, `./media/fotobot.jpeg`)
      client.sendContact(toId, "FNBOTS", "6285712453005")
    }
    const sticker = messageContent.includes('stickerMessage')
    const image = messageContent.includes('imageMessage')
    const video = messageContent.includes('videoMessage')
    const audio = messageContent.includes('audioMessage')
    if (xd.filter.includes(isGroup)) {
      if (sticker) {
        if (m.key.fromMe === false) {
          if (isGroup) {
            if (isBotGroupAdmins) {
              if (stickerspam.has(serial) && !(stp.has(serial))) {
                stp.add(serial);
                if (isSadmin) {
                  client.sendTextWithMentions(toId, 'creatorku yang ganteng @' + serial.replace('@c.whatsapp.net', '') + '\ngaboleh spam ya...', null)
                } else if (master) {
                  client.sendTextWithMentions(toId, 'wah ini nih! @' + serial.replace('@c.whatsapp.net', '') + '\nHei Owner, jangan ngajarin membernya buat spam! 🤦‍♂️🤦‍♂️😤🧐', null)
                } else if (vip) {
                  client.sendTextWithMentions(toId, 'hmmmmm gitu ya @' + serial.replace('@c.whatsapp.net', '') + '\nvip bebas spam. 😒🙃😏', null)
                } else if (premium) {
                  client.sendTextWithMentions(toId, 'wadooooh si @' + serial.replace('@c.whatsapp.net', '') + '\nasik nih premium bisa spam. 😒🙃😏', null)
                } else if (isGroupAdmins) {
                  client.sendTextWithMentions(toId, 'yaela @' + serial.replace('@c.whatsapp.net', '') + '\njangan mentang-mentang jadi admin spam terus terusan ya!', null)
                } else {
                  client.sendTextWithMentions(toId, 'member bangsat ya @' + serial.replace('@c.whatsapp.net', '') + '\nspam anjeng! 😡😡😡😡', null)
                  setTimeout(() => {
                    if (x8.mutelist.includes(serial) == false) {
                      x8.mutelist.push(serial)
                      dumpMute()
                    }
                    if (x8.muted.includes(serial) == false) {
                      x8.muted.push(serial)
                      dumpMute()
                    }
                    let suroloyo = []
                    suroloyo.push(serial)
                    client.groupRemove(toId, suroloyo)
                  }, 700)
                }
              }
            }
          }
          stickerspam.add(serial);
          setTimeout(() => {
            stickerspam.delete(serial);
            stp.delete(serial);

          }, 1000);
        }
      } else if (image) {
        if (m.key.fromMe === false) {
          if (isGroup) {
            if (isBotGroupAdmins) {
              if (stickerspam.has(serial) && !(stp.has(serial))) {
                stp.add(serial);
                if (isSadmin) {
                  client.sendTextWithMentions(toId, 'creatorku yang ganteng @' + serial.replace('@c.whatsapp.net', '') + '\ngaboleh spam ya...', null)
                } else if (master) {
                  client.sendTextWithMentions(toId, 'wah ini nih! @' + serial.replace('@c.whatsapp.net', '') + '\nHei Owner, jangan ngajarin membernya buat spam! 🤦‍♂️🤦‍♂️😤🧐', null)
                } else if (vip) {
                  client.sendTextWithMentions(toId, 'hmmmmm gitu ya @' + serial.replace('@c.whatsapp.net', '') + '\nvip bebas spam. 😒🙃😏', null)
                } else if (premium) {
                  client.sendTextWithMentions(toId, 'wadooooh si @' + serial.replace('@c.whatsapp.net', '') + '\nasik nih premium bisa spam. 😒🙃😏', null)
                } else if (isGroupAdmins) {
                  client.sendTextWithMentions(toId, 'yaela @' + serial.replace('@c.whatsapp.net', '') + '\njangan mentang-mentang jadi admin spam terus terusan ya!', null)
                } else {
                  client.sendTextWithMentions(toId, 'member bangsat ya @' + serial.replace('@c.whatsapp.net', '') + '\nspam anjeng! 😡😡😡😡', null)
                  setTimeout(() => {
                    if (x8.mutelist.includes(serial) == false) {
                      x8.mutelist.push(serial)
                      dumpMute()
                    }
                    if (x8.muted.includes(serial) == false) {
                      x8.muted.push(serial)
                      dumpMute()
                    }
                    let suroloyo = []
                    suroloyo.push(serial)
                    client.groupRemove(toId, suroloyo)
                  }, 700)
                }
              }
            }
          }
          stickerspam.add(serial);
          setTimeout(() => {
            stickerspam.delete(serial);
            stp.delete(serial);

          }, 1000);
        }
      } else if (video) {
        if (m.key.fromMe === false) {
          if (isGroup) {
            if (isBotGroupAdmins) {
              if (stickerspam.has(serial) && !(stp.has(serial))) {
                stp.add(serial);
                if (isSadmin) {
                  client.sendTextWithMentions(toId, 'creatorku yang ganteng @' + serial.replace('@c.whatsapp.net', '') + '\ngaboleh spam ya...', null)
                } else if (master) {
                  client.sendTextWithMentions(toId, 'wah ini nih! @' + serial.replace('@c.whatsapp.net', '') + '\nHei Owner, jangan ngajarin membernya buat spam! 🤦‍♂️🤦‍♂️😤🧐', null)
                } else if (vip) {
                  client.sendTextWithMentions(toId, 'hmmmmm gitu ya @' + serial.replace('@c.whatsapp.net', '') + '\nvip bebas spam. 😒🙃😏', null)
                } else if (premium) {
                  client.sendTextWithMentions(toId, 'wadooooh si @' + serial.replace('@c.whatsapp.net', '') + '\nasik nih premium bisa spam. 😒🙃😏', null)
                } else if (isGroupAdmins) {
                  client.sendTextWithMentions(toId, 'yaela @' + serial.replace('@c.whatsapp.net', '') + '\njangan mentang-mentang jadi admin spam terus terusan ya!', null)
                } else {
                  client.sendTextWithMentions(toId, 'member bangsat ya @' + serial.replace('@c.whatsapp.net', '') + '\nspam anjeng! 😡😡😡😡', null)
                  setTimeout(() => {
                    if (x8.mutelist.includes(serial) == false) {
                      x8.mutelist.push(serial)
                      dumpMute()
                    }
                    if (x8.muted.includes(serial) == false) {
                      x8.muted.push(serial)
                      dumpMute()
                    }
                    let suroloyo = []
                    suroloyo.push(serial)
                    client.groupRemove(toId, suroloyo)
                  }, 700)
                }
              }
            }
          }
          stickerspam.add(serial);
          setTimeout(() => {
            stickerspam.delete(serial);
            stp.delete(serial);

          }, 1000);
        }
      } else if (audio) {
        if (m.key.fromMe === false) {
          if (isGroup) {
            if (isBotGroupAdmins) {
              if (stickerspam.has(serial) && !(stp.has(serial))) {
                stp.add(serial);
                if (isSadmin) {
                  client.sendTextWithMentions(toId, 'creatorku yang ganteng @' + serial.replace('@c.whatsapp.net', '') + '\ngaboleh spam ya...', null)
                } else if (master) {
                  client.sendTextWithMentions(toId, 'wah ini nih! @' + serial.replace('@c.whatsapp.net', '') + '\nHei Owner, jangan ngajarin membernya buat spam! 🤦‍♂️🤦‍♂️😤🧐', null)
                } else if (vip) {
                  client.sendTextWithMentions(toId, 'hmmmmm gitu ya @' + serial.replace('@c.whatsapp.net', '') + '\nvip bebas spam. 😒🙃😏', null)
                } else if (premium) {
                  client.sendTextWithMentions(toId, 'wadooooh si @' + serial.replace('@c.whatsapp.net', '') + '\nasik nih premium bisa spam. 😒🙃😏', null)
                } else if (isGroupAdmins) {
                  client.sendTextWithMentions(toId, 'yaela @' + serial.replace('@c.whatsapp.net', '') + '\njangan mentang-mentang jadi admin spam terus terusan ya!', null)
                } else {
                  client.sendTextWithMentions(toId, 'member bangsat ya @' + serial.replace('@c.whatsapp.net', '') + '\nspam anjeng! 😡😡😡😡', null)
                  setTimeout(() => {
                    if (x8.mutelist.includes(serial) == false) {
                      x8.mutelist.push(serial)
                      dumpMute()
                    }
                    if (x8.muted.includes(serial) == false) {
                      x8.muted.push(serial)
                      dumpMute()
                    }
                    let suroloyo = []
                    suroloyo.push(serial)
                    client.groupRemove(toId, suroloyo)
                  }, 700)
                }
              }
            }
          }
          stickerspam.add(serial);
          setTimeout(() => {
            stickerspam.delete(serial);
            stp.delete(serial);

          }, 1000);
        }
      }
    }

    const security = body.includes('chat.whatsapp.com')
    if (security == true) {
      if (m.key.fromMe === false) {
        if (isGroup) {
          if (isBotGroupAdmins) {
            if (isSadmin || master || vip || premium || isGroupAdmins) return
            if (x8.mutelist.includes(serial) == false) {
              x8.mutelist.push(serial)
              dumpMute()
            }
            if (x8.muted.includes(serial) == false) {
              x8.muted.push(serial)
              dumpMute()
            }
            let suroloyo = []
            suroloyo.push(serial)
            client.groupRemove(toId, suroloyo)
          }
        }
      }
    }

    let cms = []
    if (txt.startsWith(settings.rname) || txt.startsWith(settings.sname)) {
      jancokasuceleng()
      addXp(serial)
      if (isCount(serial)) return
      counthit(serial)
      if (txt.includes("r:")) {
        let cy = txt.split("r:");
        let tet = cy[1];
        let co = tet.split(" ");
        let nums = co[0];
        tet = tet.replace(nums, "");
        txt = tet.trim();
        nums = parseInt(nums);
        nums -= 1;
        toId = mygroup[nums].id;
      }
      cms = await mycmd(await getTxt(txt));
    }
    suggestWord = cms
    if ((txt.startsWith(settings.rname) || txt.startsWith(settings.sname)) && counter <= 4) {
      counter++;
      const usr = serial
      console.log(usr)
      if (recentcmd.has(usr) || sban.has(usr)) {
        if (!(fspamm.has(usr) || (sban.has(usr)))) {
          client.sendTextWithMentions(toId, `*hei @${usr.replace('@s.whatsapp.net', '')} you are on cooldown!*`, null);
          fspamm.add(usr);
        } else if (!(sban.has(usr))) {
          client.sendTextWithMentions(toId, `*Hei @${usr.replace('@s.whatsapp.net', '')}*\n*COMMAND SPAM DETECTED*\n*Command banned for 15 minutes*`, null);
          sban.add(usr);
        }
      } else {
        for (let aa of cms) {
          if (!isGroup) console.log(color('[EXEC]', 'yellow'), time, color(msgs(aa.toString())), 'from', color(toId))
          if (isGroup) console.log(color('[EXEC]', 'yellow'), time, color(msgs(aa.toString())), 'from', color(toId), 'in', color("group"))
          txt = aa;
          if (isSadmin) {
            ctype = "master"
            if (getComs(txt, 'addwhitelist')) {
              if (isWhite(toId)) return client.sendReply(toId, 'Sudah ada di whitelist', m)
              settings.whitelist.push(toId)
              await dumpSet()
              client.sendText(toId, 'Success!')
            } else if (getComs(txt, 'delwhitelist')) {
              if (!(isWhite(toId))) return client.sendReply(toId, 'tidak ada di whitelist', m)
              let index = settings.whitelist.indexOf(toId);
              settings.whitelist.splice(index, 1)
              dumpSet()
              client.sendText(toId, 'Success!')
            } else if (getComs(txt, 'maintenance on')) {
              if (!isSadmin) return
              if (mtcState === true) return
              settings.mtc = true
              dumpSet()
              client.sendReply(toId, 'Maintenance sudah di Umumkan!', m)
            } else if (getComs(txt, 'maintenance off')) {
              if (!isSadmin) return
              if (mtcState === false) return
              settings.mtc = false
              dumpSet()
              client.sendReply(toId, 'Maintenance sudah di Umumkan!', m)
            } else if (getComs(txt, "clearcache")) {
              var dsa = new os_exec()
              dsa.execCommand("rm -rf ./media");
              await sleep(1000)
              dsa.execCommand("cp -R ./xc ./media");
              await sleep(1000)
              client.sendText(toId, "membersihkan sampah....")
            } else if (getPrefix(txt, "upcoms")) {
              let cui = txt.split(" ");
              let w1 = cui[1].trim();
              let w2 = cui[2].trim();
              upComs(w1, w2);
              client.sendReply(toId, "command updated", m)
            } else if (getComs(txt, 'allcommands')) {
              let ts = "*## " + BotName + " ##*\n"
              let no = 1;
              ts += "*MASTER Command*\n"
              helpmaster.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\n*OWNER Command*\n"
              no = 1;
              helpowner.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\n*VIP Command*\n"
              no = 1;
              helpvip.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\n*PREMIUM Command*\n"
              no = 1;
              helppremium.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\n*MANAGE Groups*\n"
              no = 1
              helpmanage.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\n*MEDIA*\n"
              no = 1
              helpmedia.forEach((com, key) => {
                ts += "\n{0}. {1}".format(no, com);
                no += 1;
              })
              ts += "\n\nRegards: *PEKI - VH - FN*"
              client.sendText(toId, ts)
            } else if (getPrefix(txt, 'resetin limit')) {
              const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
              const b = mentionedJidList
              for (let i of x4.limit) {
                if (i['id'] == b) {
                  i['limit'] = settings.limitCount
                  break
                  dumpLimit()
                }
              }
              client.sendText(toId, 'sukses reset limitnya bos')
            } else if (getPrefix(txt, 'ubah')) {
              if (isQuotedMsg) {
                const a = arg
                const b = m.message.extendedTextMessage.contextInfo.participant
                for (let i of x4.limit) {
                  if (i['id'] == b) {
                    i['limit'] = parseInt(a)
                    dumpLimit()
                  }
                }
                const suroloyo = []
                suroloyo.push(b)
                client.sendTextWithMentions(toId, `sukses ubah limit menjadi ${a} kepada @${b.replace('@s.whatsapp.net', '')}`, suroloyo)
              } else {
                const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
                const a = args[0]
                const b = mentionedJidList[0]
                for (let i of x4.limit) {
                  if (i['id'] == b) {
                    i['limit'] = parseInt(a)
                    dumpLimit()
                  }
                }
                client.sendTextWithMentions(toId, `sukses ubah limit menjadi ${a} kepada @${b.replace('@s.whatsapp.net', '')}`, mentionedJidList)
              }
            } else if (getPrefix(txt, 'addsticker')) {
              const add = arg
              console.log(arg)
              if (isMedia && !m.message.imageMessage || isQuotedVideo) {
                const decryptMedia = isQuotedVideo ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
                const stiker = await client.downloadAndSaveMediaMessage(decryptMedia)
                const {
                  spawn
                } = require("child_process");
                const anjay = await spawn('ffmpeg', ['-y', '-i', stiker, '-vcodec', 'libwebp', '-filter:v', 'fps=fps=12', '-lossless', '1', '-loop', '1', '-preset', 'default', '-an', '-vsync', '0', '-s', '150:150', './database/' + add + '.webp'])
                anjay.on('close', function () {
                  let x = fs.readFileSync('./database/' + add + '.webp')
                  x6.sticker[add] = x
                  dumpsticker()
                  client.sendText(toId, "sticker added.")
                })
              } else if (isMedia && !m.message.videoMessage || isQuotedImage) {
                const decryptMedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
                const stiker = await client.downloadAndSaveMediaMessage(decryptMedia)
                const {
                  exec
                } = require("child_process");
                await sleep(5000)
                exec(`cwebp -q 50 ${stiker} -o ./database/${add}.webp`, (error, stdout, stderr) => {
                  let x = fs.readFileSync('./database/' + add + '.webp')
                  x6.sticker[add] = x
                  dumpsticker()
                  client.sendText(toId, "sticker added.")
                });
              } else {
                client.sendReply(toId, 'hanya bisa menyimpan gambar & video!', m)
              }
            } else if (getPrefix(txt, "delsticker")) {
              let alt = arg
              if (x6.sticker.hasOwnProperty(alt)) {
                delete x6.sticker[alt]
                dumpsticker()
                client.sendText(toId, "sticker deleted.")
              } else {
                client.sendText(toId, "tidak ada didalam database bot.")
              }
            } else if (getPrefix(txt, 'addaudio')) {
              if (!isQuotedMsg) client.sendReply(toId, 'Maaf, perintah harus mereply target!', m)
              if (isQuotedAudio) {
                const add = arg
                const filename = `./database/${add}.${mime.extension(m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.mimetype)}`;
                const mediaData = await client.downloadMediaMessage(JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo)
                const imageBase64 = `data:${m.message.extendedTextMessage.contextInfo.quotedMessage.audioMessage.mimetype};base64,${mediaData.toString('base64')}`
                await fs.writeFile(filename, mediaData, function (err) {
                  if (err) {
                    return console.log(err);
                  }
                })
                x2.video[add] = filename
                dumpVideo()
                client.sendText(toId, "audio added.")
              } else {
                client.sendReply(toId, 'hanya bisa reply!', m)
              }
            } else if (getPrefix(txt, "delaudio")) {
              let alt = arg
              if (x2.video.hasOwnProperty(alt)) {
                delete x2.video[alt]
                dumpVideo()
                client.sendText(toId, "audio deleted.")
              } else {
                client.sendText(toId, "tidak ada didalam database bot.")
              }
            } else if (getComs(txt, 'deleteall')) {
              const a = await client.chats.all()
              console.log(a)
              for (let x of a) {
                await client.deleteChat(x.jid)
              }
              client.sendReply(toId, 'Succes delete all chat!', m)
            } else if (getPrefix(txt, 'x')) {
              if (isQuotedMessage) {
                if (args[0] === 'apa') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.kataapa.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                } else if (args[0] === 'dimana') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.katadimana.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                } else if (args[0] === 'kapan') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.katakapan.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                } else if (args[0] === 'siapa') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.katasiapa.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                } else if (args[0] === 'kenapa') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.katakenapa.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                } else if (args[0] === 'gimana') {
                  const asu = m.message.extendedTextMessage.contextInfo.quotedMessage.extendedTextMessage.text
                  xb.katabagaimana.push(asu)
                  dumpKata()
                  client.sendReply(toId, "tersimpan didalam database", m)
                }
              }
            } else if (getPrefix(txt, 'nbc')) {
              let msg = arg
              let groups = await client.chats.all()
              let arrOfGroup = []
              for (let index of groups) {
                if (index.jid.includes('@g.us') == true) {
                  arrOfGroup.push(index.jid)
                }
              }
              let arrOfGroups = arrOfGroup.filter(x => !isWhite(x))
              for (let groupId of arrOfGroups) {
                await client.sendText(groupId, `${msg}`)
              }
              client.sendText(toId, 'Broadcast Success!')
            } else if (getPrefix(txt, 'wbc')) {
              let msg = arg
              let groups = await client.chats.all()
              let arrOfGroup = []
              for (let index of groups) {
                if (index.jid.includes('@g.us') == true) {
                  arrOfGroup.push(index.jid)
                }
              }
              let arrOfGroups = arrOfGroup.filter(x => isWhite(x))
              for (let groupId of arrOfGroups) {
                await sendImage(groupId, `./media/fotobot.jpeg`, `${BotName} Broadcast\n\n${msg}`)
              }
              client.sendText(toId, 'Broadcast Success!')
            }
            if (getComs(txt, "listbot")) {
              const udud = settings.premium
              let anu = "list bot:\n"
              let nom = 1
              for (let i of udud) {
                anu += "\n{0}. @{1}".format(nom, i.replace('@s.whatsapp.net', ''))
                nom += 1
              }
              client.sendTextWithMentions(toId, anu, udud).catch((err) => client.sendText(toId, 'kosong'))
            } else if (getPrefix(txt, 'addbot')) {
              if (isQuotedMsg) {
                if (!settings.premium.includes(m.message.extendedTextMessage.contextInfo.participant)) {
                  settings.premium.push(m.message.extendedTextMessage.contextInfo.participant)
                  dumpSet()
                } else {
                  client.sendReply(toId, 'Sudah ada di list', m)
                }
              } else {
                try {
                  const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (!settings.premium.includes(men)) {
                        settings.premium.push(men)
                        dumpSet()
                      } else {
                        client.sendReply(toId, 'Sudah ada di list', m)
                      }
                    }
                  }
                } catch (err) {
                  const pea = args[0]
                  if (!settings.premium.includes(pea)) {
                    settings.premium.push(pea)
                    dumpSet()
                  } else {
                    client.sendReply(toId, 'Sudah ada di list', m)
                  }
                }
              }
              client.sendReply(toId, "User promoted as bot.", m)
            } else if (getPrefix(txt, 'delbot')) {
              let stt = body.split("delbot ")
              if (stt.length > 1) {
                const dt = stt[1].trim();
                let tars = settings.premium;
                const data = archimed(dt, tars);
                for (let x of data) {
                  tars = arrayRemove(tars, x);
                }
                settings.premium = tars;
                if (data.length != 0) {
                  const udud = data
                  let anu = "Expeled List:\n"
                  let nom = 1
                  let mentions = [];
                  for (var i = 0; i < udud.length; i++) {
                    const no = `${nom}`
                    anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                    nom += 1
                  }
                  client.sendTextWithMentions(toId, anu, data)
                  dumpSet()
                }
              }
            } else if (getComs(txt, "resetbot")) {
              settings.premium = []
              dumpSet()
              client.sendText(toId, "bot list reseted.")
            }
            if (getComs(txt, 'listowner')) {
              const udud = InitUser.master
              let anu = `This is list of owner number\nTotal : ${udud.length}\n`
              let nom = 1
              for (var i = 0; i < udud.length; i++) {
                const no = `${nom}`
                anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                nom += 1
              }
              await client.sendTextWithMentions(toId, anu, udud)
            } else if (getPrefix(txt, "addowner")) {
              if (isQuotedMsg) {
                if (!InitUser.master.includes(m.message.extendedTextMessage.contextInfo.participant)) {
                  InitUser.master.push(m.message.extendedTextMessage.contextInfo.participant)
                  dumpMaster()
                } else {
                  client.sendReply(toId, 'Sudah ada di list', m)
                }
              } else {
                try {
                  const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (!InitUser.master.includes(men)) {
                        InitUser.master.push(men)
                        dumpMaster()
                      } else {
                        client.sendReply(toId, 'Sudah ada di list', m)
                      }
                    }
                  }
                } catch (err) {
                  const pea = args[0]
                  if (!InitUser.master.includes(pea)) {
                    InitUser.master.push(pea)
                    dumpMaster()
                  } else {
                    client.sendReply(toId, 'Sudah ada di list', m)
                  }
                }
              }
              client.sendReply(toId, "User promoted as owner.", m)
            } else if (getPrefix(txt, 'delowner')) {
              let stt = body.split("delowner ")
              if (stt.length > 1) {
                const dt = stt[1].trim();
                let tars = InitUser.master;
                const data = archimed(dt, tars);
                for (let x of data) {
                  tars = arrayRemove(tars, x);
                }
                InitUser.master = tars;
                if (data.length != 0) {
                  const udud = data
                  let anu = "Expeled List:\n"
                  let nom = 1
                  let mentions = [];
                  for (var i = 0; i < udud.length; i++) {
                    const no = `${nom}`
                    anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                    nom += 1
                  }
                  client.sendTextWithMentions(toId, anu, data)
                  dumpMaster()
                }
              }
            } else if (getComs(txt, "resetowner")) {
              InitUser.master = []
              dumpMaster()
              client.sendText(toId, "owner list reseted.")
            }
          }
          if (isMuted(toId) && !mtcState && banChat() && !isBanned || isSadmin || master || vip || premium || (isWhiteList(toId) && !isBanned)) {
            if (isSadmin || master) {
              ctype = "owner"
              if (getComs(txt, "speed")) {
                var t0 = Date.now() / 1000;
                await client.sendText(toId, "Performance test");
                var t1 = Date.now() / 1000;
                var spd = Math.round((t1 - t0) * 1000);
                client.sendText(toId, `Send time: ${spd / 100000} _sec._`);
              } else if (getComs(txt, 'banchat on')) {
                if (settings.banChats === true) return
                settings.banChats = true
                banChats = true
                dumpSet()
                client.sendReply(toId, 'Global chat has been disabled!', m)
              } else if (getComs(txt, 'banchat off')) {
                if (settings.banChats === false) return
                settings.banChats = false
                banChats = false
                dumpSet()
                client.sendReply(toId, 'Global chat has been enabled!', m)
              } else if (getComs(txt, 'autojoin on')) {
                if (settings.autojoin === true) return
                settings.autojoin = true
                dumpSet()
                client.sendReply(toId, 'autojoin link group has been enabled!', m)
              } else if (getComs(txt, 'autojoin off')) {
                if (settings.autojoin === false) return
                settings.autojoin = false
                dumpSet()
                client.sendReply(toId, 'autojoin tidak aktif', m)
              } else if (getComs(txt, 'stats')) {
                await client.sendReply(toId, 'Sedang mengakumulasikan data...', m)
                let allchats = await client.chats.all()
                let groups = []
                let chatIds = []
                for (let index of allchats) {
                  if (index.jid.includes('@g.us') == true) {
                    groups.push(index.jid)
                  }
                  if (index.jid.includes('@s.whatsapp.net') == true) {
                    chatIds.push(index.jid)
                  }
                }
                const k = getDescRank()
                const kem = x4.limit
                let text = `Status :\n`
                text += `- *${settings.memberLimit}* Limit Member\n`
                text += `- *${settings.limitCount}* Limit Penggunaan\n`
                text += `- *${settings.groupLimit}* Limit Group\n`
                text += `- *${settings.limitCountPrem}* Limit Premium\n`
                text += `- *${300 + groups.length}* Group Chats\n`
                text += `- *${chatIds.length}* Personal Chats\n`
                text += `- *${chatIds.length + 300}* Total Chats\n`
                text += `- *${k.length + 43253}* Total User\n`
                text += `- *${settings.totalhitcount}* Total Perintah Dijalankan\n`
                text += `- *${kem.length}* Total pengguna hari ini\n`
                await client.sendReply(toId, text, m)
              } else if (getComs(txt, 'runtime')) {
                let tms = (Date.now() / 1000) - (timeStart);
                let cts = waktu(tms);
                client.sendReply(toId, cts, m)
              } else if (getPrefix(txt, "upname")) {
                const cui = arg
                await client.updateProfileName(cui)
                client.sendReply(toId, "Name set: {0}".format(cui), m)
              } else if (getPrefix(txt, "upstatus")) {
                const w1 = arg
                await client.setStatus(w1)
                client.sendReply(toId, "Status set: {0}".format(w1), m)
              } else if (getComs(txt, 'setprofilepic')) {
                if (isMedia && !m.message.videoMessage || isQuotedImage) {
                  const decryptMedia = isQuotedImage ? JSON.parse(JSON.stringify(m).replace('quotedM', 'm')).message.extendedTextMessage.contextInfo : m
                  const stiker = await client.downloadAndSaveMediaMessage(decryptMedia)
                  await client.updateProfilePicture(botNumber, stiker).then(() => client.sendText(toId, "success update profile picture"))
                }
              } else if (getPrefix(txt, "upapikey1")) {
                const cui = args[0]
                settings.vhkey = cui;
                dumpSet();
                client.sendReply(toId, "apikey vhtear changed to: {0}".format(cui), m)
              } else if (getPrefix(txt, "upapikey2")) {
                const cui = args[0]
                settings.itechkey = cui;
                dumpSet();
                client.sendReply(toId, "apikey itech changed to: {0}".format(cui), m)
              } else if (getPrefix(txt, "upsnobg")) {
                const cui = args[0]
                settings.nobg = cui;
                dumpSet();
                client.sendReply(toId, "apikey itech changed to: {0}".format(cui), m)
              } else if (getPrefix(txt, "upbotname")) {
                const cui = args[0]
                settings.botname = cui;
                dumpSet();
                client.sendReply(toId, "the bot name changed to: {0}".format(cui), m)
              } else if (getPrefix(txt, "upowncon")) {
                const cui = args[0]
                const cua = args[1]
                settings.admin = cui;
                dumpSet();
                await client.sendReply(toId, "the bot owner changed to: {0}".format(cui), m)
                await sendContact(toId, cui, cua)
              } else if (getPrefix(txt, "upconsnobg")) {
                const cui = args[0]
                const cua = args[1]
                settings.snobg = cui;
                dumpSet();
                await client.sendReply(toId, "the bot owner changed to: {0}".format(cui), m)
                await sendContact(toId, cui, cua)
              } else if (getPrefix(txt, "uptext")) {
                const cui = arg
                settings.autocommand = cui;
                dumpSet();
                client.sendReply(toId, "success changed to: {0}".format(cui), m)
              } else if (getPrefix(txt, "upsname")) {
                let cui = txt.split(" ");
                let w1 = cui[1].trim();
                settings.sname = w1;
                dumpSet();
                client.sendReply(toId, "squad name set: {0}".format(w1), m)
              } else if (getPrefix(txt, "uprname")) {
                let cui = txt.split(" ");
                let w1 = cui[1].trim();
                settings.rname = w1;
                dumpSet();
                client.sendReply(toId, "response name set: {0}".format(w1), m)
              } else if (getPrefix(txt, "suggest")) {
                let cui = txt.split(" ");
                let w1 = cui[1].trim();
                if (w1 == "on") {
                  settings.autocorrect = 1
                } else if (w1 == "auto") {
                  settings.autocorrect = 2
                } else if (w1 == "off") {
                  settings.autocorrect = 0
                }
                dumpSet();
                client.sendReply(toId, "Word suggestion {0}".format(w1), m)
              } else if (getPrefix(txt, "chatbot")) {
                let cui = txt.split(" ");
                let w1 = cui[1].trim();
                if (w1 == "on") {
                  settings.chatbot = true
                } else if (w1 == "off") {
                  settings.chatbot = false
                }
                dumpSet();
                client.sendReply(toId, "Chatbot switched to: {0}".format(w1), m)
              } else if (getComs(txt, "mygroup")) {
                const udud = await client.chats.all()
                let groups = []
                for (let index of udud) {
                  if (index.jid.includes('@g.us') == true) {
                    groups.push(index.jid)
                  }
                }
                mygroup = groups
                let anu = "List Group " + BotName + " Joined:\n"
                let nom = 1
                for (let i of groups) {
                  const s = client.contacts[i]
                  const { name } = s
                  anu += "\n" + nom + ". " + name + "\n    ID: " + i + "\n"
                  nom += 1
                }
                client.sendReply(toId, anu, m)
              } else if (getPrefix(txt, 'changememberlimit')) {
                const pesan = args[0]
                settings.memberLimit = parseInt(pesan)
                dumpSet()
                await client.sendReply(toId, `sukses merubah limit menjadi ${pesan}`, m)
              } else if (getPrefix(txt, 'changegrouplimit')) {
                const pesan = args[0]
                settings.groupLimit = parseInt(pesan)
                dumpSet()
                await client.sendReply(toId, `sukses merubah limit menjadi ${pesan}`, m)
              } else if (getPrefix(txt, 'changepremiumlimit')) {
                const pesan = args[0]
                settings.limitCountPrem = parseInt(pesan)
                dumpSet()
                await client.sendReply(toId, `sukses merubah limit menjadi ${pesan}`, m)
              } else if (getPrefix(txt, 'changelimit')) {
                const pesan = args[0]
                settings.limitCount = parseInt(pesan)
                dumpSet()
                await client.sendReply(toId, `sukses merubah limit menjadi ${pesan}`, m)
              } else if (getComs(txt, "resetlimitall")) {
                let meki = []
                for (let i of xc) {
                  let asu = {
                    id: i.id,
                    limit: '∞'
                  }
                  meki.push(asu)
                }
                x4.limit = meki
                xi.limitgame = meki
                await client.sendReply(toId, 'sukses', m)
                await dumpLimitGame()
                await dumpLimit()
                await sleep(1000)
                console.log('[INFO] Limit restarted!')
              } else if (getPrefix(txt, "resetin limit")) {
                if (isQuotedMsg) {
                  for (let i of x4.limit) {
                    if (i['id'] == m.message.extendedTextMessage.contextInfo.participant) {
                      i['limit'] = settings.limitCount
                      break
                      dumpLimit()
                    }
                  }
                } else {
                  try {
                    const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentiones.length != 0) {
                      for (let men of mentiones) {
                        for (let i of x4.limit) {
                          if (i['id'] == men) {
                            i['limit'] = settings.limitCount
                            break
                            dumpLimit()
                          }
                        }
                      }
                    }
                  } catch (err) {
                    const pea = args[0]
                    for (let i of x4.limit) {
                      if (i['id'] == pea + '@s.whatsapp.net') {
                        i['limit'] = settings.limitCount
                        break
                        dumpLimit()
                      }
                    }
                  }
                }
                client.sendReply(toId, 'sukses reset limitnya bos', m)
              }
              if (getPrefix(txt, 'premium')) {
                if (ar[0] === 'add') {
                  try {
                    const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentionedJidList.length != 0) {
                      for (let benet of mentionedJidList) {
                        await addPremiumUser(benet, argsa[2], xa)
                        await sendReplyWithMentions(toId, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: @${benet.replace(/@s.whatsapp.net/, '')}\n➸ *Expired*: ${ms(toMs(argsa[2])).days} day(s) ${ms(toMs(argsa[2])).hours} hour(s) ${ms(toMs(argsa[2])).minutes} minute(s)`, [benet], m)
                      }
                    }
                  } catch (err) {
                    await addPremiumUser(argsa[1] + '@s.whatsapp.net', argsa[2], xa)
                    await sendReplyWithMentions(toId, `*「 PREMIUM ADDED 」*\n\n➸ *ID*: @${argsa[1]}\n➸ *Expired*: ${ms(toMs(argsa[2])).days} day(s) ${ms(toMs(argsa[2])).hours} hour(s) ${ms(toMs(argsa[2])).minutes} minute(s)`, [argsa[1] + '@s.whatsapp.net'], m)
                  }
                } else if (ar[0] === 'del') {
                  try {
                    const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentionedJidList.length !== 0) {
                      if (mentionedJidList[0] === botNumber) return
                      xa.splice(getPremiumPosition(mentionedJidList[0], xa), 1)
                      fs.writeJSONSync('db/' + pukimaki + '.premium.json', xa, {
                        spaces: 2
                      })
                      await client.sendReply(toId, `Done deleted from premium user....`, m)
                    }
                  } catch (err) {
                    xa.splice(getPremiumPosition(args[1] + '@s.whatsapp.net', xa), 1)
                    fs.writeJSONSync('db/' + pukimaki + '.premium.json', xa, {
                      spaces: 2
                    })
                    await client.sendReply(toId, `Done deleted from premium user....`, m)
                  }
                } else if (ar[0] === 'list') {
                  let ts = "*## " + BotName + " Premium ##*\n"
                  let no = 1;
                  let s = []
                  for (let a of xa) {
                    s.push(a.id)
                    const cekExp = ms(getPremiumExpired(a.id, xa) - Date.now())
                    ts += `\n${no}. @${a.id.replace('@s.whatsapp.net', '')}\n   Expired: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)\n`
                    no += 1;
                  }
                  ts += "\nRegards: *" + BotName + "*"
                  sendReplyWithMentions(toId, ts, s, m)
                } else {
                  await client.sendReply(toId, `Error!`, m)
                }
              }
              if (getPrefix(txt, 'vip')) {
                if (ar[0] === 'add') {
                  try {
                    const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentionedJidList.length != 0) {
                      for (let benet of mentionedJidList) {
                        await addUserVIP(benet, argsa[2], xc)
                        await sendReplyWithMentions(toId, `*「 VIP ADDED 」*\n\n➸ *ID*: @${benet.replace(/@s.whatsapp.net/, '')}\n➸ *Expired*: ${ms(toMs(argsa[2])).days} day(s) ${ms(toMs(argsa[2])).hours} hour(s) ${ms(toMs(argsa[2])).minutes} minute(s)`, [benet], m)
                      }
                    }
                  } catch (err) {
                    await addUserVIP(argsa[1] + '@s.whatsapp.net', argsa[2], xc)
                    await sendReplyWithMentions(toId, `*「 VIP ADDED 」*\n\n➸ *ID*: @${argsa[1]}\n➸ *Expired*: ${ms(toMs(argsa[2])).days} day(s) ${ms(toMs(argsa[2])).hours} hour(s) ${ms(toMs(argsa[2])).minutes} minute(s)`, [argsa[1] + '@s.whatsapp.net'], m)
                  }
                } else if (ar[0] === 'del') {
                  try {
                    const mentionedJidList = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentionedJidList.length !== 0) {
                      if (mentionedJidList[0] === botNumber) return
                      xa.splice(getVIPposition(mentionedJidList[0], xc), 1)
                      fs.writeJSONSync('db/' + pukimaki + '.premium.json', xc, {
                        spaces: 2
                      })
                      await client.sendReply(toId, `Done deleted from vip user....`, m)
                    }
                  } catch (err) {
                    xa.splice(getVIPposition(args[1] + '@s.whatsapp.net', xc), 1)
                    fs.writeJSONSync('db/' + pukimaki + '.premium.json', xc, {
                      spaces: 2
                    })
                    await client.sendReply(toId, `Done deleted from vip user....`, m)
                  }
                } else if (ar[0] === 'list') {
                  let ts = "*## " + BotName + " Premium ##*\n"
                  let no = 1;
                  let s = []
                  for (let a of xc) {
                    s.push(a.id)
                    const cekExp = ms(getVIPexpired(a.id, xc) - Date.now())
                    ts += `\n${no}. @${a.id.replace('@s.whatsapp.net', '')}\n   Expired: ${cekExp.days} day(s) ${cekExp.hours} hour(s) ${cekExp.minutes} minute(s)\n`
                    no += 1;
                  }
                  ts += "\nRegards: *" + BotName + "*"
                  sendReplyWithMentions(toId, ts, s, m)
                } else {
                  await client.sendReply(toId, 'Error!', m)
                }
              }
              if (getComs(txt, 'lwhite')) {
                let asuc = []
                for (let i in xf.whitelist) {
                  asuc.push(xf.whitelist[i])
                }
                let ts = "*## " + BotName + " WHITELIST ##*\n"
                let no = 1;
                for (let a of asuc) {
                  const s = client.contacts[a.id]
                  const { name } = s
                  ts += "\n{0}. {1}\n   nama: {2}\n   id: {3}\n".format(no, name, a.nama, a.id);
                  no += 1;
                }
                ts += "\nRegards: *" + BotName + "*"
                client.sendReply(toId, ts, m)
              } else if (getPrefix(txt, 'dwhite')) {
                if (isQuotedMsg) {
                  const men = m.message.extendedTextMessage.contextInfo.quotedMessage.conversation
                  if (xf.whitelist.hasOwnProperty(men)) {
                    delete xf.whitelist[men]
                    let index = settings.whitelist.indexOf(men);
                    settings.whitelist.splice(index, 1)
                    dumpSet()
                    dumpWhite()
                    client.sendReply(toId, "user deleted.", m)
                  } else {
                    client.sendReply(toId, "tidak ada didalam list", m)
                  }
                } else {
                  const men = args[0]
                  if (xf.whitelist.hasOwnProperty(men)) {
                    delete xf.whitelist[men]
                    let index = settings.whitelist.indexOf(men);
                    settings.whitelist.splice(index, 1)
                    dumpSet()
                    dumpWhite()
                    client.sendReply(toId, "user deleted.", m)
                  } else {
                    client.sendReply(toId, "tidak ada didalam list", m)
                  }
                }
              }
              if (getComs(txt, 'listblock')) {
                const udud = blocked
                let anu = `This is list of blocked number\nTotal : ${udud.length}\n`
                let nom = 1
                for (var i = 0; i < udud.length; i++) {
                  const no = `${nom}`
                  anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                  nom += 1
                }
                client.sendTextWithMentions(toId, anu, udud)
              } else if (getComs(txt, 'unblockall')) {
                for (let i = 0; i < blocked.length; i++) {
                  await client.blockUser(blocked[i], "remove")
                }
                client.sendReply(toId, 'done unblock all shitlist', m)
              }
              if (getComs(txt, 'listadmin')) {
                const udud = groupAdmins
                let anu = `This is list of admin groups\nTotal : ${udud.length}\n`
                let nom = 1
                for (var i = 0; i < udud.length; i++) {
                  const no = `${nom}`
                  anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                  nom += 1
                }
                client.sendTextWithMentions(toId, anu, null)
              }
              if (getComs(txt, "listmute")) {
                const udud = x8.mutelist
                let anu = "Mutelist:\n"
                let nom = 1
                for (var i = 0; i < udud.length; i++) {
                  const no = `${nom}`
                  anu += "\n" + no + ". @" + udud[i].replace(/s.whatsapp.net/, "")
                  nom += 1
                }
                client.sendTextWithMentions(toId, anu, null)
              } else if (getPrefix(txt, 'delmute')) {
                try {
                  const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (x8.mutelist.includes(men)) {
                        x8.mutelist = arrayRemove(x8.mutelist, men)
                      } else {
                        client.sendReply(toId, 'tidak ada di list', m)
                      }
                    }
                    client.sendReply(toId, "berhasil menghapus shitlist.", m)
                    dumpMute()
                  }
                } catch (err) {
                  let stt = body.split("delmute ")
                  if (stt.length > 1) {
                    const dt = stt[1].trim();
                    let tars = x8.mutelist;
                    const data = archimed(dt, tars);
                    for (let x of data) {
                      tars = arrayRemove(tars, x);
                    }
                    x8.mutelist = tars;
                    if (data.length != 0) {
                      const udud = data
                      let anu = "Expeled List:\n"
                      let nom = 1
                      for (var i = 0; i < udud.length; i++) {
                        const no = `${nom}`
                        anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                        nom += 1
                      }
                      await client.sendTextWithMentions(toId, anu, null)
                    }
                  }
                  dumpMute()
                }
              } else if (getPrefix(txt, "silent")) {
                if (isQuotedMsg) {
                  if (x8.mutelist.includes(m.message.extendedTextMessage.contextInfo.participant) == false) {
                    x8.mutelist.push(m.message.extendedTextMessage.contextInfo.participant)
                    dumpMute()
                  }
                  if (x8.muted.includes(m.message.extendedTextMessage.contextInfo.participant) == false) {
                    x8.muted.push(m.message.extendedTextMessage.contextInfo.participant)
                    dumpMute()
                  }
                } else {
                  try {
                    const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentiones.length != 0) {
                      for (let men of mentiones) {
                        if (x8.mutelist.includes(men) == false) {
                          x8.mutelist.push(men)
                          dumpMute()
                        }
                        if (x8.muted.includes(men) == false) {
                          x8.muted.push(men)
                          dumpMute()
                        }
                      }
                      client.sendReply(toId, "User added to mutelist", m)
                    }
                  } catch (err) {
                    const pea = args[0]
                    if (x8.mutelist.includes(pea) == false) {
                      x8.mutelist.push(pea)
                      dumpMute()
                    }
                    if (x8.muted.includes(pea) == false) {
                      x8.muted.push(pea)
                      dumpMute()
                    }
                    client.sendReply(toId, "User added to mutelist", m)
                  }
                }
              } else if (getPrefix(txt, 'unsilent')) {
                const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                if (mentiones.length != 0) {
                  for (let men of mentiones) {
                    if (x8.mutelist.includes(men)) {
                      let index = x8.muted.indexOf(men);
                      x8.mutelist = arrayRemove(x8.mutelist, men)
                      x8.muted.splice(index, 1)
                      dumpMute()
                    } else {
                      client.sendReply(toId, 'tidak ada di list', m)
                    }
                  }
                  client.sendReply(toId, "success.", m)
                } else {
                  for (let men of mentiones) {
                    if (x8.mutelist.includes(men)) {
                      let index = x8.muted.indexOf(men);
                      x8.mutelist = arrayRemove(x8.mutelist, men)
                      x8.muted.splice(index, 1)
                      dumpMute()
                    } else {
                      client.sendReply(toId, 'tidak ada di list', m)
                    }
                  }
                  client.sendReply(toId, "success.", m)
                }
              } else if (getComs(txt, "resetmute")) {
                x8.mutelist = []
                dumpMute()
                client.sendReply(toId, "mutelist reseted.", m)
              }
              if (getComs(txt, "listblack")) {
                const udud = x8.muted
                let anu = "blacklist group & user:\n"
                let nom = 1
                for (let i of udud) {
                  const s = client.contacts[i]
                  const { name } = s
                  anu += "\n{0}. {1} | {2}".format(nom, i, name)
                  nom += 1
                }
                client.sendReply(toId, anu, m)
              } else if (getPrefix(txt, 'delblack')) {
                try {
                  const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                  if (mentiones.length != 0) {
                    for (let men of mentiones) {
                      if (x8.muted.includes(men)) {
                        x8.muted = arrayRemove(x8.muted, men)
                      } else {
                        client.sendReply(toId, 'tidak ada di list', m)
                      }
                    }
                    client.sendReply(toId, "menghapus user muted.", m)
                  }
                  dumpMute()
                } catch (err) {
                  let stt = body.split("delblack ")
                  if (stt.length > 1) {
                    const dt = stt[1].trim();
                    let tars = x8.muted;
                    const data = archimed(dt, tars);
                    for (let x of data) {
                      tars = arrayRemove(tars, x);
                    }
                    x8.muted = tars;
                    if (data.length != 0) {
                      const udud = data
                      let anu = "Expeled List:\n"
                      let nom = 1
                      let mentions = [];
                      for (var i = 0; i < udud.length; i++) {
                        const no = `${nom}`
                        anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                        nom += 1
                      }
                      client.sendTextWithMentions(toId, anu, null)
                    }
                  }
                  dumpMute()
                }
              }
              if (getComs(txt, "listwhite")) {
                const udud = settings.whitelist
                mygroup = udud
                let anu = "Whitelist Group:\n"
                let nom = 1
                for (let i of udud) {
                  const s = client.contacts[i]
                  const { name } = s
                  anu += "\n{0}. {1}".format(nom, name)
                  nom += 1
                }
                client.sendReply(toId, anu, m)
              } else if (getPrefix(txt, 'whitelistadd')) {
                if (isQuotedMsg) {
                  const pea = m.message.extendedTextMessage.contextInfo.quotedMessage.conversation
                  if (isWhite(pea)) return client.sendReply(toId, 'Sudah ada di whitelist', m)
                  settings.whitelist.push(pea)
                  dumpSet()
                  client.sendReply(toId, 'Success!')
                } else {
                  const pea = args[0]
                  if (isWhite(pea)) return client.sendReply(toId, 'Sudah ada di whitelist', m)
                  settings.whitelist.push(pea)
                  dumpSet()
                  client.sendReply(toId, 'Success!', m)
                }
              } else if (getPrefix(txt, 'whitelistdel')) {
                let stt = body.split("whitelistdel ")
                if (stt.length > 1) {
                  const dt = stt[1].trim();
                  let tars = settings.whitelist
                  const data = archimed(dt, tars);
                  for (let x of data) {
                    tars = arrayRemove(tars, x);
                  }
                  settings.whitelist = tars;
                  if (data.length != 0) {
                    const udud = data
                    let anu = "Expeled List:\n"
                    let nom = 1
                    let mentions = [];
                    for (var i = 0; i < udud.length; i++) {
                      const no = `${nom}`
                      anu += "\n" + no + ". " + udud[i]
                      nom += 1
                    }
                    await client.sendReply(toId, anu, m)
                    dumpSet()
                  }
                }
              } else if (getComs(txt, "resetwhitelist")) {
                settings.whitelist = []
                dumpSet()
                client.sendReply(toId, "whitelist reseted.", m)
              }
              if (getComs(txt, "listmimic")) {
                const udud = settings.memec
                mygroup = udud
                let anu = "List Mimic:\n"
                let nom = 1
                for (let i of udud) {
                  anu += "\n{0}. @{1}".format(nom, i.replace('@s.whatsapp.net', ''))
                  nom += 1
                }
                client.sendTextWithMentions(toId, anu, null)
              } else if (getPrefix(txt, 'addmimic')) {
                if (isQuotedMsg) {
                  if (!settings.memec.includes(quotedParticipant)) {
                    settings.memec.push(quotedParticipant)
                    dumpSet()
                  } else {
                    client.sendReply(toId, 'Sudah ada di list', m)
                  }
                } else {
                  try {
                    const mentiones = m.message.extendedTextMessage.contextInfo.mentionedJid
                    if (mentiones.length != 0) {
                      for (let men of mentiones) {
                        if (!settings.memec.includes(men)) {
                          settings.memec.push(men)
                          dumpSet()
                        } else {
                          client.sendReply(toId, 'Sudah ada di list', m)
                        }
                      }
                    }
                    client.sendReply(toId, "user add to mimic list", m)
                  } catch (err) {
                    const pea = args[0]
                    if (!settings.memec.includes(pea)) {
                      settings.memec.push(pea)
                      dumpSet()
                    } else {
                      client.sendReply(toId, 'Sudah ada di list', m)
                    }
                    client.sendReply(toId, "user add to mimic list", m)
                  }
                }
              } else if (getPrefix(txt, 'delmimic')) {
                let stt = body.split("delmimic ")
                if (stt.length > 1) {
                  const dt = stt[1].trim();
                  let tars = settings.memec;
                  const data = archimed(dt, tars);
                  for (let x of data) {
                    tars = arrayRemove(tars, x);
                  }
                  settings.memec = tars;
                  if (data.length != 0) {
                    const udud = data
                    let anu = "Expeled List:\n"
                    let nom = 1
                    let mentions = [];
                    for (var i = 0; i < udud.length; i++) {
                      const no = `${nom}`
                      anu += "\n" + no + ". @" + udud[i].replace(/@s.whatsapp.net/, "")
                      nom += 1
                    }
                    await client.sendTextWithMentions(toId, anu, null)
                    dumpSet()
                  }
                }
              } else if (getComs(txt, "resetmimic")) {
                settings.memec = []
                dumpSet()
                client.sendReply(toId, "mimic list reseted.", m)
              } else if (getComs(txt, 'mimic on')) {
                if (mekimeki === true) return
                mekimeki = true
                client.sendReply(toId, 'mimic has been enabled!', m)
              } else if (getComs(txt, 'mimic off')) {
                if (mekimeki === false) return
                mekimeki = false
                client.sendReply(toId, 'mimic tidak aktif', m)
              }
              if (getComs(txt, 'leaveall')) {
                let allchats = await client.chats.all()
                let arrOfGroup = []
                for (let index of allchats) {
                  arrOfGroup.push(index.jid)
                }
                let arrOfGroups = arrOfGroup.filter(x => !isWhite(x))
                for (let groupId of arrOfGroups) {
                  await client.groupLeave(groupId)
                  await client.modifyChat(groupId, ChatModification.delete)
                }
                client.sendReply(toId, 'sukses leave non whitelist group', m)
              } else if (getComs(txt, 'clearall')) {
                let allchats = await client.chats.all()
                let groups = []
                let chatIds = []
                for (let index of allchats) {
                  if (index.jid.includes('@g.us') == true) {
                    groups.push(index.jid)
                  }
                  if (index.jid.includes('@s.whatsapp.net') == true) {
                    chatIds.push(index.jid)
                  }
                }
                let arrOfGroups = groups.filter(x => !isWhite(x))
                let arrOfGroupsxxx = groups.filter(x => isWhite(x))
                let chatsny = chats.filter(x => !(isWhite(x)))
                for (let groupIds of arrOfGroups) {
                  await client.groupLeave(groupId)
                  await client.modifyChat(groupId, ChatModification.delete)
                }
                for (let chats of chatsny) {
                  await client.modifyChat(chats, ChatModification.delete)
                }
                for (let groupIds of arrOfGroupsxxx) {
                  await client.modifyChat(chats, ChatModification.clear)
                }
                client.sendReply(toId, 'sukses!', m)
              }
              if (getPrefix(txt, 'broadcast')) {
                let msg = arg
                if (isQuotedMsg) {
                  const filename = `${t}.${mime.extension(quotedMsgObj.mimetype)}`
                  const mediaData = await decryptMedia(quotedMsgObj);
                  const imageBase64 = `data:${quotedMsgObj.mimetype};base64,${mediaData.toString('base64')}`
                  let groups = await client.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await client.sendFile(groupId, imageBase64, filename, `[ ${BotName} Broadcast ]\n\n${msg}`).then(() => console.log(`success resend ${mimetype}`))
                    }
                  }
                  client.sendReply(toId, 'Broadcast Success!', m)
                } else if (isMedia) {
                  const filename = `${t}.${mime.extension(mimetype)}`
                  const mediaData = await decryptMedia(message);
                  const imageBase64 = `data:${mimetype};base64,${mediaData.toString('base64')}`
                  let groups = await client.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await client.sendFile(groupId, imageBase64, filename, `[ ${BotName} Broadcast ]\n\n${msg}`).then(() => console.log(`success resend ${mimetype}`))
                    }
                  }
                  client.sendReply(toId, 'Broadcast Success!', m)
                } else {
                  let groups = await client.getAllGroups()
                  let arrOfGroup = []
                  for (let index of groups) {
                    arrOfGroup.push(index.groupMetadata.id._serialized)
                  }
                  for (let groupId of arrOfGroup) {
                    if (!chat.isAnnounceGrpRestrict) {
                      await client.sendText(groupId, `[ ${BotName} Broadcast ]\n\n${msg}`)
                    }
                  }
                  client.sendReply(toId, 'Broadcast Success!', m)
                }
              }
            }
          } else {
            setTimeout(() => {
              counter = 0;
            }, 15000);
          }
        }
      }
      setTimeout(() => {
        counter--;
      }, 1000)
      recentcmd.add(usr);
      setTimeout(() => {
        recentcmd.delete(usr);
        fspamm.delete(usr);
      }, 5000);
      setTimeout(() => {
        sban.delete(usr);
      }, 900000)
    } else {
      setTimeout(() => {
        counter = 0;
      }, 15000);
    }
  } catch (err) {
    console.log(err)
  }
}

starts()

process.on('uncaughtException', function (err) {
  let e = String(err)
  if (e.includes("conflict")) return
  if (e.includes("Socket connection timeout")) return
  if (e.includes("not-authorized")) return
  if (e.includes("already-exists")) return
  if (e.includes("rate-overlimit")) return
  if (e.includes("Connection Closed")) return
  if (e.includes("Timed Out")) return
  if (e.includes("Value not found")) return
  console.log('Caught exception: ', err)
})