/**
 * Cloudinary media map — curated images from the social-content library
 * mapped to page topics so every landing, squeeze, and resource page
 * gets a relevant hero/accent image automatically.
 *
 * All public_ids are relative to cloud "dtmh3eypz".
 */

/** Topic-keyed image selections from the 594-image Cloudinary library */
const topicImages: Record<string, string[]> = {
  // Buyer topics
  buyer: [
    "ChatGPT_Image_Dec_30_2025_06_11_37_AM_omsdj3",   // July buyer content
    "ChatGPT_Image_Dec_23_2025_09_46_47_AM_zlyu81",   // Deposits / financing
    "ChatGPT_Image_Dec_31_2025_04_05_25_PM_fgdbvk",   // July buyer guidance
  ],
  "first-time": [
    "ChatGPT_Image_Dec_31_2025_04_21_38_PM_tki78m",
    "ChatGPT_Image_Dec_31_2025_04_25_37_PM_idbb07",
  ],
  relocation: [
    "ChatGPT_Image_Dec_31_2025_04_29_56_PM_gvwvhr",
    "ChatGPT_Image_Dec_31_2025_04_37_59_PM_xd7nh9",
  ],
  "river-town": [
    "ChatGPT_Image_Dec_31_2025_04_40_55_PM_rt4um6",
    "ChatGPT_Image_Dec_31_2025_07_06_39_PM_eeadgk",
  ],

  // Seller topics
  seller: [
    "ChatGPT_Image_Dec_24_2025_12_32_33_AM_okdfsc",   // Closing delays
    "ChatGPT_Image_Dec_24_2025_01_55_52_AM_qf1h9i",   // Timing the sale
    "ChatGPT_Image_Dec_24_2025_12_36_12_AM_vkp7ok",   // Keys
  ],
  valuation: [
    "ChatGPT_Image_Dec_24_2025_12_41_18_AM_yehgwy",   // Money/timing
    "ChatGPT_Image_Dec_24_2025_01_40_29_AM_nkrnrz",   // Closing costs
  ],
  launch: [
    "ChatGPT_Image_Dec_24_2025_12_39_39_AM_kp1mlm",   // Walkthrough
    "ChatGPT_Image_Dec_24_2025_01_42_39_AM_xuurlb",   // Seller closing
  ],
  staging: [
    "ChatGPT_Image_Dec_24_2025_12_28_55_AM_vmfmjf",   // Closing day feel
  ],

  // Motivated seller / distress topics
  divorce: [
    "ChatGPT_Image_Jan_14_2026_04_36_51_AM_ccxlpn",
  ],
  probate: [
    "ChatGPT_Image_Jan_14_2026_04_43_23_AM_weys9b",
  ],
  foreclosure: [
    "ChatGPT_Image_Jan_14_2026_04_54_25_AM_qsnes0",
  ],
  inherited: [
    "ChatGPT_Image_Jan_14_2026_05_00_36_AM_gzx4lq",
  ],
  "tax-lien": [
    "ChatGPT_Image_Jan_14_2026_05_02_24_AM_qgicug",
  ],
  vacant: [
    "ChatGPT_Image_Jan_14_2026_05_05_45_AM_vc3rsg",
  ],
  downsizing: [
    "ChatGPT_Image_Jan_14_2026_05_29_48_AM_a7msrt",
  ],
  behind: [
    "ChatGPT_Image_Jan_14_2026_05_34_29_AM_wm2h9y",
  ],
  "code-violation": [
    "ChatGPT_Image_Jan_14_2026_05_38_15_AM_yfhdyh",
  ],

  // Investor topics
  investor: [
    "Gemini_Generated_Image_g7nfieg7nfieg7nf_xtwprh",  // Oct investor
    "ChatGPT_Image_Jan_3_2026_04_07_35_AM_hlvz04",     // Sept wide
    "Gemini_Generated_Image_hrzzy2hrzzy2hrzz_aqeigy",   // Sept square
  ],

  // Seasonal / market timing
  negotiation: [
    "ChatGPT_Image_Dec_23_2025_08_15_10_AM_v1ulpo",   // Taking negotiations personally
    "ChatGPT_Image_Jan_3_2026_03_22_52_AM_jucpom",    // Holiday countdown
    "ChatGPT_Image_Jan_3_2026_05_27_37_AM_zzlhny",    // Holiday schedule shift
  ],
  market: [
    "ChatGPT_Image_Jan_2_2026_08_15_43_AM_c2djfb",    // August buyer advantage
    "ChatGPT_Image_Jan_2_2026_08_25_52_AM_rfqvsn",    // August price drop
    "ChatGPT_Image_Jan_3_2026_04_28_30_AM_l2xgqt",    // November calm
  ],
  inspection: [
    "ChatGPT_Image_Dec_24_2025_12_08_16_AM_dprohe",   // New construction inspections
    "ChatGPT_Image_Dec_23_2025_11_35_49_PM_p4pls3",   // Zoom-in problem
  ],
  closing: [
    "ChatGPT_Image_Dec_24_2025_12_28_55_AM_vmfmjf",   // Closing day
    "ChatGPT_Image_Dec_24_2025_12_32_33_AM_okdfsc",   // Last-minute delay
    "ChatGPT_Image_Dec_24_2025_12_44_04_AM_hjeb10",   // Week of closing
  ],

  // AI / systems
  ai: [
    "Gemini_Generated_Image_9tsnza9tsnza9tsn_jsi8re",
    "Gemini_Generated_Image_86kx1886kx1886kx_wr9ay3",
  ],

  // General / fallback
  general: [
    "ChatGPT_Image_Jan_13_2026_05_42_18_AM_mkzftb",
    "ChatGPT_Image_Jan_13_2026_07_59_22_AM_hzhkcy",
    "ChatGPT_Image_Jan_13_2026_08_31_01_AM_gbf8hf",
    "ChatGPT_Image_Jan_13_2026_08_45_52_AM_b11gfe",
    "ChatGPT_Image_Jan_13_2026_08_50_54_AM_onotpu",
    "ChatGPT_Image_Jan_13_2026_08_55_31_AM_qsv8li",
  ],
};

/**
 * Stable hash so the same slug always picks the same image
 * without needing a database or manual assignment.
 */
function stableIndex(slug: string, count: number): number {
  let hash = 0;
  for (let i = 0; i < slug.length; i++) {
    hash = (hash * 31 + slug.charCodeAt(i)) | 0;
  }
  return Math.abs(hash) % count;
}

/**
 * Returns a Cloudinary public_id for a given page slug and optional topic hints.
 * Falls back through topic hierarchy → general pool.
 */
export function getPageImage(slug: string, topics: string[] = []): string {
  // Try each topic in order
  for (const topic of topics) {
    const images = topicImages[topic];
    if (images?.length) {
      return images[stableIndex(slug, images.length)];
    }
  }

  // Try slug fragments as topics
  const slugParts = slug.split("-");
  for (const part of slugParts) {
    const images = topicImages[part];
    if (images?.length) {
      return images[stableIndex(slug, images.length)];
    }
  }

  // Fallback to general pool
  const general = topicImages.general;
  return general[stableIndex(slug, general.length)];
}

/**
 * Maps a lead category to its topic key for image lookup.
 */
export function getCategoryTopic(category: string): string[] {
  switch (category) {
    case "buyers":
      return ["buyer", "first-time", "relocation"];
    case "sellers":
      return ["seller", "valuation", "launch"];
    case "investors":
      return ["investor", "market"];
    case "referrals":
      return ["general"];
    default:
      return ["general"];
  }
}
