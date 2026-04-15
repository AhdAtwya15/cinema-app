import type { INewsItem } from "@/types";

const CDN = "https://res.cloudinary.com/df2nbeovz/image/upload/f_auto,q_auto,w_800";

const N1 = `${CDN}/v1775851552/N1_xdo9ln.jpg`;
const N2 = `${CDN}/v1775851553/N2_xkcdb2.avif`;
const N3 = `${CDN}/v1775851555/N3_tvllc2.avif`;
const N4 = `${CDN}/v1775851557/N4_jdjtap.avif`;
const N5 = `${CDN}/v1775851560/N5_rlawiq.png`;
const N6 = `${CDN}/v1775851563/N6_zr8jkn.avif`;




export const sampleNews: INewsItem[] = [
    {
        id: 1,
        title: "Midnight Premiere Shocks Audiences — Visuals Break the Internet",
        excerpt:
            "A surprise midnight premiere left fans stunned with groundbreaking VFX and an unforgettable score. Critics call it a new benchmark for cinematic spectacle.",
        image: N1,
        time: "2h ago",
        date: "Sep 14, 2025",
        category: "Premiere",
        source: "CinePulse",
    },
    {
        id: 2,
        title: "Director Reveals Secret Cameo — Fans Go Wild",
        excerpt:
            "An unannounced cameo by a legendary actor briefly appears during an action sequence.",
        image: N2,
        category: "Exclusive",
        source: "ReelInsider",
    },
    {
        id: 3,
        title: "Composer Drops Teaser — Score Promises Haunting Themes",
        excerpt:
            "A 30-second teaser of the film's score hints at a haunting orchestral motif.",
        image: N3,
        category: "Music",
        source: "SoundStage",
    },
    {
        id: 4,
        title: "Stunt Team Reveals Behind-the-Scenes Reel",
        excerpt:
            "The stunt reel shows daring choreography and practical effects that almost defy belief.",
        image: N4,
        category: "Featurette",
    },
    {
        id: 5,
        title: "Box Office Early Estimates Predict Massive Opening",
        excerpt:
            "Early pre-sales and industry tracking estimate a massive opening weekend — analysts say it's the comeback the genre needed.",
        image: N5,
        time: "3d ago",
        date: "Sep 11, 2025",
        category: "Box Office",
        source: "MarketReel",
    },
    {
        id: 6,
        title: "Costume Designer on Creating a Dystopian Wardrobe",
        excerpt:
            "From fabric to silhouette, the costume designer explains how subtle choices shaped characters' journeys and the film's oppressive world.",
        image: N6,
        time: "4d ago",
        date: "Sep 10, 2025",
        category: "Design",
        source: "CineCraft",
    },
];