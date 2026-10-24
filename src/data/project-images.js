import gamingGearHighFidelity from "../assets/gaming_gear/Highfidelity.png";
import ectrimsBoothHero from "../assets/ectrims_booth/Cenrifki2.png";
import sibosHero from "../assets/sibos_tote/hero.png";
import icotydeOverview from "../assets/icotyde-overview.webp";
import sftHero from "../assets/secure_file_transfer/hero.jpeg";
import lillyBoothHero from "../assets/lilly_booth/lilly.webp";
import imaavyCaregiverHero from "../assets/imaavy caregiver/2_02_1.1 Landing.png";
import icotydeDesktopThumb from "../assets/thumbnails/icotyde-desktop.webp";
import imaavyDesktopThumb from "../assets/thumbnails/imaavy-desktop.webp";
import imaavyMobileThumb from "../assets/thumbnails/imaavy-mobile.webp";
import icotydeMobileThumb from "../assets/thumbnails/icotyde-mobile.webp";
import ectrimsIvaThumb from "../assets/thumbnails/ectrims-iva.webp";
import gamingSplashThumb from "../assets/thumbnails/gaming-splash.webp";
import gamingLandingThumb from "../assets/thumbnails/gaming-landing.webp";
import gamingProductThumb from "../assets/thumbnails/gaming-product.webp";
import melodyDiscoverThumb from "../assets/melody/discover.png";
import melodyDropThumb from "../assets/melody/drop-pick-a-song.png";
import melodyAvatarThumb from "../assets/melody/avatar-editor.png";

export const heroImages = {
  "gaming-gear-highfidelity": gamingGearHighFidelity,
  "ectrims-booth-hero": ectrimsBoothHero,
  "sibos-tote-hero": sibosHero,
  "icotyde-overview": icotydeOverview,
  "sft-hero": sftHero,
  "lilly-booth-hero": lillyBoothHero,
  "imaavy-caregiver-hero": imaavyCaregiverHero,
  "melody-discover": melodyDiscoverThumb,
};

export const thumbnailImages = {
  "icotyde-desktop": icotydeDesktopThumb,
  "imaavy-desktop": imaavyDesktopThumb,
  "imaavy-mobile": imaavyMobileThumb,
  "icotyde-mobile": icotydeMobileThumb,
  "ectrims-iva": ectrimsIvaThumb,
  "gaming-splash": gamingSplashThumb,
  "gaming-landing": gamingLandingThumb,
  "gaming-product": gamingProductThumb,
  "melody-discover": melodyDiscoverThumb,
  "melody-drop-pick-a-song": melodyDropThumb,
  "melody-avatar-editor": melodyAvatarThumb,
};

export function getHeroImageSource(heroImage) {
  return heroImages[heroImage] || icotydeOverview;
}
