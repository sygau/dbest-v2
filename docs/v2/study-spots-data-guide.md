# Study Spots — Data Entry Guide

Guide for adding locations to `data/study-spots.json` on dse.best.
This file is a single JSON array. Each location is one object. Add a new object to the array to add a spot.

## Full object template

```json
{
  "id": "unique-slug-here",
  "name": "地點名稱 (Preferably in cantonese )",
  "type": "library",
  "region": "hk-island",
  "district": "wan chai (in chinese)",
  "address": "完整地址 Full address",
  "coords": [22.2798, 114.1878],
  "hours": {
    "mon": "10:00-21:00",
    "tue": "10:00-21:00",
    "wed": "13:00-21:00",
    "thu": "10:00-21:00",
    "fri": "10:00-21:00",
    "sat": "10:00-21:00",
    "sun": "Closed"
  },
  "setting": "indoor",
  "nearby_mtr": "Causeway Bay Station (in chinese)",
  "photo": "https://cdn.dse.best/study-spots/example.jpg",
  "wifi": true,
  "power_outlets": true,
  "purchase_required": false,
  "study_rooms": true,
  "tags": ["安靜", "24小時", "插座多"],
  "notes": "備註，例如要預約自修室。",
  "google_maps_url": "https://www.google.com/maps/search/?api=1&query=NAME OF THE PLACE IN CANTONESE",
  "status": true
}
```

## Field rules

| Field | Type | Rules |
|-------|------|-------|
| `id` | string | Unique. Lowercase, hyphen-separated. Never reuse. |
| `name` | string | Display name. Cantonese / Chinese is fine — single name field, no separate English field. |
| `type` | string | One of: `library`, `cafe`, `coworking`, `public-space`. See below. |
| `region` | string | One of: `hk-island`, `kowloon`, `nt`. Must match the district. |
| `district` | string | Specific district, e.g. `Wan Chai`, `Sha Tin`, `Kwun Tong`. |
| `address` | string | Full street address. |
| `coords` | [number, number] | `[latitude, longitude]` — latitude first. Get from Google Maps. |
| `hours` | object | Exactly 7 keys: `mon` `tue` `wed` `thu` `fri` `sat` `sun`. Value is `"HH:MM-HH:MM"` (24-hour) or `"Closed"`. |
| `setting` | string | One of: `indoor`, `outdoor`, `mixed`. Most libraries are `indoor`; a cafe with an outdoor terrace is `mixed`; a fully open-air spot is `outdoor`. |
| `nearby_mtr` | string | Nearest MTR station(s). Use `""` if none. |
| `photo` | string | 16:9 image URL. Use `""` for no photo (a placeholder icon shows instead). |
| `wifi` | boolean | Free Wi-Fi available. |
| `power_outlets` | boolean | Power outlets available at seats. |
| `purchase_required` | boolean | Must buy something to stay (true for most cafes). |
| `study_rooms` | boolean | Has dedicated study room / 自修室. |
| `tags` | string[] | Custom feature labels. Keep short. Empty array `[]` if none. |
| `notes` | string | Free text. `""` hides the notes section. |
| `google_maps_url` | string | Link. Format: `https://www.google.com/maps/search/?api=1&query=LAT,LNG` |
| `status` | boolean | `true` = shown. `false` = hidden everywhere (kill switch, keeps the entry). |

## type values

| Value | Meaning | Canto label shown |
|-------|---------|-------------------|
| `library` | HK government public library (HKPL) | 公共圖書館 Library |
| `cafe` | Coffee shop / cafe | 咖啡店 Cafe |
| `coworking` | Paid dedicated work/study station (WeWork-style) | 自修空間 Study Space |
| `public-space` | Public space / community centre (社區中心) | 公共空間 Public Space |

## region — district mapping

- `hk-island` (香港島): Central and Western, Wan Chai, Eastern, Southern
- `kowloon` (九龍): Yau Tsim Mong, Sham Shui Po, Kowloon City, Wong Tai Sin, Kwun Tong
- `nt` (新界): everything else — Sha Tin, Tsuen Wan, Tuen Mun, Yuen Long, North, Tai Po, Sai Kung, Kwai Tsing, Islands

## Rules

1. Output valid JSON. Every object must have all fields above — no missing keys.
2. `id` must be unique across the whole file.
3. `hours` must have all 7 day keys. Closed days = `"Closed"`.
4. `coords` is `[lat, lng]` — latitude (~22.x) first, longitude (~114.x) second.
5. Booleans are real JSON booleans (`true`/`false`), not strings.
6. If unsure about a boolean, default `false` and add a note rather than guessing `true`.
7. Do not change existing entries unless asked — only append new objects.
