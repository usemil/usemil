import { 
  ShieldCheck, 
  FileText, 
  Code, 
  Calculator, 
  Palette, 
  Scale, 
  Clock, 
  Search, 
  Image as ImageIcon, 
  Gamepad2 
} from "lucide-react";


export const tools = [
  // 🔐 Security & Privacy Tools
  { name: "Password Generator", slug: "/password-generator", category: "Security & Privacy", description: "Generate strong, secure passwords instantly.", icon: ShieldCheck, available: true,metaTitle: "Random Password Generator | Secure & Local | UseMil",
    metaDescription: "Generate strong, secure, and highly randomized passwords directly in your browser. 100% local processing, offline capable, and zero data tracking.",
    keywords: [
      "password generator", 
      "secure password maker", 
      "random password generator", 
      "strong password creator", 
      "client-side password generator",
      "free local password tool"
    ],  },
  { name: "Password Strength Checker", slug: "/password-strength-checker", category: "Security & Privacy", description: "Check how secure your existing password is.", icon: ShieldCheck, available: false },
  { name: "UUID/GUID Generator", slug: "/uuid-generator", category: "Security & Privacy", description: "Generate v4 secure random UUIDs.", icon: ShieldCheck, available: false },
  { name: "Bcrypt Hash Generator", slug: "/bcrypt-generator", category: "Security & Privacy", description: "Generate and verify Bcrypt hashes.", icon: ShieldCheck, available: false },
  { name: "MD5 Hash Generator", slug: "/md5-generator", category: "Security & Privacy", description: "Quickly generate MD5 hashes.", icon: ShieldCheck, available: false },
  { name: "SHA Hash Generator", slug: "/sha-generator", category: "Security & Privacy", description: "Generate SHA-1, SHA-256, and SHA-512 hashes.", icon: ShieldCheck, available: false },
  { name: "HMAC Generator", slug: "/hmac-generator", category: "Security & Privacy", description: "Create HMAC authentication codes.", icon: ShieldCheck, available: false },
  { name: "AES Encryption", slug: "/aes-encryption", category: "Security & Privacy", description: "Encrypt and decrypt text securely.", icon: ShieldCheck, available: false },
  { name: "RSA Key Generator", slug: "/rsa-generator", category: "Security & Privacy", description: "Generate public and private RSA key pairs.", icon: ShieldCheck, available: false },
  { name: "Passphrase Generator", slug: "/passphrase-generator", category: "Security & Privacy", description: "Create secure, memorable word sequences.", icon: ShieldCheck, available: false },
  { name: "JWT Decoder", slug: "/jwt-decoder", category: "Security & Privacy", description: "Decode JSON Web Tokens securely.", icon: ShieldCheck, available: false },
  { name: "Card Validator", slug: "/card-validator", category: "Security & Privacy", description: "Validate credit card numbers using Luhn algorithm.", icon: ShieldCheck, available: false },

  // 📝 Text & Formatting Utilities
  { name: "Word Counter", slug: "/word-counter", category: "Text Utilities", description: "Count words, characters, and sentences.", icon: FileText, available: false },
  { name: "Case Converter", slug: "/case-converter", category: "Text Utilities", description: "Convert text to UPPERCASE, lowercase, etc.", icon: FileText, available: false },
  { name: "Lorem Ipsum Generator", slug: "/lorem-ipsum", category: "Text Utilities", description: "Generate placeholder text for designs.", icon: FileText, available: false },
  { name: "Text Diff Checker", slug: "/diff-checker", category: "Text Utilities", description: "Compare two text files line-by-line.", icon: FileText, available: false },
  { name: "Duplicate Line Remover", slug: "/remove-duplicates", category: "Text Utilities", description: "Clean up lists by removing duplicate lines.", icon: FileText, available: false },
  { name: "Find & Replace", slug: "/find-replace", category: "Text Utilities", description: "Bulk find and replace text strings.", icon: FileText, available: false },
  { name: "Sort Text Lines", slug: "/sort-text", category: "Text Utilities", description: "Sort text alphabetically or numerically.", icon: FileText, available: false },
  { name: "Text to Slug", slug: "/text-to-slug", category: "Text Utilities", description: "Convert any string into a URL-friendly slug.", icon: FileText, available: false },
  { name: "Markdown Previewer", slug: "/markdown-preview", category: "Text Utilities", description: "Live preview Markdown as HTML.", icon: FileText, available: false },
  { name: "HTML Entities Escaper", slug: "/html-entities", category: "Text Utilities", description: "Escape and unescape HTML entities.", icon: FileText, available: false },
  { name: "Strip HTML Tags", slug: "/strip-html", category: "Text Utilities", description: "Extract plain text from HTML code.", icon: FileText, available: false },
  { name: "Whitespace Cleaner", slug: "/whitespace-cleaner", category: "Text Utilities", description: "Remove extra spaces and formatting.", icon: FileText, available: false },
  { name: "Reverse Text", slug: "/reverse-text", category: "Text Utilities", description: "Reverse strings and characters instantly.", icon: FileText, available: false },

  // 💻 Developer & Encoding Tools
  { name: "JSON Formatter", slug: "/json-formatter", category: "Developer Tools", description: "Format and beautify JSON data.", icon: Code, available: false },
  { name: "JSON Minifier", slug: "/json-minifier", category: "Developer Tools", description: "Compress JSON data for production.", icon: Code, available: false },
  { name: "Base64 Encoder", slug: "/base64-encoder", category: "Developer Tools", description: "Encode and decode Base64 strings.", icon: Code, available: false },
  { name: "URL Encoder", slug: "/url-encoder", category: "Developer Tools", description: "Safely encode and decode URLs.", icon: Code, available: false },
  { name: "HEX to String", slug: "/hex-string", category: "Developer Tools", description: "Convert between HEX and readable text.", icon: Code, available: false },
  { name: "Binary to ASCII", slug: "/binary-ascii", category: "Developer Tools", description: "Translate binary code to text and back.", icon: Code, available: false },
  { name: "HTML Minifier", slug: "/html-minifier", category: "Developer Tools", description: "Compress HTML code size.", icon: Code, available: false },
  { name: "CSS Minifier", slug: "/css-minifier", category: "Developer Tools", description: "Compress CSS files instantly.", icon: Code, available: false },
  { name: "JS Minifier", slug: "/js-minifier", category: "Developer Tools", description: "Minify JavaScript for faster loading.", icon: Code, available: false },
  { name: "XML Formatter", slug: "/xml-formatter", category: "Developer Tools", description: "Beautify and validate XML code.", icon: Code, available: false },
  { name: "YAML to JSON", slug: "/yaml-json", category: "Developer Tools", description: "Convert configuration formats effortlessly.", icon: Code, available: false },
  { name: "CSV to JSON", slug: "/csv-json", category: "Developer Tools", description: "Transform spreadsheet data into JSON.", icon: Code, available: false },
  { name: "User-Agent Parser", slug: "/user-agent", category: "Developer Tools", description: "Analyze browser string data.", icon: Code, available: false },
  { name: "Cron Descriptor", slug: "/cron-parser", category: "Developer Tools", description: "Translate cron expressions to plain English.", icon: Code, available: false },

  // 🧮 Math, Financial & Everyday Calculators
  { name: "Percentage Calculator", slug: "/percentage-calculator", category: "Calculators", description: "Calculate percentages and ratios.", icon: Calculator, available: false },
  { name: "Tip Calculator", slug: "/tip-calculator", category: "Calculators", description: "Calculate tips and split bills easily.", icon: Calculator, available: false },
  { name: "EMI Calculator", slug: "/emi-calculator", category: "Calculators", description: "Calculate loan amortization schedules.", icon: Calculator, available: false },
  { name: "Compound Interest", slug: "/compound-interest", category: "Calculators", description: "Project your savings and investments.", icon: Calculator, available: false },
  { name: "BMI Calculator", slug: "/bmi-calculator", category: "Calculators", description: "Calculate Body Mass Index.", icon: Calculator, available: false },
  { name: "Age Calculator", slug: "/age-calculator", category: "Calculators", description: "Calculate exact age in days, months, and years.", icon: Calculator, available: false },
  { name: "BMR Calculator", slug: "/bmr-calculator", category: "Calculators", description: "Calculate Basal Metabolic Rate.", icon: Calculator, available: false },
  { name: "Scientific Calculator", slug: "/scientific-calculator", category: "Calculators", description: "Advanced math calculations in browser.", icon: Calculator, available: false },
  { name: "Programmer Calculator", slug: "/programmer-calculator", category: "Calculators", description: "Binary, Hex, and Octal math operations.", icon: Calculator, available: false },
  { name: "Prime Number Checker", slug: "/prime-checker", category: "Calculators", description: "Verify if a number is prime.", icon: Calculator, available: false },
  { name: "Random Number Picker", slug: "/random-number", category: "Calculators", description: "Generate random number sequences.", icon: Calculator, available: false },
  { name: "Discount Calculator", slug: "/discount-calculator", category: "Calculators", description: "Calculate sale savings instantly.", icon: Calculator, available: false },
  { name: "GPA Calculator", slug: "/gpa-calculator", category: "Calculators", description: "Calculate your university grade point average.", icon: Calculator, available: false },

  // 🎨 Color & Digital Design Utilities
  { name: "HEX to RGB", slug: "/hex-rgb", category: "Design Utilities", description: "Convert color codes instantly.", icon: Palette, available: false },
  { name: "RGB to HEX", slug: "/rgb-hex", category: "Design Utilities", description: "Translate RGB values to HEX codes.", icon: Palette, available: false },
  { name: "HSL to RGB", slug: "/hsl-rgb", category: "Design Utilities", description: "Convert HSL values to RGB.", icon: Palette, available: false },
  { name: "Palette Generator", slug: "/palette-generator", category: "Design Utilities", description: "Generate harmonious color schemes.", icon: Palette, available: false },
  { name: "CSS Gradient Builder", slug: "/gradient-builder", category: "Design Utilities", description: "Generate custom CSS gradient code.", icon: Palette, available: false },
  { name: "Box Shadow Generator", slug: "/box-shadow", category: "Design Utilities", description: "Visually build CSS box shadows.", icon: Palette, available: false },
  { name: "Image Color Picker", slug: "/color-picker", category: "Design Utilities", description: "Extract colors from local images.", icon: Palette, available: false },
  { name: "Contrast Checker", slug: "/contrast-checker", category: "Design Utilities", description: "Check WCAG accessibility contrast ratios.", icon: Palette, available: false },
  { name: "SVG Optimizer", slug: "/svg-optimizer", category: "Design Utilities", description: "Clean and compress SVG code.", icon: Palette, available: false },
  { name: "Border Radius Visualizer", slug: "/border-radius", category: "Design Utilities", description: "Generate complex CSS border radii.", icon: Palette, available: false },

  // 📐 Unit & Data Converters
  { name: "Length Converter", slug: "/length-converter", category: "Converters", description: "Convert meters, feet, and miles.", icon: Scale, available: false },
  { name: "Weight Converter", slug: "/weight-converter", category: "Converters", description: "Convert kilograms, pounds, and ounces.", icon: Scale, available: false },
  { name: "Temperature Converter", slug: "/temperature-converter", category: "Converters", description: "Convert Celsius, Fahrenheit, and Kelvin.", icon: Scale, available: false },
  { name: "Area Converter", slug: "/area-converter", category: "Converters", description: "Convert square meters, acres, and hectares.", icon: Scale, available: false },
  { name: "Volume Converter", slug: "/volume-converter", category: "Converters", description: "Convert liters, gallons, and milliliters.", icon: Scale, available: false },
  { name: "Data Storage Converter", slug: "/data-converter", category: "Converters", description: "Convert MB, GB, TB, and PB.", icon: Scale, available: false },
  { name: "Speed Converter", slug: "/speed-converter", category: "Converters", description: "Convert km/h, mph, and knots.", icon: Scale, available: false },
  { name: "Angle Converter", slug: "/angle-converter", category: "Converters", description: "Convert degrees to radians.", icon: Scale, available: false },
  { name: "Roman Numeral Converter", slug: "/roman-numerals", category: "Converters", description: "Convert Arabic numbers to Roman.", icon: Scale, available: false },
  { name: "Number to Words", slug: "/number-words", category: "Converters", description: "Translate numbers into readable words.", icon: Scale, available: false },

  // ⏱️ Date, Time & Clock Utilities
  { name: "Unix Timestamp", slug: "/unix-timestamp", category: "Date & Time", description: "Convert epoch time to readable dates.", icon: Clock, available: false },
  { name: "Date to Unix", slug: "/date-unix", category: "Date & Time", description: "Convert readable dates to epoch timestamps.", icon: Clock, available: false },
  { name: "Time Zone Difference", slug: "/time-zone", category: "Date & Time", description: "Calculate offsets between time zones.", icon: Clock, available: false },
  { name: "Days Counter", slug: "/days-counter", category: "Date & Time", description: "Count exact days between two dates.", icon: Clock, available: false },
  { name: "Online Stopwatch", slug: "/stopwatch", category: "Date & Time", description: "Simple in-browser lap timer.", icon: Clock, available: false },
  { name: "Countdown Timer", slug: "/countdown", category: "Date & Time", description: "Build custom countdown timers.", icon: Clock, available: false },
  { name: "Leap Year Checker", slug: "/leap-year", category: "Date & Time", description: "Verify if a year is a leap year.", icon: Clock, available: false },
  { name: "Date Calculator", slug: "/date-calculator", category: "Date & Time", description: "Add or subtract days from a date.", icon: Clock, available: false },

  // 🔍 Web & SEO Analytics Tools
  { name: "QR Code Generator", slug: "/qr-generator", category: "Web & SEO", description: "Generate scannable QR codes.", icon: Search, available: false },
  { name: "QR Code Scanner", slug: "/qr-scanner", category: "Web & SEO", description: "Read QR codes from your webcam or images.", icon: Search, available: false },
  { name: "Meta Tag Generator", slug: "/meta-tags", category: "Web & SEO", description: "Generate SEO-friendly HTML meta tags.", icon: Search, available: false },
  { name: "Robots.txt Generator", slug: "/robots-txt", category: "Web & SEO", description: "Build rules for search engine crawlers.", icon: Search, available: false },
  { name: "XML Sitemap Builder", slug: "/xml-sitemap", category: "Web & SEO", description: "Generate schema for website indexing.", icon: Search, available: false },
  { name: "Open Graph Previewer", slug: "/og-preview", category: "Web & SEO", description: "Test social media card previews.", icon: Search, available: false },
  { name: "URL Parser", slug: "/url-parser", category: "Web & SEO", description: "Break down URL protocols and queries.", icon: Search, available: false },
  { name: "List to Dropdown", slug: "/list-dropdown", category: "Web & SEO", description: "Convert HTML lists to select elements.", icon: Search, available: false },

  // 🖼️ Client-Side Media Utilities
  { name: "Image Converter", slug: "/image-converter", category: "Media Tools", description: "Convert PNG, JPG, and WebP instantly.", icon: ImageIcon, available: false },
  { name: "Exif Metadata Wiper", slug: "/exif-wiper", category: "Media Tools", description: "Strip hidden tracking data from images.", icon: ImageIcon, available: false },
  { name: "Aspect Ratio Calculator", slug: "/aspect-ratio", category: "Media Tools", description: "Calculate media dimensions accurately.", icon: ImageIcon, available: false },
  { name: "Image Flip & Rotate", slug: "/image-rotate", category: "Media Tools", description: "Quickly orient images in browser.", icon: ImageIcon, available: false },
  { name: "Text-to-Speech", slug: "/text-to-speech", category: "Media Tools", description: "Read text aloud using native browser APIs.", icon: ImageIcon, available: false },
  { name: "Speech-to-Text", slug: "/speech-to-text", category: "Media Tools", description: "Live dictation notepad via browser recognition.", icon: ImageIcon, available: false },

  // 🧩 Miscellaneous Games & Fun Utilities
  { name: "Coin Flipper", slug: "/coin-flip", category: "Miscellaneous", description: "Simulate Heads or Tails randomly.", icon: Gamepad2, available: false },
  { name: "Dice Roller", slug: "/dice-roller", category: "Miscellaneous", description: "Roll virtual multi-sided dice.", icon: Gamepad2, available: false },
  { name: "Rock Paper Scissors", slug: "/rock-paper-scissors", category: "Miscellaneous", description: "Play against a random browser bot.", icon: Gamepad2, available: false },
  { name: "Morse Code Translator", slug: "/morse-code", category: "Miscellaneous", description: "Encode and decode Morse messages.", icon: Gamepad2, available: false },
  { name: "Leetspeak Generator", slug: "/leetspeak", category: "Miscellaneous", description: "Convert text to hacker 1337 language.", icon: Gamepad2, available: false }
];