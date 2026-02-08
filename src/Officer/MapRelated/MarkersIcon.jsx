import { Icon } from "leaflet";

// import yellowPng from "../../assets/Yellow.png";
import redPng from "../../assets/image.png";
import orangePng from "../../assets/place.png";
import YellowPng from "../../assets/Yellow.png"
import BlackPng from "../../assets/pin2.png"
export const YellowCustomIcon = new Icon({
  iconUrl: YellowPng,
  iconSize: [25, 25]
});

export const RedCustomIcon = new Icon({
  iconUrl: redPng,
  iconSize: [25, 25]
});

export const OrangeCustomIcon = new Icon({
  iconUrl: orangePng,
  iconSize: [25, 25]
});
export const BlackCustomIcon = new Icon({
  iconUrl: BlackPng,
  iconSize: [25, 25]
});