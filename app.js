require('dotenv').config();
const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const https = require("https");
const mongoose = require('mongoose');
const state="Search Your State";
const swal = require("sweetalert");
const fetch = require("node-fetch");
let alert = require('alert');
const md5 = require("md5");
const destr = require('destr');
var photo;
let username;
let password;
var greeting = "Hello";
var fun;
const roundTo = require('round-to');
var phone;
var gender;
var ayurvedicPercentage;
var allopathyPercentage;
var othersPercentage;
var homeopathyPercentage;
var coughLength;
var tasteLength;
var smellLength;
var bodyacheLength;
var tirednessLength;
var allopathyLength;
var othersLength;
var yogaGifChild =["/Vidio/Kids/Khand Pranayam.mp4","/Vidio/Kids/Kapalbhati.mp4","/Vidio/Kids/Anulomvilom.mp4","/Vidio/Kids/Adomukhiswanasna.mp4","/Vidio/Kids/Balasan.png"];
var yogaGifAdult =["/Vidio/Adult/Balasan.png","/Vidio/Adult/Setu.mp4","/Vidio/Adult/Halasan.mp4","/Vidio/Adult/Bhujangasana.mp4","/Vidio/Adult/Dhanurasana.mp4"];
var yogaGifElder =["/Vidio/Elder/Dhanurasana.mp4","/Vidio/Elder/Tadasana.mp4","/Vidio/Elder/Vrikshasana.mp4","/Vidio/Elder/Shalabhasana.mp4","/Vidio/Elder/Anjaneyasana.mp4"];
var yogaHeadingChild =["Khand Pranayama","Kapal Bhati","Anulom Vilom","Adomukhiswanasna","Balasana","Padahastasana"];
var yogaHeadingAdult = ["Shishuasana","Setu Bandhasana","Halasana","Bhujangasana","Dhanurasana","Matsyasana"];
var yogaHeadingElder = ["Dhanurasana","Tadasana","Vrikshasana","Shalabasana","Anjaneyasana","Utkatasana","Paschimottanasana"]
var yogaDetailsChild = ["Khand means ‘part’, and this breathing exercise involves breaking up the breath into two more parts/installments. As you inhale, divide your breath into two equal parts. Without holding in the breath, exhale in two parts","‘Kapal’ is skull and ‘bhati’ can be translated as ‘shining/illuminating’. Therefore, Kapalbhati Pranayam is known as Skull Shining Breathing Technique. Inhale normally and exhale with a short, rhythmic, and forceful breath.","Gently close your right nostril with your thumb, inhale into your left nostril and close it, letting the breath out through the right nostril. Then inhale through your right, closing it to exhale only through your left. This makes one cycle.","Begin on your palms and knees. Align palms underneath the shoulders and knees below the hips. To form this pose, straighten your knees by lifting the hips up. Adjust your feet to form an inverted ‘V’ shape. Keep your hands shoulder-width apart. Try to get your heels to touch the floor. Hold the position for a few seconds","Kneel down on the mat and sit on your heels. Inhale and as you exhale, lean forward bending your upper body. Place your forehead down, and let your pelvis rest on the heels.","Fold forward with your upper body as you exhale. Drop your head and keep your shoulders and neck relaxed. Bend your knees slightly if you are a beginner. Place palms next to your feet. Hold this asana for a while",""]
var yogaDetailsAdult = ["Also known as the resting pose, child’s pose, or Shishuasana, is especially helpful to induce relaxation after various inversions and backbends during a yoga routine. The name Shishuasana is derived from Sanskrit and was brought about by the way a baby sleeps (‘shishu’ means baby).Child’s Pose helps to promote calm mentally as well as physically and is one of the restorative yoga poses that promote gentle stretching of your hips, ankles, and thighs.","The word Setu Bandha comes from the Sanskrit word “Setu” which means Bridge; and the meaning of Bandha, is Lock or bind, and Asana means Posture, pose or seat. Pronunciation of Setubandhasana is SAY-tuh-bun-DHAHS-ana. This Pose called Setu Bandha because in this Asana when we try the pose of this Asana, our body looks like a bridge.","Halasana is a classic yoga pose — or asana in Sanskrit — that’s included in many types of yoga practices. It involves lying on your back and placing your feet on the floor behind your head. Typically you do Halasana toward the end of a yoga session. However, it’s the third of 12 basic asanas in the Sivananda sequence","Bhujangasana or Cobra Pose is a solution to solve these and many other problems, just sitting (or lying down) at home! Bhujangasana, the Cobra Pose, is a pose that you do while lying down on your stomach. It gives your body (especially the back), a good stretch that melts your stress away almost instantly","Bow Pose can boost energy and fight fatigue. It may help to build confidence and empowerment. Bow Pose also improves posture and counteracts the effects of sitting for extended periods of time, such as slouching and kyphosis (abnormal curvature of the spine). It may help relieve back pain. It stretches your abdomen, chest, shoulders, front of your hips (hip flexors), and the front of your thighs (quadriceps). Bow Pose strengthens your back muscles, the back of your thighs, and buttocks (glutes).","Fish Pose stretches the front of your body, including the chest, abs, hip flexors, neck, and back, and engages parts of the body that are often neglected, even within yoga's asanas. Fish is a good counter pose because the chin is raised, the neck is curved back, and the spine is in extension, while in Shoulderstand, the chin is strongly tucked, the neck is extended, and the spine is in a position of flexion. From a chakra perspective, Fish has a lot of potential because it stimulates two important areas that are hard to reach. First is the vishudda (throat) chakra, which relates to communication and self-expression. This is often summarized as speaking your truth so if this area is blocked it means you keep things bottled inside that would be better let out. There aren't that many yoga poses where the throat is opened as it is in Fish. Fish Pose also brings attention to the sahasrara (crown) chakra on the top of your head. Again, there aren't many yoga poses that put pressure on the crown, which is tied towisdom and knowledge."]
var yogaDetailsElder = ["Dhanurasana or the Bow pose is one of the potent yoga poses to boost the immune system. It's the first one in the list and the most effective one. It works as the best stress buster as it improves the flow of white blood cells by putting pressure on the digestive system.Doing Dhanurasana requires you to put pressure on your belly, which in turn helps to build up the digestive system. The term Dhanu means bow in Hindi while the asana means position, asking you to form your body into a bow shape as you lie on your stomach. ","Probably the most simple yet helpful for the nervous system, Tadasana is the most sought after yoga exercise to boost immunity. It improves body posture and creates flexibility in the thighs and joints. Apart from being the best yoga poses to boost the immune system, it also helps to tone the abdomen and body muscles. In Sanskrit, Tada means mountain while asana means pose. So, it's also known by another name, called Mountain Pose. It's an ideal yoga for seniors with weak back muscles and rounded backs as it helps to restore the body's natural alignment. ","Vrikshasana or the Tree pose is a simple yoga practice that packs plenty of benefits to the immune system. Easily the best and effortless done yoga poses to boost immunity which you do at any location. Vrikshasana helps us attain a state of balance and strength in our body. It also reflects calmness and serenity to our mind and the body, if you had a hectic day, then this yoga would work wonders.  ","Shalabhasana is one of the easy yoga asanas that improves and strengthens the spine, hip joints, lower back, legs and pelvic organs of the body. It is widely used as the prime yoga pose to boost the immune system by boosting the blood flow to the spinal area. It creates an adequate amount of pressure on the abdomens and improves the body's circulation. ","This yoga pose is popular after the name of Lord Hanuman mother's name Anjani. It's considered as the best yoga to boost the immune system that strengthens you both, physically and mentally. Regarded as the simple yoga poses for older adults that helps them to heal from muscles and joints pain. It also adds a great balance and positive impact on your knees.Since it greatly helps and improves tension in the joints, it's quite powerful yoga poses for seniors that not only help with boosting immunity but also helpful in joint and muscle pain. Practising Anjaneyasana supports in releasing tension from the hips, stretching the hamstrings, quads, groins, improving the knees and building a strong mental focus.  "];
var recipeHeading = [];
var recipeIngredients = [];
var recipe = [];
var recipeImage = [];
var kcalCount = [];
var fatCount = [];
var carbCount = [];
var proteinCount = [];
var fibreCount = [];
var userName = [];
var userEmail = [];
var vegetarianRecipeHeading = ["Indian butternut squash curry","Indian potato pie","Spicy vegetable chapati wraps","Chana masala (chickpea curry) with spinach"];
var vegetarianrecipeIngredients = ["200g brown basmati rice <br><br>1 tbsp olive oil<br><br>1 butternut squash, diced<br><br>1 red onion, diced<br><br>2 tbsp mild curry paste<br><br>300ml vegetable stock<br><br>4 large tomatoes, roughly chopped<br><br>400g can chickpeas, rinsed and drained<br><br>3 tbsp fat-free Greek yogurt<br><br>small handful coriander, chopped","700g potato , sliced<br><br>400g sweet potato , sliced<br><br>1 onion , chopped<br><br>1 tbsp olive oil<br><br>1 tsp cumin seeds<br><br>2 garlic cloves , crushed<br><br>1 red chilli , finely chopped<br><br>1 thumb-size piece ginger , grated<br><br>1 tsp each ground cumin, coriander and garam masala<br><br>pinch dried chilli flakes<br><br>200g frozen pea<br><br>juice 1 lemon , plus extra wedges to serve<br><br>small bunch coriander , chopped<br><br>25g butter , melted<br><br>275g pack filo pastry<br><br>½ tsp poppy seeds","150g sweet potato , peeled and roughly cubed<br><br>200g can peeled plum tomatoes<br><br>200g can chickpeas , drained<br><br>½ tsp dried chilli flakes<br><br>1 tbsp mild curry paste<br><br>50g baby spinach leaves<br><br>1 tbsp chopped, fresh coriander<br><br>2 plain chapatis (Indian flatbreads)<br><br>2 tbsp fat-free Greek or natural yogurt","400g can chickpeas , drained<br><br>1 tsp cumin seed<br><br>1 medium onion , finely chopped<br><br>1 garlic clove , finely chopped<br><br>1cm piece ginger , peeled and finely chopped or grated<br><br>1 tsp garam masala<br><br>½ red chilli , deseeded and finely chopped<br><br>1 tsp ground coriander<br><br>1 tsp ground cumin<br><br>1 tsp turmeric<br><br>1 tsp paprika<br><br>400g can whole plum tomato<br><br>juice ½ lemon<br><br>220g bag baby spinach<br><br>1 tbsp rapeseed oil<br><br>75g quick-cook brown basmati rice"];
var vegetarianRecipe = ["STEP 1<br><br>Cook the rice in boiling salted water, as per pack instructions. Meanwhile, heat the oil in a large frying pan and cook the butternut squash for 2-3 mins until lightly browned. Add the onion and the curry paste and fry for 3-4 mins more.<br><br>STEP 2<br><br>Pour over the stock, then cover and simmer for 15-20 mins, or until the squash is tender. Add the tomatoes and chickpeas, then gently cook for 3-4 mins, until the tomatoes slightly soften.<br><br>STEP 3<br><br>Take off the heat and stir through the yogurt and coriander. Serve with the rice and some wholemeal chapattis if you like.","STEP 1<br><br>Put the potatoes in a large saucepan of cold, salted water, then bring to the boil. Turn down and simmer for 5 mins, add the sweet potatoes and continue to cook for 8 mins until just tender. Drain really<br><br>STEP 2<br><br>Fry the onion in the oil until soft, add the cumin seeds for 1 min, then stir in the garlic, chilli and ginger with the remaining spices. Cook for a further 2-3 mins, then turn off the heat and stir into the potatoes with the peas, lemon juice and coriander.<br><br>STEP 3<br><br>Heat oven to 190C/170C fan/gas 5. Halve the filo sheets, and use two-thirds of them, overlapping, to line a 22cm loose-bottomed cake tin with a little overhang. As you lay in each sheet, brush with melted butter and keep the rest covered with a clean tea towel. Spoon in filling and press down lightly. Cover with remaining filo, then fold up overhanging sides and scrunch up pastry near the edges.<br><br>STEP 4<br><br>Poke several slits in the top of the pastry and brush with more butter. Sprinkle with the poppy seeds. Bake for 40-45 mins until golden brown. Serve either hot or at room temperature with lemon wedges.","STEP 1<br><br>Cook the sweet potatoes in a pan of boiling water for 10-12 minutes until tender. Meanwhile, put the tomatoes, chickpeas, chilli flakes and curry paste in another pan and simmer gently for about 5 minutes.<br><br>STEP 2<br><br>Preheat the grill. Drain the sweet potatoes and add to the tomato mixture. Stir in the spinach and cook for a minute until just starting to wilt. Stir in the coriander, season to taste and keep warm.<br><br>STEP 3<br><br>Sprinkle the chapatis with a little water and grill for 20-30 seconds each side. Spoon on the filling, top with yogurt and fold in half to serve.","STEP 1<br><br>Heat a large non-stick pan and dry-fry the cumin seeds for 1 min, stirring often, while they pop. Remove and set aside. Cook the rice following pack instructions.<br><br>STEP 2<br><br>Heat the oil using the same large pan, add the onion, garlic, ginger and chilli, and sauté over a medium heat for about 3 mins. Reduce the heat, add all the spices, stir well and cook for a further 2 mins. <br><br>STEP 3<br><br>Add the tomatoes, stirring, and use the side of a spoon to break them up into smaller bite-sized chunks. <br><br>STEP 4<br><br>Add the chickpeas and 200ml water. Bring to the boil, then simmer for 10 mins.<br><br>STEP 5<br><br>Stir in the lemon juice and spinach. Let the spinach wilt, then remove the pan from the heat.<br><br>STEP 6<br><br>Divide the rice between 2 bowls, and serve the curry. (The flavours intensify as it cools, so for a fuller flavour, make earlier in the day and reheat slowly prior to serving.)"];
var vegetarianRecipeImage = ["/VegImage/1.jpg","/VegImage/2.jpg","/VegImage/3.jpg","/VegImage/4.jpg"];
var vegetariankcalCount = ["423","350","289","420"];
var vegetarianfatCount = ["8","8","5","12"];
var vegetariancarbCount = ["68","64","54","60"];
var vegetarianproteinCount = ["14","8","12","20"];
var vegetarianfibreCount = ["12","6","5","12"];
var nonvegetarianRecipeHeading = ["Low-fat chicken biryani","Indian butternut squash curry","Chicken madras","Chicken tikka skewers"];
var nonvegetarianrecipeIngredients = ["3 garlic cloves , finely grated<br><br>2 tsp finely grated ginger<br><br>¼ tsp ground cinnamon<br><br>1 tsp turmeric<br><br>5 tbsp natural yogurt<br><br>600g boneless, skinless chicken breast , cut into 4-5cm pieces<br><br>2 tbsp semi-skimmed milk<br><br>good pinch saffron<br><br>4 medium onions<br><br>4 tbsp rapeseed oil<br><br>½ tsp hot chilli powder<br><br>1 cinnamon stick , broken in half<br><br>5 green cardamom pods , lightly bashed to split<br><br>3 cloves<br><br>1 tsp cumin seed<br><br>280g basmati rice<br><br>700ml chicken stock<br><br>1 tsp garam masala<br><br>handful chopped coriander leaves","200g brown basmati rice <br><br>1 tbsp olive oil<br><br>1 butternut squash, diced<br><br>1 red onion, diced<br><br>2 tbsp mild curry paste<br><br>300ml vegetable stock<br><br>4 large tomatoes, roughly chopped<br><br>400g can chickpeas, rinsed and drained<br><br>3 tbsp fat-free Greek yogurt<br><br>small handful coriander, chopped","1 onion, peeled and quartered<br><br>2 garlic cloves<br><br>thumb-sized chunk of ginger, peeled<br><br>½ red chilli<br><br>1 tbsp vegetable oil<br><br>½ tsp turmeric<br><br>1 tsp ground cumin<br><br>1 tsp ground coriander<br><br>1-2 tsp hot chilli powder (depending on how spicy you like your curry)<br><br>4 chicken breasts, cut into chunks<br><br>400g can chopped tomatoes<br><br>small pack coriander, chopped<br><br>rice, naan and mango chutney, to serve","150g pot low-fat natural yogurt<br><br>2 tbsp hot curry paste<br><br>4 boneless, skinless chicken breasts , cubed<br><br>250g pack cherry tomatoes<br><br>4 wholemeal chapatis , warmed, to serve<br><br><b>For the cucumber salad</b><br><br>½ cucumber , halved lengthways, deseeded and sliced<br><br>1 red onion , thinly sliced<br><br>handful chopped coriander leaves<br><br>juice 1 lemon<br><br>50g pack lamb's lettuce or pea shoots"];
var nonvegetarianRecipe = ["STEP 1<br><br>In a mixing bowl, stir together the garlic, ginger, cinnamon, turmeric and yogurt with some pepper and ¼ tsp salt. Tip in the chicken pieces and stir to coat (see step 1, above). Cover and marinate in the fridge for about 1 hr or longer if you have time. Warm the milk to tepid, stir in the saffron and set aside.<br><br>STEP 2<br><br>Heat oven to 200C/180C fan/gas 6. Slice each onion in half lengthways, reserve half and cut the other half into thin slices. Pour 1½ tbsp of the oil onto a baking tray, scatter over the sliced onion, toss to coat, then spread out in a thin, even layer (step 2). Roast for 40-45 mins, stirring halfway, until golden.<br><br>STEP 3<br><br>When the chicken has marinated, thinly slice the reserved onion. Heat 1 tbsp oil in a large sauté or frying pan. Fry the onion for 4-5 mins until golden. Stir in the chicken, a spoonful at a time, frying until it is no longer opaque, before adding the next spoonful (this helps to prevent the yogurt from curdling). Once the last of the chicken has been added, stir-fry for a further 5 mins until everything looks juicy. Scrape any sticky bits off the bottom of the pan, stir in the chilli powder, then pour in 100ml water, cover and simmer on a low heat for 15 mins. Remove and set aside.<br><br>STEP 4<br><br>Cook the rice while the chicken simmers. Heat another 1 tbsp oil in a large sauté pan, then drop in the cinnamon stick, cardamom, cloves and cumin seeds. Fry briefly until their aroma is released. Tip in the rice (step 3) and fry for 1 min, stirring constantly. Stir in the stock and bring to the boil. Lower the heat and simmer, covered, for about 8 mins or until all the stock has been absorbed. Remove from the heat and leave with the lid on for a few mins, so the rice can fluff up. Stir the garam masala into the remaining 1½ tsp oil and set aside. When the onions are roasted, remove and reduce oven to 180C/160C fan/gas 4.<br><br>STEP 5<br><br>Spoon half the chicken and its juices into an ovenproof dish, about 25 x 18 x 6cm, then scatter over a third of the roasted onions. Remove the whole spices from the rice, then layer half of the rice over the chicken and onions. Drizzle over the spiced oil. Spoon over the rest of the chicken and a third more onions. Top with the remaining rice (step 4) and drizzle over the saffron-infused milk. Scatter over the rest of the onions, cover tightly with foil and heat through in the oven for about 25 mins. Serve scattered with the mint and coriander.","STEP 1<br><br>Cook the rice in boiling salted water, as per pack instructions. Meanwhile, heat the oil in a large frying pan and cook the butternut squash for 2-3 mins until lightly browned. Add the onion and the curry paste and fry for 3-4 mins more.<br><br>STEP 2<br><br>Pour over the stock, then cover and simmer for 15-20 mins, or until the squash is tender. Add the tomatoes and chickpeas, then gently cook for 3-4 mins, until the tomatoes slightly soften.<br><br>STEP 3<br><br>Take off the heat and stir through the yogurt and coriander. Serve with the rice and some wholemeal chapattis if you like.","STEP 1<br><br>Blitz 1 quartered onion, 2 garlic cloves, a thumb-sized chunk of ginger and ½ red chilli together in a food processor until it becomes a coarse paste.<br><br>STEP 2<br><br>Heat 1 tbsp vegetable oil in a large saucepan and add the paste, fry for 5 mins, until softened. If it starts to stick to the pan at all, add a splash of water.<br><br>STEP 3<br><br>Tip in ½ tsp turmeric, 1 tsp ground cumin, 1 tsp ground coriander and 1-2 tsp hot chilli powder and stir well, cook for a couple of mins to toast them a bit, then add 4 chicken breasts, cut into chunks. Stir and make sure everything is covered in the spice mix.<br><br>STEP 4<br><br>Cook until the chicken begins to turn pale, adding a small splash of water if it sticks to the base of the pan at all.<br><br>STEP 5<br><br>Pour in 400g can chopped tomatoes, along with a big pinch of salt, cover and cook on a low heat for 30 mins, until the chicken is tender.<br><br>STEP 6<br><br>Stir through small pack of coriander and serve with rice, naan and a big dollop of mango chutney.","STEP 1<br><br>Put 8 wooden skewers in a bowl of water to soak. Mix the yogurt and curry paste together in a bowl, then add the chicken (if you have time, marinate for an hr or so). In a large bowl, toss together the cucumber, red onion, coriander and lemon juice. Chill until ready to serve.<br><br>STEP 2<br><br>Shake off any excess marinade, then thread the chicken pieces and cherry tomatoes onto the pre-soaked skewers. Cook under a medium grill for 15-20 mins, turning from time to time, until cooked through and nicely browned.<br><br>STEP 3<br><br>Stir the lettuce or pea shoots into the salad, then divide between 4 plates. Top each serving with 2 chicken tikka skewers and serve with the warm chapatis."];
var nonvegetarianRecipeImage = ["/NonVegImage/1.jpg","/VegImage/1.jpg","/NonVegImage/2.jpg","/NonVegImage/3.jpg"];
var nonvegetariankcalCount = ["485","423","373","234"];
var nonvegetarianfatCount = ["11.7","8","17","4"];
var nonvegetariancarbCount = ["51.7","68","9","9"];
var nonvegetarianproteinCount = ["40.1","14","43","40"];
var nonvegetarianfibreCount = ["2.7","12","3","2"];
var eggetarianRecipeHeading = ["Indian chickpeas with poached eggs","Indian butternut squash curry","Curried spinach, eggs & chickpeas"];
var eggetarianrecipeIngredients = ["1 tbsp rapeseed oil<br><br>2 garlic cloves, chopped<br><br>1 yellow pepper, deseeded and diced<br><br>½ - 1 red chilli, deseeded and chopped<br><br>½ bunch spring onions (about 5), tops and whites sliced but kept separate<br><br>1 tsp cumin, plus a little extra to serve (optional)<br><br>1 tsp coriander<br><br>½ tsp turmeric<br><br>3 tomatoes, cut into wedges<br><br>⅓ pack coriander, chopped<br><br>400g can chickpeas in water, drained but liquid reserved<br><br>½ tsp reduced-salt bouillon powder (we used Marigold)<br><br>4 large eggs","200g brown basmati rice <br><br>1 tbsp olive oil<br><br>1 butternut squash, diced<br><br>1 red onion, diced<br><br>2 tbsp mild curry paste<br><br>300ml vegetable stock<br><br>4 large tomatoes, roughly chopped<br><br>400g can chickpeas, rinsed and drained<br><br>3 tbsp fat-free Greek yogurt<br><br>small handful coriander, chopped","1 tbsp rapeseed oil<br><br>1 onion , thinly sliced<br><br>1 garlic clove , crushed<br><br>3cm piece ginger , peeled and grated<br><br>1 tsp ground turmeric<br><br>1 tsp ground coriander<br><br>1 tsp garam masala<br><br>1 tbsp ground cumin<br><br>450g tomatoes , chopped<br><br>400g can chickpeas , drained<br><br>1 tsp sugar<br><br>200g spinach<br><br>2 large eggs<br><br>3 tbsp natural yogurt<br><br>1 red chilli , finely sliced<br><br>½ small bunch of coriander , torn"];
var eggetarianRecipe = ["STEP 1<br><br>Heat the oil in a non-stick sauté pan, add the garlic, pepper, chilli and the whites from the spring onions, and fry for 5 mins over a medium-high heat. Meanwhile, put a large pan of water on to boil.<br><br>STEP 2<br><br>Add the spices, tomatoes, most of the coriander and the chickpeas to the sauté pan and cook for 1-2 mins more. Stir in the bouillon powder and enough liquid from the chickpeas to moisten everything, and leave to simmer gently.<br><br>STEP 3<br><br>Once the water is at a rolling boil, crack in your eggs and poach for 2 mins, then remove with a slotted spoon. Stir the spring onion tops into the chickpeas, then very lightly crush a few of the chickpeas with a fork or potato masher. Spoon the chickpea mixture onto plates, scatter with the reserved coriander and top with the eggs. Serve with an extra sprinkle of cumin, if you like.","STEP 1<br><br>Cook the rice in boiling salted water, as per pack instructions. Meanwhile, heat the oil in a large frying pan and cook the butternut squash for 2-3 mins until lightly browned. Add the onion and the curry paste and fry for 3-4 mins more.<br><br>STEP 2<br><br>Pour over the stock, then cover and simmer for 15-20 mins, or until the squash is tender. Add the tomatoes and chickpeas, then gently cook for 3-4 mins, until the tomatoes slightly soften.<br><br>STEP 3<br><br>Take off the heat and stir through the yogurt and coriander. Serve with the rice and some wholemeal chapattis if you like.","STEP 1<br><br>Heat the oil in a large frying pan or flameproof casserole pot over a medium heat, and fry the onion for 10 mins until golden and sticky. Add the garlic, ginger, turmeric, ground coriander, garam masala, cumin and tomatoes, and fry for 2 mins more. Add the chickpeas, 100ml water and the sugar and bring to a simmer. Stir in the spinach, then cover and cook for 20-25 mins. Season to taste.<br><br>STEP 2<br><br>Cook the eggs in a pan of boiling water for 7 mins, then rinse under cold running water to cool. Drain, peel and halve. Swirl the yogurt into the curry, then top with the eggs, chilli and coriander. Season."];
var eggetarianRecipeImage = ["/EggImage/1.jpg","/VegImage/1.jpg","/EggImage/2.jpg"];
var eggetariankcalCount = ["412","423","469"];
var eggetarianfatCount = ["20","8","20"];
var eggetariancarbCount = ["27","68","39"];
var eggetarianproteinCount = ["24","14","28"];
var eggetarianfibreCount = ["10","3","12"];
var yogaHeading = [];
var yogaDetails =[];
var yogaGif = [];
var protein;
var carb;
var fat;
var coughPercentage;
var tastePercentage;
var smellPercentage;
var bodyachePercentage;
var tirednessPercentage;
var homeopathyLength;
var conditions = false;
const stateNames =[];
const tableConfirmed=[];
const tableActive=[];
const tableRecovered=[];
const tableDeceased=[];
var adminName;
var adminUsername;
var Name;
var confirmed;
var deaths;
var recovered;
var ayurvedicLength;
var doctorNameArray =[];
var doctorPhoneArray =[];
var doctorQualificationArray=[];
var doctorExpertArray = [];
var doctorAddressArray = [];
var doctorGenderArray = [];
var trainerNameArray =[];
var trainerPhoneArray =[];
var trainerExperienceArray=[];
var trainerExpertArray = [];
var trainerAddressArray = [];
var trainerGenderArray = [];
var coachNameArray =[];
var coachPhoneArray =[];
var coachExperienceArray=[];
var coachExpertArray = [];
var coachAddressArray = [];
var coachGenderArray = [];
var blogMain = [];
var blogContent = [];
var covidNews =[];

