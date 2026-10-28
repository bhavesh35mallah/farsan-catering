import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import { Admin } from '../models/Admin.js';
import { Category } from '../models/Category.js';
import { Product } from '../models/Product.js';
import { BusinessSettings } from '../models/BusinessSettings.js';

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/farsan_catering';

const categoriesData = [
  {
    name: 'Farsan',
    slug: 'farsan',
    description: 'Freshly steamed and fried traditional Gujarati savoury delicacies.',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=600&auto=format&fit=crop&q=80',
    orderIndex: 1,
  },
  {
    name: 'Namkeen',
    slug: 'namkeen',
    description: 'Crisp, crunchy dry savoury snacks prepared with premium spices and pure oil.',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=600&auto=format&fit=crop&q=80',
    orderIndex: 2,
  },
  {
    name: 'Gujarati Snacks',
    slug: 'gujarati-snacks',
    description: 'Everyday homemade staples, fresh theplas, puris, and evening snacks.',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=600&auto=format&fit=crop&q=80',
    orderIndex: 3,
  },
  {
    name: 'Sweets',
    slug: 'sweets',
    description: 'Pure ghee traditional Gujarati sweets and mithai made with utmost devotion.',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=600&auto=format&fit=crop&q=80',
    orderIndex: 4,
  },
  {
    name: 'Homemade Specials',
    slug: 'homemade-specials',
    description: 'Seasonal specialties, artisanal pickles, chutneys, and secret family recipes.',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=600&auto=format&fit=crop&q=80',
    orderIndex: 5,
  },
  {
    name: 'Catering Packages',
    slug: 'catering-packages',
    description: 'Curated complete feast packages for weddings, poojas, parties, and corporate lunches.',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=600&auto=format&fit=crop&q=80',
    orderIndex: 6,
  },
  {
    name: 'Festive Combos',
    slug: 'festive-combos',
    description: 'Beautifully boxed gift hampers and celebration packs for Diwali, Holi, and Raksha Bandhan.',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=600&auto=format&fit=crop&q=80',
    orderIndex: 7,
  },
];

