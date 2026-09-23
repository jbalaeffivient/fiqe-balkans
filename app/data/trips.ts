export type Day = {
  id: string;
  title: string;
  summary: string;
  body: string;
  meta: string;
  details?: string[];
};

export type Trip = {
  title: string;
  eyebrow: string;
  subtitle: string;
  image: string;
  secondaryImage?: string;
  mapUrl?: string;
  price: string;
  days: string;
  distance: string;
  difficulty: string;
  group: string;
  stay: string;
  season: string;
  countries: string;
  description: string[];
  highlights: string[];
  itinerary: Day[];
  included: string[];
  notIncluded: string[];
  faq?: { q: string; a: string }[];
  gearRequired?: string[];
  gearOptional?: string[];
  practical?: { label: string; text: string }[];
  note?: string;
};

const guidedFaq = [
  {
    q: "Where do I join the tour, and which airport should I use?",
    a: "We confirm the exact meeting point and time before departure. You can fly into Tirana, Podgorica, Pristina or Skopje. Arrivals via Pristina or Skopje usually start and finish in Pristina; Tirana or Podgorica arrivals start and finish in Shkodër, with onward transfers available after the trek.",
  },
  {
    q: "How large is the group?",
    a: "Open group dates run with a minimum of 4 and a maximum of 7 guests. At 4 confirmed travellers we guarantee departure. Private groups for friends or family can range from 2 to 12.",
  },
  {
    q: "What is included in the trip price?",
    a: "Listed prices are for the tour only (flights separate). Inclusions and exclusions are detailed in the Holiday Information section—typically lodging, trek meals, itinerary transport, park fees and border permits.",
  },
  {
    q: "Can I have a single room?",
    a: "Village lodging is limited, so single rooms are not always available. Most nights are twin or triple share. Solo travellers on open groups share with someone of the same gender when a single cannot be arranged.",
  },
  {
    q: "What if I need to cancel or transfer my booking?",
    a: "Please write to us as soon as you know. Cancellation charges follow our booking conditions; we will confirm what applies to your dates.",
  },
  {
    q: "Is there an age limit?",
    a: "There is no upper age limit. Travellers aged 80 or over may be asked a few fitness questions so we can confirm the itinerary suits you. On group departures the minimum age is 16; under-16s must travel with a parent or accompanying adult.",
  },
  {
    q: "Can I add nights before or after the trek?",
    a: "Yes. Extra nights at our usual start or end hotels are easy to arrange—mention it when you book and we will sort the details with you.",
  },
];

const guidedGearRequired = [
  "Sturdy hiking shoes or boots",
  "Trekking poles",
  "Daypack (30 L+)",
  "Sun hat, sunglasses, sunscreen, swimwear",
  "Waterproof jacket and rain trousers",
  "Warm fleece or mid-layer",
  "Fleece hat and gloves (June & Sept–Oct)",
  "Lightweight long-sleeve shirts",
  "Trekking trousers",
  "Personal hygiene kit / sanitiser",
  "Small personal first-aid kit and medicines",
  "Two 1-litre water bottles",
  "Insect repellent",
  "Earplugs",
  "Trail snacks",
  "Soft duffel for luggage transfers",
  "Peaks of the Balkans app (offline maps)",
];

const guidedGearOptional = [
  "Headlamp or torch",
  "Shorts, trainers, sandals, bandana",
  "Camera and spare batteries",
  "Liner socks",
  "Town shoes and casual clothes",
  "Spare laces, luggage tags and locks",
  "Small knife / whistle",
  "Water purification tablets",
  "Reading material, binoculars",
  "Lunch box and mug",
];

const practicalBase = [
  {
    label: "Travel documents",
    text: "Valid passport with at least six months remaining validity.",
  },
  {
    label: "Money",
    text: "Albania uses the lek (ALL); euros are widely accepted. Kosovo and Montenegro use the euro. Lek is typically only available inside Albania.",
  },
  {
    label: "ATMs",
    text: "Reliable options in Tirana and Shkodër; also Gusinje and Plav on the Montenegrin side.",
  },
  {
    label: "Time & power",
    text: "GMT+1. Electricity is 220 V / 50 Hz with two-pin round plugs.",
  },
  {
    label: "Visas",
    text: "Most travellers (including UK, many EU, US, Canada, Australia, New Zealand) do not need a visa for Albania or Kosovo. Check current Montenegro entry rules for your nationality.",
  },
  {
    label: "Health",
    text: "No special vaccinations are required for Kosovo, Albania or Montenegro for most visitors—bring personal medication and travel insurance.",
  },
  {
    label: "Support",
    text: "Call or WhatsApp +383 49 601 007. Phone: Mon–Fri 08:00–20:00, Sat–Sun 14:00–17:00 (CET). Chat support runs longer into the evening.",
  },
];

