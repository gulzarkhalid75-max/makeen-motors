// ─────────────────────────────────────────────────────────────
// Centralized vehicle data source for MAKEEN MOTORS
// ─────────────────────────────────────────────────────────────

export type Category = "sports" | "sedan" | "suv" | "ev";

export interface VehicleImage {
  url?: string;
  accent: string;
  glow: string;
  line: string;
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
  // Performance
  engine: string;
  horsepower: string;
  topSpeed: string;
  acceleration: string;
  transmission: string;
  fuelType: string;
  range?: string;
  // Provenance
  drivetrain: string;
  location: string;
  ownership: string;
  condition: string;
  // Aesthetics
  exterior: string;
  interior: string;
  // Content
  features: string[];
  description: string;
}

export const VEHICLES: Vehicle[] = [

  // ── Sports Cars ──────────────────────────────────────────────
  {
    id: "01",
    brand: "BMW", name: "M4 Competition", year: 2024, price: "$98,500", mileage: "1,200 km",
    category: "sports", badge: "Sports Car",
    image: {
      url:    "/images/cars/116592.jpg",
      accent: "#4B9CC2",
      glow:   "rgba(75,156,194,0.22)",
      line:   "linear-gradient(90deg,transparent,rgba(75,156,194,0.8),transparent)",
    },
    engine: "3.0L S58 Twin-Turbo Inline-6", horsepower: "503 hp", topSpeed: "290 km/h",
    acceleration: "3.9 sec", transmission: "8-Speed M Steptronic", fuelType: "Petrol",
    drivetrain: "Rear-Wheel Drive", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Excellent",
    exterior: "Alpine White Metallic", interior: "Black Merino Leather",
    features: [
      "M Carbon Exterior Package", "M Driver's Package",
      "Adaptive M Suspension Professional", "M Carbon Ceramic Brakes",
      "M Sport Exhaust System", "Merino Leather Interior",
      "Laser Headlights", "20\" M Double-Spoke Wheels",
    ],
    description:
      "The BMW M4 Competition is the definitive expression of BMW M GmbH's sports coupé philosophy. Its S58 twin-turbocharged 3.0-litre inline-six produces 503 hp and 650 Nm of torque — figures that translate to a 3.9-second sprint to 100 km/h and a top speed of 290 km/h with the optional M Driver's Package. With its wide body, carbon-fibre detailing, and M-specific aerodynamics, the M4 Competition is as visually striking as it is dynamically devastating.",
  },
  {
    id: "02",
    brand: "Manhart", name: "BMW M3 MH800", year: 2024, price: "$165,000", mileage: "800 km",
    category: "sports", badge: "Sports Car",
    image: {
      url:    "/images/cars/f1925874eaec605ae9de08581c70f34c.jpg",
      accent: "#B89A3E",
      glow:   "rgba(184,154,62,0.2)",
      line:   "linear-gradient(90deg,transparent,rgba(184,154,62,0.75),transparent)",
    },
    engine: "3.0L S58 Twin-Turbo Inline-6 (Manhart Tune)", horsepower: "800 hp", topSpeed: "320 km/h",
    acceleration: "3.2 sec", transmission: "8-Speed M Steptronic", fuelType: "Petrol",
    drivetrain: "Rear-Wheel Drive", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Pristine",
    exterior: "Manhart Black / Gold Accent Stripes", interior: "Alcantara & Carbon Sport Interior",
    features: [
      "Manhart Carbon Widebody Kit", "Manhart Exhaust with Sport Catalyst",
      "KW Coilover Suspension V5", "Manhart ECU Remap Stage 3",
      "Forged Concave Alloy Wheels", "Brembo 8-Piston Front Calipers",
      "Manhart Gold Accent Package", "Alcantara Sport Interior",
    ],
    description:
      "Manhart Performance's M3 MH800 takes BMW's already formidable M3 Competition and transforms it into a 800 hp touring machine. The S58 engine receives a comprehensive tune including a larger intercooler, upgraded turbochargers, and a full ECU remap — all wrapped in Manhart's signature carbon widebody kit with gold accent stripes. Only 25 examples of this specification exist, making it one of the rarest and most desirable M3 derivatives ever produced.",
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
    drivetrain: "Rear-Wheel Drive", location: "Dubai, UAE",
    ownership: "Brand New", condition: "Brand New",
    exterior: "Iridescent Silver", interior: "Obsidian Black Semi-Aniline Leather",
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
    brand: "BMW", name: "M5 CS", year: 2024, price: "$145,000", mileage: "2,100 km",
    category: "sedan", badge: "Luxury Sedan",
    image: {
      url:    "/images/cars/b3d6c5e5-2248-4deb-8306-da702b05214b.avif",
      accent: "#C9A356",
      glow:   "rgba(201,163,86,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    },
    engine: "4.4L S63 V8 Twin-Turbo", horsepower: "627 hp", topSpeed: "305 km/h",
    acceleration: "3.0 sec", transmission: "8-Speed M Steptronic", fuelType: "Petrol",
    drivetrain: "All-Wheel Drive (M xDrive)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Like New",
    exterior: "Frozen Black Metallic (BMW Individual)", interior: "BMW Individual Full Merino Leather",
    features: [
      "M Carbon Ceramic Brakes", "M Carbon Bucket Seats",
      "CS-Exclusive Gold Brake Callipers", "M Carbon Fibre Roof",
      "Lightweight Carbon Exterior Package", "Michelin Pilot Sport Cup 2R",
      "M Sport Exhaust", "M Driver's Package",
    ],
    description:
      "The BMW M5 CS is the lightest, most powerful and most track-focused M5 ever built. Tipping the scales 70 kg lighter than the Competition, the CS employs a carbon fibre roof, carbon-ceramic brakes and gold-painted callipers to create a super sedan of rare intensity. Its 627 hp V8 propels it to 100 km/h in 3.0 seconds — performance that comfortably eclipses dedicated sports cars costing considerably more.",
  },
  {
    id: "05",
    brand: "BMW", name: "i7 M70 xDrive", year: 2024, price: "$195,000", mileage: "3,200 km",
    category: "sedan", badge: "Luxury Sedan",
    image: {
      url:    "/images/cars/c8badee3-074e-42a9-9561-991ee1fab459.avif",
      accent: "#8A8F95",
      glow:   "rgba(138,143,149,0.16)",
      line:   "linear-gradient(90deg,transparent,rgba(138,143,149,0.6),transparent)",
    },
    engine: "Dual Permanent Magnet Electric Motors", horsepower: "651 hp", topSpeed: "250 km/h",
    acceleration: "3.7 sec", transmission: "Single-Speed Direct Drive", fuelType: "Electric",
    range: "560 km (WLTP)",
    drivetrain: "All-Wheel Drive (xDrive)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Like New",
    exterior: "Tanzanite Blue II Metallic", interior: "Merino Leather / Crystal Element Accents",
    features: [
      "Theatre Screen (31.3\" 8K Display)", "Executive Lounge Seating",
      "Bowers & Wilkins Diamond Surround Sound", "Active Comfort Drive",
      "Automatic Doors with Soft-Close", "Rear Axle Steering",
      "BMW Digital Key Plus", "Parking Assistant Professional",
    ],
    description:
      "The BMW i7 M70 xDrive is the most powerful and most luxurious electric vehicle BMW has ever produced. With 651 hp distributed across two electric motors and xDrive all-wheel drive, it delivers breathtaking performance in near-total silence. The rear cabin is a statement of intent: a 31.3-inch 8K Theatre Screen drops from the headliner at the touch of a button, transforming the i7 into a private cinema for two.",
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
    drivetrain: "All-Wheel Drive (AMG Performance 4MATIC+)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Excellent",
    exterior: "High-Tech Silver Metallic", interior: "Nappa Leather / Carbon Fibre Trim",
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
    brand: "Manhart", name: "BMW XM MHXM 900", year: 2024, price: "$265,000", mileage: "1,800 km",
    category: "suv", badge: "SUV",
    image: {
      url:    "/images/cars/bmw-xm-label-manhart-mhxm-900-front-quarter.avif",
      accent: "#C9A356",
      glow:   "rgba(201,163,86,0.18)",
      line:   "linear-gradient(90deg,transparent,rgba(201,163,86,0.7),transparent)",
    },
    engine: "4.4L V8 Twin-Turbo + E-Motor (PHEV)", horsepower: "900 hp", topSpeed: "290 km/h",
    acceleration: "3.1 sec", transmission: "8-Speed Steptronic Sport", fuelType: "Hybrid",
    drivetrain: "All-Wheel Drive (xDrive)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Pristine",
    exterior: "Manhart Black Matte / Carbon Aero Kit", interior: "Full Merino Leather / Carbon Fibre Accents",
    features: [
      "Manhart Carbon Widebody Aero Kit", "Manhart Stage 3 ECU Tune",
      "KW DDC Coilover Suspension", "Manhart Stainless Exhaust System",
      "Brembo 10-Piston Front Calipers", "Manhart Forged Wheels",
      "Full Merino Leather Interior", "Panoramic Sky Lounge LED Roof",
    ],
    description:
      "Manhart's MHXM 900 takes BMW's already formidable XM Label Red and re-engineers it into a 900 hp performance phenomenon. The stock hybrid powertrain is transformed through a comprehensive ECU calibration, larger turbos and upgraded intercooling — the result is a plug-in performance SUV that defies physics. Cloaked in Manhart's signature carbon widebody aero kit and rolling on forged monoblock wheels, the MHXM 900 is both a visual statement and a genuine performance machine.",
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
    drivetrain: "All-Wheel Drive", location: "Dubai, UAE",
    ownership: "Brand New", condition: "Brand New",
    exterior: "Glacier White", interior: "Camel Hide Leather / Piano Black Veneer",
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
    drivetrain: "All-Wheel Drive (PDAS)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Like New",
    exterior: "Arctic Grey Metallic", interior: "Black Race-Tex / Leather Combination",
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
    drivetrain: "All-Wheel Drive (PDAS+)", location: "Dubai, UAE",
    ownership: "Brand New", condition: "Brand New",
    exterior: "Chalk (Solid)", interior: "Black Race-Tex / Weissach Package Interior",
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
    drivetrain: "All-Wheel Drive", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Like New",
    exterior: "Zenith Red Metallic", interior: "Mojave Sand Nappa Leather",
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
    drivetrain: "All-Wheel Drive (Tri-Motor)", location: "Dubai, UAE",
    ownership: "1 Previous Owner", condition: "Excellent",
    exterior: "Pearl White Multi-Coat", interior: "Cream Vegan Leather",
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
