// Adds the 16 new Sai-calendar festivals to data/festivals.json (English now;
// Telugu/Tamil/Hindi added next — the app falls back to English meanwhile).
//
// ALL of this text — stories, "why", quizzes, and especially the shlokas — is
// UNVERIFIED and drafted from widely-known tradition. It MUST be reviewed by a
// priest/elder (see docs/REVIEW_CHECKLIST.md) before being treated as final.
// The Sai Vigraha Pratishtha story is intentionally general: the temple should
// fill in its own idol-installation date and story.
//
// Quiz convention: options are written [correct, wrong, wrong] with answer 0;
// the app shuffles option and question order at runtime.

import { readFile, writeFile } from 'node:fs/promises';
import { resolve, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const file = resolve(root, 'data', 'festivals.json');
const data = JSON.parse(await readFile(file, 'utf8'));

// [id, title, subtitle, story, rituals, importance,
//  shlokaOriginal, transliteration, meaning, quiz[[q,correct,w1,w2]...]]
const NEW = [
  [
    'vasanthpanchami',
    'Vasant Panchami',
    'The day we honour Goddess Saraswati',
    'Vasant Panchami welcomes spring and honours Goddess Saraswati, the goddess of learning, music, and the arts. On this bright day people wear yellow, the colour of the ripening fields and of the returning warmth of the sun. It is considered one of the best days to begin something new, so young children are often taught to write their first letters, and students place their books before the goddess for her blessing.',
    'The temple offers special prayers to Saraswati with yellow flowers and sweets, and devotees place books, pens, and musical instruments before her to be blessed.',
    'We celebrate Vasant Panchami to ask Goddess Saraswati for wisdom and a love of learning, and to remember that knowledge, shared and practised with devotion, is one of life’s greatest gifts. Beginning something new on this day is a way of starting it with her blessing.',
    'सरस्वति नमस्तुभ्यं वरदे कामरूपिणि ।\nविद्यारम्भं करिष्यामि सिद्धिर्भवतु मे सदा ॥',
    'Sarasvati Namastubhyam Varade Kaamaroopini,\nVidyaarambham Karishyaami Siddhir Bhavatu Me Sadaa',
    'Salutations to you, Goddess Saraswati, giver of boons, who can take any form. As I begin my learning, may success always be mine.',
    [
      [
        'Which goddess is honoured on Vasant Panchami?',
        'Goddess Saraswati',
        'Goddess Lakshmi',
        'Goddess Durga',
      ],
      ['Which colour is traditionally worn?', 'Yellow', 'Black', 'Blue'],
      [
        'What do students place before the goddess?',
        'Books and instruments',
        'Toys',
        'Coins',
      ],
      ['Vasant Panchami welcomes which season?', 'Spring', 'Winter', 'Monsoon'],
    ],
  ],
  [
    'rathasaptami',
    'Ratha Saptami',
    'The Sun turns his chariot toward brighter days',
    'Ratha Saptami marks the day the Sun God, Surya, turns his mighty chariot — drawn by seven horses — toward the northern sky, bringing longer, warmer days. The seven horses are lovingly said to stand for the seven colours of light and the seven days of the week. It is celebrated as the Sun’s birthday and as a thank-you to the source of all light, warmth, and life.',
    'Devotees bathe early in the morning, and the temple performs a special Surya (Sun) puja at sunrise, with lamps and offerings made facing the rising sun.',
    'We celebrate Ratha Saptami to thank the Sun for the light and warmth that let crops grow and life flourish, and to welcome the healthy, hopeful days ahead. It reminds us to begin each day with gratitude, like greeting the sunrise.',
    'जपाकुसुमसंकाशं काश्यपेयं महाद्युतिम् ।\nतमोऽरिं सर्वपापघ्नं प्रणतोऽस्मि दिवाकरम् ॥',
    'Japaakusuma-sankaasham Kaashyapeyam Mahaadyutim,\nTamo’rim Sarva-paapaghnam Pranato’smi Divaakaram',
    'I bow to the Sun, the maker of day, glowing like a hibiscus flower, of great brilliance, the enemy of darkness who removes all wrong.',
    [
      ['How many horses draw Surya’s chariot?', 'Seven', 'Three', 'Ten'],
      [
        'Ratha Saptami is celebrated as whose “birthday”?',
        'The Sun (Surya)',
        'The Moon',
        'Agni',
      ],
      [
        'When is the special puja performed?',
        'At sunrise',
        'At midnight',
        'At noon',
      ],
      [
        'The seven horses are said to stand for?',
        'The seven colours of light',
        'Seven rivers',
        'Seven mountains',
      ],
    ],
  ],
  [
    'thaipoosam',
    'Thai Poosam',
    'Lord Murugan and the divine spear',
    'Thai Poosam is celebrated in the Tamil month of Thai, on the day of the Poosam star. It remembers the day Goddess Parvati gave her son Lord Murugan a powerful spear, the Vel, to defeat a demon troubling the world. Because Murugan won with courage and his mother’s blessing, devotees joyfully celebrate his victory of good over evil.',
    'Devotees carry beautifully decorated kavadis (arched offerings) on their shoulders as an act of devotion, and the temple honours Murugan with special abhishekam and prayers, chanting “Vel Vel Muruga”.',
    'We celebrate Thai Poosam to remember that courage, guided by love and a good purpose, can overcome any difficulty. Carrying the kavadi is a way of offering our effort and hardship to God with gladness.',
    'ॐ शरवणभवाय नमः ॥',
    'Om Sharavana-bhavaaya Namaha',
    'Salutations to Lord Murugan, born in the reeds of the Saravana lake.',
    [
      ['What did Parvati give Murugan?', 'The Vel (spear)', 'A bow', 'A mace'],
      [
        'What do devotees carry on Thai Poosam?',
        'Kavadi',
        'Umbrellas',
        'Flags',
      ],
      ['Murugan is the son of?', 'Shiva and Parvati', 'Vishnu', 'Brahma'],
      ['In which Tamil month is Thai Poosam?', 'Thai', 'Aadi', 'Margazhi'],
    ],
  ],
  [
    'holi',
    'Holi',
    'The festival of colours',
    'Holi celebrates the arrival of spring and the victory of good over evil. A well-loved story tells of the boy Prahlada, whose faith in Lord Vishnu was so strong that even the fire meant to harm him could not, and it was the wicked Holika who was undone instead. The next day people played with colours in joy — and ever since, Holi has been a day of colour, laughter, and forgiveness.',
    'The evening before, a bonfire (Holika Dahan) is lit to mark good winning over evil. The next day people playfully colour one another and share sweets, and the temple offers prayers, sometimes offering colours to the deity too.',
    'We celebrate Holi to welcome spring, to let go of old quarrels, and to enjoy the happy truth that goodness and faith are protected. The colours remind us that everyone, whatever their differences, can laugh and play together as one family.',
    'ॐ नमो भगवते वासुदेवाय ॥',
    'Om Namo Bhagavate Vaasudevaaya',
    'Salutations to Lord Vasudeva (Vishnu), who dwells within all beings.',
    [
      ['Holi is best known as the festival of?', 'Colours', 'Lights', 'Kites'],
      [
        'Whose faith was protected from the fire?',
        'Prahlada',
        'Ravana',
        'Kamsa',
      ],
      [
        'What is lit the evening before?',
        'A bonfire (Holika Dahan)',
        'A row of lamps',
        'Fireworks only',
      ],
      ['Holi welcomes which season?', 'Spring', 'Winter', 'Monsoon'],
    ],
  ],
  [
    'panguniuthiram',
    'Panguni Uthiram',
    'The birthday of Lord Ayyappa',
    'Panguni Uthiram falls in the Tamil month of Panguni, on the day of the Uthiram star, under a bright full moon. At this temple it is celebrated as the birthday of Lord Ayyappa — the son of Shiva and of Vishnu in the form of Mohini — who grew up to be a great protector and a guide to everyone who seeks him with a sincere heart, whatever their background.',
    'The temple holds special abhishekam and prayers for Lord Ayyappa, with devotees chanting “Swamiye Sharanam Ayyappa” and offering flowers and lamps.',
    'We celebrate Panguni Uthiram to honour Lord Ayyappa’s birth and to remember that the divine welcomes everyone equally. It reminds us that devotion and good conduct matter far more than where we come from.',
    'लोकवीरं महापूज्यं सर्वरक्षाकरं विभुम् ।\nपार्वतीहृदयानन्दं शास्तारं प्रणमाम्यहम् ॥',
    'Lokaveeram Mahaapoojyam Sarva-rakshaakaram Vibhum,\nPaarvatee-hridayaanandam Shaastaaram Pranamaamyaham',
    'I bow to Lord Ayyappa (Shasta), hero of the world, greatly worshipped, protector of all, the joy of Parvati’s heart.',
    [
      [
        'At this temple, Panguni Uthiram marks the birthday of?',
        'Lord Ayyappa',
        'Lord Rama',
        'Lord Ganesha',
      ],
      [
        'Lord Ayyappa welcomes devotees of?',
        'Every background',
        'One region only',
        'Only kings',
      ],
      [
        'What do devotees chant?',
        'Swamiye Sharanam Ayyappa',
        'Jai Sri Ram',
        'Om Namah Shivaya',
      ],
      ['In which Tamil month does it fall?', 'Panguni', 'Thai', 'Aadi'],
    ],
  ],
  [
    'shanitrayodasi',
    'Shani Trayodasi',
    'A day of prayer to Lord Shani',
    'Shani Trayodasi comes when the thirteenth day of the moon (Trayodasi) falls on a Saturday, the day of Lord Shani (Saturn). Shani is known as a strict but fair teacher who watches our actions and gently guides us to live honestly and patiently. Praying to him is a way of asking for the strength to face difficulties calmly and to keep doing what is right.',
    'Devotees light lamps with sesame (til) oil and offer black sesame and dark flowers, and the temple performs a special oil abhishekam for Lord Shani with his prayers.',
    'We observe Shani Trayodasi to ask for patience, honesty, and courage in hard times, and to remember that difficulties, met with a steady heart, help us grow. Shani reminds us that fair, honest effort is always noticed.',
    'नीलाञ्जनसमाभासं रविपुत्रं यमाग्रजम् ।\nछायामार्तण्डसम्भूतं तं नमामि शनैश्चरम् ॥',
    'Neelaanjana-samaabhaasam Ravi-putram Yamaagrajam,\nChhaayaa-maartaanda-sambhootam Tam Namaami Shanaishcharam',
    'I bow to Lord Shani, dark like blue collyrium, son of the Sun and elder brother of Yama, born of Chhaya and the Sun.',
    [
      [
        'Shani Trayodasi falls on which weekday?',
        'Saturday',
        'Monday',
        'Friday',
      ],
      [
        'Shani is often described as a strict but?',
        'Fair teacher',
        'Angry king',
        'Playful child',
      ],
      [
        'Which oil is used for the lamps and abhishekam?',
        'Sesame (til) oil',
        'Ghee only',
        'Coconut water',
      ],
      ['Lord Shani is the son of?', 'The Sun (Surya)', 'The Moon', 'Agni'],
    ],
  ],
  [
    'adikrithika',
    'Adi Krithika',
    'Lord Murugan’s star day in the month of Aadi',
    'Adi Krithika is celebrated in the Tamil month of Aadi, on the day of the Krithika star, which is specially linked to Lord Murugan. The six Krithika stars are lovingly remembered as the six mothers who cared for the infant Murugan, whose six faces watch over the world. It is a day of lamps, gratitude, and devotion to Murugan.',
    'The temple lights rows of lamps and performs special abhishekam and prayers to Lord Murugan, and devotees offer flowers and sing his praises.',
    'We celebrate Adi Krithika to honour Lord Murugan and the loving care that raised him, and to ask for his protection and courage. The many lamps remind us to carry light and goodness into the world.',
    'षडाननं कुङ्कुमरक्तवर्णं महामतिं दिव्यमयूरवाहनम् ।\nरुद्रस्य सूनुं सुरलोकनाथं ब्रह्मण्यदेवं शरणं प्रपद्ये ॥',
    'Shadaananam Kunkuma-rakta-varnam Mahaamatim Divya-mayoora-vaahanam,\nRudrasya Soonum Suraloka-naatham Brahmanya-devam Sharanam Prapadye',
    'I take refuge in the six-faced Lord Murugan, red like kumkum, of great wisdom, who rides the divine peacock, son of Shiva and lord of the gods.',
    [
      [
        'Adi Krithika honours which deity?',
        'Lord Murugan',
        'Lord Rama',
        'Lord Shani',
      ],
      [
        'The Krithika stars are remembered as Murugan’s?',
        'Six mothers',
        'Six brothers',
        'Six teachers',
      ],
      ['How many faces does Murugan have?', 'Six', 'Two', 'Ten'],
      ['In which Tamil month is it?', 'Aadi', 'Thai', 'Panguni'],
    ],
  ],
  [
    'saivigrahaprathista',
    'Sai Vigraha Pratishtha Varshikotsavam',
    'The anniversary of installing Sai Baba’s idol',
    'This festival is the yearly celebration of the day the sacred idol (vigraha) of Shirdi Sai Baba was installed and consecrated in this temple. Sai Baba lived simply in Shirdi, teaching everyone — of every faith — to live with love, patience, and charity, and to trust that “Sabka Malik Ek”: one God watches over all. Installing his idol brought his loving presence into this temple for the whole community to gather around.',
    'The temple holds special abhishekam, alankaram (decoration), and prayers before Sai Baba’s idol, with bhajans and the Sai arati, and prasadam is shared with all who come.',
    'We celebrate this day to give thanks for Sai Baba’s presence in our temple and to renew his teachings — love for all beings, patience in trouble, and faith. It reminds us that everyone is welcome at his feet.',
    'ॐ श्री साईनाथाय नमः ॥',
    'Om Shri Sai-naathaaya Namaha',
    'Salutations to Lord Sainath, Shirdi Sai Baba.',
    [
      [
        'This festival marks the installation of?',
        'Sai Baba’s idol',
        'A new bell',
        'A garden',
      ],
      [
        '“Sabka Malik Ek” means?',
        'One God watches over all',
        'Only one temple',
        'Only one language',
      ],
      ['Where did Sai Baba live?', 'Shirdi', 'Tirupati', 'Kashi'],
      [
        'Who is welcome at Sai Baba’s feet?',
        'Everyone, of every faith',
        'Only elders',
        'Only priests',
      ],
    ],
  ],
  [
    'varalakshmi',
    'Vara Lakshmi Vratham',
    'A vow to Goddess Lakshmi for the family’s well-being',
    'Vara Lakshmi Vratham is a special vow (vratham) kept mainly by women, honouring Goddess Vara Lakshmi, the giver of boons. “Vara” means a boon, and it is believed that worshipping her on this Friday brings the blessings of all eight forms of Lakshmi — health, wealth, courage, knowledge, food, victory, family, and prosperity — into the home.',
    'A pot (kalasham) is lovingly decorated as the goddess and worshipped with flowers, turmeric, and sweets. Women tie a sacred yellow thread, pray for their families, and share the prasadam.',
    'We keep Vara Lakshmi Vratham to pray for the health and happiness of our loved ones, and to remember that true prosperity is far more than money — it is a home full of health, learning, courage, and care.',
    'नमस्तेऽस्तु महामाये श्रीपीठे सुरपूजिते ।\nशङ्खचक्रगदाहस्ते महालक्ष्मि नमोऽस्तु ते ॥',
    'Namaste’stu Mahaamaaye Shreepeethe Sura-poojite,\nShankha-chakra-gadaa-haste Mahaalakshmi Namo’stu Te',
    'Salutations to you, great Goddess Mahalakshmi, seated on the sacred lotus, worshipped by the gods, holding the conch, discus, and mace.',
    [
      ['“Vara” means?', 'A boon', 'A river', 'A song'],
      [
        'Who mainly keeps this vow?',
        'Women, for their families',
        'Only kings',
        'Only children',
      ],
      [
        'What is decorated as the goddess?',
        'A pot (kalasham)',
        'A chariot',
        'A tree',
      ],
      [
        'Vara Lakshmi blesses a home with?',
        'Health, knowledge, courage and more',
        'Only gold',
        'Only rain',
      ],
    ],
  ],
  [
    'thiruonam',
    'Thiru Onam',
    'The homecoming of the good King Mahabali',
    'Onam is a joyful harvest festival, best loved in Kerala. It remembers the good and generous King Mahabali, whose people were so happy that even the gods took notice. Lord Vishnu came as a small boy, Vamana, and in a famous story sent Mahabali to a realm below — but granted him one visit home each year. Onam is that homecoming, when people welcome their beloved king with flowers and feasts.',
    'Families lay beautiful flower carpets (pookalam) at their doorstep to welcome King Mahabali, prepare a grand feast (sadhya) on a banana leaf, and the temple offers special prayers to Vishnu (Vamana).',
    'We celebrate Onam to honour a king who ruled with fairness and generosity, and to welcome the spirit of a happy, equal community. It reminds us that a good leader and a giving heart are never forgotten.',
    'ॐ नमो भगवते वासुदेवाय ॥',
    'Om Namo Bhagavate Vaasudevaaya',
    'Salutations to Lord Vasudeva (Vishnu), who dwells within all beings.',
    [
      [
        'Onam welcomes which king home?',
        'King Mahabali',
        'King Ravana',
        'King Dasharatha',
      ],
      ['As whom did Vishnu appear?', 'Vamana, a small boy', 'A lion', 'A fish'],
      ['What flower carpet is made?', 'Pookalam', 'A kite display', 'Sand art'],
      ['Onam is especially loved in?', 'Kerala', 'Punjab', 'Bengal'],
    ],
  ],
  [
    'rakshabandhan',
    'Raksha Bandhan',
    'The bond of love and protection',
    'Raksha Bandhan celebrates the loving bond between brothers and sisters, and between all who care for one another. On this full-moon day a sister ties a sacred thread (rakhi) on her brother’s wrist, praying for his well-being, and the brother promises to protect and support her. The name itself means “the bond (bandhan) of protection (raksha)”.',
    'Sisters tie the rakhi and offer sweets, and families exchange good wishes. In the temple a sacred thread is also offered to the deity, asking protection for all.',
    'We celebrate Raksha Bandhan to honour the promise to care for and protect one another. It reminds us that love shown in small, faithful ways — a thread, a wish, a promise kept — is what holds families and friends together.',
    'येन बद्धो बली राजा दानवेन्द्रो महाबलः ।\nतेन त्वामनुबध्नामि रक्षे मा चल मा चल ॥',
    'Yena Baddho Balee Raajaa Daanavendro Mahaabalah,\nTena Tvaam-anubadhnaami Rakshe Maa Chala Maa Chala',
    'By the very bond with which the mighty King Bali was once bound, I bind you, O protecting thread; do not waver, do not waver.',
    [
      [
        'What does a sister tie on her brother’s wrist?',
        'A rakhi (sacred thread)',
        'A ring',
        'A flower',
      ],
      [
        '“Raksha Bandhan” means the bond of?',
        'Protection',
        'Wealth',
        'Victory',
      ],
      [
        'What does the brother promise?',
        'To protect and support',
        'To give gold',
        'To travel far',
      ],
      [
        'It celebrates the bond between?',
        'Brothers and sisters',
        'Only kings',
        'Only teachers',
      ],
    ],
  ],
  [
    'sharadnavaratri',
    'Sharad Navaratri',
    'Nine nights honouring the Goddess',
    'Sharad Navaratri is nine nights of devotion to Goddess Durga in her many forms — powerful, protecting, and full of light. Long ago a demon named Mahishasura could not be defeated by any god alone, so the gods’ combined energies became the mighty Goddess Durga, riding a lion. For nine nights she battled him, and on the tenth day she won — showing that goodness, when united, always overcomes evil.',
    'For nine nights the temple honours the Goddess in her different forms with special decorations and daily puja. Homes display rows of dolls (golu / bommai kolu), and devotees sing and dance in her praise.',
    'We celebrate Sharad Navaratri to honour the Goddess’s strength and to remember that many good people standing together can overcome even the hardest evil. Each night invites us to grow braver, kinder, and wiser.',
    'या देवी सर्वभूतेषु शक्तिरूपेण संस्थिता ।\nनमस्तस्यै नमस्तस्यै नमस्तस्यै नमो नमः ॥',
    'Yaa Devi Sarva-bhooteshu Shakti-roopena Samsthitaa,\nNamas-tasyai Namas-tasyai Namas-tasyai Namo Namah',
    'To the Goddess who dwells in all beings as power — to her we bow, again and again and again.',
    [
      ['How many nights is Navaratri?', 'Nine', 'Three', 'Seven'],
      ['Which demon did Durga defeat?', 'Mahishasura', 'Ravana', 'Kamsa'],
      [
        'Durga’s power came from?',
        'The combined energy of the gods',
        'A single weapon',
        'One magic spell',
      ],
      [
        'What do many homes display?',
        'Rows of dolls (golu)',
        'Kites',
        'Bonfires',
      ],
    ],
  ],
  [
    'saraswatipuja',
    'Saraswati Puja',
    'Honouring the goddess of knowledge during Navaratri',
    'Saraswati Puja, near the end of Navaratri, worships Goddess Saraswati, the goddess of knowledge, music, and the arts. On this day students and artists place their books, pens, and instruments before the goddess and let them rest, trusting that learning is a gift from her. It is a day to give thanks for the joy of knowing and creating.',
    'Books, musical instruments, and tools of learning are placed before Saraswati and worshipped, and the temple offers special prayers, often with white and yellow flowers.',
    'We celebrate Saraswati Puja to thank the goddess for the gift of knowledge and to promise to use our learning wisely and kindly. It reminds us that studying and creating, done with devotion, are themselves a form of worship.',
    'या कुन्देन्दुतुषारहारधवला या शुभ्रवस्त्रावृता ।\nया वीणावरदण्डमण्डितकरा या श्वेतपद्मासना ॥',
    'Yaa Kundendu-tushaara-haara-dhavalaa Yaa Shubhra-vastraavritaa,\nYaa Veenaa-vara-danda-mandita-karaa Yaa Shweta-padmaasanaa',
    'She who is white as the jasmine, the moon, and snow, clothed in pure white, her hands graced by the veena, seated on a white lotus — Goddess Saraswati.',
    [
      ['Saraswati is the goddess of?', 'Knowledge and the arts', 'War', 'Rain'],
      [
        'What do students place before her?',
        'Books and instruments',
        'Coins',
        'Toys',
      ],
      ['Saraswati Puja is celebrated during?', 'Navaratri', 'Diwali', 'Holi'],
      [
        'Which flower colours are common?',
        'White and yellow',
        'Only red',
        'Only black',
      ],
    ],
  ],
  [
    'karthikapoornima',
    'Karthika Poornima',
    'The full-moon festival of lamps',
    'Karthika Poornima is the full-moon day of the holy month of Karthika, one of the brightest and most sacred nights of the year. It is linked to Lord Shiva, who on this day is said to have protected the world from a great evil, and it is dear to devotees of Vishnu and Murugan too. People light row upon row of lamps, so the whole night glows with tiny flames.',
    'Devotees light many lamps in the temple and by rivers, offer special prayers, and some float little lamps on water. The temple performs abhishekam and lights a tall lamp in the Lord’s honour.',
    'We celebrate Karthika Poornima to fill the darkest season with light and to thank God for protecting the world from evil. Each lamp is a small promise to carry light, hope, and goodness wherever we go.',
    'ॐ नमः शिवाय ॥',
    'Om Namah Shivaaya',
    'Salutations to Lord Shiva.',
    [
      [
        'Karthika Poornima falls on which moon day?',
        'Full moon',
        'New moon',
        'Half moon',
      ],
      [
        'What do people light in large numbers?',
        'Lamps',
        'Only fireworks',
        'Only candles',
      ],
      ['It is especially linked to which Lord?', 'Shiva', 'Brahma', 'Indra'],
      [
        'The lamps stand for?',
        'Light, hope, and goodness',
        'Only wealth',
        'Victory in war',
      ],
    ],
  ],
  [
    'subramanyashashti',
    'Subramanya Shashti',
    'Lord Murugan’s day of victory (Champa Shashti)',
    'Subramanya Shashti, also called Champa Shashti, honours Lord Subramanya (Murugan) on the sixth day (Shashti) of the bright fortnight. It celebrates his role as the brave commander of the gods’ armies, who protects the good and defeats what is harmful. In many places, snake mounds — linked to Subramanya — are also honoured on this day.',
    'The temple performs special abhishekam and prayers to Lord Subramanya, and devotees offer flowers and light lamps, some observing a fast until the evening.',
    'We observe Subramanya Shashti to ask for Lord Murugan’s protection and courage, and to remember that strength is meant to guard the good. It teaches us to be brave and disciplined for the right reasons.',
    'ॐ श्री सुब्रह्मण्याय नमः ॥',
    'Om Shri Subrahmanyaaya Namaha',
    'Salutations to Lord Subramanya (Murugan).',
    [
      [
        'Subramanya Shashti falls on which day of the fortnight?',
        'The sixth (Shashti)',
        'The first',
        'The tenth',
      ],
      [
        'Murugan is the commander of?',
        'The gods’ armies',
        'A kingdom’s navy',
        'A school',
      ],
      [
        'Subramanya Shashti is also called?',
        'Champa Shashti',
        'Onam',
        'Karthika',
      ],
      [
        'Some devotees observe?',
        'A fast until evening',
        'A silent week',
        'A long journey',
      ],
    ],
  ],
  [
    'dattatreya',
    'Datta Jayanti',
    'The birth of Lord Dattatreya',
    'Datta Jayanti celebrates the birth of Lord Dattatreya, a unique form of God in whom Brahma, Vishnu, and Shiva are joined as one. Dattatreya is honoured as the first and greatest guru (teacher), who taught that we can learn from everything and everyone around us. He is especially dear to Sai Baba’s devotees, for Baba is often seen as a form of Datta, the compassionate guru.',
    'The temple offers special prayers and abhishekam to Lord Dattatreya, with bhajans and readings of his stories. Devotees often mark the day with fasting, charity, and devotion to their guru.',
    'We celebrate Datta Jayanti to honour the guru who unites Brahma, Vishnu, and Shiva, and to remember that a true teacher guides us gently toward goodness. It reminds us to stay humble and to keep learning from the world around us.',
    'दत्तात्रेयं महात्मानं वरदं भक्तवत्सलम् ।\nप्रपन्नार्तिहरं वन्दे स्मर्तृगामी सनोऽवतु ॥',
    'Dattaatreyam Mahaatmaanam Varadam Bhakta-vatsalam,\nPrapannaarti-haram Vande Smartrigaamee Sano’vatu',
    'I bow to the great soul Dattatreya, giver of boons, loving to his devotees, remover of the suffering of those who surrender; may he who comes to those who remember him protect us.',
    [
      [
        'Dattatreya joins which three gods?',
        'Brahma, Vishnu, and Shiva',
        'Indra, Agni, and Vayu',
        'Rama, Krishna, and Shiva',
      ],
      [
        'Dattatreya is honoured as the first great?',
        'Guru (teacher)',
        'King',
        'Warrior',
      ],
      [
        'He is especially dear to devotees of?',
        'Sai Baba',
        'Only Ganesha',
        'Only Hanuman',
      ],
      [
        'Dattatreya taught that we can learn from?',
        'Everything around us',
        'Only books',
        'Only elders',
      ],
    ],
  ],
];

const existing = new Set(data.festivals.map((f) => f.id));
let added = 0;
let order = data.festivals.length;

for (const [
  id,
  title,
  subtitle,
  story,
  rituals,
  importance,
  sk,
  tr,
  mn,
  quiz,
] of NEW) {
  if (existing.has(id)) {
    console.log(`skip (already present): ${id}`);
    continue;
  }
  order += 1;
  data.festivals.push({
    id,
    slug: id,
    order,
    deity: null,
    icon: id,
    image: null,
    languages: {
      en: {
        title,
        subtitle,
        story,
        rituals,
        importance,
        shloka: { original: sk, transliteration: tr, meaning: mn, audio: null },
        quiz: quiz.map(([q, ...opts]) => ({
          question: q,
          options: opts,
          answer: 0,
          explanation: null,
        })),
      },
    },
  });
  added += 1;
}

await writeFile(file, JSON.stringify(data, null, 2) + '\n', 'utf8');
console.log(
  `Added ${added} new festivals (English). Total: ${data.festivals.length}.`
);