export const trips: Record<string, Trip> = {
  "peaks-of-the-balkans": {
    title: "Peaks of the Balkans",
    eyebrow: "10-day guided trek",
    subtitle:
      "A full crossing of Albania, Kosovo and Montenegro on shepherd paths through the Accursed Mountains—up to 2,300 m, wild, remote and unforgettable.",
    image: "/images/ridge-trail.jpeg",
    mapUrl: "/images/POB-Map-1.pdf",
    price: "€1,300",
    days: "10 days",
    distance: "192 km",
    difficulty: "Moderate +",
    group: "4–7 guests",
    stay: "Guesthouse",
    season: "June – October",
    countries: "Albania · Kosovo · Montenegro",
    description: [
      "Few routes show the Western Balkans the way this one does. Over ten guided days you follow old footpaths through high alpine country, linking remote valleys where landscape and living culture still sit side by side.",
      "The Peaks of the Balkans is a roughly 192 km cross-border trail across the Accursed Mountains of Albania, Kosovo and Montenegro. For decades these ridges were tightly controlled; today they form one of Europe’s most compelling long walks—open, wild and increasingly sought after.",
      "Expect terrain that moves between easier stretches and steeper mountain days. A solid fitness base and proper hiking kit are essential. This is a classic for anyone who wants a serious multi-day trek with local guides and village hospitality throughout.",
    ],
    highlights: [
      "Three countries on one continuous trail",
      "Passes and ridges above 2,000 metres",
      "Family-run guesthouses and homemade meals",
      "Border permits, luggage moves and transfers handled",
    ],
    itinerary: [
      {
        id: "01",
        title: "Shkodër → Theth",
        summary: "Meet the group, drive into the Albanian Alps and settle into Theth.",
        body: "Gather with your guide in Shkodër—one of Albania’s oldest cities—then head toward Theth through the Boga Valley, the natural doorway into the Albanian Alps. We pause at Qafë Thorë for wide mountain views before the zig-zag descent to a village guesthouse and a homemade dinner. Later, a short stroll introduces you to Theth National Park. Transfers from Tirana or Podgorica can be arranged on request.",
        meta: "Drive ~2h 20 · Dinner · Guesthouse",
        details: ["Accommodation: Guesthouse", "Meals: Dinner", "Drive: up to 2h 20min"],
      },
      {
        id: "02",
        title: "Theth → Valbonë",
        summary: "Cross Valbona Pass and descend into one of Albania’s great valleys.",
        body: "The path climbs steadily toward Valbona Pass (about 1,792 m)—a rewarding mountain day that many first-time alpine walkers complete with care and pacing. From the saddle, the Albanian Alps and Valbona Valley open below. After lunch we descend into the valley; you can finish on the wide dry riverbed on foot or shorten the last stretch with a van.",
        meta: "~16 km · 6–7h · Moderate / Challenging",
        details: [
          "Trail ~16 km · Ascent/descent ~1,050 m / 800 m · Max ~1,760 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "03",
        title: "Valbonë → Çerem",
        summary: "Climb Prejsllopi Pass, touch Montenegro, then drop to Çerem.",
        body: "After breakfast and mountain tea we ascend switchbacks to Prejsllopi Pass (~2,000 m), with snow-touched peaks in every direction. A short, rocky stretch after the pass needs careful footing—poles help, especially if the stones are wet. We note the old border stone, re-enter Albania and ease down through meadows and beech forest to Çerem. In stormy weather we skip this high section and transfer by 4x4 (~30 min) to the guesthouse.",
        meta: "~14 km · 7–8h · Moderate / Challenging",
        details: [
          "Trail ~14 km · Ascent/descent ~1,150 m / 870 m · Max ~2,040 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "04",
        title: "Çerem → Dobërdol",
        summary: "Forest ups and downs into the wide alpine pastures of Dobërdol.",
        body: "Leaving Çerem and the Kollata massif, we walk for hours through forest with frequent rises and dips. The route briefly crosses into Montenegro and back past the ruins of an old military border post. Lunch is at Balqin, a seasonal shepherd hamlet, before a calmer, scenic approach through patches of beech to the open pastures of Dobërdol.",
        meta: "~16 km · 6–7h · Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~1,025 m / 440 m · Max ~1,920 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "05",
        title: "Dobërdol → Milishevc",
        summary: "Reach the triple border and walk into Kosovo’s shepherd country.",
        body: "An early start takes us across bilberry meadows toward the ridge where Albania, Kosovo and Montenegro meet. The high point near Triple Peak (~2,266 m) looks back over the Albanian Alps you have already walked. From there, alpine meadows lead toward Milishevc in Kosovo. Exact distance can vary slightly with the guesthouse we use.",
        meta: "~18 km · 6–7h · Moderate",
        details: [
          "Trail ~18 km · Ascent/descent ~950 m · Max ~2,236 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
          "Note: luggage transport not included on this day",
        ],
      },
      {
        id: "06",
        title: "Milishevc → Babino Polje",
        summary: "Cross from Kosovo into Montenegro on a scenic border day.",
        body: "After breakfast we follow a shorter but richly varied trail into Montenegro. Colourful mountain terrain makes the hours pass easily before a gradual descent into Babino Polje, with time to enjoy the views along the way.",
        meta: "~16 km · 5–6h · Easy / Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~700 m / 880 m · Max ~2,166 m",
          "Difficulty: Easy / Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "07",
        title: "Babino Polje → Plav",
        summary: "Swim at Hrid Lake, then continue toward the town of Plav.",
        body: "We hike to quiet Hrid Lake for a cool forest swim and rest, then climb to a viewpoint and picnic in the Treskavica meadows. The last stretch follows a dirt road and can be shortened with a ~30-minute transfer from Treskavica, cutting roughly 6–7 km. Plav is the largest settlement on the route, with shops, ATMs and pharmacies if you need them.",
        meta: "~21 km · 7–8h · Moderate",
        details: [
          "Trail ~21 km · Ascent/descent ~600 m / 1,190 m · Max ~2,236 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "08",
        title: "Toward Vusanje via Bori",
        summary: "Forest, ridge and Bori Peak views before arriving in Vusanje.",
        body: "Beech forest and flowering meadows lead onto the open Bori ridge. A steep final ramp reaches Bori Peak (~2,106 m), where the Accursed Mountains spread in every direction. We descend through meadow and forest to Vusanje for two nights in Montenegro. A short 4x4 link (~40 min) supports the day’s logistics.",
        meta: "~17 km · 6–7h · Moderate",
        details: [
          "Trail ~17 km · Ascent/descent ~740 m / 1,170 m · Max ~2,100 m",
          "Difficulty: Moderate · Drive: ~40 min 4x4",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "09",
        title: "Grebaja · Vajusha day hike",
        summary: "A summit day in Grebaja National Park, then return to Vusanje.",
        body: "After breakfast we transfer to Grebaja Valley and climb through forest toward Vallushnica Peak, then along the ridge to Taljanka (~2,056 m) for a picnic with big views. We descend to the valley and transfer back to Vusanje. About 40 minutes of driving each way.",
        meta: "~10 km · 5–6h · Moderate / Challenging",
        details: [
          "Trail ~10 km · Ascent/descent ~1,020 m · Max ~2,056 m",
          "Difficulty: Moderate / Challenging · Drive: ~40 min each way",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "10",
        title: "Vusanje → Theth · Shkodër",
        summary: "A final border hike into Theth, then transfer back to Shkodër.",
        body: "A short 4x4 ride into Ropojana Valley starts the last trail day: a memorable crossing from Montenegro into Albania through Prokletije / Bjeshkët e Namuna. Steep limestone walls frame much of the walk; old border markers, bunkers and a pyramid sign still hint at the closed past. Picnic among alpine flowers, then a careful scree descent from Peja Pass toward Okol. After the hike we transfer to Shkodër (up to ~2 hours).",
        meta: "~17 km · 6–7h · Moderate",
        details: [
          "Trail ~17 km · Ascent/descent ~780 m / 1,000 m · Max ~1,435 m",
          "Difficulty: Moderate · Meals: Breakfast, picnic lunch",
          "Drive to Shkodër: up to ~2h",
        ],
      },
    ],
    included: [
      "English-speaking local guide",
      "Group transfers from and to Shkodër",
      "All guesthouse stays during the trek",
      "All meals on trek as shown in the itinerary",
      "Hut-to-hut luggage transport (except day 5)",
      "All land transport required by the itinerary",
      "Border permits and national park fees",
    ],
    notIncluded: [
      "Hotels before or after the trek",
      "Alcoholic drinks and soft drinks",
      "Personal expenses and shopping",
      "Tips for guide and local staff",
      "Transport beyond the itinerary",
      "Flights and travel insurance",
    ],
    faq: guidedFaq,
    gearRequired: guidedGearRequired,
    gearOptional: guidedGearOptional,
    practical: practicalBase,
    note: "This guided Peaks of the Balkans itinerary is lightly adapted for comfort and safety. Book as an open group (min. 4), as a private group, or ask us about a self-guided option.",
  },

  "peaks-of-the-balkans-7-days": {
    title: "Peaks of the Balkans",
    eyebrow: "7-day guided trek",
    subtitle:
      "The essential Accursed Mountains crossing in one focused week—Valbona Pass, Prejsllopi, the triple border and village nights—without rushing the high days.",
    image: "/images/alpine-lake.jpeg",
    mapUrl: "/images/POB-Map-1.pdf",
    price: "€1,050",
    days: "7 days",
    distance: "~110 km",
    difficulty: "Moderate +",
    group: "4–7 guests",
    stay: "Guesthouse",
    season: "June – October",
    countries: "Albania · Kosovo · Montenegro",
    description: [
      "Seven guided days give you the heart of the Peaks of the Balkans: limestone passes, shepherd pastures and three-country views, paced for hikers who want the classic high route without the longer Montenegro loop.",
      "You still walk remote alpine trails up toward 2,300 m, sleep in family guesthouses and cross landscapes that were closed for generations. The shorter format keeps the signature stages—Theth to Valbonë, Prejsllopi, Dobërdol and the triple border—then finishes cleanly toward Montenegro with a transfer home.",
      "Days run easy-to-moderate+ with sustained climbs. Good fitness and proper mountain kit matter. Ideal if your calendar is tight but you still want a serious guided trek.",
    ],
    highlights: [
      "Core high route in seven focused days",
      "Valbona Pass, Prejsllopi and the triple border",
      "Guided logistics, permits and village stays",
      "Small open groups of 4–7",
    ],
    itinerary: [
      {
        id: "01",
        title: "Shkodër → Theth",
        summary: "Meet your guide and transfer into Theth National Park.",
        body: "Meet in Shkodër and drive through Boga Valley into the Albanian Alps. We stop at Qafë Thorë for the view, then descend to a Theth guesthouse for dinner and an easy afternoon walk in the park. Tirana or Podgorica pickups can be arranged.",
        meta: "Drive ~2h 20 · Dinner · Guesthouse",
        details: ["Accommodation: Guesthouse", "Meals: Dinner", "Drive: up to 2h 20min"],
      },
      {
        id: "02",
        title: "Theth → Valbonë",
        summary: "The classic pass day into Valbona Valley.",
        body: "Climb toward Valbona Pass (~1,792 m) on a moderate-to-challenging trail many first-time alpine hikers still complete with steady pacing. Outstanding views open over the Albanian Alps before the descent into Valbonë. Finish on foot along the dry riverbed or shorten the last stretch by van.",
        meta: "~16 km · 6–7h · Moderate / Challenging",
        details: [
          "Trail ~16 km · Ascent/descent ~1,050 m / 800 m · Max ~1,760 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "03",
        title: "Valbonë → Çerem",
        summary: "Prejsllopi Pass and a touch of Montenegro.",
        body: "Switchbacks lead to Prejsllopi (~2,000 m) with snowline peaks all around. A rocky border stretch needs careful footing—poles recommended—then we re-enter Albania and descend through meadow and beech forest to Çerem. Stormy weather? We replace the high section with a short 4x4 transfer.",
        meta: "~14 km · 7–8h · Moderate / Challenging",
        details: [
          "Trail ~14 km · Ascent/descent ~1,150 m / 870 m · Max ~2,040 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "04",
        title: "Çerem → Dobërdol",
        summary: "Forest trails into open alpine pasture.",
        body: "A longer day of rises and dips through forest, briefly crossing the Montenegro line past an old border post. Picnic at the seasonal shepherd hamlet of Balqin, then an easier approach into the wide pastures of Dobërdol.",
        meta: "~16 km · 6–7h · Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~1,025 m / 440 m · Max ~1,920 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "05",
        title: "Dobërdol → Milishevc",
        summary: "Triple border day into Kosovo.",
        body: "Bilberry meadows lead toward the ridge where three countries meet. Near Triple Peak (~2,266 m) you look back over the Albanian Alps already walked, then continue through alpine meadow into Milishevc. Distance can vary slightly with lodging.",
        meta: "~18 km · 6–7h · Moderate",
        details: [
          "Trail ~18 km · Ascent/descent ~950 m · Max ~2,236 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
          "Note: luggage transport not included on this day",
        ],
      },
      {
        id: "06",
        title: "Milishevc → Babino Polje",
        summary: "Border crossing into Montenegro.",
        body: "A rewarding border day from Kosovo into Montenegro on colourful high ground. We descend gradually into Babino Polje, keeping the pace relaxed so the scenery stays the focus.",
        meta: "~16 km · 5–6h · Easy / Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~700 m / 880 m · Max ~2,166 m",
          "Difficulty: Easy / Moderate",
          "Meals: Breakfast, picnic lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "07",
        title: "Hrid Lake · transfer out",
        summary: "Forest lake morning, then journey home via Plav / Shkodër.",
        body: "A lighter final morning toward Hrid Lake for a swim and picnic if weather allows, then we transfer via Plav toward Shkodër (or your agreed exit airport hub). Celebratory lunch on the road and time for goodbyes—the essential Peaks route, completed in seven days.",
        meta: "Half day hike · Transfer · Breakfast & lunch",
        details: [
          "Optional lake walk ~8–12 km depending on timing",
          "Meals: Breakfast, picnic or restaurant lunch",
          "Transfer toward Shkodër / airport hub",
        ],
      },
    ],
    included: [
      "English-speaking local guide",
      "Group transfers from and to Shkodër",
      "All guesthouse stays during the trek",
      "All meals on trek as shown in the itinerary",
      "Hut-to-hut luggage transport (except day 5)",
      "All land transport required by the itinerary",
      "Border permits and national park fees",
    ],
    notIncluded: [
      "Hotels before or after the trek",
      "Alcoholic drinks and soft drinks",
      "Personal expenses and shopping",
      "Tips for guide and local staff",
      "Transport beyond the itinerary",
      "Flights and travel insurance",
    ],
    faq: guidedFaq,
    gearRequired: guidedGearRequired,
    gearOptional: guidedGearOptional,
    practical: practicalBase,
    note: "This seven-day guided version keeps the signature high stages and skips the longer Montenegro loop of the 10-day trek. Open group min. 4; private groups welcome.",
  },

  "peaks-of-the-balkans-self-guided": {
    title: "Peaks of the Balkans Self Guided",
    eyebrow: "12-day independent trek",
    subtitle:
      "Walk ~200 km across Albania, Kosovo and Montenegro at your own pace—with lodging, meals, transfers, GPX files and round-the-clock trail support handled for you.",
    image: "/images/green-peaks.jpeg",
    mapUrl: "/images/POB-Map-1.pdf",
    price: "€950",
    days: "12 days",
    distance: "~200 km",
    difficulty: "Moderate +",
    group: "2–12 travellers",
    stay: "Guesthouse",
    season: "June – October",
    countries: "Albania · Kosovo · Montenegro",
    description: [
      "Discover Kosovo, Montenegro and Albania on a self-guided Peaks of the Balkans journey. This long mountain trail threads remote high country, climbing toward 2,300 m on shepherd paths that once sat behind closed borders—and are now open to hikers from around the world.",
      "The classic circuit covers roughly 200 km through the Accursed Mountains. Your itinerary typically begins in Albania, though start and finish points can be adjusted when you book.",
      "Terrain swings from gentler valley walking to moderate+ mountain days. Solid fitness and proper trekking equipment are essential. Solo travellers, pairs and groups up to twelve are welcome; we can shorten or extend the route from about five to fourteen hiking days on request.",
    ],
    highlights: [
      "Full classic route without a guide on trail",
      "GPX files plus phone support every day",
      "Private guesthouse stays and trek meals",
      "Flexible start points and custom day counts",
    ],
    itinerary: [
      {
        id: "01",
        title: "Shkodër → Theth",
        summary: "Transfer into Theth; free afternoon in the national park.",
        body: "Meet your driver in Shkodër and travel through Boga Valley—the gateway to the Albanian Alps—toward Theth. Afternoon free to explore Theth National Park. Your self-guided loop both begins and ends here; dinner is included. Small-group transfers usually leave Shkodër around 07:00 or 14:00.",
        meta: "Drive ~2h 10 · Dinner · Guesthouse",
        details: ["Accommodation: Guesthouse", "Meals: Dinner", "Drive: ~2h 10min"],
      },
      {
        id: "02",
        title: "Theth → Valbonë",
        summary: "Valbona Pass day with optional tea stop and valley descent.",
        body: "Follow the trail toward Valbona Pass—a rewarding climb often chosen by first-time mountain walkers. Pause at Zefi’s for hot mountain tea if you like, then continue to the col (~1,792 m) for big views of the Alps and Valbona Valley. After lunch descend on the dry riverbed road or take a bus for the final stretch. All meals included.",
        meta: "~16 km · 6–7h · Moderate / Challenging",
        details: [
          "Trail ~16 km · Ascent/descent ~1,050 m / 950 m · Max ~1,759 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "03",
        title: "Valbonë → Çerem",
        summary: "Prejsllopi Pass with optional Zla Kolata side trip.",
        body: "After breakfast and honeyed mountain tea, climb the zig-zag path to Prejsllopi (~2,000 m) for snowline panoramas. Crossing briefly into Montenegro, lunch can be taken at Bori Pass, a grassy saddle used by shepherds from Çerem and Vuthaj. Optional add-on: Zla Kolata (2,534 m), Montenegro’s highest summit.",
        meta: "~14 km · 7–8h · Moderate / Challenging",
        details: [
          "Trail ~14 km · Ascent/descent ~1,150 m / 870 m · Max ~2,040 m",
          "Difficulty: Moderate / Challenging",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "04",
        title: "Çerem → Dobërdol",
        summary: "Long forest day into a summer shepherd village.",
        body: "A full day of ups and downs, mostly under forest cover, linking Çerem to Dobërdol—reachable only by mule tracks and inhabited in summer by shepherds. Climb toward the Montenegrin border, pass Balqin, and continue through the protected Gashi valley to Dobërdol’s open pastures.",
        meta: "~16 km · 6–7h · Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~1,025 m / 440 m · Max ~1,920 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "05",
        title: "Dobërdol → Milishevc",
        summary: "Three-border ridge and Triple Peak views.",
        body: "Early start across bilberry meadows toward the ridge shared by Albania, Kosovo and Montenegro. Triple Peak (~2,266 m) looks back over the Albanian Alps already walked. Continue through alpine meadow into Milishevc, Kosovo. All meals included.",
        meta: "~18 km · 6–7h · Moderate",
        details: [
          "Trail ~18 km · Ascent/descent ~950 m · Max ~2,236 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "06",
        title: "Milishevc → Reka e Allagës",
        summary: "Lumbardhi ridge, Rugova Camp, short transfer onward.",
        body: "Ascend Lumbardhi ridge for wide views back toward Milishevc, then a steep descent to Rugova Camp / Restorant Gryka—good local fish if you want a longer break—before a short transfer up to Reka e Allagës.",
        meta: "~17 km · 6–7h · Moderate",
        details: [
          "Trail ~17 km · Ascent/descent ~600 m / 1,430 m · Max ~2,136 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "07",
        title: "Hajla Peak → Drelaj",
        summary: "Summit day to Hajla (2,403 m), then down to Drelaj.",
        body: "Climb northwest from the guesthouse meadows with views of Reka e Allagës and Guri i Kuq. After roughly three hours reach Era’s hut for a break, then the short, steeper push to Hajla (2,403 m). Contour the high ground for the views before a long descent into Drelaj.",
        meta: "~16 km · 7–8h · Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~1,020 m / 1,320 m · Max ~2,403 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "08",
        title: "Kuqishtë → Babino Polje",
        summary: "Glacial lakes and the Kosovo–Montenegro border.",
        body: "Short transfer to the trailhead, then a long mountain day past springs, glacial lakes and high passes into Montenegro. After the lakes, climb toward Lugu i Shkodrës for broad alpine scenery before reaching Babino Polje.",
        meta: "~16 km · 7–8h · Moderate",
        details: [
          "Trail ~16 km · Ascent/descent ~1,140 m / 1,050 m · Max ~2,276 m",
          "Difficulty: Moderate · Drive: ~20 min",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "09",
        title: "Babino Polje → Plav",
        summary: "Hrid Lake swim and arrival in Plav.",
        body: "Hike from Babino Polje past forest-fringed Hrid Lake—ideal for a cool swim—then continue toward Plav on a mostly wild route with Prokletije views, including the Albanian Alps in the distance. Evening free to wander Plav’s old town.",
        meta: "~21 km · 7–8h · Moderate",
        details: [
          "Trail ~21 km · Ascent/descent ~600 m / 1,190 m · Max ~2,236 m",
          "Difficulty: Moderate",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "10",
        title: "Toward Vusanje via Bori",
        summary: "Bori Peak and Accursed Mountains panoramas.",
        body: "Through beech forest and flower meadows onto Bori ridge, then a steep ramp to Bori Peak (~2,106 m) for classic Accursed Mountains views. Descend through meadow and forest into Vusanje for your last Montenegrin night. Short drive support (~25 min) as needed.",
        meta: "~17 km · 6–7h · Moderate",
        details: [
          "Trail ~17 km · Ascent/descent ~740 m / 1,170 m · Max ~2,100 m",
          "Difficulty: Moderate · Drive: ~25 min",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "11",
        title: "Karanfili viewpoints",
        summary: "Day hike for the finest Prokletije vistas.",
        body: "Not on the official Peaks line, but often the most spectacular viewpoint day of the trip: a return hike overlooking the Karanfili massif and Albanian Alps / Prokletije. Transfer to the trailhead and back to your guesthouse (~40 min each way).",
        meta: "~10 km · 5–6h · Moderate",
        details: [
          "Trail ~10 km · Ascent/descent ~1,020 m · Max ~2,056 m",
          "Difficulty: Moderate · Drive: ~40 min both ways",
          "Meals: Breakfast, packed lunch, dinner · Guesthouse",
        ],
      },
      {
        id: "12",
        title: "Vusanje → Theth · Shkodër",
        summary: "Final border hike into Theth, then transfer to Shkodër.",
        body: "A long, memorable day into Prokletije National Park, crossing from Montenegro into Albania. Old military posts, bunkers and a border pyramid still mark the former closed zone. Finish in Theth where the journey began; transport continues to Shkodër (~2h 10). Optional: avoid the 4x4 section with a local transfer and ~5 km less walking from Okol.",
        meta: "~21 km · 6–7h · Moderate",
        details: [
          "Trail ~21 km · Ascent/descent ~1,100 m / 1,300 m · Max ~1,435 m",
          "Difficulty: Moderate · Meals: Breakfast, packed lunch",
          "Drive to Shkodër: ~2h 10min",
        ],
      },
    ],
    included: [
      "Transfers Shkodër–Theth and return",
      "Private guesthouse lodging during the trek",
      "All food on hiking days",
      "Land transport required by the itinerary",
      "Border permits",
      "GPX files and nonstop trail support",
    ],
    notIncluded: [
      "Hotels before or after the trek",
      "Alcoholic drinks and soft drinks",
      "Tips for local staff",
      "Luggage transport between lodges",
      "Transport beyond the itinerary",
      "National park fees",
      "Flights and travel insurance",
    ],
    faq: [
      {
        q: "Who is self-guided for?",
        a: "Independent hikers who are comfortable navigating with GPX files and still want lodging, meals, border paperwork and phone support organised. You walk without a guide on trail, but our local team stays reachable.",
      },
      {
        q: "Can the itinerary be customised?",
        a: "Yes. We can reshape the classic route from roughly five to fourteen hiking days, adjust start and end points, and add 4x4 links, luggage moves or airport transfers (Tirana, Podgorica and more).",
      },
      {
        q: "What group sizes work?",
        a: "From a solo traveller or pair up to twelve people. Support stays available throughout.",
      },
      {
        q: "Is luggage moved for me?",
        a: "Luggage transport is not in the standard self-guided price. Ask when booking if you want bag transfers added.",
      },
      {
        q: "How do I get help on the trail?",
        a: "You receive GPX tracks plus nonstop phone and local staff support along the Peaks of the Balkans corridor. Call or WhatsApp +383 49 601 007.",
      },
      {
        q: "What about visas and money?",
        a: "Most nationalities need no visa for Albania or Kosovo; check Montenegro separately. Euros work widely; Albanian lek is mainly for Albania itself.",
      },
    ],
    gearRequired: [
      "Sturdy hiking shoes or boots",
      "Trekking poles",
      "Daypack (30 L+)",
      "Sun hat, sunglasses, sunscreen, swimwear",
      "Waterproof jacket and rain trousers",
      "Warm fleece or mid-layer",
      "Navigation: phone with GPX + offline maps / Peaks app",
      "Power bank",
      "Two 1-litre water bottles",
      "Personal first-aid kit and medicines",
      "Trail snacks",
    ],
    gearOptional: guidedGearOptional,
    practical: [
      ...practicalBase,
      {
        label: "Reading",
        text: "Useful companions: Lonely Planet Western Balkans; Robert Carver’s The Accursed Mountains; Bradt guides to Kosovo and Albania; Ismail Kadare’s Broken April; Edith Durham’s High Albania.",
      },
    ],
    note: "Self-guided Peaks of the Balkans trips can be tailored—day count, transport and luggage options included. Classic route for 1–12 travellers; ask us to build a 5–14 day version around your dates.",
  },

  "via-dinarica-kosovo": {
    title: "Via Dinarica Kosovo",
    eyebrow: "5-day guided trek",
    subtitle:
      "Forty-five kilometres of Kosovo alpine country: glacial lakes, ridgelines and a summit of Mt. Gjeravica (2,656 m)—the highest peak in the country—with warm guesthouse hospitality throughout.",
    image: "/images/VIA-DINARICA-1.jpg",
    secondaryImage: "/images/VIA-DINARICA-2.jpg",
    price: "€890",
    days: "5 days",
    distance: "45 km",
    difficulty: "Easy to Moderate",
    group: "4–12 guests",
    stay: "Guesthouse / hotel",
    season: "May – October",
    countries: "Kosovo",
    description: [
      "Kosovo’s stretch of the Via Dinarica is a compact, high-impact journey across wild alpine ground few visitors reach. In five days you cover about 45 km (28 miles), sleep in locally owned mountain guesthouses, and stand on Gjeravica—Kosovo’s rooftop at 2,656 m.",
      "This segment sits on the great transnational Via Dinarica corridor that runs from Albania toward Slovenia. Here the walking mixes kinder valley paths with steeper climbs, open saddles, karst drama and long valley vistas.",
      "Expect varied terrain, living village culture and hosts who treat guests like neighbours. Built for hikers (and outdoor travellers) who want a genuine Balkan week without a longer multi-country commit.",
    ],
    highlights: [
      "Summit Mt. Gjeravica (2,656 m)",
      "Alpine lakes above Kuqishtë and Drelaj",
      "English-speaking local guides",
      "Guesthouse meals and private transfers",
    ],
    itinerary: [
      {
        id: "01",
        title: "Arrival in Pejë",
        summary: "Land in Prishtina, transfer to Pejë, dinner and trek briefing.",
        body: "Arrive at Prishtina Airport, meet your guide and transfer to Pejë—the mountain gateway to Rugova. Settle into a hotel or hostel (shared rooms and facilities may apply), then gather for dinner and an evening briefing on the days ahead.",
        meta: "Airport transfer · Dinner · Pejë",
        details: [
          "Included: Airport transfer, lodging, dinner, guide briefing",
          "Accommodation: Pejë, Kosovo",
        ],
      },
      {
        id: "02",
        title: "Kuqishtë → Zllonopojë",
        summary: "Lakes, Jelenka Pass and a village guesthouse night.",
        body: "After breakfast we drive toward Kuqishtë and start walking from the village. An easier opening stretch leads past the alpine lakes of Kuqishtë and Drelaj, then up to Qafa e Jelenkës for wide mountain views. We descend into Zllonopojë and overnight in a local guesthouse.",
        meta: "12 km · +1,200 m · Moderate",
        details: [
          "Trail: 12 km · Elevation gain ~1,200 m · Moderate",
          "Included: Breakfast, packed lunch, dinner, lodging",
          "Accommodation: Zllonopojë, Kosovo",
        ],
      },
      {
        id: "03",
        title: "Toward Junik / Pllaqica",
        summary: "Roshkodol valley, ridgelines and peaks all around.",
        body: "A varied day through Roshkodol Valley—scenic ridges, open views and surrounding summits. We finish at Pllaqica e Junikut and stay with a local host family / guesthouse in the Junik area.",
        meta: "18 km · +800 m · Easy",
        details: [
          "Trail: 18 km · Elevation gain ~800 m · Easy",
          "Included: Breakfast, packed lunch, dinner, lodging",
          "Accommodation: Junik, Kosovo",
        ],
      },
      {
        id: "04",
        title: "Gjeravica summit → Prishtina",
        summary: "Climb Kosovo’s highest peak, then drive to the capital.",
        body: "The final trail day aims for Gjeravica Peak (2,656 m)—a big reward for the week. After the summit we descend toward Gropa e Erenikut, then transfer by road to Prishtina for the night.",
        meta: "15 km · +1,200 m · Moderate",
        details: [
          "Trail: 15 km · Elevation gain ~1,200 m · Moderate",
          "Included: Breakfast, packed lunch, dinner, lodging in Prishtina",
          "Accommodation: Prishtina, Kosovo",
        ],
      },
      {
        id: "05",
        title: "Departure",
        summary: "Breakfast and airport transfer for your flight home.",
        body: "Breakfast at the hotel, then a private transfer to Prishtina Airport for your onward flight. Safe travels—and room on the calendar to come back for a longer Peaks of the Balkans journey.",
        meta: "Breakfast · Airport transfer",
        details: ["Included: Breakfast and airport transfer"],
      },
    ],
    included: [
      "Professional English-speaking mountain guide",
      "Airport transfers (arrival and departure)",
      "Private minivan transfers as listed, with English-speaking driver",
      "Bag transfers to guesthouses where possible",
      "Lodging in hotels / locally owned mountain guesthouses",
      "All meals: breakfasts, dinners and packed lunches on trail days",
      "Evening briefing on day 1",
    ],
    notIncluded: [
      "International flights",
      "Travel insurance",
      "Alcoholic drinks and soft drinks",
      "Personal expenses and shopping",
      "Tips for guide and drivers",
      "Single-room supplements (subject to availability)",
      "Any transport or activities beyond the itinerary",
    ],
    faq: [
      {
        q: "Where does the trip start and finish?",
        a: "You fly into Prishtina. Day 1 transfers you to Pejë; day 5 returns you to Prishtina Airport after breakfast.",
      },
      {
        q: "How hard is the walking?",
        a: "Overall easy to moderate. Expect one bigger summit day on Gjeravica (~1,200 m ascent). A reasonable hiking fitness base is enough.",
      },
      {
        q: "What is the group size?",
        a: "Guided departures run with 4 to 12 guests—small enough to stay flexible on the trail.",
      },
      {
        q: "When can I go?",
        a: "The season runs from May through October, when alpine trails and guesthouses are reliably open.",
      },
      {
        q: "Are bags moved for me?",
        a: "Where the road network allows, we arrange bag transfers to guesthouses so you hike with a daypack.",
      },
    ],
    gearRequired: [
      "Hiking boots with good grip",
      "Daypack (25–35 L)",
      "Waterproof jacket",
      "Warm mid-layer",
      "Sun protection (hat, glasses, cream)",
      "Trekking poles (recommended for Gjeravica)",
      "Water bottles (2 L total)",
      "Personal first-aid kit",
    ],
    gearOptional: guidedGearOptional,
    practical: practicalBase,
    note: "Duration is 5 nights / 4 walking days. Kosovo’s Via Dinarica segment is ideal as a standalone trip or a warm-up before a longer Peaks of the Balkans trek.",
  },
};