const session = require('express-session');
const passport = require("passport");
const passportLocal = require("passport-local");
const passportLocalMongoose = require("passport-local-mongoose");
var GoogleStrategy = require( 'passport-google-oauth2' ).Strategy;
const findOrCreate = require('mongoose-findorcreate');
const states =[];
const app = express();
const err = "Please Search Correct State";
const commaNumber = require("comma-number");
const constants = require('constants');
const { response } = require('express');
const err1= "Error";

app.set('view engine', 'ejs');
const action = "active"; 
let blogging;
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var today = new Date();
var yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
var date = yesterday.toISOString().slice(0,10);
app.use(session({
  secret : process.env.SECRET,
  resave : false,
  saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());


mongoose.connect("mongodb://localhost:27017/clientDB", {useNewUrlParser: true , useUnifiedTopology: true});

mongoose.set("useCreateIndex", true);
const blogSchema = new mongoose.Schema({
main : String,
content : String
});
const adminSchema = new mongoose.Schema({
  name : String,
  username : String,
  password : String
});

const doctorSchema = new mongoose.Schema({
  name : String,
  phone : Number,
  qualification : String,
  expert : String,
  address : String,
  gender : String
});
const coachSchema = new mongoose.Schema({
  name : String,
  phone : Number,
  Experience : String,
  expert : String,
  address : String,
  gender : String
})
const trainerSchema = new mongoose.Schema({
  name : String,
  phone : Number,
  Experience : String,
  expert : String,
  address : String,
  gender : String
})

const clientSchema = new mongoose.Schema ({
  name : String,

  username: String,

  password: String,
  Role : Boolean,
  Age : Number,
    Allopathy : String,
    Ayurvedic : String,
    Homeopathy : String,
    Others : String,
    Still : String,
    cough : String,
    taste : String,
    smell : String,
    bodyache : String,
    tiredness : String,
    comment : String,
    phone: Number,
    gender : String,
    ageForm:String,
    bmi:String,
    status:String,
    breatheForm:String,
    coughForm:String,
    tasteForm:String,
    smellForm:String,
    foodType:String,
    milkAllergy:String,
    peanutAllergy:String,
    eggAllergy:String,
    workout : String
  

});


clientSchema.plugin(passportLocalMongoose);


const Client = new mongoose.model("Client", clientSchema);
const Admin = new mongoose.model("Admin",adminSchema);
const Doctor = new mongoose.model("Doctor",doctorSchema);
const Trainer = new mongoose.model("Trainer",trainerSchema);
const Coach = new mongoose.model("Coach",coachSchema);
const Blog = new mongoose.model("Blog",blogSchema);
passport.use(Client.createStrategy());
passport.serializeUser(Client.serializeUser());
passport.deserializeUser(Client.deserializeUser());


Blog.find(function(err,blog){
  if(blog){
    blogging = blog;
    
    for(let i=0; i<blog.length;i++){
      blogMain[i]=blog[i].main  ,
      blogContent[i]=blog[i].content 
    }
    
  }
      });

app.get("/",function(req,res){
  let newsData;
  const url = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=India";
  const url2 = "https://newsapi.org/v2/everything?q=Covid-19&from="+date+"&sortBy=Popularity&apiKey=e30b605137014dcf92df11985883d8e0"

  if(req.isAuthenticated()){
res.redirect("/home")
  }
  else{

    fetch(
      url2
  )
      .then((response) => response.json())
      .then((data) => {
        newsData = data.articles.length;
            for(let i=0;i<newsData;i++){
              covidNews[i] = data.articles[i].title
            }
            
             
      })
      .catch((err) => console.log(err));
  
     


    https.get(url, function(response){
      response.on("data",function(data){
          let covidData = JSON.parse(data);
          
           confirmed = commaNumber(covidData.confirmed);
           deaths = commaNumber(covidData.deaths);
           recovered =commaNumber( covidData.recovered);
          res.render("First",{confirmed1:confirmed, deaths1:deaths, recovered1:recovered,covidNews:covidNews,newsData:newsData});

      });
 
  
     
  });
   
  }
});

app.post("/form",function(req,res){
  Client.updateMany({username:username}, {
    ageForm:req.body.ageForm,
    bmi:req.body.bmi,
    status:req.body.status,
    breatheForm:req.body.breatheForm,
    coughForm:req.body.coughForm,
    tasteForm:req.body.tasteForm,
    smellForm:req.body.smellForm,
    foodType:req.body.foodType,
    milkAllergy:req.body.milkAllergy,
    peanutAllergy:req.body.peanutAllergy,
    eggAllergy:req.body.eggAllergy,
    workout : req.body.workout

  }, function(err){
    if(err){
      console.log(err);
     
    }
    else{
      ageForm = req.body.ageForm,
      bmi = req.body.bmi,
      status= req.body.status,
      breatheForm = req.body.breatheForm,
      coughForm = req.body.coughForm,
      tasteForm = req.body.tasteForm,
      smellForm = req.body.smellForm,
      foodType = req.body.foodType,
      milkAllergy = req.body.milkAllergy,
      peanutAllergy = req.body.peanutAllergy,
      eggAllergy = req.body.eggAllergy,
      workout  = req.body.workout
      
      res.redirect("/home");
      
    }
  });
  
});
app.get("/home",function(req,res){
  
  Client.find({username:username},function(err,Aging){
    
  if(err){
    console.log(err);
  }
  else{
   
    if(Aging){
      if(Aging[0].ageForm=="teenAge"){
        yogaHeading = yogaHeadingChild ;
         yogaDetails = yogaDetailsChild;
         yogaGif = yogaGifChild;
         protein = 40;
         carb = 40;
         fat = 20;
      }
      else if(Aging[0].ageForm=="middleAge"){
        yogaHeading = yogaHeadingAdult ;
        yogaDetails = yogaDetailsAdult;
        yogaGif = yogaGifAdult;
        protein= 30;
        fat = 10;
        carb = 60;
      }
      else{
        yogaHeading = yogaHeadingElder ;
        yogaDetails = yogaDetailsElder;
        yogaGif = yogaGifElder;
        protein = 10;
        fat = 10;
        carb = 80;
      }
    }
  }
  })
  Client.find({username:username},function(err,FoodType){
   
  if(err){
    console.log(err);
  }
  else{
    
    if(FoodType){
      if(FoodType[0].foodType=="non-veg"){
         recipe = nonvegetarianRecipe;
         recipeIngredients = nonvegetarianrecipeIngredients;
         recipeHeading =nonvegetarianRecipeHeading;
 recipeImage = nonvegetarianRecipeImage ;
 kcalCount = nonvegetariankcalCount;
 fatCount = nonvegetarianfatCount;
carbCount =nonvegetariancarbCount ;
 proteinCount = nonvegetarianproteinCount ;
 fibreCount = nonvegetarianfibreCount ;
      }
      else if(FoodType[0].foodType=="egg"){
        recipe = eggetarianRecipe;
        recipeIngredients = eggetarianrecipeIngredients;
         recipeHeading =eggetarianRecipeHeading;
 recipeImage = eggetarianRecipeImage ;
 kcalCount = eggetariankcalCount;
 fatCount = eggetarianfatCount;
carbCount =eggetariancarbCount ;
 proteinCount = eggetarianproteinCount ;
 fibreCount = eggetarianfibreCount ;
      }
      else{
        recipe = vegetarianRecipe;
        recipeIngredients = vegetarianrecipeIngredients;
         recipeHeading =vegetarianRecipeHeading;
 recipeImage = vegetarianRecipeImage ;
 kcalCount = vegetariankcalCount;
 fatCount = vegetarianfatCount;
carbCount =vegetariancarbCount ;
 proteinCount = vegetarianproteinCount ;
 fibreCount = vegetarianfibreCount ;
      }
    }
  }
  })
  Client.find({ username: username},function(err,Naming){
    if(err){
      console.log(err);
    }
    else{
    if(Naming){
    
      Name= Naming[0].name;
      phone = Naming[0].phone;
      gender = Naming[0].gender;
    }}
    
  });
  if(gender=="male"){
    photo = "https://previews.123rf.com/images/jemastock/jemastock1706/jemastock170616048/80929474-cartoon-man-character-male-profile-image-vector-illustration.jpg"
  }
  else if(gender=="female"){
    photo="https://www.imagediamond.com/blog/wp-content/uploads/2020/06/cartoon-girl-images.jpg"
  }
  else{
    photo="https://media.istockphoto.com/photos/transgender-pride-flag-lgbt-community-abstract-cement-concrete-paper-picture-id1290092319?b=1&k=20&m=1290092319&s=170667a&w=0&h=DBvvo2GR93U5wFwfevrLSwNG1dmJZyE2kUVa6CLFd2w="
  }
  
  
  const url = "https://covid19-stats-api.herokuapp.com/api/v1/cases?country=India";
  https.get(url, function(response){
      response.on("data",function(data){
          let covidData = JSON.parse(data);
          
           confirmed = commaNumber(covidData.confirmed);
           deaths = commaNumber(covidData.deaths);
           recovered =commaNumber( covidData.recovered);
          res.render("home",{confirmed1:confirmed, deaths1:deaths, recovered1:recovered,state:state,stateNames:stateNames,tableConfirmed:tableConfirmed,tableActive:tableActive,tableDeceased:tableDeceased,tableRecovered:tableRecovered,Name:Name,fun:fun,ayurvedicLength:ayurvedicPercentage,allopathyLength:allopathyPercentage,othersLength:othersPercentage,homeopathyLength:homeopathyPercentage,coughLength:coughPercentage,tasteLength:tastePercentage,smellLength:smellPercentage,bodyacheLength:bodyachePercentage,tirednessLength:tirednessPercentage});

      });
 
  
     
  });

  const url3="https://covid-api.com/api/reports?date=2021-11-22&q=India&iso=IND&region_name=India";
  fetch(
    url3
)
    .then((response) => response.json())
    .then((data3) => {
      console.log(date)
      for(let i=0; i<37;i++){
        let stateName = data3.data[i].region.province;
        stateNames.push(stateName);
        let tableconfirmed = commaNumber(data3.data[i].confirmed);
        tableConfirmed.push(tableconfirmed);
        let tableactive =commaNumber(data3.data[i].active);
        tableActive.push(tableactive);
        let tablerecovered = commaNumber(data3.data[i].recovered);
        tableRecovered.push(tablerecovered);
        let tabledeceased = commaNumber(data3.data[i].deaths);
        tableDeceased.push(tabledeceased);
      }
           
    })
    .catch((err) => console.log(err));



var totalLength = ayurvedicLength + allopathyLength + othersLength + homeopathyLength;
ayurvedicPercentage =roundTo( (ayurvedicLength/totalLength)*100,2);
allopathyPercentage =roundTo( (allopathyLength/totalLength)*100,2);
othersPercentage = roundTo((othersLength/totalLength)*100,2);
homeopathyPercentage = roundTo((homeopathyLength/totalLength)*100,2);
var totalsymptoms =  coughLength + tasteLength + smellLength + bodyacheLength + tirednessLength;
coughPercentage = roundTo((coughLength/totalsymptoms)*100,2);
tastePercentage = roundTo((tasteLength/totalsymptoms)*100,2);
smellPercentage = roundTo((smellLength/totalsymptoms)*100,2);
bodyachePercentage = roundTo((bodyacheLength/totalsymptoms)*100,2);
tirednessPercentage = roundTo((tirednessLength/totalsymptoms)*100,2);

Client.find({cough : "1"},function(err,coughSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(coughSurvey){
    
    coughLength=coughSurvey.length
  }}
});
Client.find({taste : "1"},function(err,tasteSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(tasteSurvey){
    
    tasteLength=tasteSurvey.length
  }}
});

Client.find({smell : "1"},function(err,smellSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(smellSurvey){
    
    smellLength=smellSurvey.length
  }}
});

Client.find({bodyache : "1"},function(err,bodyacheSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(bodyacheSurvey){
    
    bodyacheLength=bodyacheSurvey.length
  }}
});
Client.find({tiredness: "1"},function(err,tirednessSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(tirednessSurvey){
    
    tirednessLength=tirednessSurvey.length
  }}
});

