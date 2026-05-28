// ─────────────────────────────────────────────────────────────
// Centralized vehicle data source for MAKEEN MOTORS
// All pages import from here — no inline data elsewhere.
// ─────────────────────────────────────────────────────────────

export type Category = "sports" | "sedan" | "suv" | "ev";

/** Visual representation for the vehicle card / hero image area.
 *  Set `url` to a real path once images are available; the UI
 *  falls back to the CSS gradient art when `url` is absent. */
export interface VehicleImage {
  url?: string;    // e.g. "/images/cars/01.jpg"
  accent: string;  // brand accent hex  (#CC2B2B)
  glow: string;    // radial glow rgba  ("rgba(204,43,43,0.2)")
  line: string;    // top accent line gradient
}

export interface Vehicle {
  id: string;
  brand: string;
  name: string;
  year: number;
  price: string;
  mileage: string;
  category: Category;
  badge: string;
  image: VehicleImage;
  // Specifications
  engine: string;
  horsepower: string;
  topSpeed: string;
  acceleration: string;
  transmission: string;
  fuelType: string;
  range?: string;
  // Content
  features: string[];
  description: string;
}

export const VEHICLES: Vehicle[] = [
  // ── Sports Cars ──────────────────────────────────────────────
  {
    id: "01",
    brand: "Ferrari", name: "296 GTB", year: 2024, price: "$380,000", mileage: "1,200 km",
    category: "sports", badge: "Sports Car",
    image: {
      accent: "#CC2B2B",
      glow:   "rgba(204,43,43,0.2)",
      line:   "linear-gradient(90deg,transparent,rgba(204,43,43,0.7),transparent)",
    },
    engine: "3.0L V6 Twin-Turbo + E-Motor", horsepower: "830 hp", topSpeed: "330 km/h",
    acceleration: "2.9 sec", transmission: "8-Speed Dual-Clutch", fuelType: "Hybrid",
    features: [
      "Carbon Fibre Body Panels", "Adaptive Magnetorheological Suspension",
      "Fiorano 70 Anniversary Pack", "Carbon Ceramic Brakes",
      "Manettino Drive Selector", "Ferrari Telemetry System",
      "Race Seats with HANS Device", "20\" Forged Aluminium Wheels",
    ],
    description:
      "The 296 GTB marks a new chapter in Ferrari's story — the first V6-powered road car from Maranello in decades, yet unmistakably a Ferrari in every dimension. Its plug-in hybrid system combines a 3.0-litre twin-turbo V6 with a 167 bhp electric motor, delivering a combined 830 hp in a mid-engine layout that honours the lineage of the 246 Dino and 308 GTB. The result is a car that rewards at every speed: electric torque off the line, combustion drama on the limit, and a soundtrack that redefines what a six-cylinder can say.",
  },
  {
    id: "02",
    brand: "McLaren", name: "720S", year: 2023, price: "$320,000", mileage: "4,500 km",
    category: "sports", badge: "Sports Car",
    image: {
      accent: "#E07D00",
      glow:   "rgba(224,125,0,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(224,125,0,0.7),transparent)",
    },
    engine: "4.0L V8 Twin-Turbo", horsepower: "710 hp", topSpeed: "341 km/h",
    acceleration: "2.9 sec", transmission: "7-Speed SSG", fuelType: "Petrol",
    features: [
      "Monocage II Carbon Fibre Chassis", "Active Aerodynamics",
      "Variable Drift Control", "Track Telemetry Pack",
      "Electrochromic Glass Roof", "Pirelli P-Zero Corsa Tyres",
      "McLaren Track Pack", "Sports Exhaust System",
    ],
    description:
      "Built around the Monocage II — a carbon fibre tub so light it weighs 22 kg — the 720S is the product of McLaren's obsession with the power-to-weight ratio. Its twin-turbocharged 4.0-litre V8 produces 710 hp, yet the car weighs just 1,283 kg dry. The active aerodynamics generate downforce and reduce drag simultaneously, a feat no passive system can match. Few cars in any segment at any price offer this purity of driver experience.",
  },
  {
    id: "03",
    brand: "Aston Martin", name: "Vantage", year: 2024, price: "$185,000", mileage: "800 km",
    category: "sports", badge: "Sports Car",
    image: {
      accent: "#2D7A4E",
      glow:   "rgba(45,122,78,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(45,122,78,0.7),transparent)",
    },
    engine: "4.0L V8 Twin-Turbo AMG", horsepower: "665 hp", topSpeed: "325 km/h",
    acceleration: "3.4 sec", transmission: "8-Speed ZF Automatic", fuelType: "Petrol",
    features: [
      "Adaptive Damping System", "Carbon Fibre Front Splitter",
      "Electronic Rear Differential", "Brembo Carbon Ceramic Brakes",
      "Aston Martin Infotainment (AMI)", "Heated & Ventilated Sports Seats",
      "21\" Diamond Turned Wheels", "Sport+ Exhaust System",
    ],
    description:
      "The new Vantage is the most powerful and most dynamically resolved sports car Aston Martin has ever produced. Sharing its AMG-sourced 4.0-litre twin-turbo V8 with the previous generation but retuned to 665 hp, it sits lower, wider, and more aggressive in its stance — a car that announces its intentions before the engine starts. Its front-mid engine layout gives handling balance that few front-engined cars achieve, while the revised adaptive damping system makes it as composed on a mountain pass as it is on a circuit.",
  },

  // ── Luxury Sedans ────────────────────────────────────────────
  {
    id: "04",
    brand: "Rolls-Royce", name: "Ghost", year: 2024, price: "$420,000", mileage: "2,100 km",
    category: "sedan", badge: "Luxury Sedan",
    image: {
      accent: "#C9A356",
      glow:   "rgba(201,163,86,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    },
    engine: "6.75L V12 Twin-Turbo", horsepower: "563 hp", topSpeed: "250 km/h",
    acceleration: "4.8 sec", transmission: "8-Speed Automatic", fuelType: "Petrol",
    features: [
      "Bespoke Starlight Headliner", "Illuminated Fascia Panel",
      "Rear Theatre Configuration", "Planar Suspension System",
      "Whisper-Close Doors", "Bespoke Audio by Rolls-Royce",
      "Active All-Wheel Drive", "Night Vision with Pedestrian Detection",
    ],
    description:
      "Post Opulence — Rolls-Royce's design philosophy for the Ghost — strips the car of excess to reveal something more profound: a space of uninterrupted luxury defined by what has been removed rather than added. The spaceframe aluminium architecture absorbs road imperfections before they become vibrations; the Planar suspension system interprets the road and responds in near-real time. Inside, the illuminated fascia — featuring over 100 stars cast in glass fibre — glows softly, while absolute silence envelops all those fortunate enough to be carried within.",
  },
  {
    id: "05",
    brand: "Bentley", name: "Flying Spur", year: 2024, price: "$260,000", mileage: "3,200 km",
    category: "sedan", badge: "Luxury Sedan",
    image: {
      accent: "#8A8F95",
      glow:   "rgba(138,143,149,0.16)",
      line:   "linear-gradient(90deg,transparent,rgba(138,143,149,0.6),transparent)",
    },
    engine: "6.0L W12 Twin-Turbo", horsepower: "635 hp", topSpeed: "333 km/h",
    acceleration: "3.8 sec", transmission: "8-Speed Dual-Clutch", fuelType: "Petrol",
    features: [
      "Rotating Display (Wood/Touchscreen/Veneered)",
      "All-Wheel Steering", "Active Anti-Roll Bars",
      "Naim for Bentley 2,200W Audio System",
      "Bentley Dynamic Ride", "Mulliner Driving Specification",
      "Diamond-in-Diamond Quilting", "Rear-Seat Entertainment",
    ],
    description:
      "The Flying Spur occupies a category of its own: a performance sedan that can complete a lap of the Nürburgring quicker than most sports cars, yet seat four in hand-stitched leather and host a board meeting in its rear cabin. Its 6.0-litre W12 engine — itself an engineering marvel — produces 635 hp and 900 Nm of torque, enough to propel 2.4 tonnes to 333 km/h. The optional rotating display conceals a burr walnut veneer until the moment of ignition, a detail that speaks to the restrained theatre of Bentley's design language.",
  },
  {
    id: "06",
    brand: "Mercedes-AMG", name: "S 63 E", year: 2024, price: "$175,000", mileage: "5,000 km",
    category: "sedan", badge: "Luxury Sedan",
    image: {
      accent: "#A8B0BB",
      glow:   "rgba(168,176,187,0.14)",
      line:   "linear-gradient(90deg,transparent,rgba(168,176,187,0.55),transparent)",
    },
    engine: "4.0L V8 Bi-Turbo + E-Motor (PHEV)", horsepower: "802 hp", topSpeed: "290 km/h",
    acceleration: "3.3 sec", transmission: "9-Speed AMG Speedshift", fuelType: "Hybrid",
    features: [
      "AMG ACTIVE RIDE CONTROL", "Rear-Axle Steering",
      "E-ACTIVE BODY CONTROL", "AMG Performance 4MATIC+",
      "Burmester 4D Surround Sound", "64-Colour Ambient Lighting",
      "MBUX Hyperscreen", "AMG Carbon Fibre Interior Pack",
    ],
    description:
      "The S 63 E Performance is the most powerful S-Class Mercedes-AMG has ever produced — 802 hp delivered via a twin-turbo V8 and a rear-axle-mounted electric motor that not only provides torque vectoring but also 13 kW of recuperation under braking. The E-ACTIVE BODY CONTROL suspension reads road inputs from a front-facing camera and adjusts each wheel's damping individually before the disturbance arrives. It is an engineering achievement matched by an interior that remains the benchmark for technological luxury in any production sedan.",
  },

  // ── SUVs ─────────────────────────────────────────────────────
  {
    id: "07",
    brand: "Lamborghini", name: "Urus S", year: 2024, price: "$280,000", mileage: "1,800 km",
    category: "suv", badge: "SUV",
    image: {
      accent: "#C9A356",
      glow:   "rgba(201,163,86,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    },
    engine: "4.0L V8 Twin-Turbo", horsepower: "666 hp", topSpeed: "306 km/h",
    acceleration: "3.5 sec", transmission: "8-Speed Torque Converter Auto", fuelType: "Petrol",
    features: [
      "Carbon Ceramic Brake System", "Active Torque Vectoring",
      "ANIMA Driving Selector (6 modes)", "Rear-Wheel Steering",
      "Lamborghini Infotainment IV", "Sport Exhaust System",
      "23\" Pearl-Finished Alloy Wheels", "Panoramic Sunroof",
    ],
    description:
      "Lamborghini did not build a conventional SUV. The Urus S is the Super Sport Utility Vehicle — a machine engineered to the same ethos of extreme performance that defines the Huracán and Revuelto. Its 4.0-litre twin-turbo V8 delivers 666 hp and a soundtrack that is unmistakably Lamborghini; the ANIMA selector adjusts the character of the drive from Strada through Corsa with a precision that most pure sports cars cannot match. Nothing else in its class offers this combination of everyday usability and genuine circuit capability.",
  },
  {
    id: "08",
    brand: "Bentley", name: "Bentayga EWB", year: 2024, price: "$320,000", mileage: "900 km",
    category: "suv", badge: "SUV",
    image: {
      accent: "#8A8F95",
      glow:   "rgba(138,143,149,0.16)",
      line:   "linear-gradient(90deg,transparent,rgba(138,143,149,0.6),transparent)",
    },
    engine: "4.0L V8 Twin-Turbo", horsepower: "542 hp", topSpeed: "290 km/h",
    acceleration: "4.5 sec", transmission: "8-Speed Automatic", fuelType: "Petrol",
    features: [
      "Airline Seat Specification (Rear)",
      "Business Pro Rear Seat Package",
      "Bentley Rotating Display",
      "All-Terrain Specification",
      "Naim for Bentley Audio",
      "Extended Wheelbase (+180mm)",
      "Night Vision System",
      "Bentley Dynamic Ride Active Anti-Roll",
    ],
    description:
      "The Bentayga Extended Wheelbase adds 180 mm between the axles of the standard Bentayga, delivering rear-seat accommodation that rivals a private aviation cabin. The signature Airline Seat specification reclines to 40 degrees, offers a footrest, massage function, and climate control — all while the V8 delivers quiet, effortless progress. It is an SUV for those who are driven rather than those who drive, though it rewards those who choose the latter role equally.",
  },
  {
    id: "09",
    brand: "Porsche", name: "Cayenne Turbo GT", year: 2023, price: "$200,000", mileage: "6,200 km",
    category: "suv", badge: "SUV",
    image: {
      accent: "#9AA3AD",
      glow:   "rgba(154,163,173,0.14)",
      line:   "linear-gradient(90deg,transparent,rgba(154,163,173,0.6),transparent)",
    },
    engine: "4.0L V8 Twin-Turbo", horsepower: "659 hp", topSpeed: "300 km/h",
    acceleration: "3.3 sec", transmission: "8-Speed Tiptronic S", fuelType: "Petrol",
    features: [
      "Porsche Ceramic Composite Brakes", "Active Rear-Axle Steering",
      "Dynamic Chassis Control Sport", "Sport Chrono Package",
      "Carbon Fibre Roof", "Burmester 3D High-End Audio",
      "21\" GT Design Wheels", "Porsche Communication Management",
    ],
    description:
      "The Cayenne Turbo GT holds the SUV lap record at the Nürburgring Nordschleife — a circuit that does not permit dishonesty in any vehicle that attempts it. Built from the Cayenne Coupé body with a carbon fibre roof lowering the centre of gravity, the Turbo GT features recalibrated suspension, uprated brakes, and a version of the twin-turbo V8 taken to 659 hp. It is the most focused driver's SUV Porsche has produced, occupying the space where sports car performance and luxury SUV accommodation genuinely coexist.",
  },

  // ── Electric ─────────────────────────────────────────────────
  {
    id: "10",
    brand: "Porsche", name: "Taycan Turbo GT", year: 2024, price: "$230,000", mileage: "500 km",
    category: "ev", badge: "Electric",
    image: {
      accent: "#4B9CC2",
      glow:   "rgba(75,156,194,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(75,156,194,0.7),transparent)",
    },
    engine: "Dual Permanent Magnet Synchronous", horsepower: "1,108 hp", topSpeed: "305 km/h",
    acceleration: "2.2 sec", transmission: "2-Speed PDK (Rear)", fuelType: "Electric",
    range: "555 km (WLTP)",
    features: [
      "Weissach Package", "Carbon Fibre Roof & Hood",
      "Porsche Ceramic Composite Brakes (PCCB)",
      "Active Rear-Axle Steering", "Adaptive Air Suspension",
      "Nürburgring Record Tuning", "21\" Cross Design Wheels",
      "Sport Chrono Package", "Bose Surround Sound",
    ],
    description:
      "Engineered to set the EV lap record at the Nürburgring Nordschleife — which it did, by 28 seconds — the Taycan Turbo GT is the most extreme production Porsche of any kind ever built. With the Weissach Package engaged and overboost active, it produces 1,108 hp. Its two-speed rear transmission is a first for any production EV, enabling both extraordinary launch acceleration and sustained high-speed stability. The result is a car that challenges not only other EVs but the fastest combustion sports cars in the world.",
  },
  {
    id: "11",
    brand: "Lucid", name: "Air Grand Touring", year: 2024, price: "$140,000", mileage: "1,200 km",
    category: "ev", badge: "Electric",
    image: {
      accent: "#5B9ECC",
      glow:   "rgba(91,158,204,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(91,158,204,0.7),transparent)",
    },
    engine: "Dual Permanent Magnet Electric", horsepower: "819 hp", topSpeed: "270 km/h",
    acceleration: "3.0 sec", transmission: "Single-Speed Direct Drive", fuelType: "Electric",
    range: "837 km (EPA)",
    features: [
      "Glass Canopy Roof", "Dolby Atmos Sound System",
      "DreamDrive Pro (ADAS Suite)", "33\" Curved Glass Cockpit",
      "800V Charging Architecture", "Ultra-High Efficiency Motor",
      "Air Suspension with Vehicle Levelling",
      "Rear Executive Seating Package",
    ],
    description:
      "The Air Grand Touring holds the EPA range record for any production electric vehicle — 837 km on a single charge — not through a massive battery pack, but through extraordinary engineering efficiency. Lucid's in-house electric motor technology achieves 4.6 miles-per-kWh, a figure that rewrites what is possible. Inside, a 33-inch curved glass cockpit and Dolby Atmos spatial audio redefine the relationship between driver and car. This is not an incremental improvement on the electric sedan — it is a fundamental rethinking of what a luxury EV can be.",
  },
  {
    id: "12",
    brand: "Tesla", name: "Model S Plaid", year: 2024, price: "$120,000", mileage: "2,800 km",
    category: "ev", badge: "Electric",
    image: {
      accent: "#C03030",
      glow:   "rgba(192,48,48,0.14)",
      line:   "linear-gradient(90deg,transparent,rgba(192,48,48,0.6),transparent)",
    },
    engine: "Tri-Motor Permanent Magnet + Induction", horsepower: "1,020 hp", topSpeed: "322 km/h",
    acceleration: "2.1 sec", transmission: "Single-Speed Direct Drive", fuelType: "Electric",
    range: "628 km (EPA)",
    features: [
      "Track Package (Upgraded Brakes & Cooling)",
      "Yoke Steering Wheel", "17\" Cinematic Display",
      "Ambient Interior Lighting", "Gaming Computer (up to 10 TFLOPS)",
      "Over-the-Air Software Updates", "Full Self-Driving Hardware",
      "HEPA Air Filtration",
    ],
    description:
      "The Model S Plaid is the car that made the world reconsider what an electric vehicle can achieve. Its tri-motor powertrain produces 1,020 hp, and the car despatches 0 to 100 km/h in 2.1 seconds — figures that rank it among the quickest production vehicles ever built, regardless of powertrain. The 17-inch landscape cinematic display and 10 TFLOP gaming computer represent Tesla's belief that a car's software is as fundamental as its hardware — a thesis the Model S Plaid argues convincingly.",
  },
];

// ── Query helpers ─────────────────────────────────────────────

export function getVehicleById(id: string): Vehicle | undefined {
  return VEHICLES.find((v) => v.id === id);
}

export function getSimilarVehicles(id: string, limit = 3): Vehicle[] {
  const vehicle = getVehicleById(id);
  if (!vehicle) return [];
  return VEHICLES.filter((v) => v.category === vehicle.category && v.id !== id).slice(0, limit);
}

export function getVehiclesByCategory(category: Category): Vehicle[] {
  return VEHICLES.filter((v) => v.category === category);
}
