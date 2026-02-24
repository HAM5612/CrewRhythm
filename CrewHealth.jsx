import { useState, useRef } from "react";

// ═══════════════════════════════════════════════════════════════════════════════
// DESTINATION DATABASE (extended)
// ═══════════════════════════════════════════════════════════════════════════════
const DEST_DB = {
  KUL: { tz:+8,   city:"Kuala Lumpur",   country:"Malaysia",       climate:"tropical",    tempMar:28, humidity:"high",    season:"Rain season possible" },
  HKG: { tz:+8,   city:"Hong Kong",      country:"China",          climate:"subtropical", tempMar:19, humidity:"medium",  season:"Spring, pleasant" },
  GYD: { tz:+4,   city:"Baku",           country:"Azerbaijan",  climate:"temperate",    tempMar:10, humidity:"low", season:"Spring, cool" },
  TPE: { tz:+8,   city:"Taipei",         country:"Taiwan",         climate:"subtropical", tempMar:18, humidity:"medium",  season:"Spring, pleasant" },
  BKK: { tz:+7,   city:"Bangkok",        country:"Thailand",       climate:"tropical",    tempMar:32, humidity:"high",    season:"Hot season" },
  ANC: { tz:-9,   city:"Anchorage",      country:"USA Alaska",     climate:"subarctic", tempMar:-2, humidity:"low", season:"Late winter, snow" },
  ORD: { tz:-6,   city:"Chicago",        country:"USA",            climate:"continental", tempMar:4,  humidity:"medium",  season:"Late winter, cold" },
  SIN: { tz:+8,   city:"Singapore",       country:"Singapore",       climate:"tropical",    tempMar:29, humidity:"high",    season:"Warm year-round" },
  DXB: { tz:+4,   city:"Dubai",          country:"UAE",            climate:"desert",       tempMar:26, humidity:"low", season:"Pleasant, warm" },
  DOH: { tz:+3,   city:"Doha",           country:"Katar",          climate:"desert",       tempMar:24, humidity:"low", season:"Pleasant" },
  NRT: { tz:+9,   city:"Tokyo",          country:"Japan",          climate:"temperate",    tempMar:10, humidity:"medium",  season:"Spring begins" },
  ICN: { tz:+9,   city:"Seoul",          country:"South Korea",       climate:"temperate",    tempMar:7,  humidity:"low", season:"Spring, cool" },
  PEK: { tz:+8,   city:"Beijing",         country:"China",          climate:"continental", tempMar:7,  humidity:"low", season:"Spring, dusty" },
  PVG: { tz:+8,   city:"Shanghai",       country:"China",          climate:"subtropical", tempMar:11, humidity:"medium",  season:"Spring" },
  CGO: { tz:+8,   city:"Zhengzhou",      country:"China",          climate:"continental", tempMar:10, humidity:"low", season:"Spring, cool" },
  ASB: { tz:+5,   city:"Ashgabat",       country:"Turkmenistan",   climate:"desert",       tempMar:11, humidity:"low", season:"Spring, pleasant" },
  SGN: { tz:+7,   city:"Ho Chi Minh",    country:"Vietnam",        climate:"tropical",    tempMar:30, humidity:"high",    season:"Dry season, hot" },
  GDL: { tz:-6,   city:"Guadalajara",    country:"Mexico",         climate:"subtropical", tempMar:22, humidity:"low", season:"Dry season, pleasant" },
  NLU: { tz:-6,   city:"Mexico City",    country:"Mexico",         climate:"temperate",    tempMar:19, humidity:"low", season:"Dry season (2240m)" },
  DEL: { tz:+5.5, city:"Delhi",          country:"India",         climate:"semi-arid",   tempMar:26, humidity:"low", season:"Pleasant before monsoon" },
  BOM: { tz:+5.5, city:"Mumbai",         country:"India",         climate:"tropical",    tempMar:30, humidity:"medium",  season:"Dry season" },
  JFK: { tz:-5,   city:"New York",       country:"USA",            climate:"temperate",    tempMar:7,  humidity:"medium",  season:"Late winter" },
  LAX: { tz:-8,   city:"Los Angeles",    country:"USA",            climate:"mediterranean",  tempMar:18, humidity:"low", season:"Pleasant" },
  LUX: { tz:+1,   city:"Luxembourg",      country:"Luxembourg",      climate:"temperate",    tempMar:8,  humidity:"medium",  season:"Spring" },
  FRA: { tz:+1,   city:"Frankfurt",      country:"Germany",    climate:"temperate",    tempMar:8,  humidity:"medium",  season:"Spring" },
  // Extended Cargolux network
  TPE: { tz:+8,   city:"Taipei",         country:"Taiwan",         climate:"subtropical", tempMar:18, humidity:"medium",  season:"Spring, pleasant" },
  BKK: { tz:+7,   city:"Bangkok",        country:"Thailand",       climate:"tropical",    tempMar:32, humidity:"high",    season:"Hot season" },
  ORD: { tz:-6,   city:"Chicago",        country:"USA",            climate:"continental", tempMar:4,  humidity:"medium",  season:"Late winter, cold" },
  MIA: { tz:-5,   city:"Miami",          country:"USA",            climate:"subtropical", tempMar:25, humidity:"medium",  season:"Pleasant" },
  ATL: { tz:-5,   city:"Atlanta",        country:"USA",            climate:"temperate",    tempMar:15, humidity:"medium",  season:"Spring" },
  CVG: { tz:-5,   city:"Cincinnati",     country:"USA",            climate:"temperate",    tempMar:10, humidity:"medium",  season:"Spring" },
  IAD: { tz:-5,   city:"Washington DC",  country:"USA",            climate:"temperate",    tempMar:11, humidity:"medium",  season:"Spring" },
  SFO: { tz:-8,   city:"San Francisco",  country:"USA",            climate:"mediterranean",  tempMar:14, humidity:"low", season:"Pleasant, cool" },
  SEA: { tz:-8,   city:"Seattle",        country:"USA",            climate:"oceanic",   tempMar:10, humidity:"high",    season:"Rainy" },
  MEX: { tz:-6,   city:"Mexico City",    country:"Mexico",         climate:"temperate",    tempMar:19, humidity:"low", season:"Dry season (2240m)" },
  BOG: { tz:-5,   city:"Bogotá",         country:"Colombia",      climate:"temperate",    tempMar:14, humidity:"medium",  season:"Rainy season" },
  SCL: { tz:-3,   city:"Santiago",       country:"Chile",          climate:"mediterranean",  tempMar:21, humidity:"low", season:"Late summer" },
  GRU: { tz:-3,   city:"São Paulo",      country:"Brazil",      climate:"subtropical", tempMar:26, humidity:"high",    season:"Rainy season" },
  EZE: { tz:-3,   city:"Buenos Aires",   country:"Argentina",    climate:"temperate",    tempMar:23, humidity:"medium",  season:"Late summer" },
  LGG: { tz:+1,   city:"Liège",        country:"Belgium",        climate:"temperate",    tempMar:9,  humidity:"medium",  season:"Spring" },
  CDG: { tz:+1,   city:"Paris",          country:"France",     climate:"temperate",    tempMar:10, humidity:"medium",  season:"Spring" },
  AMS: { tz:+1,   city:"Amsterdam",      country:"Netherlands",    climate:"oceanic",   tempMar:8,  humidity:"high",    season:"Spring" },
  HEL: { tz:+2,   city:"Helsinki",       country:"Finland",       climate:"boreal",      tempMar:0,  humidity:"medium",  season:"Late winter" },
  ARN: { tz:+1,   city:"Stockholm",      country:"Sweden",       climate:"temperate",    tempMar:3,  humidity:"medium",  season:"Spring" },
  IST: { tz:+3,   city:"Istanbul",       country:"Turkey",         climate:"temperate",    tempMar:11, humidity:"medium",  season:"Spring" },
  CAI: { tz:+2,   city:"Cairo",          country:"Egypt",        climate:"desert",       tempMar:22, humidity:"low", season:"Pleasant" },
  NBO: { tz:+3,   city:"Nairobi",        country:"Kenya",          climate:"temperate",    tempMar:24, humidity:"medium",  season:"Rainy season starts" },
  JNB: { tz:+2,   city:"Johannesburg",   country:"South Africa",      climate:"subtropical", tempMar:22, humidity:"medium",  season:"Late summer" },
  ACC: { tz:0,    city:"Accra",          country:"Ghana",          climate:"tropical",    tempMar:31, humidity:"high",    season:"Dry-rainy transition" },
  LOS: { tz:+1,   city:"Lagos",          country:"Nigeria",        climate:"tropical",    tempMar:31, humidity:"high",    season:"Dry season" },
  CPT: { tz:+2,   city:"Cape Town",       country:"South Africa",      climate:"mediterranean",  tempMar:23, humidity:"low", season:"Late summer" },
  KHI: { tz:+5,   city:"Karachi",        country:"Pakistan",       climate:"semi-arid",   tempMar:27, humidity:"low", season:"Pleasant" },
  CGP: { tz:+6,   city:"Chittagong",     country:"Bangladesh",    climate:"tropical",    tempMar:28, humidity:"high",    season:"Dry season" },
  RKT: { tz:+4,   city:"Ras al-Khaimah", country:"UAE",            climate:"desert",       tempMar:25, humidity:"low", season:"Pleasant" },
  MCT: { tz:+4,   city:"Muscat",         country:"Oman",           climate:"desert",       tempMar:27, humidity:"low", season:"Pleasant" },
  KWI: { tz:+3,   city:"Kuwait City",    country:"Kuwait",         climate:"desert",       tempMar:23, humidity:"low", season:"Pleasant" },
  BAH: { tz:+3,   city:"Bahrain",        country:"Bahrain",        climate:"desert",       tempMar:24, humidity:"medium",  season:"Pleasant" },
  TLV: { tz:+2,   city:"Tel Aviv",       country:"Israel",         climate:"mediterranean",  tempMar:18, humidity:"medium",  season:"Pleasant, spring" },
  VCP: { tz:-3,   city:"Campinas",       country:"Brazil",      climate:"subtropical", tempMar:26, humidity:"high",    season:"Rainy season" },
  CCS: { tz:-4,   city:"Caracas",        country:"Venezuela",      climate:"tropical",    tempMar:26, humidity:"medium",  season:"Dry season" },
  LIM: { tz:-5,   city:"Lima",           country:"Peru",           climate:"semi-arid",   tempMar:22, humidity:"high",    season:"Late summer" },
};
function getDestInfo(iata) {
  return DEST_DB[iata] || { tz:0, city:iata, country:"", climate:"temperate", tempMar:20, humidity:"medium", season:"" };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HARDCODED: CARGOLUX FEBRUAR 2026 — 3 ROTATIONEN
// ═══════════════════════════════════════════════════════════════════════════════
const HOME_TZ = 1; // LUX = UTC+1

const SAVED_SCHEDULES = [
  {
    id: "clx-mar26-r1",
    label: "Rotation 1 — 01–12 Mar",
    dateRange: "01.03 – 12.03.2026",
    pilot: "Amstutz, Janick",
    airline: "Cargolux · Boeing 748F",
    prevIata: null,
    stops: [
      // SQ104: dep SIN 23:05 01/03 → arr KUL 00:15 02/03
      { iata:"SIN", hotel:"Pan Pacific Singapore",    arrival:"22:30", checkIn:"22:05", restWindowH:23.6, flightH:12.0,
        note:"Continued from Feb · Dep SQ104 23:05" },
      // 9521: dep KUL 19:55 02/03 → arr HKG 23:45 02/03
      { iata:"KUL", hotel:"Ritz Carlton Kuala Lumpur", arrival:"00:15", checkIn:"18:55", restWindowH:18.7, flightH:1.17,
        note:"02 Mar · Dep 9521 19:55" },
      // 7624: dep HKG 04:00 05/03 → arr GYD 13:15 05/03
      { iata:"HKG", hotel:"Shangri-La Kowloon",        arrival:"23:45", checkIn:"03:00", restWindowH:51.2, flightH:3.83,
        note:"02–05 Mar · 3 nights · Dep 7624 04:00" },
      // 9364: dep GYD 06:50 06/03 → arr TPE 15:30 06/03
      { iata:"GYD", hotel:"Hilton Baku",               arrival:"13:15", checkIn:"05:50", restWindowH:16.6, flightH:9.25,
        note:"05–06 Mar · Dep 9364 06:50" },
      // 9016: dep TPE 23:45 07/03 → arr BKK 03:45 08/03
      { iata:"TPE", hotel:"Shangri-La Far Eastern",    arrival:"15:30", checkIn:"22:45", restWindowH:31.2, flightH:8.25,
        note:"06–07 Mar · Dep 9016 23:45" },
      // 5952: dep BKK 00:05 10/03 → arr ANC 11:40 10/03
      { iata:"BKK", hotel:"Shangri-La Bangkok",        arrival:"03:45", checkIn:"23:05", restWindowH:43.3, flightH:4.0,
        note:"08–10 Mar · 2 nights · Dep 5952 00:05" },
      // 5483: dep ANC 15:00 11/03 → arr ORD 21:00 11/03
      { iata:"ANC", hotel:"Sheraton Anchorage",        arrival:"11:40", checkIn:"14:00", restWindowH:26.3, flightH:11.67,
        note:"10–11 Mar · Dep 5483 15:00" },
      // 5104: dep ORD 13:50 12/03 → arr LUX 22:00 12/03
      { iata:"ORD", hotel:"Sheraton Grand Riverwalk",  arrival:"21:00", checkIn:"12:50", restWindowH:15.8, flightH:6.0,
        note:"11–12 Mar · Dep 5104 13:50" },
    ]
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HEALTH ALGORITHM
// ═══════════════════════════════════════════════════════════════════════════════
function analyzeStop(stop, prevTz, flightDurationH) {
  const dest = getDestInfo(stop.iata);
  const tzDiffFromPrev = dest.tz - prevTz;
  const tzDiffFromHome = dest.tz - HOME_TZ;
  const jetlagSeverity = Math.abs(tzDiffFromPrev);
  const travelDirection = tzDiffFromPrev > 0 ? "east" : tzDiffFromPrev < 0 ? "west" : "none";

  const [arrH, arrM] = (stop.arrival || "00:00").split(":").map(Number);
  const arrUTCmin = arrH * 60 + arrM;
  const localArrMin = ((arrUTCmin + dest.tz * 60) % 1440 + 1440) % 1440;
  const localArrH = Math.floor(localArrMin / 60);

  // Available rest window: arrival → next check-in (minus travel buffer each side)
  const restWindowH = stop.restWindowH || (stop.days || 1) * 22;
  const windowMinutes = (restWindowH - 1.5) * 60; // 45min hotel + 45min back to airport

  // Recommended sleep based on flight duration and jetlag
  let recSleepH = 8;
  if (flightDurationH > 10) recSleepH = 9;
  if (flightDurationH > 14) recSleepH = 10;
  if (jetlagSeverity > 8)   recSleepH = Math.min(recSleepH + 1, 10);
  // Cap sleep to fit within window (always leave at least 2h free)
  const maxSleepH = Math.max(4, (windowMinutes / 60) - 2);
  recSleepH = Math.min(recSleepH, maxSleepH);

  // Window end in local minutes (from midnight of arrival day)
  const windowEndMin = localArrMin + windowMinutes;

  const ciMin = localArrMin + 45; // hotel check-in
  const isNightArrival   = localArrH >= 20 || localArrH < 4;
  const isMorningArrival = localArrH >= 4  && localArrH < 11;

  let sleepStrategy, sleepStart, sleepDuration, freeStart, freeDuration;

  if (isNightArrival) {
    sleepStrategy = "Sleep immediately";
    sleepStart = ciMin;
    sleepDuration = recSleepH;
    freeStart = sleepStart + sleepDuration * 60;
    freeDuration = Math.max(1, (windowEndMin - freeStart - 45) / 60); // 45min buffer before checkout
  } else if (isMorningArrival) {
    sleepStrategy = "Daylight reset: stay active until evening";
    freeStart = ciMin + 30;
    // Sleep at local 22:00 or when window requires, whichever comes first
    const latestSleepStart = Math.min(22 * 60, windowEndMin - recSleepH * 60 - 45);
    sleepStart = latestSleepStart;
    sleepDuration = Math.min(recSleepH, (windowEndMin - sleepStart - 45) / 60);
    freeDuration = Math.max(1, (sleepStart - freeStart - 30) / 60);
  } else {
    // Afternoon/evening arrival: short nap → outdoor → main sleep
    sleepStrategy = "Short nap, then outdoor";
    const napH = jetlagSeverity > 6 ? 2 : 1.5;
    const napEnd = ciMin + napH * 60;
    freeStart = napEnd + 15;
    // Main sleep: fits as much of recSleepH as possible before window end
    const availForFreeAndSleep = windowEndMin - freeStart - 45;
    freeDuration = Math.max(1, (availForFreeAndSleep / 60) - recSleepH);
    sleepStart    = freeStart + freeDuration * 60;
    sleepDuration = Math.min(recSleepH, (windowEndMin - sleepStart - 45) / 60);
  }

  freeDuration  = Math.round(Math.max(0.5, Math.min(8, freeDuration)) * 2) / 2;
  sleepDuration = Math.round(Math.max(4, sleepDuration) * 2) / 2;
  const freeLocalH = Math.floor(((freeStart % 1440) + 1440) % 1440 / 60);

  // Warning if window is tight
  const windowTight = restWindowH < 14;
  const windowVeryTight = restWindowH < 10;

  // Jet lag tips
  const prevCity = getDestInfo("LUX").city; // fallback
  let jetlagTips = [];
  if (jetlagSeverity === 0) {
    jetlagTips.push(`Same time zone as previous station – no additional jetlag on this segment.`);
    if (Math.abs(tzDiffFromHome) > 3) jetlagTips.push(`Total shift vs. Luxembourg: ${tzDiffFromHome > 0 ? "+" : ""}${tzDiffFromHome}h – body is adapting to previous station.`);
  } else if (jetlagSeverity <= 3) {
    jetlagTips.push(`Minor shift (${tzDiffFromPrev > 0 ? "+" : ""}${tzDiffFromPrev}h). Body adapts quickly.`);
    jetlagTips.push(travelDirection === "east" ? "Mild eastward shift: go to sleep slightly earlier than at previous station." : "Mild westward shift: wake up slightly later than at previous station.");
  } else if (jetlagSeverity <= 6) {
    jetlagTips.push(`Moderate shift (${tzDiffFromPrev > 0 ? "+" : ""}${tzDiffFromPrev}h). 1–2 days to adapt.`);
    jetlagTips.push(travelDirection === "east" ? "Eastward: Melatonin (0.5mg) in the evening, actively seek morning light." : "Westward: morning sunlight is the most effective reset. Afternoon nap max. 30 min.");
  } else {
    jetlagTips.push(`Strong shift (${tzDiffFromPrev > 0 ? "+" : ""}${tzDiffFromPrev}h). Body needs active support.`);
    jetlagTips.push(travelDirection === "east" ? "Eastward: Melatonin (0.5–1mg) 2h before sleep. Avoid morning light." : "Westward: morning sunlight is priority. No nap >30 min.");
    jetlagTips.push("Hydration: min. 2.5L water. Caffeine only before 12:00 local time.");
  }

  // Climate tips
  let climateTips = [];
  if (dest.humidity === "high" && dest.tempMar > 25) {
    climateTips.push(`Tropical (${dest.tempMar}°C, high humidity): activities before 10:00 or after 17:00.`);
    climateTips.push("Minimum 2.5L water daily. Electrolytes after exercise.");
  } else if (dest.tempMar < 0) {
    climateTips.push(`Cold (${dest.tempMar}°C): dress in warm layers. Fresh air is still valuable.`);
    climateTips.push("Gloves & hat required. Avoid staying indoors too long – fresh air is important.");
  } else if (dest.tempMar < 10) {
    climateTips.push(`Cool (${dest.tempMar}°C): pleasant for outdoor exercise. Light jacket recommended.`);
  } else {
    climateTips.push(`Pleasant (${dest.tempMar}°C): ideal conditions for outdoor activity.`);
  }

  const napEndLoc = (sleepStrategy === "Short nap, then outdoor")
    ? fmtMin(ciMin + (jetlagSeverity > 6 ? 2 : 1.5) * 60)
    : null;
  return {
    dest, tzDiffFromHome, tzDiffFromPrev, jetlagSeverity, travelDirection,
    localArrH, localArrMin, isNightArrival, isMorningArrival,
    sleepStrategy, sleepStart, sleepDuration, freeStart, freeDuration, freeLocalH,
    jetlagTips, climateTips, recSleepH, restWindowH, windowTight, windowVeryTight,
    napEndLoc,
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// HOTEL WELLNESS DATABASE
// Known amenities per hotel + smart defaults for luxury/business chains
// ═══════════════════════════════════════════════════════════════════════════════
const HOTEL_WELLNESS = {
  // ── By hotel name keyword ──────────────────────────────────────────────────
  "Shangri-La": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["24h gym & pool", "Chi Spa – deep tissue & jet lag recovery massage", "Horizon Club lounge with healthy breakfast buffet"],
    crewNote: "Ask for the 'Jet Lag Recovery' massage – specifically designed for aircrew and frequent flyers.",
  },
  "Hilton": {
    gym: true, pool: true, spa: false, massage: false, healthyFood: true,
    highlights: ["24h fitness centre", "Executive Lounge with light healthy options", "In-room dining with balanced menu"],
    crewNote: "Hilton Honors members: use the app to request a quiet, high-floor room away from street noise.",
  },
  "Sheraton": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["Sheraton Fitness by Core Performance – 24h", "Heated pool", "Blend – healthy food & smoothie bar"],
    crewNote: "Blend bar often has protein shakes and light pre-sleep snacks. Worth checking opening hours at check-in.",
  },
  "Pan Pacific": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["24h Pacific Club fitness centre", "Infinity pool", "Pacifica spa with jet lag recovery treatments", "Scrolls buffet – extensive healthy options"],
    crewNote: "Pacific Club lounge is excellent for a light pre-sleep meal. Pool deck quiet after 21:00.",
  },
  "Ritz Carlton": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["24h fitness centre", "The Spa with restorative treatments", "Club Lounge – healthy breakfast & evening canapes", "In-room wellness amenity kit"],
    crewNote: "Ritz Carlton has a dedicated wellness concierge. Call ahead to book a 'sleep preparation' massage.",
  },
  "Hyatt": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["StayFit gym – usually 24h", "Pool", "Miraval wellness menu available in some properties", "Healthy kitchen menu"],
    crewNote: "Grand Hyatt properties have among the best gym equipment of any hotel chain.",
  },
  "Marriott": {
    gym: true, pool: true, spa: false, massage: false, healthyFood: true,
    highlights: ["M Club fitness 24h", "Marriott Bonvoy app room controls", "Healthy options on in-room dining menu"],
    crewNote: "Request 'sleep package' at check-in – includes pillow menu and blackout curtain check.",
  },
  "Kempinski": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["24h wellness & fitness", "Kempinski The Spa", "Gourmet healthy cuisine"],
    crewNote: "Kempinski spa staff are well trained in jet lag recovery protocols. Worth a consultation.",
  },
  "Mövenpick": {
    gym: true, pool: false, spa: false, massage: false, healthyFood: true,
    highlights: ["Fitness centre", "Mövenpick signature healthy breakfast buffet"],
    crewNote: "Known for exceptional breakfast quality – prioritise a proper meal before sleep if arriving at night.",
  },
  "Fairmont": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["Willow Stream Spa", "24h gym", "Balanced cuisine with local organic options"],
    crewNote: "Fairmont Willow Stream Spa offers specific 'traveller's renewal' treatments.",
  },
  "InterContinental": {
    gym: true, pool: true, spa: true, massage: true, healthyFood: true,
    highlights: ["Club InterContinental lounge", "Fitness centre 24h", "Spa facilities"],
    crewNote: "Club lounge is a good option for a light supper if arriving late – quieter than the restaurant.",
  },
  // ── Default for unknown hotels ─────────────────────────────────────────────
  "DEFAULT": {
    gym: true, pool: false, spa: false, massage: false, healthyFood: true,
    highlights: ["Fitness centre (confirm hours at check-in)", "In-room dining menu"],
    crewNote: "Always ask at check-in: gym hours, pool availability, and in-room dining options for late arrivals.",
  },
};

