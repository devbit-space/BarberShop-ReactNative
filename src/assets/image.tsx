import userAvatar from "./image/mainscreen/user-avatar.png";
import assistAvatar from "./image/mainscreen/assist-avatar.png";
import botAvatar from "./image/mainscreen/bot.jpg";

import card from "./image/icons/card.png";
import home from "./image/icons/home.png";
import audio from "./image/icons/audiio.png";
import plusCircle from "./image/icons/plus-circle.png";
import notification from "./image/icons/notification.png";
import leftWhite from "./image/icons/left-white.png";
import right from "./image/icons/right.png";
import left from "./image/icons/left.png";
import pause from "./image/icons/pause.png";
import pauseWhite from "./image/icons/pause-white.png";
import cancelWhite from "./image/icons/cancel-white.png";
import playWhite from "./image/icons/play-white.png";
import waveForm from "./image/icons/wave-from.png";
import playVolume from "./image/icons/play-volume.png";
import muteVolume from "./image/icons/mute-volume.png";
import play from "./images/play.png";
import nextWhite from "./image/icons/next-white.png";
import prevWhite from "./image/icons/prev-white.png";
import close from "./image/icons/close.png";

import appointments from "./image/icons/appointments.png";
import packages from "./image/icons/packages.png";
import orderHistory from "./image/icons/other_history.png";
import logout from "./image/icons/logout.png";

import timer from "./image/icons/timer.png";

import product1 from "./image/order-history/product-1.png";
import product2 from "./image/order-history/product-2.png";
import product3 from "./image/order-history/product-3.png";
import product4 from "./image/order-history/product-4.png";

import package1 from "./image/package/package-1.png";
import package2 from "./image/package/package-2.png";
import package3 from "./image/package/package-3.png";

export const userAvatarImg = userAvatar;
export const assistAvatarImg = assistAvatar;
export const botAvatarImg = botAvatar;

export const cardIcon = card;
export const homeIcon = home;
export const audioIcon = audio;
export const plusCircleIcon = plusCircle;
export const notificationIcon = notification;
export const leftWhiteIcon = leftWhite;
export const rightIcon = right;
export const leftIcon = left;
export const pauseIcon = pause;
export const pauseWhiteIcon = pauseWhite;
export const cancelWhiteIcon = cancelWhite;
export const playWhiteIcon = playWhite;
export const waveFormIcon = waveForm;
export const playVolumeIcon = playVolume;
export const muteVolumeIcon = muteVolume;
export const playIcon = play;
export const nextWhiteIcon = nextWhite;
export const prevWhiteIcon = prevWhite;
export const closeIcon = close;

export const appointmentsIcon = appointments;
export const packagesIcon = packages;
export const orderHistoryIcon = orderHistory;
export const logoutIcon = logout;
export const timerIcon = timer;

export const productImg1 = product1;
export const productImg2 = product2;
export const productImg3 = product3;
export const productImg4 = product4;

export const packageImg1 = package1;
export const packageImg2 = package2;
export const packageImg3 = package3;

interface IMAGES {
    [key: string]: number
}

export const IMAGE: IMAGES = {
    eye: require('./images/eye.png'),
    tick: require('./images/tick.png'),
    signUp_Bg: require('./image/auth/sign-up.png'),
    login_bg: require('./image/auth/login.png'),
    login_loading: require('./image/auth/login-loading.png'),
    calender: require('./images/calender.png'),
    downArrow: require('./images/downArrow.png'),
    home: require('./images/home.png'),
    bell: require('./images/bell.png'),
    user: require('./images/user.png'),
    credit: require('./images/credit.png'),
    mic: require('./images/mic.png'),
    send: require('./images/send.png'),
    camera: require('./images/camera.jpg'),
    gallery: require('./images/gallery.jpg'),
    plus: require("./image/icons/plus.png"),
    pin: require("./images/pin.png"),
    cancel: require("./images/cacel-black.png"),
    bit: require("./images/bit.png"),
    purePlus: require("./images/purePlus.png"),
    card: require("./images/card.png"),
};