Client.find({Ayurvedic : "1"},function(err,ayurvedicSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(ayurvedicSurvey){
    
    ayurvedicLength=ayurvedicSurvey.length
  }}
});
Client.find({ Allopathy: "1"},function(err,AllopathySurvey){
  if(err){
    console.log(err);
  }
  else{
  if(AllopathySurvey){
    
    allopathyLength=AllopathySurvey.length
  }}
});
Client.find({ Others: "1"},function(err,OthersSurvey){
  if(err){
    console.log(err);
  }
  else{
  if(OthersSurvey){
    
    othersLength=OthersSurvey.length
  }}
});
Client.find({ Homeopathy: "1"},function(err,HomeopathySurvey){
  if(err){
    console.log(err);
  }
  else{
  if(HomeopathySurvey){
    
    homeopathyLength=HomeopathySurvey.length
  }}
});
});
function clearArray(array) {
  while (array.length) {
    array.pop();
  }
}

app.post("/home", function(req,res){
  let state = req.body.search;
  
  const url1 = "https://covid-api.com/api/reports?date="+date+"&q=India&iso=IND&region_name=India&region_province="+state+"";
  
  https.get(url1, function(response){
      response.on("data",function(data1){
       let covidStateData = JSON.parse(data1);
      
          if(covidStateData.data.length){
            
      
          let confirmedState = commaNumber(covidStateData.data[0].confirmed);
          let deathsState = commaNumber(covidStateData.data[0].deaths);
          let recoveredState = commaNumber(covidStateData.data[0].recovered);

          res.render("home",{confirmed1:confirmedState, deaths1:deathsState, recovered1:recoveredState,state:state,stateNames:stateNames,tableConfirmed:tableConfirmed,tableActive:tableActive,tableDeceased:tableDeceased,tableRecovered:tableRecovered,Name:Name,ayurvedicLength:ayurvedicPercentage,allopathyLength:allopathyPercentage,othersLength:othersPercentage,homeopathyLength:homeopathyPercentage,coughLength:coughPercentage,tasteLength:tastePercentage,smellLength:smellPercentage,bodyacheLength:bodyachePercentage,tirednessLength:tirednessPercentage});
          }
          else{
          alert("Please Check Your State");
            res.redirect("/home");
          }
     
       
      });
    
          
          
        });
        
      });
      
      
       
  

