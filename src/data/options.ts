import carnivalImg from '../assets/challenge/carnival.jpg'
import caveImg from '../assets/challenge/cave.jpg'
import crewImg from '../assets/challenge/crew.jpg'
import cultImg from '../assets/challenge/cult.jpg'
import darklordImg from '../assets/challenge/darklord.jpg'
import dragonImg from '../assets/challenge/dragon.jpg'
import giantImg from '../assets/challenge/giant.jpg'
import hoardImg from '../assets/challenge/hoard.jpg'
import idolImg from '../assets/challenge/idol.jpg'
import lichImg from '../assets/challenge/lich.jpg'
import raceImg from '../assets/challenge/race.jpg'
import ringImg from '../assets/challenge/ring.jpg'
import sashImg from '../assets/challenge/sash.jpg'
import staffImg from '../assets/challenge/staff.jpg'
import swordImg from '../assets/challenge/sword.jpg'
import templeImg from '../assets/challenge/temple.jpg'
import tombImg from '../assets/challenge/tomb.jpg'
import trainImg from '../assets/challenge/train.jpg'
import bardIcon from '../assets/classes/bard.png'
import priestIcon from '../assets/classes/priest.png'
import rogueIcon from '../assets/classes/rogue.png'
import warriorIcon from '../assets/classes/warrior.png'
import wizardIcon from '../assets/classes/wizard.png'
import type { CharClass, GameLocation, Relic, Villain } from '../types'

export type OptionMeta = {
  name: string
  blurb: string
  expansion: boolean // True for decks from the "Kind of a Big Deal" expansion
  image?: string // for challenge decks
  icon?: string  // for class cards
}

export const VILLAIN_META: Record<Villain, OptionMeta> = {
  lich: {
    name: 'Lich',
    blurb: 'Undead wizard with vile servants.',
    expansion: false,
    image: lichImg,
  },
  dragon: {
    name: 'Dragon',
    blurb: 'Ancient, powerful, determined to destroy you.',
    expansion: false,
    image: dragonImg,
  },
  darklord: {
    name: 'Dark Lord',
    blurb: 'Cruel tyrant with an army of gerblins.',
    expansion: false,
    image: darklordImg,
  },
  cult: {
    name: 'Cult',
    blurb: 'Nefarious conspiracy with ties to dark powers.',
    expansion: false,
    image: cultImg,
  },
  crew: {
    name: 'Crew',
    blurb: 'Band of bullies with matching outfits.',
    expansion: true,
    image: crewImg,
  },
  giant: {
    name: 'Giant',
    blurb: 'A really big problem.',
    expansion: true,
    image: giantImg,
  },
}

export const LOCATION_META: Record<GameLocation, OptionMeta> = {
  cave: {
    name: 'Cave',
    blurb: 'Twisting tunnels filled with foul monsters.',
    expansion: false,
    image: caveImg
  },
  tomb: {
    name: 'Tomb',
    blurb: 'Vengeful ghosts guard ancient treasures.',
    expansion: false,
    image: tombImg },
  temple: {
    name: 'Temple',
    blurb: 'Sinister forces lurk in gilded shadows.',
    expansion: false,
    image: templeImg },
  train: {
    name: 'Train',
    blurb: 'Catch the villain before the end of the line.',
    expansion: false,
    image: trainImg
  },
  carnival: {
    name: 'Carnival',
    blurb: 'Uncanny games and mirrored halls.',
    expansion: true,
    image: carnivalImg
  },
  race: {
    name: 'Race',
    blurb: 'Sick stunts in a tricked-out battlewagon.',
    expansion: true,
    image: raceImg
  },
}

export const RELIC_META: Record<Relic, OptionMeta> = {
  staff: {
    name: 'Staff',
    blurb: 'Evokes elemental fire and ice.',
    expansion: false,
    image: staffImg
  },
  idol: {
    name: 'Idol',
    blurb: 'Alters reality, twists time and space.',
    expansion: false,
    image: idolImg
  },
  ring: {
    name: 'Ring',
    blurb: 'Conjures illusions and nightmares.',
    expansion: false,
    image: ringImg
  },
  hoard: {
    name: 'Hoard',
    blurb: 'Draws many rival seekers of cursed fortune.',
    expansion: false,
    image: hoardImg
  },
  sword: {
    name: 'Sword',
    blurb: 'Inflicts brutal wounds, literal and figurative.',
    expansion: true,
    image: swordImg
  },
  sash: {
    name: 'Sash',
    blurb: 'Grants absolute power over nature.',
    expansion: true,
    image: sashImg
  },
}

export const CLASS_META: Record<CharClass, Omit<OptionMeta, 'expansion'>> = {
  warrior: { name: 'Warrior', blurb: 'Charge into battle.\nStrong against monsters.', icon: warriorIcon },
  priest: { name: 'Priest', blurb: 'Heal allies.\nStrong against spooky threats.', icon: priestIcon },
  wizard: { name: 'Wizard', blurb: 'Cast spells.\nStrong against magical threats.', icon: wizardIcon },
  rogue: { name: 'Rogue', blurb: 'Coordinate with allies.\nStrong against traps.', icon: rogueIcon },
  bard: { name: 'Bard', blurb: 'Inspire allies.\nStrong against relic challenges.', icon: bardIcon },
}
