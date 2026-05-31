/**
 * Mock Product Data - 26 Distinct Luxury Products
 * 11 Phones + 15 Cars (11 Hypercars + 4 Daily Premium) with Premium Studio-Lit Images
 */

export const mockProducts = [
  // PHONES (11 Unique Flagships)
  {
    id: 1,
    name: "iPhone 17 Pro Max",
    brand: "Apple",
    category: "Phone",
    price: 179900,
    rating: 4.9,
    numReviews: 2156,
    description: "The pinnacle of iPhone innovation with A19 Pro chip, 108MP camera system, and titanium aerospace frame.",
    images: {
      front: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      back: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      side: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80"
    },
    specs: {
      processor: "A19 Pro",
      display: "6.9\" Super Retina XDR OLED ProMotion",
      camera: "108MP Main + 48MP Ultra Wide + 24MP Telephoto",
      storage: "512GB / 1TB / 2TB",
      battery: "4800mAh",
      os: "iOS 19"
    }
  },
  {
    id: 2,
    name: "Samsung Galaxy S26 Ultra",
    brand: "Samsung",
    category: "Phone",
    price: 154999,
    rating: 4.8,
    numReviews: 1892,
    description: "Samsung's ultimate flagship with 300MP camera, Snapdragon 8 Gen 5, and AI-enhanced S Pen.",
    images: {
      front: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80",
      back: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      side: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.9\" QHD+ Dynamic AMOLED 2X 144Hz",
      camera: "300MP Main + 100MP Ultra Wide + 50MP Telephoto x5",
      storage: "512GB / 1TB / 2TB",
      battery: "5500mAh",
      os: "Android 16"
    }
  },
  {
    id: 3,
    name: "Google Pixel 10 Pro",
    brand: "Google",
    category: "Phone",
    price: 129999,
    rating: 4.7,
    numReviews: 1456,
    description: "Pure Android experience with Tensor G5 chip, advanced AI photography, and 7 years of updates.",
    images: {
      front: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      back: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      side: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"
    },
    specs: {
      processor: "Tensor G5",
      display: "6.7\" LTPO OLED 120Hz",
      camera: "64MP Main + 48MP Ultra Wide + 48MP Telephoto",
      storage: "256GB / 512GB / 1TB",
      battery: "5000mAh",
      os: "Android 16"
    }
  },
  {
    id: 4,
    name: "OnePlus 14 Pro",
    brand: "OnePlus",
    category: "Phone",
    price: 89999,
    rating: 4.6,
    numReviews: 987,
    description: "Fast and smooth with Snapdragon 8 Gen 5, Hasselblad camera partnership, and 100W fast charging.",
    images: {
      front: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      back: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      side: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.8\" LTPO AMOLED 120Hz",
      camera: "64MP Hasselblad + 48MP Ultra Wide + 32MP Telephoto",
      storage: "256GB / 512GB",
      battery: "5400mAh",
      os: "OxygenOS 15"
    }
  },
  {
    id: 5,
    name: "Sony Xperia 1 VI",
    brand: "Sony",
    category: "Phone",
    price: 119999,
    rating: 4.5,
    numReviews: 654,
    description: "Cinema-quality 4K HDR display with professional-grade camera system and Dolby Atmos audio.",
    images: {
      front: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      back: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      side: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.5\" 4K HDR OLED 120Hz",
      camera: "48MP Main + 24MP Ultra Wide + 12MP Telephoto",
      storage: "256GB / 512GB",
      battery: "5000mAh",
      os: "Android 16"
    }
  },
  {
    id: 6,
    name: "Xiaomi 16 Ultra",
    brand: "Xiaomi",
    category: "Phone",
    price: 99999,
    rating: 4.6,
    numReviews: 1123,
    description: "Leica camera partnership with 200MP main sensor, Snapdragon 8 Gen 5, and 120W hypercharge.",
    images: {
      front: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      back: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      side: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.73\" AMOLED 144Hz",
      camera: "200MP Leica + 50MP Ultra Wide + 50MP Telephoto",
      storage: "256GB / 512GB / 1TB",
      battery: "5300mAh",
      os: "MIUI 16"
    }
  },
  {
    id: 7,
    name: "Vivo X100 Ultra",
    brand: "Vivo",
    category: "Phone",
    price: 84999,
    rating: 4.5,
    numReviews: 876,
    description: "Zeiss optics partnership with 200MP periscope zoom, Snapdragon 8 Gen 5, and gimbal stabilization.",
    images: {
      front: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      back: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      side: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.78\" AMOLED 120Hz",
      camera: "200MP Zeiss + 50MP Ultra Wide + 50MP Periscope",
      storage: "256GB / 512GB",
      battery: "5400mAh",
      os: "Funtouch OS 15"
    }
  },
  {
    id: 8,
    name: "Asus ROG Phone 10",
    brand: "Asus",
    category: "Phone",
    price: 94999,
    rating: 4.7,
    numReviews: 1432,
    description: "Ultimate gaming phone with Snapdragon 8 Gen 5 for Gaming, 165Hz display, and AirTrigger 8 controls.",
    images: {
      front: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      back: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80",
      side: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5 for Gaming",
      display: "6.8\" AMOLED 165Hz",
      camera: "64MP Main + 24MP Ultra Wide + 8MP Macro",
      storage: "512GB / 1TB",
      battery: "6000mAh",
      os: "Android 16"
    }
  },
  {
    id: 9,
    name: "Huawei Mate XT Ultimate",
    brand: "Huawei",
    category: "Phone",
    price: 149999,
    rating: 4.6,
    numReviews: 723,
    description: "Revolutionary tri-fold display with HarmonyOS NEXT, satellite communication, and premium leather finish.",
    images: {
      front: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80",
      back: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      side: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=800&q=80"
    },
    specs: {
      processor: "Kirin 9010",
      display: "10.2\" Tri-Fold OLED",
      camera: "50MP Main + 48MP Ultra Wide + 48MP Telephoto",
      storage: "512GB / 1TB",
      battery: "5100mAh",
      os: "HarmonyOS NEXT"
    }
  },
  {
    id: 10,
    name: "Honor Magic7 Pro",
    brand: "Honor",
    category: "Phone",
    price: 79999,
    rating: 4.5,
    numReviews: 567,
    description: "AI-powered flagship with MagicOS 9, 200MP camera, and silicon-carbon battery technology.",
    images: {
      front: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=800&q=80",
      back: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=800&q=80",
      side: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.8\" LTPO AMOLED 120Hz",
      camera: "200MP Main + 64MP Ultra Wide + 50MP Periscope",
      storage: "256GB / 512GB / 1TB",
      battery: "5850mAh",
      os: "MagicOS 9"
    }
  },
  {
    id: 11,
    name: "Motorola Edge 60 Ultra",
    brand: "Motorola",
    category: "Phone",
    price: 69999,
    rating: 4.4,
    numReviews: 432,
    description: "Premium design with 200MP camera, 144Hz pOLED display, and 125W hypercharge technology.",
    images: {
      front: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=800&q=80",
      back: "https://images.unsplash.com/photo-1598327105666-5b89351aff97?w=800&q=80",
      side: "https://images.unsplash.com/photo-1510557880182-3d4d3cba35a5?w=800&q=80"
    },
    specs: {
      processor: "Snapdragon 8 Gen 5",
      display: "6.73\" pOLED 144Hz",
      camera: "200MP Main + 50MP Ultra Wide + 50MP Telephoto",
      storage: "256GB / 512GB",
      battery: "4600mAh",
      os: "Android 16"
    }
  },
  // HYPERCARS (11 Ultra-Luxury Masterpieces)
  {
    id: 12,
    name: "Porsche Taycan Turbo S",
    brand: "Porsche",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 18000000,
    rating: 4.9,
    numReviews: 567,
    description: "Electric sports car with 800V architecture, 0-100 km/h in 2.6 seconds, and iconic Porsche design.",
    images: {
      front: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "Dual Electric Motors",
      range: "412 km",
      acceleration: "2.6s (0-100 km/h)",
      horsepower: "750 HP",
      seating: "4 seats",
      fuel: "Electric"
    }
  },
  {
    id: 13,
    name: "Audi e-tron GT",
    brand: "Audi",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 17000000,
    rating: 4.8,
    numReviews: 432,
    description: "Grand tourer with electric performance, quattro all-wheel drive, and progressive luxury interior.",
    images: {
      front: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "Dual Electric Motors",
      range: "472 km",
      acceleration: "3.3s (0-100 km/h)",
      horsepower: "637 HP",
      seating: "4 seats",
      fuel: "Electric"
    }
  },
  {
    id: 14,
    name: "BMW i7 M70",
    brand: "BMW",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 22000000,
    rating: 4.9,
    numReviews: 389,
    description: "Luxury electric sedan with crystal headlights, Sky Lounge panoramic roof, and M performance tuning.",
    images: {
      front: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "Dual Electric Motors",
      range: "560 km",
      acceleration: "3.7s (0-100 km/h)",
      horsepower: "660 HP",
      seating: "5 seats",
      fuel: "Electric"
    }
  },
  {
    id: 15,
    name: "Mercedes-Benz EQS AMG",
    brand: "Mercedes-Benz",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 24000000,
    rating: 4.8,
    numReviews: 456,
    description: "Ultra-luxury electric sedan with Hyperscreen, AMG performance, and Level 3 autonomous driving.",
    images: {
      front: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "Dual Electric Motors AMG",
      range: "600 km",
      acceleration: "3.4s (0-100 km/h)",
      horsepower: "751 HP",
      seating: "5 seats",
      fuel: "Electric"
    }
  },
  {
    id: 16,
    name: "Tesla Roadster Performance",
    brand: "Tesla",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 20000000,
    rating: 4.9,
    numReviews: 789,
    description: "Ultimate electric sports car with SpaceX package, 1.9s 0-100 km/h, and 1000 km range.",
    images: {
      front: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      back: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      side: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80"
    },
    specs: {
      engine: "Tri Electric Motors",
      range: "1000 km",
      acceleration: "1.9s (0-100 km/h)",
      horsepower: "1100 HP",
      seating: "4 seats",
      fuel: "Electric"
    }
  },
  {
    id: 17,
    name: "Lucid Air Sapphire",
    brand: "Lucid",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 25000000,
    rating: 4.8,
    numReviews: 234,
    description: "Ultra-high-performance electric sedan with 1200 HP, 800V architecture, and executive luxury interior.",
    images: {
      front: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      back: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
      side: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
    },
    specs: {
      engine: "Tri Electric Motors",
      range: "800 km",
      acceleration: "2.0s (0-100 km/h)",
      horsepower: "1200 HP",
      seating: "5 seats",
      fuel: "Electric"
    }
  },
  {
    id: 18,
    name: "Aston Martin Valhalla",
    brand: "Aston Martin",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 35000000,
    rating: 4.9,
    numReviews: 156,
    description: "Hybrid hypercar with F1 technology, carbon fiber monocoque, and iconic British luxury craftsmanship.",
    images: {
      front: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
      back: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80",
      side: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
    },
    specs: {
      engine: "V8 Twin-Turbo Hybrid",
      range: "500 km",
      acceleration: "2.5s (0-100 km/h)",
      horsepower: "937 HP",
      seating: "2 seats",
      fuel: "Hybrid"
    }
  },
  {
    id: 19,
    name: "Ferrari SF90 Stradale",
    brand: "Ferrari",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 50000000,
    rating: 5.0,
    numReviews: 312,
    description: "Plug-in hybrid supercar with F1-derived technology, 1000 HP, and active aerodynamics.",
    images: {
      front: "https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800&q=80",
      back: "https://images.unsplash.com/photo-1542362567-b07e54358753?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "V8 Twin-Turbo Hybrid",
      range: "25 km electric",
      acceleration: "2.5s (0-100 km/h)",
      horsepower: "1000 HP",
      seating: "2 seats",
      fuel: "Hybrid"
    }
  },
  {
    id: 20,
    name: "Lamborghini Revuelto",
    brand: "Lamborghini",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 60000000,
    rating: 4.9,
    numReviews: 267,
    description: "HPEV hybrid supercar with V12 engine, 1015 HP, and revolutionary Y-shaped headlight design.",
    images: {
      front: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "V12 Hybrid",
      range: "50 km electric",
      acceleration: "2.5s (0-100 km/h)",
      horsepower: "1015 HP",
      seating: "2 seats",
      fuel: "Hybrid"
    }
  },
  {
    id: 21,
    name: "McLaren Artura",
    brand: "McLaren",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 28000000,
    rating: 4.8,
    numReviews: 198,
    description: "First series-production hybrid supercar with twin-turbo V6, 671 HP, and carbon fiber chassis.",
    images: {
      front: "https://images.unsplash.com/photo-1621135802920-133df287f89c?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "V6 Twin-Turbo Hybrid",
      range: "30 km electric",
      acceleration: "3.0s (0-100 km/h)",
      horsepower: "671 HP",
      seating: "2 seats",
      fuel: "Hybrid"
    }
  },
  {
    id: 22,
    name: "Rimac Nevera Time Attack",
    brand: "Rimac",
    category: "Car",
    subCategory: "Hyper Performance",
    price: 22000000,
    rating: 5.0,
    numReviews: 89,
    description: "Electric hypercar with 1914 HP, 1.74s 0-100 km/h, and record-breaking performance.",
    images: {
      front: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      back: "https://images.unsplash.com/photo-1614200187524-dc4b892acf16?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "Quad Electric Motors",
      range: "500 km",
      acceleration: "1.74s (0-100 km/h)",
      horsepower: "1914 HP",
      seating: "2 seats",
      fuel: "Electric"
    }
  },
  // DAILY PREMIUM CARS (4 Core Luxury Models)
  {
    id: 23,
    name: "Tesla Model 3 Highland",
    brand: "Tesla",
    category: "Car",
    subCategory: "Daily Premium",
    price: 4500000,
    rating: 4.7,
    numReviews: 2345,
    description: "Redesigned electric sedan with improved range, premium interior, and Autopilot capabilities.",
    images: {
      front: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?w=800&q=80",
      back: "https://images.unsplash.com/photo-1536700503339-1e4b06520771?w=800&q=80",
      side: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80"
    },
    specs: {
      engine: "Dual Motor All-Wheel Drive",
      range: "521 km",
      acceleration: "4.2s (0-100 km/h)",
      horsepower: "450 HP",
      seating: "5 seats",
      fuel: "Electric"
    }
  },
  {
    id: 24,
    name: "BMW M3 Competition",
    brand: "BMW",
    category: "Car",
    subCategory: "Daily Premium",
    price: 7800000,
    rating: 4.8,
    numReviews: 1567,
    description: "Performance sedan with twin-turbo inline-6, M xDrive AWD, and track-ready dynamics.",
    images: {
      front: "https://images.unsplash.com/photo-1617531653332-bd46c24f2068?w=800&q=80",
      back: "https://images.unsplash.com/photo-1555215695-3004980ad54e?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "3.0L Twin-Turbo I6",
      range: "450 km",
      acceleration: "3.5s (0-100 km/h)",
      horsepower: "503 HP",
      seating: "5 seats",
      fuel: "Petrol"
    }
  },
  {
    id: 25,
    name: "Ford Mustang Dark Horse",
    brand: "Ford",
    category: "Car",
    subCategory: "Daily Premium",
    price: 7200000,
    rating: 4.6,
    numReviews: 1234,
    description: "High-performance muscle car with 5.0L V8, track-ready suspension, and aggressive styling.",
    images: {
      front: "https://images.unsplash.com/photo-1584345604476-8ec5f82d818c?w=800&q=80",
      back: "https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "5.0L V8",
      range: "500 km",
      acceleration: "4.2s (0-100 km/h)",
      horsepower: "500 HP",
      seating: "4 seats",
      fuel: "Petrol"
    }
  },
  {
    id: 26,
    name: "Audi A4 S-Line",
    brand: "Audi",
    category: "Car",
    subCategory: "Daily Premium",
    price: 5200000,
    rating: 4.5,
    numReviews: 987,
    description: "Premium compact sedan with quattro AWD, virtual cockpit, and sophisticated German engineering.",
    images: {
      front: "https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800&q=80",
      back: "https://images.unsplash.com/photo-1617788138017-80ad40651399?w=800&q=80",
      side: "https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=800&q=80"
    },
    specs: {
      engine: "2.0L TFSI",
      range: "600 km",
      acceleration: "5.8s (0-100 km/h)",
      horsepower: "261 HP",
      seating: "5 seats",
      fuel: "Petrol"
    }
  }
];

export default mockProducts;
