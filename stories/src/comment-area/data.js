// @flow
import finnImg from '../../static/media/finn-min.png';
import bmoImg from '../../static/media/bmo-min.png';
import princessImg from '../../static/media/princess-min.png';
import jakeImg from '../../static/media/jake-min.png';

const entites = [
  {
    id: 'entity-0',
    name: 'Finn',
    avatarUrl: finnImg,
    comment: 'This looks so cute!',
    lastTime: '19/01/22',
    children: [],
  },
  {
    id: 'entity-1',
    name: 'Bmo',
    avatarUrl: bmoImg,
    comment: 'Agree with @Finn. I like it!',
    background: '#ffffff',
    lastTime: '19/01/23',
    children: [],
  },
  {
    id: 'entity-2',
    name: 'Princess',
    avatarUrl: princessImg,
    comment: 'Hmmmmm, It let me feel uncomfortable.',
    lastTime: '19/01/23',
    children: [],
  },
  {
    id: 'entity-3',
    name: 'Jake',
    avatarUrl: jakeImg,
    comment:
      '@Princess, why you feel uncomfortable? I want know more about detail.',
    lastTime: '19/01/23',
    children: [],
  },
  {
    id: 'entity-4',
    name: 'Princess',
    avatarUrl: princessImg,
    comment: "I think the reason is the color. It's too pinky @Jake",
    lastTime: '19/01/25',
    children: [],
  },
  {
    id: 'entity-5',
    name: 'Jake',
    avatarUrl: jakeImg,
    comment: 'Oh, I see. Now I agree with you @Princess',
    lastTime: '19/01/29',
    children: [],
  },
  {
    id: 'entity-6',
    name: 'Finn',
    avatarUrl: finnImg,
    comment: `Take it easy, guys. I just talked about my feeling. It let me feel lovely`,
    lastTime: '19/01/29',
    children: [],
  },
];

export default entites;
