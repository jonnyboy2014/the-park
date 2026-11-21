import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';

const outputDirectory = path.resolve('.tmp/the-park-release-trailer');
const capture = JSON.parse(await readFile(path.join(outputDirectory, 'capture.json'), 'utf8'));
const sampleRate = 44100;
const totalSamples = Math.ceil(capture.duration * sampleRate);
const bytes = Buffer.alloc(44 + totalSamples * 4);

bytes.write('RIFF', 0);
bytes.writeUInt32LE(bytes.length - 8, 4);
bytes.write('WAVEfmt ', 8);
bytes.writeUInt32LE(16, 16);
bytes.writeUInt16LE(1, 20);
bytes.writeUInt16LE(2, 22);
bytes.writeUInt32LE(sampleRate, 24);
bytes.writeUInt32LE(sampleRate * 4, 28);
bytes.writeUInt16LE(4, 32);
bytes.writeUInt16LE(16, 34);
bytes.write('data', 36);
bytes.writeUInt32LE(totalSamples * 4, 40);

const beatsPerMinute = 128;
const beatLength = 60 / beatsPerMinute;
const chords = [
  [48, 51, 55],
  [44, 48, 51],
  [51, 55, 58],
  [46, 50, 53]
];
const melody = [72, 75, 79, 75, 77, 75, 72, 70, 68, 72, 75, 79, 82, 79, 77, 75];
const impacts = capture.timeline.map(scene => scene.start);
let noiseState = 918273;

function frequency(midi) {
  return 440 * 2 ** ((midi - 69) / 12);
}

function noise() {
  noiseState = noiseState * 16807 % 2147483647;
  return noiseState / 1073741823.5 - 1;
}

function oscillator(note, time, shape = 'sine') {
  const phase = Math.sin(Math.PI * 2 * frequency(note) * time);
  return shape === 'square' ? Math.sign(phase) : phase;
}

for (let sampleIndex = 0; sampleIndex < totalSamples; sampleIndex++) {
  const time = sampleIndex / sampleRate;
  const beat = time / beatLength;
  const beatIndex = Math.floor(beat);
  const beatPhase = beat - beatIndex;
  const halfBeatPhase = (beat * 2) % 1;
  const chord = chords[Math.floor(beatIndex / 8) % chords.length];
  const scene = capture.timeline.find(item => time >= item.start && time < item.start + item.duration);
  const sceneName = scene?.name || '';
  const actionScene = /boss|chase|Cellar|Rocket/i.test(sceneName);
  const quietScene = /Restaurant|Fanta|Rift|Flow|Backpack|Badge|Lobby/i.test(sceneName);
  const intensity = actionScene ? 1.18 : quietScene ? .72 : .94;

  const pad = chord.reduce((sum, note, index) => sum + oscillator(note, time + index * .013) * .055, 0);
  const bass = oscillator(chord[0] - 12, time, 'square') * Math.exp(-beatPhase * 3.2) * .13;
  const arpeggioNote = chord[Math.floor(beat * 2) % chord.length] + 12;
  const arpeggio = oscillator(arpeggioNote, time, 'square') * Math.exp(-halfBeatPhase * 6) * .055 * intensity;
  const melodyNote = melody[Math.floor(beat) % melody.length];
  const lead = oscillator(melodyNote, time) * Math.exp(-beatPhase * 2.8) * (actionScene ? .065 : .035);

  const kick = Math.sin(Math.PI * 2 * (62 - beatPhase * 34) * time) * Math.exp(-beatPhase * 16) * .34 * intensity;
  const snarePhase = beatIndex % 2 === 1 ? beatPhase : 1;
  const snare = noise() * Math.exp(-snarePhase * 18) * .12 * intensity;
  const hat = noise() * Math.exp(-halfBeatPhase * 28) * .032 * intensity;

  let impact = 0;
  for (const impactTime of impacts) {
    const elapsed = time - impactTime;
    if (elapsed >= 0 && elapsed < .75) {
      impact += Math.sin(Math.PI * 2 * 48 * elapsed) * Math.exp(-elapsed * 6) * .28;
      impact += noise() * Math.exp(-elapsed * 12) * .055;
    }
  }

  const releaseFanfare = sceneName === 'Release card'
    ? (oscillator(72, time) + oscillator(76, time) + oscillator(79, time)) * .055
    : 0;
  const fadeIn = Math.min(1, time / .6);
  const fadeOut = Math.min(1, (capture.duration - time) / 1.8);
  const master = Math.max(0, Math.min(fadeIn, fadeOut));
  const left = Math.tanh((pad + bass + arpeggio * .9 + lead + kick + snare + hat + impact + releaseFanfare) * master * 1.15);
  const right = Math.tanh((pad + bass + arpeggio * 1.1 + lead * .92 + kick + snare + hat + impact + releaseFanfare) * master * 1.15);
  const offset = 44 + sampleIndex * 4;
  bytes.writeInt16LE(Math.round(left * 32767), offset);
  bytes.writeInt16LE(Math.round(right * 32767), offset + 2);
}

const destination = path.join(outputDirectory, 'last-door-rising.wav');
await writeFile(destination, bytes);
console.log(`Original trailer theme written: ${destination}`);
