import gamingGearHighFidelity from "../assets/gaming_gear/Highfidelity.png";
import ectrimsBoothHero from "../assets/ectrims_booth/Cenrifki2.png";
import sibosHero from "../assets/sibos_tote/hero.png";
import icotydeOverview from "../assets/icotyde-overview.webp";
import sftHero from "../assets/secure_file_transfer/hero.jpeg";
import lillyBoothHero from "../assets/lilly_booth/lilly.webp";

export const heroImages = {
  "gaming-gear-highfidelity": gamingGearHighFidelity,
  "ectrims-booth-hero": ectrimsBoothHero,
  "sibos-tote-hero": sibosHero,
  "icotyde-overview": icotydeOverview,
  "sft-hero": sftHero,
  "lilly-booth-hero": lillyBoothHero,
};

export function getHeroImageSource(heroImage) {
  return heroImages[heroImage] || icotydeOverview;
}
