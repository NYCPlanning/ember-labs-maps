export default [
  {
    "id": "digital-citymap",
    "type": "cartovector",
    "source-layers": [
      {
        "id": "bulkhead-lines",
        "sql": "SELECT the_geom_webmercator FROM citymap_bulkheadlines_v0"
      },
      {
        "id": "arterials",
        "sql": "SELECT the_geom_webmercator FROM citymap_arterials_v0"
      },
      {
        "id": "pierhead-lines",
        "sql": "SELECT the_geom_webmercator FROM citymap_pierheadlines_v0"
      },
      {
        "id": "amendments",
        "sql": "SELECT the_geom_webmercator, ST_Area(the_geom) as area, cartodb_id as id, altmappdf, extract(epoch from effective) as effective FROM citymap_amendments_v0 WHERE effective IS NOT NULL ORDER BY area DESC"
      },
      {
        "id": "street-centerlines",
        "sql": "SELECT the_geom_webmercator, official_s AS streetname, COALESCE('   (' || streetwidt || ' ft)') AS streetwidth FROM citymap_streetcenterlines_v0"
      },
      {
        "id": "citymap",
        "sql": "SELECT the_geom_webmercator, type FROM citymap_citymap_v0"
      },
      {
        "id": "name-changes-points",
        "sql": "SELECT the_geom_webmercator FROM citymap_streetnamechanges_points_v0"
      },
      {
        "id": "name-changes-lines",
        "sql": "SELECT the_geom_webmercator FROM citymap_streetnamechanges_streets_v0"
      },
      {
        "id": "name-changes-areas",
        "sql": "SELECT the_geom_webmercator FROM citymap_streetnamechanges_areas_v0"
      }
    ]
  },
  {
    "id": "zoning",
    "type": "cartovector",
    "source-layers": [
      {
        "id": "zoning-districts",
        "sql": "SELECT *, CASE WHEN SUBSTRING(zonedist, 3, 1) = '-' THEN LEFT(zonedist, 2) WHEN SUBSTRING(zonedist, 3, 1) ~ E'[A-Z]' THEN LEFT(zonedist, 2) WHEN SUBSTRING(zonedist, 3, 1) ~ E'[0-9]' THEN LEFT(zonedist, 3) ELSE zonedist END as primaryzone FROM zoning_districts_v201803"
      },
      {
        "id": "special-purpose-districts",
        "sql": "SELECT the_geom_webmercator, cartodb_id, sdlbl, sdname FROM special_purpose_districts_v201803"
      },
      {
        "id": "commercial-overlays",
        "sql": "SELECT * FROM commercial_overlays_v201803"
      }
    ]
  },
  {
    "id": "pluto",
    "type": "cartovector",
    "minzoom": 12,
    "source-layers": [
      {
        "id": "pluto",
        "sql": "SELECT the_geom_webmercator, bbl, lot, landuse, address FROM mappluto_v1711"
      },
      {
        "id": "block-centroids",
        "sql": "SELECT the_geom_webmercator, block FROM mappluto_block_centroids"
      }
    ]
  },
  {
    "id": "floodplains",
    "type": "cartovector",
    "source-layers": [
      {
        "id": "effective-flood-insurance-rate-2007",
        "sql": "SELECT the_geom_webmercator, CASE WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A' WHEN fld_zone = 'VE' THEN 'V' END as fld_zone FROM floodplain_firm2007_v0 WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE'"
      },
      {
        "id": "preliminary-flood-insurance-rate",
        "sql": "SELECT the_geom_webmercator, CASE WHEN fld_zone IN ('A', 'A0', 'AE') THEN 'A' WHEN fld_zone = 'VE' THEN 'V' WHEN fld_zone = '0.2 PCT ANNUAL CHANCE FLOOD HAZARD' THEN 'Shaded X' END as fld_zone FROM floodplain_pfirm2015_v0 WHERE fld_zone IN ('A', 'A0', 'AE') OR fld_zone = 'VE' "
      }
    ]
  },
  {
    "id": "aerials-2016",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2016/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2014",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2014/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2012",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2012/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2010",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2010/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2008",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2008/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2006",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2006/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-2004",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2004/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-20012",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/2001-2/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-1996",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/1996/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-1951",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/1951/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  },
  {
    "id": "aerials-1924",
    "type": "raster",
    "tiles": [
      "https://maps.nyc.gov/xyz/1.0.0/photo/1924/{z}/{x}/{y}.png8"
    ],
    "tileSize": 256
  }
];
