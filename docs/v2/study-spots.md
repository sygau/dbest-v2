# Study Spots / Library Map

Directory of HK study spots (public libraries, cafes, study spaces) for DSE students.
Route: `/study-spots`

## How it works

- Data lives in `data/study-spots.json` — one object per location.
- Page imports the JSON statically. No API, no CMS. Edit JSON + rebuild to update.
- Card grid view (default) + Leaflet map view, toggled by a switch in the filter bar.
- Clicking a card or map marker opens a full-screen scrollable overlay (photo top + ordered info).

## Files

- `data/study-spots.json` — location data
- `lib/studySpots.ts` — types, TYPE/REGION meta, `isOpenNow` (HK timezone)
- `pages/study-spots.tsx` — page, filtering, JSON-LD
- `components/study-spots/SpotCard.tsx` — grid card
- `components/study-spots/SpotOverlay.tsx` — detail overlay
- `components/study-spots/SpotFilters.tsx` — search + expandable filters + view toggle
- `components/study-spots/StudySpotsMap.tsx` — Leaflet map (client-only)
- `data/jsonld/pages.ts` — `buildStudySpotsJsonLd`

## Data schema

Each entry in `study-spots.json`:

```
id                 unique slug
name               display name (single name, no zh field)
type               library | cafe | coworking
region             hk-island | kowloon | nt
district           e.g. "Wan Chai"
address            full address string
coords             [lat, lng]
hours              { mon..sun: "HH:MM-HH:MM" or "Closed" }
nearby_mtr         text, e.g. "Causeway Bay"
photo              16:9 image URL ("" = fallback placeholder)
wifi               boolean
power_outlets      boolean
purchase_required  boolean
study_rooms        boolean
tags               string[] of custom features
notes              free text ("" = section hidden)
google_maps_url    external link
status             boolean — false hides the spot entirely
```

## Notes / gotchas

- Leaflet loads from unpkg CDN at runtime — no npm dependency, no `_app.tsx` change. Map is not theme-adaptive (standard OSM tiles) by design.
- `isOpenNow` runs client-side only (depends on HK time) to avoid hydration mismatch. Open/Closed pill renders after mount.
- `status: false` is a kill switch — set it to hide a spot without deleting the entry.
- Sample data is HKPL libraries only and incomplete: `power_outlets` is a placeholder guess, `photo`/`tags`/`notes` are empty.
- JSON-LD outputs an `ItemList` of `Library`/`CafeOrCoffeeShop`/`Place` with geo + address for local SEO.