function getHotelWellness(hotelName) {
  if (!hotelName) return HOTEL_WELLNESS["DEFAULT"];
  const name = hotelName.toLowerCase();
  const keys = Object.keys(HOTEL_WELLNESS);
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key !== "DEFAULT" && name.includes(key.toLowerCase())) return HOTEL_WELLNESS[key];
  }
  return HOTEL_WELLNESS["DEFAULT"];
}

// Decide whether to show hotel wellness as PRIMARY recommendation
// based on conditions that make outdoor activity difficult
function hotelWellnessPrimary(dest, analysis, stop) {
  const reasons = [];
  if (dest.tempMar >= 30) reasons.push(`${dest.tempMar}°C – too hot for outdoor exercise`);
  if (dest.tempMar <= 0)  reasons.push(`${dest.tempMar}°C – too cold for outdoor activity`);
  if (dest.humidity === "high" && dest.tempMar >= 28) reasons.push("High humidity amplifies heat stress");
  const { sleepStart, freeStart, freeDuration } = analysis;
  const freeLocalH = ((freeStart + dest.tz * 60) % 1440 + 1440) % 1440 / 60;
  if (freeLocalH >= 21 || freeLocalH < 6) reasons.push("Free time falls at night – outdoor not recommended");
  if (freeDuration < 2) reasons.push("Short free window – hotel is most practical");
  if (analysis.restWindowH && analysis.restWindowH < 12) reasons.push("Tight rest window – stay close to hotel");
  return reasons;
}

