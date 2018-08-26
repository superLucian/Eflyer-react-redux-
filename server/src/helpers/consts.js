/* eslint-disable max-len */

module.exports = {
  USER_ROLES: ['USER', 'ADMIN'],
  USER_ROLE: {
    USER: 'USER',
    ADMIN: 'ADMIN',
  },

  FLYER_THEMES: [
    { title: 'black', color: '#333' },
    { title: 'magenta', color: '#ca1f7b' },
    { title: 'cyan', color: '#28589c' },
    { title: 'green', color: '#056608' }
  ],
  FLYER_FRONT_COVERS: [
    { title: 'Default', imgUrl: '/img/demo/front-covers/default_[theme].jpg', thumbnail: '/img/demo/front-covers/default_thumb.jpg', logoColorCode: 'CLR' },
    { title: 'Professional', imgUrl: '/img/demo/front-covers/professional_[theme].jpg', thumbnail: '/img/demo/front-covers/professional_thumb.jpg', logoColorCode: 'CLR' },
    { title: 'Nature', imgUrl: '/img/demo/front-covers/nature_[theme].png', thumbnail: '/img/demo/front-covers/nature_thumb.jpg', logoColorCode: 'REV' }
  ],
  FLYER_INSIDE_COVERS: [
    { title: 'Default', imgUrl: '/img/demo/inside-covers/default_[theme].jpg', thumbnail: '/img/demo/inside-covers/default_thumb.jpg' },
    { title: 'Luxury', imgUrl: '/img/demo/inside-covers/luxury_[theme].png', thumbnail: '/img/demo/inside-covers/luxury_thumb.png' },
    { title: 'Sky', imgUrl: '/img/demo/inside-covers/sky_[theme].jpg', thumbnail: '/img/demo/inside-covers/sky_thumb.jpg' }
  ],

}