const sampleProducts = [
  {
    name: 'Nylon Khaman Dhokla',
    slug: 'nylon-khaman-dhokla',
    categorySlug: 'farsan',
    description: 'Ultra-soft, melt-in-the-mouth steamed gram flour sponge tempered with mustard seeds, curry leaves, and green chilies. Served with sweet tamarind and spicy green chutney.',
    price: 140,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Fresh morning & evening batches daily',
    isVeg: true,
  },
  {
    name: 'Silky Khandvi',
    slug: 'silky-khandvi',
    categorySlug: 'farsan',
    description: 'Delicate, paper-thin rolls made of spiced buttermilk and gram flour batter, tempered with toasted sesame seeds, mustard, fresh coriander, and grated coconut.',
    price: 160,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Prepared fresh 2 hours before dispatch',
    isVeg: true,
  },
  {
    name: 'Crispy Fafda & Papaya Sambharo',
    slug: 'crispy-fafda-papaya-sambharo',
    categorySlug: 'farsan',
    description: 'Authentic crunchy Gujarati fafda made using traditional wooden board technique. Accompanied by warm besan kadhi, raw grated papaya sambharo, and fried green chilies.',
    price: 220,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Freshly fried for every order',
    isVeg: true,
  },
  {
    name: 'Gujarati Steamed & Crisped Patra',
    slug: 'gujarati-steamed-crisped-patra',
    categorySlug: 'farsan',
    description: 'Fresh colocasia leaves layered with spiced sweet & sour gram flour paste, steamed to perfection and lightly sautéed with white sesame and mustard seeds.',
    price: 180,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: false,
    requiresAdvanceOrder: false,
    preparationTime: 'Same day fresh preparation',
    isVeg: true,
  },
  {
    name: 'Crispy Methi Gota (Dakori Gota)',
    slug: 'crispy-methi-gota-dakori-gota',
    categorySlug: 'farsan',
    description: 'Golden fried fenugreek fritters, crispy on the outer shell and fluffy soft inside, spiced with crushed black pepper and coriander seeds. Served with spicy curd chutney.',
    price: 150,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Made hot to order',
    isVeg: true,
  },
  {
    name: 'Winter Special Lilva Kachori',
    slug: 'winter-special-lilva-kachori',
    categorySlug: 'farsan',
    description: 'Flaky golden pastry shells stuffed with seasoned crushed tender green pigeon peas (tuvar lilva), ginger, and green chilies. A quintessential Gujarati winter delicacy.',
    price: 240,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1541544741938-0af808871cc0?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: true,
    preparationTime: 'Requires 4 hours advance order',
    isVeg: true,
  },
  {
    name: 'Mini Gujarati Cocktail Samosa',
    slug: 'mini-gujarati-cocktail-samosa',
    categorySlug: 'farsan',
    description: 'Bite-sized crispy triangular pastries filled with sweet & spicy potato, green peas, raisins, and cashew filling. Perfect for party starters and family teatime.',
    price: 200,
    unit: '12 pieces',
    image: 'https://images.unsplash.com/photo-1601050690597-df0568f70950?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: false,
    requiresAdvanceOrder: false,
    preparationTime: 'Fresh batch every 3 hours',
    isVeg: true,
  },
  {
    name: 'Nylon Sev (Fine Namkeen)',
    slug: 'nylon-sev-fine-namkeen',
    categorySlug: 'namkeen',
    description: 'Crisp, feather-light golden sev prepared with 100% pure chickpea flour and ground spices. Perfect topping for bhel, sev khamani, dahi vada, and poha.',
    price: 130,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1599488615731-7e5c2823ff28?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: false,
    requiresAdvanceOrder: false,
    preparationTime: 'Available in ready stock',
    isVeg: true,
  },
  {
    name: 'Bhavnagri Soft Gathiya',
    slug: 'bhavnagri-soft-gathiya',
    categorySlug: 'namkeen',
    description: 'Authentic Bhavnagar-style soft, aromatic gathiya made with pure hing (asafoetida), ajwain (carom seeds), and freshly cracked black pepper. The beloved tea-time companion.',
    price: 150,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1626777552726-4a6b54c97e46?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Fresh morning batch',
    isVeg: true,
  },
  {
    name: 'Crispy Butter Chakri (Chakli)',
    slug: 'crispy-butter-chakri',
    categorySlug: 'namkeen',
    description: 'Spiral crunchy savoury bites prepared with seasoned rice flour, white butter, roasted cumin, and sesame seeds. Extremely crunchy and non-greasy.',
    price: 180,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: false,
    requiresAdvanceOrder: false,
    preparationTime: 'Prepared in weekly small batches',
    isVeg: true,
  },
  {
    name: 'Homemade Methi Thepla (Pack of 15)',
    slug: 'homemade-methi-thepla',
    categorySlug: 'gujarati-snacks',
    description: 'Soft, aromatic flatbreads made with whole wheat flour, fresh fenugreek leaves, yogurt, sesame, and turmeric. Stays fresh for up to 3 days; ideal for travel and snacks.',
    price: 180,
    unit: '15 pieces',
    image: 'https://images.unsplash.com/photo-1589301760014-d929f3979dbc?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: false,
    preparationTime: 'Hand-rolled fresh on order',
    isVeg: true,
  },
  {
    name: 'Traditional Mohan Thal (Pure Ghee)',
    slug: 'traditional-mohan-thal-pure-ghee',
    categorySlug: 'sweets',
    description: 'Time-honoured Gujarati royal sweet made from slow-roasted coarse gram flour, A2 cow ghee, cardamom, mawa, saffron strands, and garnished with slivered almonds and pistachios.',
    price: 380,
    unit: '500 g',
    image: 'https://images.unsplash.com/photo-1546833999-b9f581a1996d?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: true,
    preparationTime: 'Requires 6 hours advance order',
    isVeg: true,
  },
  {
    name: 'Festive Deluxe Farsan & Sweet Box',
    slug: 'festive-deluxe-farsan-sweet-box',
    categorySlug: 'festive-combos',
    description: 'An elegant gift hamper packed in a gold-embossed box containing 250g Mohan Thal, 250g Silky Khandvi, 250g Bhavnagri Gathiya, 250g Butter Chakri, and sweet & spicy chutney bottles.',
    price: 850,
    unit: '1 box (1 kg)',
    image: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: true,
    preparationTime: 'Requires 24 hours advance booking',
    isVeg: true,
  },
  {
    name: 'Live High Tea Farsan Package (Per Head)',
    slug: 'live-high-tea-farsan-package',
    categorySlug: 'catering-packages',
    description: 'Complete high-tea catering menu including Nylon Khaman, Silky Khandvi, Methi Gota, Mini Samosa, Masala Chai, and Chutneys. Live counters available for 25+ guests.',
    price: 250,
    unit: 'per person',
    image: 'https://images.unsplash.com/photo-1555244162-803834f70033?w=700&auto=format&fit=crop&q=80',
    isAvailable: true,
    isFeatured: true,
    requiresAdvanceOrder: true,
    preparationTime: 'Requires catering enquiry confirmation',
    isVeg: true,
  },
];