// ═══════════════════════════════════════════════════════════════════════════════
// ACTIVITY SUGGESTIONS
// ═══════════════════════════════════════════════════════════════════════════════
const ACTIVITIES = {
  KUL:  { morning:{ title:"KLCC Park & Petronas Towers", desc:"Morning jog in KLCC Park with Petronas view. Go before 09:00 due to heat.", type:"easy", duration:"1–2h", distance:"500m", crewTip:"Morning sunlight for jetlag reset. Start before 09:00!" },
          afternoon:{ title:"Bukit Nanas Forest Reserve", desc:"Rainforest in the heart of KL, shady & cool. KL Tower nearby.", type:"moderate", duration:"1.5h", distance:"2km", crewTip:"Shady even in the heat. Ideal after sleep." },
          evening:{ title:"Petronas Towers at Night", desc:"Illuminated towers with fountain show at 20:00 & 21:00. Dinner at Suria Mall.", type:"easy", duration:"1.5h", distance:"500m", crewTip:"Pleasant evening temperatures." } },
  HKG:  { morning:{ title:"TST Promenade & Skyline", desc:"Waterfront promenade, views of Hong Kong Island. Nearly empty in the morning.", type:"easy", duration:"1h", distance:"300m", crewTip:"Morning light on the water – optimal jetlag reset." },
          afternoon:{ title:"Kowloon Park & Star Ferry", desc:"City park (flamingos), then ferry (3 HKD) to Central.", type:"moderate", duration:"2–3h", distance:"1km", crewTip:"Get an Octopus Card. March: occasional drizzle." },
          evening:{ title:"Symphony of Lights 20:00", desc:"Free light show daily at 20:00 from the TST Promenade.", type:"easy", duration:"45min", distance:"300m", crewTip:"No stress – a relaxed end to the day." } },
  GYD:  { morning:{ title:"Bulvar Coastal Promenade", desc:"3 km along the Caspian Sea with fresh morning breeze.", type:"easy", duration:"1.5h", distance:"1km", crewTip:"Cool sea air in March. Use Bolt app for taxis." },
          afternoon:{ title:"Bulvar & Carpet Museum", desc:"Sea views and the Zaha Hadid museum building.", type:"easy", duration:"1.5h", distance:"1.5km", crewTip:"Pleasant temperatures, wind possible." },
          evening:{ title:"Icheri Sheher Old City", desc:"Illuminated UNESCO World Heritage site. Local restaurants: Piti soup, kebabs.", type:"easy", duration:"1.5h", distance:"1km", crewTip:"Very safe. Budget 20–30 AZN." } },
  SGN:  { morning:{ title:"Tao Dan Park Morning Exercise", desc:"Large city park with Tai Chi, jogging, birds. Locals doing morning rituals.", type:"easy", duration:"1h", distance:"10 min taxi", crewTip:"BEFORE 08:30 – extreme heat and humidity after that." },
          afternoon:{ title:"War Remnants Museum", desc:"Important historical museum, air-conditioned. Cool in the afternoon.", type:"easy", duration:"1.5h", distance:"15 min taxi", crewTip:"Air-conditioned – ideal in the midday heat." },
          evening:{ title:"Bui Vien Walking Street", desc:"Vibrant pedestrian zone with street food, bars, local atmosphere.", type:"easy", duration:"1.5h", distance:"15 min taxi", crewTip:"Cooler in the evenings. Budget for a good dinner: 5–10 USD." } },
  ANC:  { morning:{ title:"Tony Knowles Coastal Trail", desc:"11 km coastal path, Cook Inlet, Alaska Range. Wildlife active in the morning.", type:"moderate", duration:"1.5–3h", distance:"5 min", crewTip:"Warm clothing essential in February. Keep distance from moose!" },
          afternoon:{ title:"Coastal Trail & Earthquake Park", desc:"1964 earthquake fault lines visible. Views of the mountain range.", type:"moderate", duration:"1.5h", distance:"2–4km", crewTip:"Use daylight for jetlag reset (westbound flight!)." },
          evening:{ title:"4th Avenue & Northern Lights", desc:"Fresh salmon, King Crab. Northern lights after 22:00 on clear nights.", type:"easy", duration:"1.5h", distance:"5 min", crewTip:"Check 'Aurora Forecast' app. Simon & Seafort's for dinner." } },
  GDL:  { morning:{ title:"Parque Agua Azul", desc:"Large city park with fountains, shaded paths, pleasant morning cool.", type:"easy", duration:"1h", distance:"15 min taxi", crewTip:"Pleasant 22°C in March. Great photo location." },
          afternoon:{ title:"Hospicio Cabañas (UNESCO)", desc:"Baroque orphanage with Orozco frescoes. Air-conditioned, impressive.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"UNESCO World Heritage. Entry approx. 70 MXN." },
          evening:{ title:"Tlaquepaque Arts & Crafts", desc:"Charming neighbourhood with crafts, Mariachi, local restaurants.", type:"easy", duration:"2h", distance:"20 min taxi", crewTip:"Try Birria Tacos! Very safe and touristic." } },
  NLU:  { morning:{ title:"Bosque de Chapultepec", desc:"One of the world's largest urban parks – castles, lakes, museum. 2240m altitude.", type:"easy", duration:"1.5h", distance:"30 min taxi", crewTip:"Cool in the morning (15°C). Watch the altitude – start slow!" },
          afternoon:{ title:"National Museum of Anthropology", desc:"World's best museum for Mesoamerican cultures. Enormous collection.", type:"easy", duration:"2h", distance:"30 min taxi", crewTip:"Air-conditioned. Entry approx. 80 MXN. Closed Mondays." },
          evening:{ title:"Polanco Restaurant District", desc:"Upscale neighbourhood with excellent Mexican restaurants.", type:"easy", duration:"2h", distance:"30 min taxi", crewTip:"Safe, excellent food. Budget 200–400 MXN." } },
  CGO:  { morning:{ title:"Greenland Plaza Park", desc:"Modern city park around a skyscraper complex. Jogging paths.", type:"easy", duration:"1h", distance:"15 min taxi", crewTip:"Zhengzhou in March: 10°C, light jacket. Good morning air." },
          afternoon:{ title:"Henan Provincial Museum", desc:"Spectacular museum with 170,000 historical artefacts. Bronze treasures.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"One of China's best museums. Free, bring passport." },
          evening:{ title:"Zhengdong New Area Evening Walk", desc:"Futuristic lit architecture, huge lake, pleasant evening breeze.", type:"easy", duration:"1h", distance:"10 min taxi", crewTip:"Safe, modern. Try local noodles (Hot Dry Noodles)." } },
  ASB:  { morning:{ title:"Ashgabat White Marble Promenade", desc:"Record-breaking white marble buildings, wide boulevards, mountain views.", type:"easy", duration:"1h", distance:"10 min taxi", crewTip:"Pleasant 11°C in March. Very quiet, surreal cityscape." },
          afternoon:{ title:"National Museum of Turkmenistan", desc:"Impressive museum about Turkmenistan and the Silk Road.", type:"easy", duration:"1.5h", distance:"15 min taxi", crewTip:"Bring passport. A unique experience in this extraordinary city." },
          evening:{ title:"Berkarar Mall & Local Restaurants", desc:"Modern mall for dinner. Local cuisine: Plov, Shashlik, Manty.", type:"easy", duration:"1.5h", distance:"10 min taxi", crewTip:"Safe, quiet. Few tourists. Budget: 10–15 USD for a good dinner." } },
  PVG:  { morning:{ title:"Century Park Pudong", desc:"Large park with jogging paths and ponds, near the Pudong skyline.", type:"easy-moderate", duration:"1h", distance:"15 min taxi", crewTip:"Morning sun important after westbound flight. March: fresh 11°C." },
          afternoon:{ title:"The Bund Promenade", desc:"Famous waterfront with colonial architecture and Pudong skyline.", type:"easy", duration:"1.5h", distance:"30 min taxi/metro", crewTip:"One of the world's most impressive skylines. A must-see!" },
          evening:{ title:"The Bund at Night", desc:"Pudong and Bund night illuminations. Dinner at one of the Bund restaurants.", type:"easy", duration:"1.5h", distance:"30 min", crewTip:"Reserve early (18:00). Budget restaurant Yu Garden nearby." } },
  SIN:  { morning:{ title:"Gardens by the Bay Morning Walk", desc:"Futuristic gardens next to Marina Bay. Supertrees, flower domes.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"Go before 09:00 – tropical heat after that. Entry fee for domes." },
          afternoon:{ title:"MacRitchie Reservoir Park", desc:"Nature reserve with treetop walk, monkeys, running paths.", type:"moderate", duration:"2h", distance:"25 min taxi", crewTip:"Shady & cool. Bring water. Watch for macaques!" },
          evening:{ title:"Clarke Quay & Riverside", desc:"Lively restaurant and nightlife area by the river. Perfect for dinner.", type:"easy", duration:"1.5h", distance:"20 min", crewTip:"Cooler evenings (25°C). Hawker food cheap & excellent." } },
  TPE:  { morning:{ title:"Da'an Forest Park Morning Run", desc:"Taipei's largest park with jogging paths, lakes, Tai Chi. Quiet morning atmosphere.", type:"easy-moderate", duration:"1–1.5h", distance:"15 min taxi", crewTip:"March: 18°C, ideal for exercise. Get MRT card – excellent public transport." },
          afternoon:{ title:"Elephant Mountain (Xiangshan)", desc:"45-min climb to iconic skyline view over Taipei 101.", type:"moderate", duration:"2h", distance:"20 min MRT", crewTip:"Often cloudy in the afternoon – better light for photos in morning or evening." },
          evening:{ title:"Raohe Street Night Market", desc:"Taipei's oldest night market. Pepper buns, oyster noodles, mango ice.", type:"easy", duration:"1.5h", distance:"25 min MRT", crewTip:"Best visited 20:00–23:00. Budget: 300–500 TWD for dinner." } },
  BKK:  { morning:{ title:"Lumpini Park Morning Exercise", desc:"Large city park with water monitors, joggers, Tai Chi. Local and authentic.", type:"easy", duration:"1h", distance:"15 min taxi", crewTip:"BEFORE 08:30! Extreme heat after that. Watch the water monitors." },
          afternoon:{ title:"Wat Pho Temple Complex", desc:"Enormous reclining Buddha, impressive temple grounds. Air-conditioned museum.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"Cooler inside the temple. Cover shoulders. Entry: 200 THB." },
          evening:{ title:"Chao Phraya River Boat & Asiatique", desc:"River boat (15 THB) to Asiatique night market. Riverside dinner.", type:"easy", duration:"2h", distance:"20 min taxi", crewTip:"Cooler evenings (27°C). Boat from Sathorn Pier. Book early for riverside dinner." } },
  ORD:  { morning:{ title:"Lakefront Trail & Navy Pier", desc:"10 km along Lake Michigan, Chicago skyline, Navy Pier. Windy but spectacular.", type:"moderate", duration:"1.5–2h", distance:"20 min taxi", crewTip:"March: 4°C, warm jacket essential. Wind off the lake – windproof layer!" },
          afternoon:{ title:"Art Institute of Chicago", desc:"World-class art museum, Seurat paintings, impressionist collection.", type:"easy", duration:"2h", distance:"25 min taxi", crewTip:"Air-conditioned – ideal in cold weather. Buy tickets in advance." },
          evening:{ title:"Magnificent Mile & River Walk", desc:"Famous lit shopping street. Chicago River Walk for dinner.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"Well-lit, safe. Giordano's for Deep Dish Pizza – a Chicago classic." } },
  DXB:  { morning:{ title:"Dubai Creek & Al Fahidi", desc:"Historic district, Abra boat across the creek (1 AED). Old souk.", type:"easy", duration:"1.5h", distance:"30 min taxi", crewTip:"Pleasant mornings (22°C). Before midday heat. Use Careem taxi app." },
          afternoon:{ title:"Dubai Mall & Burj Khalifa", desc:"World's largest mall, aquarium, Burj Khalifa observation deck (optional).", type:"easy", duration:"2h", distance:"20 min taxi", crewTip:"Air-conditioned, ideal in the heat. At the Top: 154 AED. Evening fountain show free." },
          evening:{ title:"JBR Walk & Dubai Marina", desc:"Beach promenade, marina views, many restaurants. Cooler and lively evenings.", type:"easy", duration:"1.5h", distance:"25 min taxi", crewTip:"20°C evenings, perfect. Budget for good dinner: 80–150 AED." } },
  NRT:  { morning:{ title:"Narita-san Shinshoji Temple", desc:"700-year-old temple, 5 min from hotel. Temple park with ponds and pagoda.", type:"easy", duration:"1.5h", distance:"5 min", crewTip:"Quiet and atmospheric in the morning. Bring small yen coins for offerings." },
          afternoon:{ title:"Aeon Mall Narita", desc:"Large shopping centre, Japanese food, supermarket for snacks.", type:"easy", duration:"1.5h", distance:"10 min taxi", crewTip:"Air-conditioned. 7-Eleven for onigiri and matcha – essential!" },
          evening:{ title:"Narita Omotesando Street", desc:"Historic shopping street towards the temple. Eel restaurants (Unagi), tofu.", type:"easy", duration:"1h", distance:"5 min", crewTip:"Unagi (eel) is Narita's specialty. Budget: 2000–3000 JPY for a good dinner." } },
  JFK:  { morning:{ title:"Rockaway Beach Walk", desc:"Long Atlantic beach, nearly empty in the morning. Wide views, fresh sea air.", type:"easy-moderate", duration:"1.5h", distance:"30 min Subway A", crewTip:"March: 7°C, windproof jacket needed. A-Train direct. Jetlag reset via morning light." },
          afternoon:{ title:"Brooklyn Bridge & DUMBO", desc:"Walk across the iconic bridge, Manhattan skyline views.", type:"moderate", duration:"2h", distance:"40 min subway", crewTip:"Slightly warmer at midday. Time Out Market in DUMBO for lunch." },
          evening:{ title:"Greenwich Village & West Village", desc:"Lively neighbourhood, jazz bars, restaurants, Bleecker Street.", type:"easy", duration:"2h", distance:"45 min subway", crewTip:"Very safe. Blue Note for jazz (reservation needed!). Budget: 25–40 USD dinner." } },
  DEL:  { morning:{ title:"Lodhi Garden Morning Run", desc:"Mughal tombs in a park setting. Joggers, birds, morning light on historic structures.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"Before 09:00 – best air quality in Delhi. Check AQI app!" },
          afternoon:{ title:"Humayun's Tomb (UNESCO)", desc:"Precursor to the Taj Mahal, impressive Mughal architecture, manicured gardens.", type:"easy", duration:"2h", distance:"25 min taxi", crewTip:"Entry: 600 INR. Cooler inside. Use 'Uber India' for taxis." },
          evening:{ title:"Khan Market & Lodi Colony", desc:"Upscale market area, excellent restaurants, India souvenirs.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"Safe, well-lit. Indian Accent for fine dining or a local dhaba experience." } },
  LAX:  { morning:{ title:"Manhattan Beach Boardwalk", desc:"Relaxed beach walk, watch the surfers, pier.", type:"easy", duration:"1.5h", distance:"25 min taxi", crewTip:"March: 18°C, perfect. No car needed. Beach faces the morning sun." },
          afternoon:{ title:"Getty Center", desc:"World-class hilltop museum with 360° views over LA. Stunning architecture.", type:"easy", duration:"2h", distance:"30 min taxi", crewTip:"Entry free, parking 20 USD. Spectacular views over Santa Monica Bay." },
          evening:{ title:"Santa Monica Pier & 3rd Street", desc:"Iconic illuminated pier, promenade, many restaurant options.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"15°C evenings, light jacket. Fish & chips on the pier. Budget: 20–35 USD dinner." } },
  MIA:  { morning:{ title:"South Beach Ocean Drive", desc:"Art Deco street, white sand beach, palm trees. Cool and quiet in the morning.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"March: 25°C, perfect beach weather. Sunscreen! Go early for a quiet beach." },
          afternoon:{ title:"Wynwood Walls", desc:"World-famous street art district. Galleries, cafés, creative atmosphere.", type:"easy", duration:"1.5h", distance:"25 min taxi", crewTip:"Tue–Sun 11:00–18:00. Entry: 12 USD. Very photogenic." },
          evening:{ title:"Little Havana & Calle Ocho", desc:"Cuban neighbourhood with music, mojitos, Cuban food.", type:"easy", duration:"2h", distance:"20 min taxi", crewTip:"Safe, lively. Versailles Restaurant – a Cuban classic. Budget: 20–30 USD." } },
  CAI:  { morning:{ title:"Pyramids of Giza", desc:"The only surviving wonder of the ancient world. Cool in the morning, fewer tourists.", type:"moderate", duration:"2–3h", distance:"40 min taxi", crewTip:"MUST go early (08:00)! Entry: 160 EGP. Clothing: sun protection." },
          afternoon:{ title:"Egyptian National Museum", desc:"Tutankhamun treasures, mummies, 5000 years of history. Air-conditioned.", type:"easy", duration:"2h", distance:"30 min taxi", crewTip:"Air-conditioned – ideal in midday heat. Watch for pickpockets." },
          evening:{ title:"Khan el-Khalili Souk", desc:"Historic 14th-century bazaar. Spices, perfume, handicrafts.", type:"easy", duration:"1.5h", distance:"30 min taxi", crewTip:"More lively after 18:00. Bargaining is normal. Try Koshary: 50 EGP." } },
  IST:  { morning:{ title:"Galata Bridge & Golden Horn", desc:"Iconic bridge with anglers, views of the Bosphorus and minarets.", type:"easy", duration:"1.5h", distance:"20 min taxi", crewTip:"March: 11°C, light jacket. Simit (sesame bread) from a bakery: 5 TRY." },
          afternoon:{ title:"Hagia Sophia & Sultanahmet", desc:"1500 years of history, former church and mosque, UNESCO World Heritage.", type:"easy", duration:"2h", distance:"20 min taxi", crewTip:"Entry: 25 USD. Cover shoulders/knees. Blue Mosque next door is free." },
          evening:{ title:"Karaköy & Galata Tower", desc:"Trendy neighbourhood, restaurants, rooftop bar with Bosphorus views.", type:"easy", duration:"1.5h", distance:"15 min taxi", crewTip:"Very lively evenings. Meze starters + Raki – Turkish evening ritual. Budget: 300–500 TRY." } },
  NBO:  { morning:{ title:"Nairobi National Park Morning Safari", desc:"The only national park directly next to a capital city. Lions, rhinos, giraffes.", type:"easy", duration:"2–3h", distance:"20 min taxi", crewTip:"Go early (06:30) – animals active in the morning. UberX to KWS Gate." },
          afternoon:{ title:"Karen Blixen Museum", desc:"Farm from 'Out of Africa', lovely garden, Giraffe Centre next door.", type:"easy", duration:"2h", distance:"35 min taxi", crewTip:"Feed giraffes at the Giraffe Centre next door! Best 13:00–14:00." },
          evening:{ title:"Westlands Restaurant District", desc:"Safest area for dinner. African and international cuisine.", type:"easy", duration:"1.5h", distance:"15 min taxi", crewTip:"Try Nyama Choma (grilled meat). Budget: 15–25 USD. Credit card accepted everywhere." } },
};


function getActivity(iata, localHour) {
  const db = ACTIVITIES[iata];
  const gen = {
    morning:   { title:`${iata} – Morning Walk`,    desc:"Fresh air, daylight and movement around the hotel.", type:"easy", duration:"1h", distance:"On foot", crewTip:"Morning daylight is the strongest natural jetlag reset." },
    afternoon: { title:`${iata} – City Walk`,     desc:"Explore the area, find parks and green spaces.",   type:"easy", duration:"1.5h", distance:"On foot", crewTip:"Fresh air and movement promote better sleep." },
    evening:   { title:`${iata} – Evening Stroll`,           desc:"Relaxed evening walk through local neighbourhoods.",       type:"passive", duration:"1h", distance:"On foot", crewTip:"No exercise after 20:00 local time – it disrupts sleep." },
  };
  const tips = db || gen;
  if (localHour >= 5  && localHour < 12) return tips.morning;
  if (localHour >= 12 && localHour < 19) return tips.afternoon;
  return tips.evening;
}

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════
function pad(n) { return String(Math.round(n)).padStart(2,"0"); }
function fmtLocalMin(utcMin, tz) {
  const n = ((utcMin + tz * 60) % 1440 + 1440) % 1440;
  return `${pad(Math.floor(n/60))}:${pad(n%60)}`;
}
function fmtMin(m) { const n=((m%1440)+1440)%1440; return `${pad(Math.floor(n/60))}:${pad(n%60)}`; }

// ═══════════════════════════════════════════════════════════════════════════════
// PDF.js
// ═══════════════════════════════════════════════════════════════════════════════
async function loadPdfJs() {
  if (window.pdfjsLib) return window.pdfjsLib;
  return new Promise((resolve, reject) => {
    const s = document.createElement("script");
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.min.js";
    s.onload = () => { window.pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.11.174/pdf.worker.min.js"; resolve(window.pdfjsLib); };
    s.onerror = reject;
    document.head.appendChild(s);
  });
}
async function extractPdfText(file) {
  const lib = await loadPdfJs();
  const buf = await file.arrayBuffer();
  const pdf = await lib.getDocument({ data: buf }).promise;
  let text = "";
  for (let p = 1; p <= pdf.numPages; p++) {
    const page = await pdf.getPage(p);
    const ct = await page.getTextContent();
    text += ct.items.map(i => i.str).join(" ") + "\n";
  }
  return text;
}

function parsePdfToRotations(raw) {
  // ── Extract relevant sections only ────────────────────────────────────────────
  // Cargolux PDF section order: Grid → Total Hours → Other Crew → Expiry Dates → Hotels → Memos
  // Strategy: take grid (up to "Total Hours") + hotel block ("Hotel Information" → "Memos")
  function extractSection(text, startMark, endMarks) {
    const si = (startMark && text.indexOf(startMark) !== -1) ? text.indexOf(startMark) : 0;
    let chunk = text.slice(si);
    for (const em of endMarks) {
      const ei = chunk.indexOf(em);
      if (ei !== -1) chunk = chunk.slice(0, ei);
    }
    return chunk;
  }
  const gridSection  = extractSection(raw, null, ['Total Hours and Statistics', 'Other Crew', 'Expiry Dates']);
  const hotelSection = extractSection(raw, 'Hotel Information', ['Memos', 'Descriptions', 'Generated on']);
  const combined     = gridSection + '\n' + hotelSection;

  // ── Normalize: strip A-prefix from arrival times (Feb format: A09:49 → 09:49) ─
  const lines  = combined.split(/\n/).map(l => l.trim()).filter(Boolean);
  const flat   = combined.replace(/\bA(\d{2}:\d{2})/g, '$1').replace(/[ \t]+/g, ' ');

  // ── Pilot & airline ────────────────────────────────────────────────────────────
  let pilot = '', airline = 'Cargolux';
  const pilotM = flat.match(/\d{4}\s+([A-Z]+,\s+[A-Za-z\-]+)/);
  if (pilotM) pilot = pilotM[1];

  // ── Hotel extraction: scan flat text for IATA +phone ... date chunks ──────────
  const HOTEL_BRANDS = [
    'Pan Pacific','Ritz Carlton','Ritz-Carlton','Shangri-La','Shangri La',
    'Hilton','Sheraton','Marriott','Hyatt','Divan','Westin','Novotel','Sofitel',
    'Pullman','Crowne Plaza','Radisson','Le Meridien','Four Seasons','Conrad',
    'Renaissance','Courtyard','Caravelle','Swissôtel','Swissotel','Oguzkent',
    'Camino Real','Grand Hyatt','Fairmont','Kempinski','Movenpick','Mövenpick',
    'Park Hyatt','JW Marriott','Waldorf','DoubleTree','Hampton','Ibis',
  ];
  const SKIP_IATA = new Set(['UTC','ALL','LUX','THE','FOR','AND','VIA','PAX','FO','BC']);
  function cleanHotelName(raw) {
    const stop = raw.search(/\s+(\d+[\s,A-Z]|No\.?\s|#\s|opposite\s|near\s|Avenue|Road|Street|Blvd|Drive|Rue|Campos|Beyik)/i);
    return (stop > 0 ? raw.slice(0, stop) : raw.slice(0, 60)).trim();
  }
  const hotelMap = {};
  // Match: IATA +phone(s) <middle> date  (works on flat joined text)
  const hotelChunkRe = /\b([A-Z]{3})\s+\+(.*?)(\d{2}\/\d{2}\/\d{4})/gs;
  for (const m of flat.matchAll(hotelChunkRe)) {
    const [, iata, middle, date] = m;
    if (SKIP_IATA.has(iata) || iata in hotelMap) continue;
    const mid = middle.replace(/\s+/g, ' ').trim();
    let hotelName = iata;
    for (const brand of HOTEL_BRANDS) {
      if (mid.includes(brand)) {
        hotelName = cleanHotelName(mid.slice(mid.indexOf(brand)));
        break;
      }
    }
    hotelMap[iata] = { hotel: hotelName, checkinDate: date };
  }

  // ── Segment extraction (overlapping search; key = flt+orig+dest for duplicates) ─
  const segRe = /(\d{2}:\d{2})\s+(\w{3,6})\s+(\d{2}:\d{2})\s+\*?([A-Z]{3})\s+(?:[→↓↑\s]+)?\*?([A-Z]{3})\s+(\d{2}:\d{2})/g;
  const segsMap = {};
  let sm;
  let searchPos = 0;
  while (true) {
    segRe.lastIndex = searchPos;
    sm = segRe.exec(flat);
    if (!sm) break;
    searchPos = sm.index + 1;
    const [, ci, flt, dep, orig, dest, arr] = sm;
    if (orig === dest || !/\d/.test(flt)) continue;
    // Use flt+orig+dest as key so same flight# on different routes (e.g. 9982) both stored
    const key = `${flt}-${orig}-${dest}`;
    if (!segsMap[key]) segsMap[key] = { ci, flt, dep, orig, dest, arr, pos: sm.index };
  }
  const segments = Object.values(segsMap);
  if (segments.length === 0) return null;

  // ── Build lookup maps (prefer later occurrence for same IATA) ─────────────────
  const inboundSeg  = {};
  const outboundSeg = {};
  for (const s of segments.sort((a,b) => a.pos - b.pos)) {
    if (s.dest !== 'LUX') inboundSeg[s.dest]  = s;
    if (s.orig !== 'LUX') outboundSeg[s.orig] = s;
  }

  // ── Date helpers ──────────────────────────────────────────────────────────────
  function parseDate(d) {
    const [day, mon, yr] = d.split('/').map(Number);
    return new Date(yr, mon - 1, day);
  }
  function addDays(d, n) { const r = new Date(d); r.setDate(r.getDate() + n); return r; }
  function diffH(d1, d2) { return (d2 - d1) / 3600000; }
  function toMin(t) { const [h, m] = t.split(':').map(Number); return h * 60 + m; }

  // ── Rotation detection ────────────────────────────────────────────────────────
  // 1) Group hotel stops by date gap (>5 days = new rotation)
  const hotelEntries = Object.entries(hotelMap)
    .filter(([, h]) => h.checkinDate)
    .sort((a, b) => parseDate(a[1].checkinDate) - parseDate(b[1].checkinDate));

  if (hotelEntries.length === 0) return null;

  const rotGroups = [];
  let cur = [hotelEntries[0]];
  for (let i = 1; i < hotelEntries.length; i++) {
    const gap = (parseDate(hotelEntries[i][1].checkinDate) -
                 parseDate(hotelEntries[i-1][1].checkinDate)) / 86400000;
    if (gap > 5) { rotGroups.push(cur); cur = []; }
    cur.push(hotelEntries[i]);
  }
  rotGroups.push(cur);

  // 2) Detect extra rotation: LUX departures AFTER the last LUX return in text
  //    (handles rotations continuing into next month with no hotel in this PDF)
  const luxReturns = segments.filter(s => s.dest === 'LUX');
  const lastLuxReturnPos = luxReturns.length > 0
    ? Math.max(...luxReturns.map(s => s.pos)) : -1;
  const luxDepsAfter = segments.filter(s => s.orig === 'LUX' && s.pos > lastLuxReturnPos);
  const allHotelIatas = new Set(Object.keys(hotelMap));

  // Only follow segments that appear after last LUX return AND lead to new IATAs
  const lateSegsMap = {};
  for (const s of segments) {
    if (s.pos > lastLuxReturnPos && !allHotelIatas.has(s.dest))
      lateSegsMap[s.orig] = s;
  }
  for (const dep of luxDepsAfter) {
    const chain = [];
    let iata = dep.dest;
    const visited = new Set();
    while (iata && !visited.has(iata) && iata !== 'LUX' && !allHotelIatas.has(iata)) {
      visited.add(iata);
      chain.push([iata, { hotel: iata, checkinDate: null }]);
      const next = lateSegsMap[iata];
      iata = next ? next.dest : null;
    }
    if (chain.length > 0) rotGroups.push(chain);
  }

  // ── Build result rotations ────────────────────────────────────────────────────
  const result = [];
  rotGroups.forEach((group, ri) => {
    const stops = [];
    group.forEach(([iata, info], si) => {
      const inbound  = inboundSeg[iata];
      const outbound = outboundSeg[iata];

      const arrTime  = inbound  ? inbound.arr  : null;
      const checkIn  = outbound ? outbound.ci  : null;

      // Flight duration (inbound)
      let flightH = null;
      if (inbound) {
        const diff = (toMin(inbound.arr) - toMin(inbound.dep) + 1440) % 1440;
        flightH = Math.round(diff / 60 * 100) / 100;
      }

      // Rest window using hotel checkin dates
      let restWindowH = null;
      if (arrTime && checkIn && info.checkinDate) {
        const ciDate   = parseDate(info.checkinDate);
        const arrMin   = toMin(arrTime);
        const ciMin    = toMin(checkIn);
        const arrDate  = arrMin <= ciMin ? ciDate : addDays(ciDate, -1);
        const arrDt    = new Date(arrDate.getTime() + arrMin * 60000);

        // Outbound CI date: use next hotel's checkin date
        const nextHotel = group[si + 1];
        let ciDt;
        if (nextHotel) {
          const nextCiDate = parseDate(nextHotel[1].checkinDate);
          const depMin     = outbound ? toMin(outbound.dep) : ciMin;
          const ciDate2    = ciMin > depMin ? addDays(nextCiDate, -1) : nextCiDate;
          ciDt = new Date(ciDate2.getTime() + ciMin * 60000);
        } else {
          // Last stop of rotation
          const ciDate2 = ciMin >= arrMin ? ciDate : addDays(ciDate, 1);
          ciDt = new Date(ciDate2.getTime() + ciMin * 60000);
        }
        restWindowH = Math.round(diffH(arrDt, ciDt) * 10) / 10;
      }

      const hotelUnknown = !info.checkinDate;
      stops.push({
        iata,
        hotel:       hotelUnknown ? null : info.hotel,
        arrival:     arrTime  || '00:00',
        checkIn:     checkIn  || null,
        restWindowH: restWindowH,
        flightH:     flightH  || 8,
        note:        inbound ? `Fl. ${inbound.flt}` : '',
        hotelUnknown,
      });
    });

    if (stops.length > 0) {
      // Build dateRange from hotel checkinDates: "DD.MM – DD.MM.YYYY"
      const datesInRot = group
        .map(([, h]) => h.checkinDate)
        .filter(Boolean);
      const fmt = (d) => { const [dd,mm] = d.slice(0,5).split('/'); return `${dd}.${mm}`; };
      let dateRange = '';
      if (datesInRot.length >= 2) {
        const last = datesInRot[datesInRot.length - 1];
        const yr   = last.slice(6);
        dateRange = `${fmt(datesInRot[0])} – ${fmt(last)}.${yr}`;
      } else if (datesInRot.length === 1) {
        const [d,mo,yr] = datesInRot[0].split('/');
        dateRange = `${d}.${mo}.${yr}`;
      } else {
        // Partial rotation: derive date from inbound segment position in PDF header
        const periodM = flat.match(/(\d{2}\/\d{2}\/\d{4})\s*-\s*(\d{2}\/\d{2}\/\d{4})/);
        if (periodM) {
          const [, , endDate] = periodM;  // use end-of-month date as "from"
          dateRange = `from ${fmt(endDate)}`;
        }
      }
      const incomplete = group.some(([, h]) => !h.checkinDate);
      result.push({
        id:        `imported-r${ri+1}-${Date.now()}`,
        label:     `Rotation ${ri + 1}`,
        dateRange,
        incomplete,
        pilot,
        airline,
        prevIata:  null,
        stops,
      });
    }
  });

  return result.length > 0 ? result : null;
}


// ═══════════════════════════════════════════════════════════════════════════════
// STYLES
// ═══════════════════════════════════════════════════════════════════════════════
const C = {
  bg:"#F1F5F9",    // light slate background
  pnl:"#FFFFFF",   // white cards
  bdr:"#E2E8F0",   // subtle borders
  acc:"#0284C7",   // sky blue
  accL:"#EFF6FF",  // light blue tint
  gold:"#D97706",  // amber
  goldL:"#FFFBEB", // light amber tint
  txt:"#0F172A",   // near-black
  txt2:"#334155",  // dark slate
  mut:"#64748B",   // muted slate
  ok:"#059669",    // emerald
  okL:"#ECFDF5",   // light green tint
  warn:"#D97706",  // amber warning
  warnL:"#FFFBEB",
  err:"#DC2626",   // red
  errL:"#FEF2F2",
  sleep:"#1D4ED8", // deep blue for sleep
  sleepL:"#EFF6FF",
  free:"#059669",  // green for free time
  freeL:"#ECFDF5",
};
const T = { fontFamily:"'Inter','DM Sans',system-ui,sans-serif" };
const card  = { background:C.pnl, border:`1px solid ${C.bdr}`, borderRadius:"14px", padding:"0", marginBottom:"12px", overflow:"hidden", boxShadow:"0 1px 3px rgba(0,0,0,0.06)" };
const scard = { background:C.bg,  border:`1px solid ${C.bdr}`, borderRadius:"10px", padding:"12px", marginBottom:"8px" };
const iataB = { background:C.acc, color:"#fff", borderRadius:"6px", padding:"4px 10px", fontSize:"12px", fontWeight:700, letterSpacing:"0.08em", fontFamily:"'DM Mono',monospace" };
const lbl   = { display:"block", fontSize:"10px", letterSpacing:"0.12em", textTransform:"uppercase", color:C.mut, marginBottom:"6px", fontWeight:600 };
const si    = { width:"100%", background:"#fff", border:`1.5px solid ${C.bdr}`, borderRadius:"8px", color:C.txt, fontFamily:"inherit", fontSize:"14px", padding:"9px 11px", outline:"none", boxSizing:"border-box" };

function HowItWorks() {
  const [open, setOpen] = useState(false);

  const blocks = [
    {
      icon: "🕐",
      tag: "WHAT IS JETLAG?",
      title: "Your clock is stuck on home time",
      color: "#6366F1",
      body: "When you fly 7 time zones east — say LUX → Bangkok (UTC+7) — your internal clock is still running on Luxembourg time. Your body thinks it's the middle of the night, even though it's morning locally. Beyond ~6 hours of shift, the body cannot adapt fast enough on its own. Active countermeasures are needed.",
    },
    {
      icon: "💊",
      tag: "MELATONIN",
      title: "Eastward is harder — here's why",
      color: "#8B5CF6",
      body: "Eastward jetlag is harder than westward because you have to sleep earlier than your internal clock wants. A low dose of melatonin (0.5–1mg) signals to the body: 'it is night now', and shifts the clock forward. Timing matters: 2 hours before your recommended sleep time is the optimal window — not at bedtime itself.",
    },
    {
      icon: "☀️",
      tag: "LIGHT EXPOSURE",
      title: "Morning light — friend or foe",
      color: "#F59E0B",
      body: "Sunlight is the strongest signal your internal clock receives. But when flying east, local morning falls exactly when your body still feels like deep night. Light at that moment would slow or reverse adaptation. The strategy: sunglasses outdoors, stay inside until ~10:00 local. Once past that window, actively seek sunlight to anchor the new clock.",
    },
    {
      icon: "💧",
      tag: "HYDRATION",
      title: "Cabin air is drier than the Sahara",
      color: "#0EA5E9",
      body: "Long-haul cabin air has humidity of only 5–10% — drier than most deserts. This causes significant dehydration on every flight, which measurably amplifies jetlag symptoms and delays recovery. Caffeine after 12:00 local time further disrupts sleep onset in the evening — a meaningful factor when adaptation is already difficult. Minimum 2.5L water, caffeine before noon.",
    },
  ];

  return (
    <div style={{...card, marginBottom:"16px", overflow:"hidden"}}>
      {/* Header — always visible */}
      <button
        onClick={() => setOpen(p => !p)}
        style={{width:"100%", background:"transparent", border:"none", cursor:"pointer", padding:"15px 18px", fontFamily:"inherit", display:"flex", justifyContent:"space-between", alignItems:"flex-start", textAlign:"left", gap:"12px"}}>
        <div style={{flex:1}}>
          <div style={{display:"flex", alignItems:"center", gap:"8px", marginBottom:"3px"}}>
            <span style={{fontSize:"13px", fontWeight:700, color:C.txt}}>How CrewRhythm works</span>
            {!open && <span style={{fontSize:"10px", fontWeight:600, color:C.acc, background:`${C.acc}15`, padding:"1px 7px", borderRadius:"10px", letterSpacing:"0.04em"}}>ⓘ why these recommendations?</span>}
          </div>
          <div style={{fontSize:"11px", color:C.mut, lineHeight:1.5}}>
            These notes explain how your body responds to time zone shifts — and what you can do about it.
          </div>
        </div>
        <span style={{fontSize:"14px", color:C.mut, flexShrink:0, marginTop:"1px"}}>{open ? "▲" : "▼"}</span>
      </button>

      {/* Expandable content */}
      {open && (
        <div style={{borderTop:`1px solid ${C.bdr}`}}>
          {blocks.map((b, i) => (
            <div key={i} style={{padding:"14px 18px", borderBottom: i < blocks.length-1 ? `1px solid ${C.bdr}` : "none", display:"flex", gap:"13px", alignItems:"flex-start"}}>
              <div style={{width:"36px", height:"36px", borderRadius:"9px", background:`${b.color}15`, display:"flex", alignItems:"center", justifyContent:"center", fontSize:"18px", flexShrink:0}}>
                {b.icon}
              </div>
              <div style={{flex:1}}>
                <div style={{fontSize:"9px", fontWeight:700, color:b.color, letterSpacing:"0.1em", marginBottom:"2px"}}>{b.tag}</div>
                <div style={{fontSize:"12px", fontWeight:700, color:C.txt, marginBottom:"4px"}}>{b.title}</div>
                <div style={{fontSize:"11px", color:C.txt2, lineHeight:1.65}}>{b.body}</div>
              </div>
            </div>
          ))}

          {/* Summary footer */}
          <div style={{padding:"13px 18px", background:"rgba(99,102,241,0.03)", borderTop:`1px solid ${C.bdr}`}}>
            <div style={{fontSize:"11px", color:C.txt, lineHeight:1.7}}>
              <span style={{fontWeight:700, color:C.acc}}>In short: </span>
              CrewRhythm combines <strong>circadian biology</strong> (light & dark signals), <strong>pharmacology</strong> (melatonin timing), and <strong>crew health</strong> (hydration, climate, activity). All recommendations follow established sleep medicine guidelines for shift workers and long-haul aircrew — automatically applied to your specific rotation and layover.
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Badge({ color, bg, children }) {
  return <span style={{ background: bg||`${color}15`, border:`1.5px solid ${color}30`, borderRadius:"6px", padding:"3px 9px", fontSize:"11px", color, fontWeight:600 }}>{children}</span>;
}
function JetlagBar({ severity }) {
  const pct = Math.min(100, (severity / 16) * 100);
  const col  = severity <= 3 ? C.ok : severity <= 6 ? C.gold : C.err;
  const label = severity === 0 ? "No jetlag" : severity <= 3 ? "Mild" : severity <= 6 ? "Moderate" : "Severe";
  return (
    <div style={{ display:"flex", alignItems:"center", gap:"10px" }}>
      <div style={{ flex:1, height:"6px", background:C.bdr, borderRadius:"3px" }}>
        <div style={{ width:`${pct}%`, height:"100%", background:col, borderRadius:"3px", transition:"width 0.4s ease" }} />
      </div>
      <span style={{ fontSize:"11px", color:col, fontWeight:700, minWidth:"50px", textAlign:"right" }}>
        {severity === 0 ? "±0h" : `${severity}h`} · {label}
      </span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// PREV IATA INPUT – Previous month destination für Jetlag-Kontinuität
// ═══════════════════════════════════════════════════════════════════════════════
function PrevIataInput({ value, onChange }) {
  const [draft, setDraft] = useState(value || "");
  const dest = draft.length === 3 ? getDestInfo(draft.toUpperCase()) : null;
  const isValid = draft.length === 0 || (draft.length === 3 && /^[A-Z]{3}$/.test(draft.toUpperCase()));

  const handleChange = (v) => {
    const upper = v.toUpperCase().replace(/[^A-Z]/g, "").slice(0, 3);
    setDraft(upper);
    if (upper.length === 3 || upper.length === 0) onChange(upper || null);
  };

  return (
    <div style={{borderTop:`1px solid ${C.bdr}`,paddingTop:"12px"}}>
      <div style={{display:"flex",alignItems:"flex-start",gap:"12px",flexWrap:"wrap"}}>
        <div style={{flex:"0 0 auto"}}>
          <label style={{...lbl,color:C.gold}}>PREVIOUS MONTH – LAST DESTINATION</label>
          <div style={{display:"flex",alignItems:"center",gap:"8px"}}>
            <input
              style={{...si, width:"80px", borderColor: draft && !isValid ? C.err : draft.length===3 ? C.gold : C.bdr,
                fontFamily:"'DM Mono',monospace", fontSize:"15px", fontWeight:700,
                textAlign:"center", letterSpacing:"0.12em", textTransform:"uppercase", background:"#fff"}}
              placeholder="—"
              value={draft}
              onChange={e => handleChange(e.target.value)}
              maxLength={3}
            />
            {draft.length === 3 && isValid && (
              <button onClick={() => { setDraft(""); onChange(null); }}
                style={{background:"transparent",border:`1px solid ${C.bdr}`,borderRadius:"4px",color:C.mut,cursor:"pointer",fontSize:"11px",padding:"5px 8px",fontFamily:"inherit"}}>
                ✕ Reset
              </button>
            )}
          </div>
        </div>
        <div style={{flex:1,minWidth:"180px"}}>
          {draft.length === 0 && (
            <div style={{marginTop:"18px",fontSize:"11px",color:C.mut,lineHeight:1.6}}>
              <span style={{color:C.gold,fontWeight:700}}>Optional:</span> If this rotation continues directly from another (e.g. month change), enter the IATA code of the last destination from the previous month. Jetlag calculations for the first stop will start from that time zone – not from Luxembourg.
            </div>
          )}
          {draft.length === 3 && isValid && dest && (
            <div style={{marginTop:"18px",background:`${C.gold}10`,border:`1px solid ${C.gold}30`,borderRadius:"7px",padding:"10px 14px"}}>
              <div style={{display:"flex",alignItems:"center",gap:"8px",marginBottom:"4px"}}>
                <span style={iataB}>{draft}</span>
                <span style={{fontSize:"12px",fontWeight:600,color:C.txt}}>{dest.city}</span>
                <span style={{fontSize:"11px",color:C.mut}}>{dest.country}</span>
              </div>
              <div style={{fontSize:"11px",color:C.gold}}>
                ⏱ Jetlag start point: UTC{dest.tz >= 0 ? "+" : ""}{dest.tz}
                {dest.tz === HOME_TZ
                  ? " — same as LUX, no difference"
                  : ` — vs UTC+1 (LUX): ${dest.tz - HOME_TZ > 0 ? "+" : ""}${dest.tz - HOME_TZ}h`}
              </div>
            </div>
          )}
          {draft.length > 0 && draft.length < 3 && (
            <div style={{marginTop:"18px",fontSize:"11px",color:C.mut,fontStyle:"italic"}}>Enter 3 letters…</div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MANUAL FORM
// ═══════════════════════════════════════════════════════════════════════════════
function ManualForm({ onLoad }) {
  const [rotLabel, setRotLabel] = useState("New Rotation");
  const [rows, setRows] = useState([{ iata:"", days:"1", hotel:"", arrival:"", flightH:"" }]);
  const set = (i, f, v) => setRows(p => p.map((r,j) => j===i ? {...r,[f]:v} : r));
  const valid = rows.every(r => r.iata.length===3 && r.arrival);
  return (
    <div style={{...card, border:`1px solid ${C.acc}44`, marginTop:"8px"}}>
      <div style={{fontSize:"11px",color:C.acc,fontWeight:700,marginBottom:"12px"}}>ENTER NEW ROTATION</div>
      <div style={{marginBottom:"10px"}}>
        <label style={lbl}>Rotation label</label>
        <input style={si} value={rotLabel} onChange={e=>setRotLabel(e.target.value)} placeholder="e.g. Rotation 1 – March 2026" />
      </div>
      <div style={{display:"grid",gridTemplateColumns:"72px 50px 1fr 78px 68px 26px",gap:"5px",marginBottom:"5px"}}>
        {["IATA","Days","Hotel","Arr. UTC","Flight h",""].map((h,i)=><div key={i} style={lbl}>{h}</div>)}
      </div>
      {rows.map((r,i)=>(
        <div key={i} style={{display:"grid",gridTemplateColumns:"72px 50px 1fr 78px 68px 26px",gap:"5px",marginBottom:"5px",alignItems:"center"}}>
          <input style={si} placeholder="KUL" maxLength={3} value={r.iata} onChange={e=>set(i,"iata",e.target.value.toUpperCase())} />
          <input style={si} type="number" min="1" max="7" value={r.days} onChange={e=>set(i,"days",e.target.value)} />
          <input style={si} placeholder="Hotel..." value={r.hotel} onChange={e=>set(i,"hotel",e.target.value)} />
          <input style={si} type="time" value={r.arrival} onChange={e=>set(i,"arrival",e.target.value)} />
          <input style={si} type="number" placeholder="8" step="0.5" value={r.flightH} onChange={e=>set(i,"flightH",e.target.value)} />
          <button onClick={()=>setRows(p=>p.filter((_,j)=>j!==i))} style={{background:"transparent",border:`1px solid ${C.bdr}`,borderRadius:"4px",color:C.mut,cursor:"pointer",fontSize:"13px",padding:"3px 5px"}}>×</button>
        </div>
      ))}
      <div style={{display:"flex",gap:"8px",marginTop:"10px"}}>
        <button onClick={()=>setRows(p=>[...p,{iata:"",days:"1",hotel:"",arrival:"",flightH:""}])} style={{background:"transparent",border:`1px solid ${C.bdr}`,borderRadius:"5px",color:C.mut,cursor:"pointer",fontSize:"11px",padding:"7px 12px",fontFamily:"inherit"}}>+ Stop</button>
        <button disabled={!valid} onClick={()=>onLoad([{id:`manual-${Date.now()}`,label:rotLabel,pilot:"",airline:"",stops:rows.map(r=>({iata:r.iata,days:parseInt(r.days)||1,hotel:r.hotel||r.iata,arrival:r.arrival,flightH:parseFloat(r.flightH)||8}))}])} style={{background:valid?C.acc:"transparent",color:valid?C.bg:C.mut,border:`1px solid ${valid?C.acc:C.bdr}`,borderRadius:"5px",cursor:valid?"pointer":"default",fontSize:"11px",padding:"7px 14px",fontFamily:"inherit",fontWeight:700}}>Load rotation →</button>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STOP RESULT CARD
// ═══════════════════════════════════════════════════════════════════════════════
function HotelWellnessCard({ wellness, hotelFirst, outdoorReasons, activity }) {
  const borderColor = hotelFirst ? "#4F9FD4" : C.bdr;
  const bgColor     = hotelFirst ? "#EFF8FF" : C.bg;
  const labelColor  = hotelFirst ? C.acc : C.mut;
  const labelText   = hotelFirst ? "HOTEL WELLNESS - RECOMMENDED ALTERNATIVE" : "HOTEL WELLNESS - ALSO AVAILABLE";

  return (
    <div>
      {hotelFirst && (
        <div style={{padding:"8px 12px", background:"#FEF3C7", borderRadius:"7px", border:"1px solid #FDE68A", fontSize:"11px", color:"#92400E", marginBottom:"8px"}}>
          {"Outdoor conditions challenging: " + outdoorReasons.join(" / ")}
        </div>
      )}

      <div style={{padding:"10px 14px", background:bgColor, borderRadius:"8px", border:"1px solid " + borderColor, marginBottom:"8px"}}>
        <div style={{fontSize:"10px", fontWeight:700, color:labelColor, letterSpacing:"0.08em", marginBottom:"6px"}}>
          {"🏨 " + labelText}
        </div>
        <div style={{display:"flex", gap:"4px", flexWrap:"wrap", marginBottom:"8px"}}>
          {wellness.gym && <span style={{fontSize:"10px", background:"#E0F2FE", color:"#0369A1", padding:"2px 7px", borderRadius:"8px", fontWeight:600}}>{"💪 Gym"}</span>}
          {wellness.pool && <span style={{fontSize:"10px", background:"#DCFCE7", color:"#166534", padding:"2px 7px", borderRadius:"8px", fontWeight:600}}>{"🏊 Pool"}</span>}
          {wellness.spa && <span style={{fontSize:"10px", background:"#F3E8FF", color:"#6B21A8", padding:"2px 7px", borderRadius:"8px", fontWeight:600}}>{"✨ Spa"}</span>}
          {wellness.massage && <span style={{fontSize:"10px", background:"#FFF7ED", color:"#9A3412", padding:"2px 7px", borderRadius:"8px", fontWeight:600}}>{"🤲 Massage"}</span>}
          {wellness.healthyFood && <span style={{fontSize:"10px", background:"#F0FDF4", color:"#15803D", padding:"2px 7px", borderRadius:"8px", fontWeight:600}}>{"🥗 Healthy food"}</span>}
        </div>
        <div style={{display:"flex", flexDirection:"column", gap:"4px", marginBottom:"8px"}}>
          {(wellness.highlights || []).map(function(h, idx) {
            return (
              <div key={idx} style={{fontSize:"11px", color:C.txt2, display:"flex", gap:"6px"}}>
                <span style={{color:C.acc}}>{"·"}</span>
                <span>{h}</span>
              </div>
            );
          })}
        </div>
        <div style={{fontSize:"11px", color:labelColor, fontStyle:"italic"}}>
          {"💡 " + (wellness.crewNote || "")}
        </div>
      </div>

      <div style={{padding:"10px 14px", background:C.bg, borderRadius:"8px", border:"1px solid " + C.bdr, opacity: hotelFirst ? 0.75 : 1}}>
        <div style={{fontSize:"10px", fontWeight:700, color:C.mut, letterSpacing:"0.08em", marginBottom:"4px"}}>
          {hotelFirst ? "OUTDOOR - IF CONDITIONS ALLOW" : "OUTDOOR ACTIVITY"}
          {" · "}
          {activity.duration}
        </div>
        <div style={{fontSize:"11px", color:C.txt2, lineHeight:1.5}}>
          {activity.title + " — " + activity.desc}
        </div>
        <div style={{fontSize:"11px", color:C.acc, marginTop:"5px"}}>
          {"💡 " + activity.crewTip}
        </div>
      </div>
    </div>
  );
}

function StopResult({ stop, analysis }) {
  const { dest, tzDiffFromPrev, jetlagSeverity, travelDirection,
          sleepStrategy, sleepStart, sleepDuration, freeStart, freeDuration,
          jetlagTips, climateTips, restWindowH, windowTight, windowVeryTight,
          napEndLoc } = analysis;
  const [expanded, setExpanded] = useState(false);

  const [arrH, arrM] = (stop.arrival || "00:00").split(":").map(Number);
  const wellness = getHotelWellness(stop.hotel);
  const outdoorReasons = hotelWellnessPrimary(dest, analysis, stop);
  const hotelFirst = outdoorReasons.length > 0;
  const localArr      = fmtLocalMin(arrH*60+arrM, dest.tz);
  const hotelArrLoc   = fmtLocalMin(arrH*60+arrM + 45, dest.tz); // ~45min to hotel
  const sleepStartLoc = fmtMin(sleepStart);
  const sleepEndLoc   = fmtMin(sleepStart + sleepDuration * 60);
  const freeStartLoc  = fmtMin(freeStart);
  const freeEndLoc    = fmtMin(freeStart + freeDuration * 60);
  const windowCol     = windowVeryTight ? C.err : windowTight ? C.warn : C.mut;
  const activity      = getActivity(stop.iata, analysis.freeLocalH);
  const jetlagOneLiner = jetlagTips.slice(0, 2).join(" · ");

  // Time after wakeup until check-in
  const wakeMin   = sleepStart + sleepDuration * 60;
  const ciUTCmin  = stop.checkIn
    ? stop.checkIn.split(":").reduce((h,m,i)=> i===0 ? +h*60 : +h + +m, 0)
    : null;
  // local check-in time
  const ciLocalLoc = stop.checkIn
    ? fmtMin(((ciUTCmin + dest.tz * 60) % 1440 + 1440) % 1440)
    : null;
  const gapToCI   = ciLocalLoc
    ? Math.round(((((ciUTCmin + dest.tz*60) % 1440 + 1440) % 1440) - (wakeMin % 1440) + 1440) % 1440 / 60 * 10) / 10
    : null;

  // Timeline entries – always chronological
  const timeline = [];

  // 1. Arrival
  timeline.push({
    time: localArr,
    icon: "🛬",
    label: `Arrival · ${dest.city}`,
    sub: stop.hotelUnknown
      ? "Hotel details in next month's schedule"
      : `${stop.hotel} · est. ${hotelArrLoc} check-in`,
    color: C.acc,
    bold: false,
  });

  // 2. Nap (if day strategy)
  if (napEndLoc) {
    const napStart = fmtMin(sleepStart - (freeDuration)*60 - 15 - (sleepStart - freeStart)); // ciMin
    const ciMin2 = ((arrH*60+arrM + dest.tz*60) % 1440 + 1440) % 1440 + 45;
    timeline.push({
      time: fmtMin(ciMin2),
      icon: "🛏",
      label: "Power nap",
      sub: `until ${napEndLoc} · then get some fresh air`,
      color: C.sleep,
      bold: false,
    });
  }

  // 3. Free time
  timeline.push({
    time: freeStartLoc,
    icon: "🌿",
    label: `Free time · ${freeDuration}h`,
    sub: `${activity.title} · ${activity.crewTip}`,
    color: C.free,
    bold: false,
  });

  // 4. Sleep
  timeline.push({
    time: sleepStartLoc,
    icon: "😴",
    label: `Sleep · ${sleepDuration}h`,
    sub: sleepStrategy,
    color: C.sleep,
    bold: true,
  });

  // 5. Wake up
  timeline.push({
    time: sleepEndLoc,
    icon: "⏰",
    label: "Wake up",
    sub: gapToCI !== null
      ? (gapToCI >= 1
          ? `${gapToCI}h until check-in · have breakfast, relax`
          : `Check-in in less than 1h – get ready`)
      : "Return flight – check schedule for departure time",
    color: C.txt,
    bold: false,
  });

  // 6. Check-in / departure
  if (!stop.checkIn) {
    // No parsed check-in time – still show a departure placeholder
    timeline.push({
      time: "–",
      icon: "🛫",
      label: "Departure – return to LUX",
      sub: "Check-in time not in this schedule · verify in crew portal",
      color: C.mut,
      bold: false,
    });
  } else if (stop.checkIn && ciLocalLoc) {
    timeline.push({
      time: `${stop.checkIn} UTC`,
      icon: "🛫",
      label: `Check-in`,
      sub: `${ciLocalLoc} local · Rest window ${restWindowH}h${windowVeryTight?" ⚠ very tight":windowTight?" ⚠ tight":""}`,
      color: windowCol,
      bold: false,
    });
  }

  return (
    <div style={{...card, padding:0, overflow:"hidden"}}>

      {/* ── HEADER ── */}
      <div style={{padding:"14px 18px 12px", borderBottom:`1px solid ${C.bdr}`, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
        <div style={{display:"flex", alignItems:"center", gap:"10px"}}>
          <span style={{fontFamily:"'DM Mono',monospace", fontWeight:800, fontSize:"22px", color:C.acc}}>{stop.iata}</span>
          <div>
            <div style={{fontSize:"14px", fontWeight:600, color:C.txt}}>{dest.city}</div>
            <div style={{fontSize:"11px", color:C.mut}}>UTC{dest.tz>=0?"+":""}{dest.tz} · {dest.tempMar}°C</div>
          </div>
        </div>
        <div style={{textAlign:"right"}}>
          <div style={{fontSize:"10px", color:C.mut, marginBottom:"2px"}}>Local arrival</div>
          <div style={{fontFamily:"'DM Mono',monospace", fontWeight:800, fontSize:"26px", color:C.acc, lineHeight:1}}>{localArr}</div>
        </div>
      </div>

      {/* ── TIMELINE ── */}
      <div style={{padding:"16px 18px"}}>
        {timeline.map((entry, i) => (
          <div key={i} style={{display:"flex", gap:"14px", marginBottom: i < timeline.length-1 ? "0" : "0"}}>
            {/* Line + dot */}
            <div style={{display:"flex", flexDirection:"column", alignItems:"center", width:"20px", flexShrink:0}}>
              <div style={{width:"10px", height:"10px", borderRadius:"50%", background:entry.color, flexShrink:0, marginTop:"3px", border:`2px solid ${entry.color}`}} />
              {i < timeline.length - 1 && (
                <div style={{width:"2px", flex:1, background:C.bdr, minHeight:"28px", marginTop:"2px"}} />
              )}
            </div>
            {/* Content */}
            <div style={{paddingBottom: i < timeline.length-1 ? "16px" : "0", flex:1}}>
              <div style={{display:"flex", alignItems:"baseline", gap:"10px"}}>
                <span style={{fontFamily:"'DM Mono',monospace", fontWeight:700, fontSize:"15px", color:entry.color, minWidth:"80px"}}>{entry.time}</span>
                <span style={{fontSize: entry.bold ? "14px" : "13px", fontWeight: entry.bold ? 700 : 600, color:C.txt}}>
                  {entry.icon} {entry.label}
                </span>
              </div>
              {entry.sub && (
                <div style={{fontSize:"11px", color:C.mut, marginTop:"2px", marginLeft:"90px", lineHeight:1.4}}>{entry.sub}</div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* ── EXPAND BUTTON ── */}
      <div style={{padding:"0 18px 14px"}}>
        <button onClick={() => setExpanded(p => !p)}
          style={{width:"100%", background:"transparent", border:`1px solid ${C.bdr}`, borderRadius:"8px", padding:"8px 14px", cursor:"pointer", fontFamily:"inherit", fontSize:"11px", color:C.mut, display:"flex", justifyContent:"space-between", alignItems:"center"}}>
          <span>Jetlag Tips · Activity · 🏨 Hotel Wellness</span>
          <span>{expanded ? "▲" : "▼"}</span>
        </button>

        {expanded && (
          <div style={{marginTop:"10px", display:"flex", flexDirection:"column", gap:"8px"}}>
            {jetlagOneLiner && (
              <div style={{padding:"10px 14px", background:C.bg, borderRadius:"8px", border:`1px solid ${C.bdr}`}}>
                <div style={{fontSize:"10px", fontWeight:700, color:C.mut, letterSpacing:"0.08em", marginBottom:"4px"}}>
                  🧭 JETLAG · {tzDiffFromPrev===0?"±0h":tzDiffFromPrev>0?`+${tzDiffFromPrev}h`:`${tzDiffFromPrev}h`} {travelDirection==="east"?"→ East":travelDirection==="west"?"← West":"= Same zone"}
                </div>
                <div style={{fontSize:"11px", color:C.txt2, lineHeight:1.5}}>{jetlagOneLiner}</div>
              </div>
            )}
            {climateTips.length > 0 && (
              <div style={{padding:"10px 14px", background:C.bg, borderRadius:"8px", border:`1px solid ${C.bdr}`}}>
                <div style={{fontSize:"10px", fontWeight:700, color:C.mut, letterSpacing:"0.08em", marginBottom:"4px"}}>🌡 CLIMATE · {dest.tempMar}°C</div>
                <div style={{fontSize:"11px", color:C.txt2, lineHeight:1.5}}>{climateTips[0]}</div>
              </div>
            )}
            <HotelWellnessCard wellness={wellness} hotelFirst={hotelFirst} outdoorReasons={outdoorReasons} activity={activity} />
          </div>
        )}
      </div>

    </div>
  );
}

// APP
// ═══════════════════════════════════════════════════════════════════════════════
export default function App() {
  // rotations = array of rotation objects; activeRot = index of selected rotation
  const [rotations,   setRotations]   = useState([]);
  const [activeRot,   setActiveRot]   = useState(0);
  const [results,     setResults]     = useState(null); // keyed by rotation id
  const [showManual,  setShowManual]  = useState(false);
  const [pdfDrag,     setPdfDrag]     = useState(false);
  const [pdfParsing,  setPdfParsing]  = useState(false);
  const [pdfError,    setPdfError]    = useState(null);
  const pdfRef = useRef(null);

  const loadRotations = (rots) => { setRotations(rots); setActiveRot(0); setResults(null); setShowManual(false); setPdfError(null); };
  const addRotations  = (rots) => { setRotations(p => [...p, ...rots]); setActiveRot(rotations.length); setResults(null); setPdfError(null); };
  const reset         = () => { setRotations([]); setResults(null); setShowManual(false); setPdfError(null); };

  const handlePdf = async (file) => {
    if (!file) return;
    setPdfParsing(true); setPdfError(null);
    try {
      const raw  = await extractPdfText(file);
      const rots = parsePdfToRotations(raw);
      if (!rots || rots.length === 0) { setPdfError("No stations detected. Please enter manually."); return; }
      addRotations(rots);
    } catch(e) { setPdfError("PDF error: " + e.message); }
    finally { setPdfParsing(false); }
  };

  const generateAll = () => {
    const newResults = {};
    rotations.forEach(rot => {
      // Start tz: if rotation has a prevIata set, use that timezone; else use home base LUX
      const startTz = rot.prevIata ? getDestInfo(rot.prevIata).tz : HOME_TZ;
      let prevTz = startTz;
      newResults[rot.id] = rot.stops.map((stop) => {
        const analysis = analyzeStop(stop, prevTz, stop.flightH || 8);
        prevTz = getDestInfo(stop.iata).tz;
        return { stop, analysis };
      });
    });
    setResults(newResults);
  };

  const hasRotations = rotations.length > 0;
  const currentRot   = rotations[activeRot];
  const currentRes   = results && currentRot ? results[currentRot.id] : null;

  return (
    <div style={{minHeight:"100vh",background:C.bg,color:C.txt,...T,margin:0,padding:0,WebkitTapHighlightColor:"transparent"}}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=DM+Mono:wght@400;500;700&display=swap');
        * { box-sizing:border-box; }
        body { -webkit-font-smoothing:antialiased; }
        input:focus { border-color:${C.acc}!important; outline:none; box-shadow:0 0 0 3px ${C.acc}20; }
        input[type=time]::-webkit-calendar-picker-indicator { filter:none; }
        button { transition:opacity 0.15s, transform 0.1s; }
        button:active { transform:scale(0.97); }
        button:hover { opacity:0.85; }
        ::-webkit-scrollbar { width:4px; }
        ::-webkit-scrollbar-track { background:${C.bg}; }
        ::-webkit-scrollbar-thumb { background:${C.bdr}; border-radius:2px; }
      `}</style>

      {/* HEADER */}
      <div style={{borderBottom:`1px solid ${C.bdr}`,padding:"13px 18px",display:"flex",alignItems:"center",justifyContent:"space-between",background:"rgba(255,255,255,0.95)",position:"sticky",top:0,zIndex:20,backdropFilter:"blur(12px)",boxShadow:"0 1px 4px rgba(0,0,0,0.06)"}}>
        <div>
          <div style={{fontSize:"18px",fontWeight:800,color:C.acc,letterSpacing:"0.02em"}}>✈ CrewRhythm</div>
          <div style={{fontSize:"10px",color:C.mut,letterSpacing:"0.05em",fontWeight:500,fontStyle:"italic"}}>the structured rhythm of airline crew life</div>
        </div>
        <div style={{display:"flex",gap:"8px",alignItems:"center"}}>
          {hasRotations && !results && (
            <button onClick={generateAll} style={{background:`linear-gradient(135deg,${C.acc},#0369A1)`,color:"#fff",border:"none",borderRadius:"9px",padding:"11px 22px",fontSize:"13px",letterSpacing:"0.06em",fontWeight:700,cursor:"pointer",fontFamily:"inherit",boxShadow:"0 2px 10px rgba(2,132,199,0.35)"}}>
              ✦ Generate Wellness Plan
            </button>
          )}
          {results && (
            <button onClick={()=>setResults(null)} style={{background:"#fff",color:C.mut,border:`1.5px solid ${C.bdr}`,borderRadius:"8px",padding:"9px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:"12px"}}>
              ← Adjust times
            </button>
          )}
          {hasRotations && (
            <button onClick={reset} style={{background:"#fff",color:C.mut,border:`1.5px solid ${C.bdr}`,borderRadius:"8px",padding:"9px 16px",cursor:"pointer",fontFamily:"inherit",fontSize:"12px"}}>
              ↺ New plan
            </button>
          )}
        </div>
      </div>

      <div style={{maxWidth:"600px",margin:"0 auto",padding:"16px 14px"}}>

        {/* ── START SCREEN ── */}
        {!hasRotations && (<>
          <div style={{textAlign:"center",padding:"20px 0 24px"}}>
            <div style={{fontSize:"32px",marginBottom:"8px"}}>✈</div>
            <div style={{fontSize:"24px",fontWeight:800,color:C.txt,marginBottom:"4px"}}>✈ CrewRhythm</div>
            <div style={{fontSize:"12px",color:C.mut,fontStyle:"italic",marginBottom:"6px"}}>the structured rhythm of airline crew life</div>
            <div style={{fontSize:"14px",color:C.mut,maxWidth:"340px",margin:"0 auto",lineHeight:1.6}}>
              Sleep · Jetlag · Free time – automatically planned for every layover.
            </div>
          </div>

          {/* ── HOW IT WORKS ── */}
          <HowItWorks />

          <div style={lbl}>LOAD SCHEDULE</div>

          {/* Saved: Cargolux Feb 2026 with 3 rotations */}
          <div style={{...card,border:`1px solid ${C.acc}60`,padding:"16px"}}>
            <div style={{fontSize:"13px",fontWeight:700,color:C.acc,marginBottom:"12px"}}>✈ Cargolux February 2026 – Amstutz, Janick · 3 Rotations</div>
            <div style={{display:"flex",flexDirection:"column",gap:"8px"}}>
              {SAVED_SCHEDULES.map(r=>(
                <div key={r.id}
                  style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:"7px",padding:"10px 14px",cursor:"pointer",transition:"border-color 0.15s"}}
                  onClick={()=>loadRotations([r])}
                  onMouseEnter={e=>e.currentTarget.style.borderColor=C.acc}
                  onMouseLeave={e=>e.currentTarget.style.borderColor=C.bdr}>
                  <div style={{display:"flex",alignItems:"center",justifyContent:"space-between"}}>
                    <div>
                      <div style={{fontSize:"11px",fontWeight:700,color:C.txt,marginBottom:"5px"}}>
                        {r.label}
                        {r.dateRange && <span style={{color:C.mut,fontWeight:400,marginLeft:"8px"}}>{r.dateRange}</span>}
                      </div>
                      <div style={{display:"flex",alignItems:"center",gap:"4px",flexWrap:"wrap"}}>
                        <span style={{fontSize:"9px",color:C.mut,fontFamily:"monospace"}}>LUX</span>
                        <span style={{fontSize:"9px",color:C.mut}}>→</span>
                        {r.stops.map((s,i)=>(
                          <span key={i} style={{display:"flex",alignItems:"center",gap:"4px"}}>
                            <span style={{background:`${C.acc}20`,color:C.acc,borderRadius:"3px",padding:"1px 7px",fontSize:"10px",fontFamily:"monospace",fontWeight:700}}>{s.iata}</span>
                            {i < r.stops.length-1 && <span style={{fontSize:"9px",color:C.mut}}>→</span>}
                          </span>
                        ))}
                        <span style={{fontSize:"9px",color:C.mut}}>→</span>
                        <span style={{fontSize:"9px",color:C.mut,fontFamily:"monospace"}}>LUX</span>
                      </div>
                    </div>
                    <span style={{color:C.acc,fontSize:"16px",marginLeft:"12px"}}>→</span>
                  </div>
                </div>
              ))}
            </div>
            <button
              style={{width:"100%",marginTop:"10px",background:`${C.acc}15`,border:`1px solid ${C.acc}40`,borderRadius:"6px",padding:"9px",color:C.acc,cursor:"pointer",fontFamily:"inherit",fontSize:"11px",fontWeight:600}}
              onClick={()=>loadRotations(SAVED_SCHEDULES)}>
              Load all 3 rotations
            </button>
          </div>

          {/* PDF import */}
          <div
            style={{border:`2px dashed ${pdfDrag?C.acc:C.bdr}`,borderRadius:"10px",padding:"24px",textAlign:"center",cursor:"pointer",background:pdfDrag?"rgba(56,189,248,0.04)":"transparent",marginTop:"8px",transition:"all 0.2s"}}
            onClick={()=>pdfRef.current.click()}
            onDragOver={e=>{e.preventDefault();setPdfDrag(true);}}
            onDragLeave={()=>setPdfDrag(false)}
            onDrop={e=>{e.preventDefault();setPdfDrag(false);handlePdf(e.dataTransfer.files[0]);}}
          >
            <div style={{fontSize:"26px",marginBottom:"6px"}}>{pdfParsing?"⏳":"📄"}</div>
            <div style={{fontSize:"12px",color:C.txt,marginBottom:"3px"}}>{pdfParsing?"Analysiere Schedule…":"Crew Schedule PDF importieren"}</div>
            <div style={{fontSize:"10px",color:C.mut}}>Drop PDF here or click to upload · Rotations detected automatically</div>
          </div>
          <input ref={pdfRef} type="file" accept="application/pdf,.pdf" style={{display:"none"}} onChange={e=>handlePdf(e.target.files[0])} />
          {pdfError && <div style={{background:`${C.err}10`,border:`1px solid ${C.err}40`,borderRadius:"6px",padding:"10px 14px",fontSize:"11px",color:C.err,marginTop:"8px"}}>⚠ {pdfError}</div>}

          {!showManual
            ? <button onClick={()=>setShowManual(true)} style={{width:"100%",background:"transparent",border:`1px dashed ${C.bdr}`,borderRadius:"8px",padding:"13px",color:C.mut,cursor:"pointer",fontFamily:"inherit",fontSize:"12px",marginTop:"8px"}}>+ Manuell eingeben</button>
            : <ManualForm onLoad={loadRotations} />}
        </>)}

        {/* ── ROTATIONS LOADED – TAB BAR + OVERVIEW ── */}
        {hasRotations && !results && (<>

          {/* Rotation tabs */}
          <div style={{display:"flex",gap:"6px",marginBottom:"16px",flexWrap:"wrap",alignItems:"flex-start"}}>
            {rotations.map((rot,i)=>(
              <button key={rot.id} onClick={()=>setActiveRot(i)}
                style={{padding:"8px 16px",borderRadius:"7px",fontFamily:"inherit",cursor:"pointer",border:`1px solid ${activeRot===i ? C.acc : C.bdr}`,
                  background: activeRot===i ? C.acc : "transparent", textAlign:"left",
                  color: activeRot===i ? C.bg : C.mut}}>
                <div style={{fontSize:"11px",fontWeight:700}}>{rot.label}</div>
                {rot.dateRange && <div style={{fontSize:"9px",opacity:0.75,marginTop:"1px"}}>{rot.dateRange}</div>}
              </button>
            ))}
            <button onClick={()=>setShowManual(p=>!p)}
              style={{padding:"8px 16px",borderRadius:"7px",fontFamily:"inherit",fontSize:"11px",cursor:"pointer",background:"transparent",color:C.mut,border:`1px dashed ${C.bdr}`}}>
              + Add rotation
            </button>
          </div>
          {showManual && <ManualForm onLoad={addRotations} />}

          {/* Current rotation stops overview */}
          {currentRot && (<>
            <div style={{...card,border:`1px solid ${C.acc}30`,marginBottom:"12px"}}>
              <div style={{fontSize:"12px",fontWeight:700,color:C.acc,marginBottom:"10px"}}>{currentRot.label}</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:"8px",marginBottom:"12px"}}>
                {currentRot.stops.map((s,i)=>(
                  <div key={i} style={{background:C.bg,border:`1px solid ${C.bdr}`,borderRadius:"7px",padding:"10px 14px",minWidth:"105px"}}>
                    <div style={{...iataB,display:"inline-block",marginBottom:"5px",fontSize:"11px"}}>{s.iata}</div>
                    <div style={{fontSize:"10px",color:C.mut}}>{getDestInfo(s.iata).city}</div>
                    <div style={{fontSize:"10px",color:C.acc,fontFamily:"'DM Mono',monospace",marginTop:"3px"}}>arr {s.arrival} UTC</div>
                    {s.checkIn && <div style={{fontSize:"10px",color:C.gold,fontFamily:"'DM Mono',monospace"}}>dep {s.checkIn} UTC</div>}
                    <div style={{fontSize:"10px",color:C.mut}}>{s.restWindowH ? `⏱ ${s.restWindowH}h window` : `${s.flightH}h Flug`}</div>
                    {s.note && <div style={{fontSize:"9px",color:C.mut,marginTop:"3px",fontStyle:"italic",lineHeight:1.3}}>{s.note}</div>}
                  </div>
                ))}
              </div>
              {/* ── Previous month destination – nur bei erster Rotation des Monats ── */}
              {activeRot === 0 && (
                <PrevIataInput
                  value={currentRot.prevIata || ""}
                  onChange={(val) => setRotations(prev => prev.map((r,i) =>
                    i === 0 ? {...r, prevIata: val || null} : r
                  ))}
                />
              )}
            </div>
            <div style={{background:`${C.ok}08`,border:`1px solid ${C.ok}30`,borderRadius:"8px",padding:"12px 16px",fontSize:"11px",color:C.ok,lineHeight:1.6}}>
              ✓ {rotations.length} Rotation{rotations.length>1?"s":""} loaded · Jetlag calculated relative to previous station · LUX = Home base (UTC+1)
            </div>
          </>)}
        </>)}

        {/* ── RESULTS ── */}
        {results && currentRot && (<>

          {/* Rotation tabs in results view */}
          <div style={{display:"flex",gap:"6px",marginBottom:"20px",flexWrap:"wrap",alignItems:"flex-start"}}>
            {rotations.map((rot,i)=>(
              <button key={rot.id} onClick={()=>setActiveRot(i)}
                style={{padding:"8px 16px",borderRadius:"7px",fontFamily:"inherit",cursor:"pointer",border:`1px solid ${activeRot===i ? C.acc : C.bdr}`,
                  background: activeRot===i ? C.acc : "transparent", textAlign:"left",
                  color: activeRot===i ? C.bg : C.mut}}>
                <div style={{fontSize:"11px",fontWeight:700}}>{rot.label}</div>
                {rot.dateRange && <div style={{fontSize:"9px",opacity:0.75,marginTop:"1px"}}>{rot.dateRange}</div>}
              </button>
            ))}
          </div>

          <div style={{marginBottom:"16px"}}>
            <div style={{...lbl,marginBottom:"6px"}}>WELLNESS PLAN — {currentRot.label.toUpperCase()} — {currentRot.stops.length} STOPS</div>
            {currentRot.incomplete && (
              <div style={{marginBottom:"12px",padding:"12px 16px",background:"#FFFBEB",border:"1.5px solid #D97706",borderRadius:"10px",display:"flex",gap:"10px",alignItems:"flex-start"}}>
                <span style={{fontSize:"20px",flexShrink:0}}>⚠️</span>
                <div>
                  <div style={{fontSize:"12px",fontWeight:700,color:"#D97706",marginBottom:"3px"}}>Partial rotation – month boundary</div>
                  <div style={{fontSize:"11px",color:"#78350F",lineHeight:1.6}}>
                    This rotation starts at the end of this month's schedule. Hotels and rest windows will be in the next month's schedule. Sleep and activity recommendations use default values.
                  </div>
                </div>
              </div>
            )}
            {activeRot === 0 && currentRot.prevIata && (
              <div style={{display:"inline-flex",alignItems:"center",gap:"8px",background:`${C.gold}10`,border:`1px solid ${C.gold}30`,borderRadius:"6px",padding:"6px 12px"}}>
                <span style={{fontSize:"10px",color:C.gold,fontWeight:700}}>⏱ Jetlag-Startpunkt:</span>
                <span style={iataB}>{currentRot.prevIata}</span>
                <span style={{fontSize:"10px",color:C.mut}}>{getDestInfo(currentRot.prevIata).city} · UTC{getDestInfo(currentRot.prevIata).tz >= 0 ? "+" : ""}{getDestInfo(currentRot.prevIata).tz}</span>
                <span style={{fontSize:"10px",color:C.gold}}>(Previous month destination)</span>
              </div>
            )}
          </div>
          {currentRes && currentRes.map(({stop,analysis},i)=>(
            <StopResult key={i} stop={stop} analysis={analysis} />
          ))}
        </>)}

      </div>
    </div>
  );
}
