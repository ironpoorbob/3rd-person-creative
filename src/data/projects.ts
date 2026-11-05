import type { ImageMetadata } from 'astro';
import placeBrandingLogo from '../assets/img/projects/place-branding/place _branding_IMAGES_01.png';
import placeBrandingTruck from '../assets/img/projects/place-branding/place _branding_IMAGES_02.jpg';
import placeBrandingMesaIdentity from '../assets/img/projects/place-branding/place _branding_IMAGES_03.jpg';
import placeBrandingMesaSign from '../assets/img/projects/place-branding/place _branding_IMAGES_04.jpg';
import placeBrandingBanners from '../assets/img/projects/place-branding/identity_IMAGES_01a.jpg';
export interface Project { title: string; category: string; location?: string; year?: string; image: ImageMetadata; alt: string; teaser?: { subheadline?: string; description: string; images?: {src: ImageMetadata; alt: string}[] } }
import packagingImage1 from '../assets/img/projects/packaging/packaging_IMAGES_01.jpg';
import packagingImage2 from '../assets/img/projects/packaging/packaging_IMAGES_02.jpg';
import identityImage1 from '../assets/img/projects/identity/Identity_IMAGES_01.jpg';
import identityImage2 from '../assets/img/projects/identity/Identity_IMAGES_02.jpg';
import identityImage3 from '../assets/img/projects/identity/Identity_IMAGES_03.jpg';
import identityImage4 from '../assets/img/projects/identity/Identity_IMAGES_04.jpg';
import identityImage5 from '../assets/img/projects/identity/Identity_IMAGES_05.jpg';
import eventImage1 from '../assets/img/projects/event-marketing/Event_IMAGES_01.jpg';
import eventImage2 from '../assets/img/projects/event-marketing/Event_IMAGES_02.jpg';
import illustrationImage1 from '../assets/img/projects/illustration/Illustration_IMAGES_01.jpg';
import illustrationImage2 from '../assets/img/projects/illustration/Illustration_IMAGES_02.jpg';
import illustrationImage3 from '../assets/img/projects/illustration/Illustration_IMAGES_03.jpg';
import illustrationImage4 from '../assets/img/projects/illustration/Illustration_IMAGES_04.jpg';

export const projects: Project[] = [
  {
    title: "Giving Places a Personality",
    category: "Place Branding",
    image: placeBrandingBanners,
    alt: "Downtown Berkeley place branding",
    teaser: {
      subheadline: "Giving places a personality. And people a reason to connect.",
      description: "Every place has a story worth telling. We combine strategy, community insights, and creative storytelling to build distinctive identities that celebrate local character, inspire connection, and create a lasting sense of place. From downtown districts to vibrant destinations, we turn what makes a place unique into a brand people can see, feel, and experience.",
      images: [
        { src: placeBrandingLogo, alt: "Downtown Berkeley logo with the tagline Journeys Start Here" },
        { src: placeBrandingBanners, alt: "Downtown Berkeley street banners featuring the place branding" },
        { src: placeBrandingTruck, alt: "Yellow Downtown Berkeley truck with branded graphics" },
        { src: placeBrandingMesaIdentity, alt: "Downtown Mesa and Downtown Mesa Association logo designs" },
        { src: placeBrandingMesaSign, alt: "Downtown Mesa wall sign with the tagline Uniquely Local" },
      ],
    }
  },
  {
    title: "Packaging That Tells a Story",
    category: "Package Design",
    image: packagingImage2,
    alt: "Doc Fogarty's can packaging",
    teaser: {
      description: "Great packaging is more than a pretty label. It's where brand strategy, storytelling, and design come together to create something memorable. From bold, playful identities to packaging rooted in a sense of place, we create designs that capture a brand's personality, connect with its audience, and stand out on the shelf.",
      images: [
        { src: packagingImage1, alt: "Orange, blue, and green canned cocktail packaging" },
        { src: packagingImage2, alt: "Doc Fogarty's Mountain Cherry and Skyline Kiwi beverage cans" },
      ],
    }
  },
  {
    title: "Making Brands Unmistakable",
    category: "Identity",
    image: identityImage3,
    alt: "Bird Snapper feather symbol and non-alcoholic cocktail logo",
    teaser: {
      description: "An effective identity is more than a logo. We combine strategy, storytelling, and thoughtful design to create distinctive visual marks that capture a brand's personality, communicate its purpose, and leave a lasting and memorable impression.",
      images: [
        { src: identityImage1, alt: "Bird Snapper feather symbol and non-alcoholic cocktail logo" },
        { src: identityImage2, alt: "Badass Women in Wine logo designs" },
        { src: identityImage3, alt: "Christina Deeb business cards and geometric brand identity" },
        { src: identityImage4, alt: "Doc Fogarty's non-alcoholic natural spritz logo" },
        { src: identityImage5, alt: "The Charlie Cart Project and podcast food education logos" },
      ],
    }
  },
  {
    title: "Making Moments Memorable",
    category: "Event Branding",
    image: eventImage2,
    alt: "Publishers Group West 50th anniversary poster and identity",
    teaser: {
      description: "From milestone celebrations to one-of-a-kind experiences, we bring events to life through distinctive visual identities, creative storytelling, and thoughtfully designed materials that set the tone and make a lasting impression.",
      images: [
        { src: eventImage1, alt: "Publishers Group West 50th anniversary poster and identity" },
        { src: eventImage2, alt: "Record-inspired event invitations and Bald Eagle Mountain event poster" },
      ],
    }
  },
  {
    title: "Bringing Ideas to Life",
    category: "Illustration",
    image: illustrationImage4,
    alt: "Hand-drawn black-and-white illustrations of everyday objects, animals, and a restaurant sign",
    teaser: {
      description: "From playful characters to bold, expressive artwork, we create original illustrations that tell stories, spark curiosity, and give brands a distinctive visual voice. Whether whimsical or sophisticated, every illustration brings personality, imagination, and a little unexpected magic to the mix.",
      images: [
        { src: illustrationImage1, alt: "Hand-drawn black-and-white illustrations of everyday objects, animals, and a restaurant sign" },
        { src: illustrationImage2, alt: "Red illustrated characters in a Charlie Cart cooking comic" },
        { src: illustrationImage3, alt: "Cabernet Voltaire wine label and bottle with illustrated figures" },
        { src: illustrationImage4, alt: "Black-and-white illustrations of food, wine, and table settings" },
      ],
    }
  }
];