app.get("/profile",function(req,res){
  res.render("profile",{Name:Name, username:username,phone:phone,gender:gender,photo:photo});
})

app.get("/Survey",function(req,res){
  
  if(conditions){
    res.render("already");
  }
  else{
    
    res.render("survey");
  }
});

  app.get("/register",function(req,res){
    res.render("register",{Name:Name});
  });

  app.get("/blog", function(req,res){
    
    res.render("blog",{Name:Name,blogMain:blogMain,blogContent:blogContent});
  });
app.get("/about", function(req,res){
  res.render("about",{Name:Name});
});
app.get("/resources", function(req,res){
  res.render("resources",{Name:Name,yogaDetails:yogaDetails,yogaHeading:yogaHeading,yogaGif:yogaGif,protein:protein,fat:fat,carb:carb,recipeImage:recipeImage,recipeHeading:recipeHeading,recipeIngredients:recipeIngredients,recipe:recipe,kcalCount:kcalCount,fatCount:fatCount,carbCount:carbCount,proteinCount :proteinCount,fibreCount:fibreCount });
});
 

app.get("/admin",function(req,res){
  res.render("admin");
})
app.get("/contact", function(req,res){



  Trainer.find(function(err,trainer){
    for(let  i=0; i<trainer.length;i++){
      trainerNameArray[i] = trainer[i].name;
      trainerPhoneArray[i] =trainer[i].phone;
      trainerExperienceArray[i]=trainer[i].Experience;
      trainerExpertArray[i] = trainer[i].expert;
      trainerAddressArray[i] = trainer[i].address;
      trainerGenderArray[i] = trainer[i].gender;
     }
  });

  Coach.find(function(err,coach){
  
    for( let a=0;a<coach.length;a++){
   
       coachNameArray[a] = coach[a].name;
       coachPhoneArray[a] =coach[a].phone;
       coachExperienceArray[a]=coach[a].Experience;
       coachExpertArray[a] = coach[a].expert;
       coachAddressArray[a] = coach[a].address;
       coachGenderArray[a] = coach[a].gender;
      }
   });
  
    Doctor.find(function(err,doctor){
     for(let  i=0; i<doctor.length;i++){
      doctorNameArray[i] = doctor[i].name;
      doctorPhoneArray[i] =doctor[i].phone;
      doctorQualificationArray[i]=doctor[i].qualification;
   doctorExpertArray[i] = doctor[i].expert;
   doctorAddressArray[i] = doctor[i].address;
   doctorGenderArray[i] = doctor[i].gender;
     }
     
    
      
    });
  res.render("contact",{Name:Name,doctorNameArray:doctorNameArray,doctorPhoneArray:doctorPhoneArray,doctorQualificationArray:doctorQualificationArray,doctorExpertArray:doctorExpertArray,doctorAddressArray:doctorAddressArray,doctorGenderArray:doctorGenderArray,trainerNameArray:trainerNameArray,trainerPhoneArray:trainerPhoneArray,trainerExperienceArray:trainerExperienceArray,trainerExpertArray:trainerExpertArray,trainerAddressArray:trainerAddressArray,trainerGenderArray:trainerGenderArray,coachNameArray:coachNameArray,coachPhoneArray:coachPhoneArray,coachExperienceArray:coachExperienceArray,coachExpertArray:coachExpertArray,coachAddressArray:coachAddressArray,coachGenderArray:coachGenderArray});
});
app.get("/Thankyou",function(req,res){
  
  res.render("Thankyou");
 
});
app.get("/already",function(req,res){
  res.render("already");
});
app.get("/form",function(req,res){
 
  res.render("form");
  
});
app.post("/delete",function(req,res){
  Blog.find(function(err,blog){
    if(blog){
      blogging = blog;
      
      for(let i=0; i<blog.length;i++){
        blogMain[i]=blog[i].main  ,
        blogContent[i]=blog[i].content 
      }
      
    }
        });
  
  const remove =  req.body.button;
  Blog.findByIdAndRemove(remove, function(err){
    if(err){
      console.log(err);
    }
    else(res.redirect("/deleteBlog"));
  });

})
app.get("/deleteBlog", function(req,res){
  Blog.find(function(err,blog){
  
    if(blog){
      
      blogging = blog;
      for(let i=0; i<blog.length;i++){
        blogMain[i]=blog[i].main  ,
        blogContent[i]=blog[i].content 
      }
      
    }
        });
  console.log(blogMain);
  console.log(blogging.length);
  res.render("deleteBlog",{blogMain:blogMain,blogContent:blogContent,blogging: blogging});
})
app.get("/adminMain",function(req,res){
  
  Admin.find(function(err,find){
    
    
    if(err){
      console.log(err);
    }
    else{
      if(find){
        adminName=find[0].name  ;
        adminUsername = find[0].username  ;
console.log(adminName);
console.log(adminUsername) 

      }
    }
  })
  
 
  res.render("adminMain",{adminName:adminName,adminUsername:adminUsername});
})
app.get("/logout", function(req,res){
  req.logout();
  conditions = false;
  Name= "";
  gender="";
  phone="";
  res.redirect("/");
});
app.post("/updateAdmin",function(req,res){
  
  Admin.find(function(err,find){
    
if(err){
  console.log(err);
}
if(find){
   
  //  console.log(find[0].username);
   if(find[0].username== req.body.OldUsername){
     console.log(find[0].password);
        if(find[0].password == md5(req.body.opsw)){
      Admin.updateMany({
        name : req.body.name,
      username : req.body.NewUsername,
      password :  md5(req.body.psw)
      
            
    
      },function(err){
        if(err){
          console.log(err);

        }
        else{
          res.redirect("/adminMain");
        }
      });
    }
    else{
      alert("Password Not Matched");
      res.redirect("/adminMain");
    }
    }
    else{
      alert("Please Check Username");
      res.redirect("/adminMain");
    }
}
  });
  
//   

});
app.post("/admin",function(req,res){
  var adminpassword = md5(req.body.password)
 
   Admin.findOne({username:req.body.username},function(err,find){
     if(find==null){
       alert("Check your Details")
       res.redirect("/admin")
     }
     else{
     if(err){
       console.log(err)
       
     }
     else{
       if(find){
        
         if(find.password == adminpassword  ){
           res.redirect("/adminMain");
         }
         else(
           
          response.redirect("/admin")
          
           
         )
       }
     }
    }

   });


});
app.post("/register",function(req,res){
Client.register({username:req.body.username, name:req.body.name,Role:false,phone:req.body.phone,gender:req.body.gender}, req.body.password, function(err,user){
  if(err){
    console.log(err);
    res.redirect("/register")
  }
  else{
    passport.authenticate("local")(req,res,function(){
      res.redirect("/form");
    })
  }
  
  Name = req.body.name;
  username= req.body.username;
  
})

});
app.post("/",function(req,res){
  username = req.body.username;
  Client.find({ username : req.body.username},function(err,OthersSurvey){

    if(err){
      console.log(err);
    }
    else{
    if(OthersSurvey.length){
      
      console.log(OthersSurvey);
const user = new Client({
  username : req.body.username,
  password : req.body.password
});
req.login(user,function(err){
      if(err){
        console.log(err);
        
      }
      else{
        passport.authenticate("local")(req,res,function(){
          Client.find({username:req.body.username },function(err,find){
            
            
            if(err){
              console.log(err);
            }
            if(find){
              console.log(find);
            if(find[0].Role== true){
              
              conditions = true;
            
            }
              else{
                conditions = false;
               
              }
            }
          });
          res.redirect("/home")
        })
      }
    })
  }
  else{
    console.log(OthersSurvey.length);
    alert("Please Check Your Account or Password");
res.render("register");
  }
}
});

});


