import bus from '../images/locations/bus.png';
import mazeBankArena from '../images/locations/mazeBankArena.jpeg';
import motel from '../images/locations/motel.png';
import pier from '../images/locations/pier.jpeg';
import subwayStation from '../images/locations/subwayStation.jpeg';
import sandyShores from '../images/locations/sandyShores.jpeg';
import grapeseed from '../images/locations/grapeseed.jpeg';
import paletoBay from '../images/locations/paletoBay.jpeg';
import mrpd from '../images/locations/mrpd.jpeg';

export const locationConfig: {
  [key: string]: {
    imageSrc: string;
    title: string;
    coords?: { x: number; y: number; z: number; h: number };
  }[];
} = {
  'Los Santos': [
    {
      title: 'Bus Station',
      imageSrc: bus,
      coords: { x: 432.57, y: -646.4, z: 28.73, h: 86.75 },
    },
    {
      title: 'Maze Bank Arena',
      imageSrc: mazeBankArena,
      coords: { x: -212.66, y: -2002.56, z: 27.76, h: 260.89 },
    },
    {
      title : 'Mission Raw PD',
      imageSrc: mrpd,
      coords: { x: 451.76, y: -938.26, z: 28.57, h: 178.19 },
    },
    {
      title: 'Motel',
      imageSrc: motel,
      coords: { x: 326.95, y: -206.18, z: 54.09, h: 155.53 },
    },
    {
      title: 'Pier',
      imageSrc: pier,
      coords: { x: -1602.69, y: -1045.14, z: 13.04, h: 143.04 },
    },
    {
      title: 'Subway Station',
      imageSrc: subwayStation,
      coords: { x: -507.79, y: -670.15, z: 11.81, h: 358.97 },
    },
  ],
  'Sandy Shores': [
    {
      title: 'Sandy Shores',
      imageSrc: sandyShores,
      coords: { x: 2049.15, y: 3726.82, z: 32.91, h: 266.85 },
    },
  ],
  'Grapeseed': [
    {
      imageSrc: grapeseed,
      title: 'Grapeseed',
      coords: { x: 1677.29, y: 4920.54, z: 42.07, h: 25.79 },
    },
  ],
  'Paleto Bay': [
    {
      title: 'Paleto Bay',
      imageSrc: paletoBay,
      coords: { x: -418.67, y: 5983.14, z: 31.55, h: 288.68 },
    },
  ],
};



