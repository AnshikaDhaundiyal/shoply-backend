exports.products = [
  {
    name: "Dell Vostro 14-inch Laptop",
    image: "https://m.media-amazon.com/images/I/61KdboYR7XL._SX679_.jpg",
    brand: "Dell",
    description:
      "Dell Vostro 14-inch Laptop (35.56 cms) | Windows 11 and MS Office 2021 | Intel i3-1115G4 | 8GB DDR4 SDRAM and 512GB SSD | FHD Screen | Laptop for Work | 3420 - Carbon Black (D552276WIN9BE) BE PRODUCTIVE - Work comfortably with the spill-resistant, full-size keyboard, larger touchpad, and Dell ComfortView software, which reduces harmful blue light emissions for extended screen time",
    category: "PCs and Laptops",
    price: 39900,
    countInStock: 10,
    featured: true,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "Samsung Galaxy M04 Dark Blue",
    image: "https://m.media-amazon.com/images/I/81t6Av5DvXL._SX679_.jpg",
    brand: "Samsung",
    description:
      "Powerful MediaTek Helio P35 Octa Core 2.3GHz with Android 12,One UI Core 4.1 13MP+2MP Dual camera setup- True 13MP (F2.2) main camera + 2MP (F2.4) | 5MP (F2.2) front came 16.55 centimeters (6.5-inch) LCD, HD+ resolution with 720 x 1600 pixels resolution, 269 PPI with 16M color",
    category: "Mobile Phones",
    price: 9999,
    countInStock: 23,
    featured: true,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "Canon EOS 1500D 24.1 Digital SLR Camera (Black) with EF S18-55 is II Lens",
    image: "https://m.media-amazon.com/images/I/914hFeTU2-L._SX522_.jpg",
    brand: "Canon",
    description:
      "Dell Vostro 14-inch Laptop (35.56 cms) | Windows 11 and MS Office 2021 | Intel i3-1115G4 | 8GB DDR4 SDRAM and 512GB SSD | FHD Screen | Laptop for Work | 3420 - Carbon Black (D552276WIN9BE) BE PRODUCTIVE - Work comfortably with the spill-resistant, full-size keyboard, larger touchpad, and Dell ComfortView software, which reduces harmful blue light emissions for extended screen timeSensor: APS-C CMOS Sensor with 24.1 MP (high resolution for large prints and image cropping). Transmission frequency (central frequency):Frequency: 2 412 to 2 462MHz. Standard diopter :-2.5 - +0.5m-1 (dpt);ISO: 100-6400 sensitivity range (critical for obtaining grain-free pictures, especially in low light) Image Processor: DIGIC 4+ with 9 autofocus points (important for speed and accuracy of autofocus and burst photography);Video Resolution: Full HD video with fully manual control and selectable frame rates (great for precision and high-quality video work)",
    category: "Cameras",
    price: 39990,
    countInStock: 16,
    featured: true,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "BENYAR Luxury Business Casual Party-Wear Silicone Chronograph Date Display Watch for Men",
    image: "https://m.media-amazon.com/images/I/61l376IZHNS._UX522_.jpg",
    brand: "BENYAR",
    description:
      "BEST CHRONOGRAPH WATCH FOR MEN: High-quality Benyar luxury watch has three chronograph sub-dials, 1/10 seconds sub-dial, Seconds sub-dial and minute sub-dial which provides accurate and precise time at less than 10 seconds of error. DURABLE MATERIAL: Simple and Classical Big Dial, Soft Blue Silicone Watch Band, Stainless Steel case will never fade, Abrasion resistant scratch resistant hardlex cover supports the function of 30M waterproof, daily hand washing or car washing and other similar activities",
    category: "Watches",
    price: 2690,
    countInStock: 30,
    featured: true,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "Acnos Brand Digital 4 Colours Vintage Square Dial Unisex Wrist Watch for Men Women Pack of 1 (WR)",
    image: "https://m.media-amazon.com/images/I/61GWaL9HTiL._UX522_.jpg",
    brand: "Acnos",
    description:
      "Warranty type: Manufacturer; 1 Years Warranty Against Only Manufacture Defects Strap Material : High Quality Premium Metal watch for Women and Girl | Movement: Analogue watch for men Dial Color : Black Silver Gold Rosegold men watch | Strap Color : Black watches for men latest stylish| Display Type : Digital | Case Shape : Round boys watch | chronograph watches for men",
    category: "Watches",
    price: 399,
    countInStock: 12,
    featured: false,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "SJCAM SJ4000 Dual Screen 4K 30FPS/16MP WiFi Action Camera | 170° Ultra Wide Angle | 2.0''LTPS LCD+1.3'' Dual Screen | 30M Waterproof with Waterproof Case | Black",
    image: "https://m.media-amazon.com/images/I/71w10JReSlL._SL1500_.jpg",
    brand: "SJCAM",
    description:
      "4k30fps video is not only clear, but also more smooth, with more details than you can imagine. Equipped with a 2.0''HD main screen and a 1.3'' front screen, you can see how you shoot and masters your footage at any time. Mobile app can remotely control the camera at a distance of up to 10m meters via WiFi, and its ability is far more than that.",
    category: "Cameras",
    price: 6166,
    countInStock: 3,
    featured: false,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
  {
    name: "Samsung Galaxy M34 5G",
    image: "https://m.media-amazon.com/images/I/91fonhAtoAL._SX679_.jpg",
    brand: "Samsung",
    description:
      "Exynos 1280 Octa Core 2.4GHz with the 12 band support for a True 5G experience 16.42 centimeters (6.5-inch) Super AMOLED Display, FHD+ resolution, 1080 x 2340 pixels protected by Gorilla Glass 5 50MP+8MP+2MP Triple Camera Setup - True 50MP No Shake Cam (F1.8) Main Camera + 8MP (F2.2) + 2MP (F2.4)| 13MP (F2.0) Front Camera",
    category: "Mobile Phones",
    price: 21999,
    countInStock: 8,
    featured: false,
    rating: 0,
    reviews: [],
    numOfReviews: 0,
  },
];

const bcrypt = require("bcryptjs");

exports.users = [
  {
    username: "Admin User",
    email: "admin@example.com",
    password: bcrypt.hashSync("Admin@54321", 10),  // Hashed password
    isAdmin: true,
  },
  // Add other users here...
// ];

// exports.users = [
//   {
//     username: "Admin User",
//     email: "admin@example.com",
//     password: "Admin@54321",
//     isAdmin: true,
//   },
  {
    username: "John Smith",
    email: "john@example.com",
    password: "John@54321",
    isAdmin: false,
  },
];
