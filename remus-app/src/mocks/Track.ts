import { Track } from 'src/app/models/track.model';

const prefix: string = 'file:///android_asset/www/assets/music'

export const TRACKS: Track[] = [{
    name: 'Better Days',
    path: '/background/betterdays.mp3'
}, {
    name: 'Epic',
    path: '/background/epic.mp3'
}, {
    name: 'Evolution',
    path: '/background/evolution.mp3'
}, {
    name: 'Once Again',
    path: '/background/onceagain.mp3'
}, {
    name: 'Tomorrow',
    path: '/background/tomorrow.mp3'
}]

export const SOUNDS: Track[] = [{
    name: 'Dice Roll',
    path: '/sound/shake-and-roll-dice.mp3'
}, {
    name: 'Monster Growl',
    path: '/sound/scream-demon.mp3'
}, {
    name: 'Monster Scream',
    path: '/sound/scream-huge-monster-09.mp3'
}, {
    name: 'Vampire Scream',
    path: '/sound/scream-vampire.mp3'
}, {
    name: 'Sword swish',
    path: '/sound/sword-schwing-fast-thin.mp3'
}]