app.post("/Survey",function(req,res){
  

  Client.updateMany({username:username}, {
    Age : req.body.age,
    Allopathy : req.body.Allopathy,
    Ayurvedic : req.body.Ayurvedic,
    Homeopathy : req.body.Homeopathy,
    Others : req.body.Others,
    Still : req.body.Still,
    cough : req.body.cough,
    taste : req.body.taste,
    smell : req.body.smell,
    bodyache : req.body.bodyache,
    tiredness : req.body.tiredness,
    comment : req.body.comment,
    Role: true

  }, function(err){
    if(err){
      console.log(err);

    }
    else{
 
      conditions = true;
      res.render("Thankyou");
      
    }
  });
 
});
 
app.post("/addDoctor",function(req,res){
  Doctor.insertMany({
    name : req.body.doctorName,
  phone :req.body.phone,
  qualification : req.body.qualification,
  expert : req.body.expert,
  address : req.body.address,
  gender : req.body.gender
  }, function(err){
    if(err){
      console.log(err);

    }
    else{
      
      res.redirect("/adminMain");
      
    }
  }
  )
});
app.post("/addTrainer",function(req,res){
  Trainer.insertMany({
    name : req.body.trainerName,
  phone :req.body.phone,
  Experience : req.body.Experience,
  expert : req.body.expert,
  address : req.body.address,
  gender : req.body.gender
  }, function(err){
    if(err){
      console.log(err);

    }
    else{
      
      res.redirect("/adminMain");
      
    }
  }
  )
});
  app.post("/addBlog",function(req,res){
    Blog.insertMany({
      main : req.body.blogHeading,
      content : req.body.blogContent
    },function(err){
      if(err){
        console.log(err);
  
      }
      else{
        
        res.redirect("/addBlog");
        
      }
    });
  });
