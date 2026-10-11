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
import ectrimsIvaThumb from "../assets/thumbnails/ectrims-iva.webp";
import gamingSplashThumb from "../assets/thumbnails/gaming-splash.webp";
import gamingLandingThumb from "../assets/thumbnails/gaming-landing.webp";
import gamingProductThumb from "../assets/thumbnails/gaming-product.webp";

export const heroImages = {
  "gaming-gear-highfidelity": gamingGearHighFidelity,
  "ectrims-booth-hero": ectrimsBoothHero,
  "sibos-tote-hero": sibosHero,
  "icotyde-overview": icotydeOverview,
  "sft-hero": sftHero,
  "lilly-booth-hero": lillyBoothHero,
  "imaavy-caregiver-hero": imaavyCaregiverHero,
};

export const thumbnailImages = {
  "icotyde-desktop": icotydeDesktopThumb,
  "imaavy-desktop": imaavyDesktopThumb,
  "imaavy-mobile": imaavyMobileThumb,
  "ectrims-iva": ectrimsIvaThumb,
  "gaming-splash": gamingSplashThumb,
  "gaming-landing": gamingLandingThumb,
  "gaming-product": gamingProductThumb,
};

export function getHeroImageSource(heroImage) {
  return heroImages[heroImage] || icotydeOverview;
}
