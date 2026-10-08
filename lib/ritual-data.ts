export interface RitualCeremony {
  name: string;
  duration: string;
  timing: string;
  items: string;
  meaning: string;
}

export const RITUAL_CATEGORIES = [
  { id: "wedding", label: "Wedding" },
  { id: "baby", label: "New Baby" },
  { id: "home", label: "New Home" },
  { id: "business", label: "New Business" },
  { id: "milestone", label: "Milestones" },
  { id: "remembrance", label: "Remembrance" },
] as const;

export const RITUALS: Record<string, RitualCeremony[]> = {
  wedding: [
    { name: "Vivah", duration: "4–6 hours", timing: "Muhurat-based, often evening", items: "Mandap, sacred fire, garlands, sindoor, mangalsutra", meaning: "Full wedding ceremony with pheras around the sacred fire, binding vows, and family blessings." },
    { name: "Ganesh Sthapana", duration: "30 minutes", timing: "Start of wedding events", items: "Ganesh murti, flowers, modak, kumkum", meaning: "Invocation of Lord Ganesh to remove obstacles and bless the wedding proceedings." },
    { name: "Mandap Muhurat", duration: "1 hour", timing: "Day before or morning of wedding", items: "Bamboo poles, cloth, mango leaves, coconut", meaning: "Ceremonial erection and blessing of the wedding canopy where vows will be taken." },
    { name: "Kanyadaan", duration: "30 minutes", timing: "During vivah ceremony", items: "Water, flowers, sacred thread", meaning: "The father entrusts his daughter to the groom, symbolizing the highest form of dana (giving)." },
    { name: "Saptapadi", duration: "30 minutes", timing: "Core of vivah ceremony", items: "Sacred fire, rice, ghee", meaning: "Seven steps taken together around the sacred fire, each step a vow for the marriage." },
    { name: "Griha Shanti", duration: "1.5 hours", timing: "Day after wedding", items: "Kalash, havan samagri, new clothes", meaning: "Post-wedding blessing of the couple's new home and married life." },
    { name: "Vidaai", duration: "30 minutes", timing: "End of wedding", items: "Rice, coconut, red chunni", meaning: "Emotional farewell as the bride departs her parents' home to begin her new life." },
  ],
  baby: [
    { name: "Namkaran", duration: "1 hour", timing: "11th or 12th day after birth", items: "Cradle, new clothes, honey, ghee", meaning: "Naming ceremony. The child receives their formal name through Vedic rites." },
    { name: "Annaprashan", duration: "45 minutes", timing: "6th month", items: "Silver bowl and spoon, kheer, rice", meaning: "First solid food. The baby is fed kheer or rice by the family elder." },
    { name: "Jatakarma", duration: "30 minutes", timing: "Immediately after birth", items: "Honey, ghee, gold ring", meaning: "Birth rites welcoming the newborn into the world with sacred mantras." },
    { name: "Nishkramana", duration: "30 minutes", timing: "4th month", items: "New clothes, flowers, tilak", meaning: "First outing. The baby is taken outside for the first time to see the sun and moon." },
    { name: "Mundan", duration: "1 hour", timing: "1st or 3rd year", items: "Razor, coconut, turmeric paste, new cap", meaning: "First head-shaving ceremony. Removes birth hair and symbolizes purification." },
    { name: "Karnavedha", duration: "30 minutes", timing: "3rd or 5th year", items: "Gold needle, turmeric, sandalwood", meaning: "Ear-piercing ceremony for both boys and girls, believed to ward off diseases." },
    { name: "Aksharabhyasam", duration: "45 minutes", timing: "Age 3–5, on Vijayadashami", items: "Slate, chalk, rice tray, gold ring", meaning: "First writing lesson. The child traces letters in rice, marking the start of education." },
  ],
  home: [
    { name: "Griha Pravesh", duration: "2.5 hours", timing: "Morning, muhurat-based", items: "Kalash, coconut, mango leaves, havan samagri", meaning: "First entry into a new home. Invokes blessings for prosperity and protection." },
    { name: "Vastu Shanti", duration: "2 hours", timing: "Before or after Griha Pravesh", items: "Vastu yantra, grains, colored powders", meaning: "Pacifies the Vastu devtas. Performed to correct or bless the directional energies of the home." },
    { name: "Bhoomi Puja", duration: "1.5 hours", timing: "Before construction begins", items: "Bricks, coconut, flowers, navadhanya", meaning: "Ground-breaking ceremony seeking permission and blessings from the earth before building." },
    { name: "Dwar Puja", duration: "45 minutes", timing: "During Griha Pravesh", items: "Turmeric, kumkum, mango leaves, toran", meaning: "Door worship to invite Lakshmi and positive energy into the home." },
    { name: "Shanti Path", duration: "1 hour", timing: "After moving in", items: "Havan samagri, ghee, sesame seeds", meaning: "Peace invocation recited to bring calm, harmony, and divine protection to the new dwelling." },
    { name: "Navagraha Shanti", duration: "2 hours", timing: "Muhurat-based", items: "Nine grains, nine cloths, havan samagri", meaning: "Appeasement of the nine celestial bodies to ensure planetary harmony for the household." },
    { name: "Satyanarayan Katha", duration: "1.5 hours", timing: "Purnima (full moon) preferred", items: "Panchamrut, fruits, tulsi, sapari", meaning: "Devotional story and worship expressing gratitude and seeking continued blessings for the home." },
  ],
  business: [
    { name: "Lakshmi Ganesh Pooja", duration: "1.5 hours", timing: "Morning, auspicious day", items: "Ganesh and Lakshmi murtis, flowers, sweets", meaning: "Invoking Ganesh to remove obstacles and Lakshmi for prosperity in a new business." },
    { name: "Satyanarayan Katha", duration: "1.5 hours", timing: "Purnima (full moon) preferred", items: "Panchamrut, fruits, tulsi, sapari", meaning: "Devotional katha expressing gratitude and seeking blessings for continued success." },
    { name: "Dukan Muhurat", duration: "1 hour", timing: "Auspicious muhurat", items: "Coconut, flowers, incense, new account book", meaning: "Shop or office opening ceremony with first transaction blessings and account book inauguration." },
    { name: "Chopda Pujan", duration: "45 minutes", timing: "Diwali", items: "New account books, pen, kumkum, sweets", meaning: "Worship of business ledgers on Diwali, marking the start of the new financial year." },
    { name: "Havan for Success", duration: "1.5 hours", timing: "Any auspicious day", items: "Havan kund, ghee, samagri, flowers", meaning: "Fire ritual invoking divine support for business growth, partnership, or new ventures." },
    { name: "Vastu Shanti (Office)", duration: "2 hours", timing: "Before or after setup", items: "Vastu yantra, grains, colored powders", meaning: "Vastu correction for office or commercial space to align energies for productivity." },
    { name: "Navchandi Yagna", duration: "3 hours", timing: "Navaratri or muhurat-based", items: "Havan kund, nine types of offerings, flowers", meaning: "Powerful group fire ritual for major business milestones or to overcome significant challenges." },
  ],
  milestone: [
    { name: "Satyanarayan Katha", duration: "1.5 hours", timing: "Purnima (full moon) preferred", items: "Panchamrut, fruits, tulsi, sapari", meaning: "Celebrated for graduations, promotions, anniversaries, and answered prayers." },
    { name: "Ayush Homam", duration: "2 hours", timing: "Birthday, morning", items: "Havan samagri, herbal offerings, ghee", meaning: "A fire ritual invoking longevity and health, often performed on milestone birthdays." },
    { name: "Upanayana", duration: "3 hours", timing: "Age 7–12, muhurat-based", items: "Sacred thread (janeu), staff, deer skin, girdle", meaning: "Sacred thread ceremony marking the beginning of formal education and spiritual life." },
    { name: "Shashtipoorthi", duration: "2.5 hours", timing: "60th birthday", items: "New clothes, flowers, kalash, havan samagri", meaning: "Diamond jubilee celebration re-performing wedding rites to renew vows and bless longevity." },
    { name: "Vidyarambha", duration: "1 hour", timing: "Before school or college begins", items: "Books, pen, lamp, flowers", meaning: "Blessing for the start of a new educational chapter — college, grad school, or professional study." },
    { name: "Sankalp Pooja", duration: "1 hour", timing: "Any significant decision point", items: "Kalash, flowers, rice, turmeric", meaning: "A resolve ceremony where one formally declares an important life intention before the divine." },
    { name: "Navagraha Shanti", duration: "2 hours", timing: "Muhurat-based", items: "Nine grains, nine cloths, havan samagri", meaning: "Planetary appeasement for milestone transitions — new phase of life, health recovery, or fresh start." },
  ],
  remembrance: [
    { name: "Shraddh", duration: "1.5 hours", timing: "Pitru Paksha or annual tithi", items: "Til, kusha grass, pind ingredients", meaning: "Annual ceremony honoring departed ancestors. Offerings of food and prayers for their peace." },
    { name: "Antim Sanskar", duration: "2–3 hours", timing: "As soon as possible after death", items: "Ghee, sandalwood, camphor, white cloth", meaning: "Final rites and cremation ceremony. The body is offered to Agni with Vedic mantras." },
    { name: "Tehravi", duration: "2 hours", timing: "13th day after death", items: "Flowers, food offerings, new clothes for donation", meaning: "Thirteenth-day ceremony concluding the mourning period with community prayers and a shared meal." },
    { name: "Pind Daan", duration: "1 hour", timing: "During Shraddh or at Gaya", items: "Rice balls, sesame, barley, kusha grass", meaning: "Offering of rice balls representing the deceased, helping the soul transition peacefully." },
    { name: "Asthi Visarjan", duration: "30 minutes", timing: "3rd or 4th day after cremation", items: "Urn with ashes, flowers, milk", meaning: "Immersion of ashes in a holy river, releasing the soul's earthly remains to sacred waters." },
    { name: "Narayan Bali", duration: "3 hours", timing: "Specific muhurat, at temple", items: "Special havan samagri, effigy materials", meaning: "Advanced ritual for souls who departed under unfortunate circumstances, ensuring their peaceful passage." },
    { name: "Varshi Shraddh", duration: "1 hour", timing: "Annual death anniversary", items: "Food, til, kusha grass, flowers", meaning: "Yearly remembrance ceremony on the exact tithi, maintaining the connection with departed loved ones." },
  ],
};