app.post("/addCoach",function(req,res){
  Coach.insertMany({
    name : req.body.coachName,
  phone :req.body.phone,
  Experience : req.body.Experience,
  expert : req.body.expert,
  address : req.body.address,
  gender : req.body.gender
  }, function(err){
    if(err){
      console.log(err);

    }
    else{
      
      res.redirect("/adminMain");
      
    }
  }
  )
});
app.get("/adminChild",function(req,res){
  
Trainer.find(function(err,trainer){
  for(let  i=0; i<trainer.length;i++){
    trainerNameArray[i] = trainer[i].name;
    trainerPhoneArray[i] =trainer[i].phone;
    trainerExperienceArray[i]=trainer[i].Experience;
    trainerExpertArray[i] = trainer[i].expert;
    trainerAddressArray[i] = trainer[i].address;
    trainerGenderArray[i] = trainer[i].gender;
   }
});
Coach.find(function(err,coach){
  
  for( let a=0;a<coach.length;a++){
 
     coachNameArray[a] = coach[a].name;
     coachPhoneArray[a] =coach[a].phone;
     coachExperienceArray[a]=coach[a].Experience;
     coachExpertArray[a] = coach[a].expert;
     coachAddressArray[a] = coach[a].address;
     coachGenderArray[a] = coach[a].gender;
    }
 });
  Doctor.find(function(err,doctor){
   for(let  i=0; i<doctor.length;i++){
    doctorNameArray[i] = doctor[i].name;
    doctorPhoneArray[i] =doctor[i].phone;
    doctorQualificationArray[i]=doctor[i].qualification;
 doctorExpertArray[i] = doctor[i].expert;
 doctorAddressArray[i] = doctor[i].address;
 doctorGenderArray[i] = doctor[i].gender;
   }
   
    
    
  });
  

  res.render("adminChild",{doctorNameArray:doctorNameArray,doctorPhoneArray:doctorPhoneArray,doctorQualificationArray:doctorQualificationArray,doctorExpertArray:doctorExpertArray,doctorAddressArray:doctorAddressArray,doctorGenderArray:doctorGenderArray,trainerNameArray:trainerNameArray,trainerPhoneArray:trainerPhoneArray,trainerExperienceArray:trainerExperienceArray,trainerExpertArray:trainerExpertArray,trainerAddressArray:trainerAddressArray,trainerGenderArray:trainerGenderArray,coachNameArray:coachNameArray,coachPhoneArray:coachPhoneArray,coachExperienceArray:coachExperienceArray,coachExpertArray:coachExpertArray,coachAddressArray:coachAddressArray,coachGenderArray:coachGenderArray})
});
app.get("/addDoctor",function(req,res){
  res.render("addDoctor");
});
app.get("/addTrainer",function(req,res){
  res.render("addTrainer");
});
app.get("/addCoach",function(req,res){
  res.render("addCoach");
});
app.get("/addBlog",function(req,res){

  res.render("addBlog");
})

let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}
app.listen(port,function() {
  console.log("Server started");
});