const seedDatabase = async () => {
  try {
    console.log('[Seed] Connecting to MongoDB...');
    await mongoose.connect(MONGODB_URI);
    console.log('[Seed] Connected.');

    // 1. Seed or Update Admin Account
    const adminEmail = (process.env.ADMIN_EMAIL || 'admin@shreejifarsan.com').toLowerCase().trim();
    const adminPassword = process.env.ADMIN_PASSWORD || 'Admin@Farsan2026!';
    const adminName = process.env.ADMIN_NAME || 'Shreeji Admin';

    let admin = await Admin.findOne({ email: adminEmail });
    if (!admin) {
      admin = new Admin({
        name: adminName,
        email: adminEmail,
        password: adminPassword,
        role: 'superadmin',
      });
      await admin.save();
      console.log(`[Seed] Created admin account: ${adminEmail} (password: ${adminPassword})`);
    } else {
      console.log(`[Seed] Admin account ${adminEmail} already exists.`);
    }

    // 2. Seed or Update BusinessSettings
    let settings = await BusinessSettings.findOne();
    if (!settings) {
      settings = await BusinessSettings.create({
        businessName: 'Shreeji Homemade Farsan & Catering',
        tagline: 'Authentic Gujarati Farsan & Homemade Catering, Made Fresh with Love',
        contactPhone: '+91 98765 43210',
        whatsappPhone: '919876543210',
        email: 'contact@shreejifarsan.com',
        notificationEmail: adminEmail,
        address: 'A-12, Ambica Krupa Society, Near Jain Temple, Subhash Chowk',
        city: 'Ahmedabad, Gujarat 380052',
        serviceAreas: ['Navrangpura', 'Paldi', 'Satellite', 'Bodakdev', 'Vastrapur', 'Naranpura', 'Ghatlodia', 'Ellisbridge', 'Thaltej', 'Maninagar'],
        businessHours: 'Monday - Sunday: 8:00 AM - 9:00 PM',
        minimumOrderAmount: 200,
        deliveryFee: 40,
        freeDeliveryThreshold: 800,
        advanceBookingHours: 4,
        isStoreOpen: true,
      });
      console.log('[Seed] Created default business settings.');
    } else {
      console.log('[Seed] Business settings already exist.');
    }

    // 3. Seed Categories
    console.log('[Seed] Seeding categories...');
    const categoryMap = {};
    for (const cat of categoriesData) {
      let doc = await Category.findOne({ slug: cat.slug });
      if (!doc) {
        doc = await Category.create(cat);
      } else {
        doc = await Category.findByIdAndUpdate(doc._id, cat, { new: true });
      }
      categoryMap[cat.slug] = doc._id;
    }
    console.log(`[Seed] ${Object.keys(categoryMap).length} categories synced.`);

    // 4. Seed Products
    console.log('[Seed] Seeding products...');
    let seededCount = 0;
    for (const item of sampleProducts) {
      const categoryId = categoryMap[item.categorySlug];
      if (!categoryId) continue;

      const productPayload = {
        name: item.name,
        slug: item.slug,
        description: item.description,
        price: item.price,
        unit: item.unit,
        category: categoryId,
        image: item.image,
        isAvailable: item.isAvailable,
        isFeatured: item.isFeatured,
        requiresAdvanceOrder: item.requiresAdvanceOrder,
        preparationTime: item.preparationTime,
        isVeg: item.isVeg,
      };

      const existingProd = await Product.findOne({ slug: item.slug });
      if (!existingProd) {
        await Product.create(productPayload);
        seededCount++;
      } else {
        await Product.findByIdAndUpdate(existingProd._id, productPayload);
      }
    }
    console.log(`[Seed] Seeded/updated ${sampleProducts.length} authentic Gujarati farsan products.`);

    console.log('----------------------------------------------------');
    console.log('✅ DATABASE SEEDING COMPLETED SUCCESSFULLY!');
    console.log(`   Admin Login: ${adminEmail}`);
    console.log(`   Admin Pass : ${adminPassword}`);
    console.log('----------------------------------------------------');
    process.exit(0);
  } catch (err) {
    console.error('[Seed Error]:', err);
    process.exit(1);
  }
};

seedDatabase();
