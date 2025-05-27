const jsPsych = initJsPsych({
  on_finish: function () {
  //   const data = jsPsych.data.get().filter({trial_type: 'html-keyboard-response'}).values();

  // fetch("https://script.google.com/a/macros/fcb.com/s/AKfycbyquheRKtZTqysRnLHObLJFCx9_3evNMoYdHyckAleIdu8zulJeuyA5WP2-3Iuw9uTu/exec", {
  //   method: "POST",
  //   body: JSON.stringify(data),
  //   headers: {
  //     "Content-Type": "application/json"
  //   }
  // }).then(() => {
  //   console.log("Data saved to Google Sheet.");
  // }).catch((err) => {
  //   console.error("Error sending data:", err);
  // });
    
    jsPsych.data.get().localSave('csv', 'miat_results.csv');
  }
});




const respondent_id = jsPsych.randomization.randomID(10);
const timeline = [];





//------------------------------------------------------------------------------------------------------
function generatePretestTrials (images, attributes){
  const trials = [];

  images.forEach(img => {
    attributes.forEach(attr => {
      trials.push({
        img_src: img.img, 
        img_name: img.name,
        attribute: attr, 
        is_correct: img.correct.includes(attr)
      })
    })
  })
  return jsPsych.randomization.shuffle(trials)
}
const pretest_trials = generatePretestTrials(pretest_images, pretest_attributes)





//------------------------------------------------------------------------------------------------------

function generateMultiplePretestTrials(attributes, images) {
  const trials = [];

  attributes.forEach(attr => {
    // Identify the correct image for this attribute
    const correctImage = images.find(img => img.correct.includes(attr));
    const otherImages = images.filter(img => img !== correctImage);
    
    // Choose 3 random distractors
    const distractors = jsPsych.randomization.sampleWithoutReplacement(otherImages, 3);

    // Combine & shuffle
    const allOptions = jsPsych.randomization.shuffle([correctImage, ...distractors]);

    trials.push({
      attribute: attr,
      image_names: allOptions.map(img => img.name),
      image_paths: allOptions.map(img => img.img),
      correct_image: correctImage.name
    });
  });

  return jsPsych.randomization.shuffle(trials);
}
const pretest_trials_multiple = generateMultiplePretestTrials(pretest_attributes_multiple, pretest_images_multiple)




//------------------------------------------------------------------------------------------------------
function generateCategoryFitTrials(category, attributes) {
  return attributes.map(attr => ({
    category: category,
    attribute: attr
  }));
}
const category_fit_trials = generateCategoryFitTrials(category, attributes);




//------------------------------------------------------------------------------------------------------
function generateCompleteBrandAttributeTrials(attributes, brands) {
  const trials = [];
  const brandAttrSeen = {};

  // Initialize brand-attribute matrix
  attributes.forEach(attr => {
    brandAttrSeen[attr] = {};
    brands.forEach(b => {
      brandAttrSeen[attr][b.name] = false;
    });
  });

  // Continue until all brand-attribute pairs are covered
  while (
    attributes.some(attr =>
      brands.some(b => !brandAttrSeen[attr][b.name])
    )
  ) {
    for (let attr of jsPsych.randomization.shuffle(attributes)) {
      // Filter brands not yet used with this attribute
      const unseen = brands.filter(b => !brandAttrSeen[attr][b.name]);

      // Fill with seen brands if we need 4 options
      const fillers = brands.filter(b => brandAttrSeen[attr][b.name]);
      const needed = 4 - unseen.length;
      const fillerSample = jsPsych.randomization.sampleWithoutReplacement(fillers, Math.max(0, needed));

      const trialBrands = jsPsych.randomization.shuffle([...unseen, ...fillerSample]).slice(0, 4);

      trialBrands.forEach(b => {
        brandAttrSeen[attr][b.name] = true;
      });

      trials.push({
        attribute: attr,
        brand_options: trialBrands.map(b => b.name),
        brand_images: trialBrands.map(b => b.img)
      });
    }
  }

  return trials;
}
const multi_brand_trials = generateCompleteBrandAttributeTrials(attributes, brands);





//------------------------------------------------------------------------------------------------------

const preload = {
  type: jsPsychPreload,
  images : 
  [
   'img/doritos1.png',
   'img/lays1.png',
   'img/pringles1.png',
   'img/ritz1.png',
   'img/SingleImplicitMotivationimage.png',
   'img/takis1.png',
   'pretest_img/pretest_cat.png',
   'pretest_img/pretest_fire.png',
   'pretest_img/pretest_driving.png',
   'pretest_img/pretest_icecube.png',
   'img/FCBNY_Logo.png'
  ]
}

timeline.push(preload);
//------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div style="
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px 60px 0 60px;"> 
  <img src= "img/FCBNY_Logo.png"  style="
      max-width: 500px;
      height: auto;
      display: block;
      justify: center;
    "/>
            </div>
            <p style="font-size: 24px;">Welcome to our Implicit Association Survey!</p>
            <p style = "font-size: 18px">Thank you for your time </p>
            <p>Press space to continue.</p>
            <p style = "color: white; font-size: 12px" > Program built by Nicholas Brereton </p>`,
  save_trial_parameters: {
    simulus: false
  },
  choices: " ",
});

//----------------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
  <h2> Please prepare for the test as shown below </h2> <h3> Press any key to continue </h3> <img src= "img/SingleImplicitMotivationimage.png" style = "width:500px; height: auto;"/>
  </div>`,
  save_trial_parameters: {
    simulus: false
  },
  choices: "ALL_KEYS",
});


//------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
  <p> We will begin with a pretest to establish a baseline. </p>
  <p> Press any key to begin </p>
  </div>`,
  save_trial_parameters: {
    simulus: false
  },
  choices: "ALL_KEYS",
});

//------------------------------------------------------------------------------------------------------
timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      const imgSrc = jsPsych.timelineVariable('img_src');
      const attr   = jsPsych.timelineVariable('attribute');
      const cat    = jsPsych.timelineVariable('img_name');

      return `
  <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">
    
    <!-- IMAGE BOX -->
    <div style="
      background-color: rgb(216, 212, 212);
      border-radius: 12px;
      padding: 30px 50px;
      margin-bottom: 40px;
      width: 500px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    ">
      <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Stim</p>
      <img src="${imgSrc}" style="height:180px; margin-bottom:10px;" alt="${cat}" />
    </div>

    <!-- ATTRIBUTE BOX -->
    <div style="
      background-color: #ffffff;
      border-radius: 12px;
      padding: 30px 50px;
      margin-bottom: 60px;
      width: 500px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    ">
      <p style="font-size: 32px; font-weight: 700; color: #111;">${attr}</p>
    </div>

    <!-- RESPONSE BUTTONS -->
    <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
      
      <!-- Fits Button -->
      <div style="text-align: center;">
        <div style="
          background-color: rgb(148, 228, 114);
          border-radius: 12px;
          padding: 15px 25px;
          width: 250px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        ">
          <div style="font-weight: bold;">[E]</div>
          <div>Fits</div>
        </div>
      </div>

      <!-- Does Not Fit Button -->
      <div style="text-align: center;">
        <div style="
          background-color: rgb(105, 135, 236);
          border-radius: 12px;
          padding: 15px 25px;
          width: 250px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        ">
          <div style="font-weight: bold;">[I]</div>
          <div>Does not fit</div>
        </div>
      </div>

    </div>
  </div>
`;
    },
    choices: ['e', 'i'],
    data: {
      part: "pretest_single_implicit",
      respondent_id: respondent_id,
      img_src: jsPsych.timelineVariable('img_src'),
      attribute: jsPsych.timelineVariable('attribute'),
      category_name: jsPsych.timelineVariable('img_name'),
      is_correct: jsPsych.timelineVariable('is_correct')
    },
    on_finish: function(data) {
      const userSaysFits = data.response === 'e';
      data.user_answer = userSaysFits ? "Fits" : "Does not fit";
      data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
      data.accurate = (userSaysFits === data.is_correct);
    }
  }],
  timeline_variables: pretest_trials,
  randomize_order: true
});


//------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
  <p> Thank you. </p>
  <p> The real test will begin after this. </p>
  <p> Press any key to begin </p>
  </div>`,
  save_trial_parameters: {
    simulus: false
  },
  choices: "ALL_KEYS",
});



//------------------------------------------------------------------------------------------------------
timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      const category = jsPsych.timelineVariable('category');
      const attr = jsPsych.timelineVariable('attribute');

      return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">
        
        <div style="
          background-color:rgb(216, 212, 212);
          border-radius: 12px;
          padding: 30px 50px;
          margin-bottom: 40px;
          width: 500px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        ">
          <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Category</p>
          <p style="font-size: 28px; font-weight: 600; color: #222;">${category}</p>
        </div>
    
        <div style="
          background-color: #ffffff;
          border-radius: 12px;
          padding: 30px 50px;
          margin-bottom: 60px;
          width: 500px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
        ">
          <p style="font-size: 32px; font-weight: 700; color: #111;">${attr}</p>
        </div>
    
        <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
          <div style="text-align: center;">
            <div style=" background-color:rgb(148, 228, 114);
          border-radius: 12px;
          padding: 15px 25px;
          margin-bottom: 60px;
          width: 250px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          ">

            <div style="font-weight: bold;">[E]</div>
            <div>Fits</div>
          </div>
          </div>

          <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
          <div style="text-align: center;">
            <div style=" background-color:rgb(105, 135, 236);
          border-radius: 12px;
          padding: 15px 25px;
          margin-bottom: 60px;
          width:250px;
          text-align: center;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          ">
          <div style="text-align: center;">
            <div style="font-weight: bold;">[I]</div>
            <div>Does not fit</div>
          </div>
          </div>
        </div>
    
      </div>
    `;
    
    },
    choices: ['e', 'i'],
    save_trial_parameters: { stimulus: false },
    data: {
      part: "Single Category IAT",
      respondent_id: respondent_id,
      category: jsPsych.timelineVariable('category'),
      attribute: jsPsych.timelineVariable('attribute')
    },
    on_finish: function(data) {
      data.selected_label = data.response === 'e' ? "Fits" : "Does not fit";
    }
  }],
  timeline_variables: category_fit_trials,
  randomize_order: true
});



//------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size: 24px;">Part 1 Complete!</p>
            <p>Press any key to continue to part 2.</p>`,
  save_trial_parameters: {
    stimulus: false
  },
  choices: "ALL_KEYS"
});
//------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size: 24px;"> Next, we will begin with a pretest to set a baseline for our Multiple Implicit portion</p>
            <p>Press any key to continue.</p>`,
  save_trial_parameters: {
    stimulus: false
  },
  choices: "ALL_KEYS"
});

//------------------------------------------------------------------------------------------------------

timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      const attr = jsPsych.timelineVariable('attribute');
      const brandImgs = jsPsych.timelineVariable('image_paths');
      const brandKeys = ['A', 'S', 'K', 'L'];
      const brandKeyColors = [
        "rgb(90, 248, 62)",   // green
        "rgb(60, 145, 237)",  // blue
        "rgb(237, 80, 80)",   // red
        "rgb(236, 221, 57)"   // yellow
      ];

      // Map must be handled with .map().join("") inside template string
      const imageBlocks = brandImgs.map((img, i) => {
        return `
              <div style="
                background-color: #ffffff;
                border-radius: 12px;
                padding: 25px;
                width: 220px;
                text-align: center;
                box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 15px;
              ">
                <img src="${img}" height="150" style="object-fit: contain;" />
                <div style="
                  background-color: ${brandKeyColors[i]};
                  border-radius: 8px;
                  padding: 8px 10px;
                  font-weight: bold;
                  font-family: 'Courier New', monospace;
                  font-size: 18px;
                ">[${brandKeys[i]}]</div>
              </div>
            `;
      }).join("");

      return `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 5vh 5vw;
          min-height: 80vh;
          box-sizing: border-box;
        ">

          <div style="
            background-color: rgb(216, 212, 212);
            border-radius: 12px;
            padding: 30px 50px;
            margin-bottom: 60px;
            width: 100%;
            max-width: 500px;
            text-align: center;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          ">
            <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which image best represents:</p>
            <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
          </div>

          <div style="
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
            gap: 60px;
            width: 100%;
            max-width: 1100px;
            justify-items: center;
            align-items: start;
          ">
            ${imageBlocks}
          </div>
        </div>
      `;
    },
    choices: ['a', 's', 'k', 'l'],
    data: {
      part: "Multiple Pretest",
      respondent_id: respondent_id,
      attribute: jsPsych.timelineVariable('attribute'),
      image_names: jsPsych.timelineVariable('image_names'),
      image_paths: jsPsych.timelineVariable('image_paths'),
      correct_image: jsPsych.timelineVariable('correct_image')
    },
    on_finish: function(data) {
      const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
      const idx = keyToIndex[data.response];
      data.selected_image = data.image_names[idx];
      data.correct = data.selected_image === data.correct_image;
    }
  }],
  timeline_variables: pretest_trials_multiple,
  randomize_order: true
});
//-------------------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `<p style="font-size: 24px;"> Pretest Complete Next we will begin the real test.</p>
            <p>Press any key to continue.</p>`,
  save_trial_parameters: {
    stimulus: false
  },
  choices: "ALL_KEYS"
});

//-------------------------------------------------------------------------------------------------------------------
timeline.push({
  timeline: [{
    type: jsPsychHtmlKeyboardResponse,
    stimulus: function () {
      const attr = jsPsych.timelineVariable('attribute');
      const brandImgs = jsPsych.timelineVariable('brand_images');
      const brandKeys = ['A', 'S', 'K', 'L'];
      const brandKeyColors  = ["rgb(90, 248, 62)", "rgb(60, 145, 237)", "rgb(237, 80, 80)", "rgb(236, 221, 57)"]
    
      return `
  <div style="
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 5vh 5vw;
    min-height: 80vh;
    box-sizing: border-box;
  ">

    <!-- Attribute card -->
    <div style="
      background-color: rgb(216, 212, 212);
      border-radius: 12px;
      padding: 30px 50px;
      margin-bottom: 60px;
      width: 100%;
      max-width: 500px;
      text-align: center;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    ">
      <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which brand best represents:</p>
      <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
    </div>

    <!-- Brand choice cards -->
    <div style="
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
      gap: 60px;
      width: 100%;
      max-width: 1100px;
      justify-items: center;
      align-items: start;
    ">
      ${brandImgs.map((img, i) => `
        <div style="
          background-color: #ffffff;
          border-radius: 12px;
          padding: 25px;
          width: 220px;
          text-align: center;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 15px;
        ">
          <img src="${img}" height="150" style="object-fit: contain;" />
          <div style="
            background-color: ${brandKeyColors[i]};
            border-radius: 8px;
            padding: 8px 10px;
            font-weight: bold;
            font-family: 'Courier New', monospace;
            font-size: 18px;
          ">[${brandKeys[i]}]</div>
        </div>
      `).join('')}
    </div>

  </div>
`;

    },
    save_trial_parameters:{
      stimulus: false
    },
    choices: ['a', 's', 'k', 'l'],
    data: {
      part: "Multiple IAT",
      respondent_id: respondent_id,
      attribute: jsPsych.timelineVariable('attribute'),
      brands: jsPsych.timelineVariable('brand_options'),
      brand_images: jsPsych.timelineVariable('brand_images')
    },
    on_finish: function(data) {
      const keyMap = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
      const selectedIdx = keyMap[data.response];
      data.selected_brand = data.brands[selectedIdx];
    }
  }],
  timeline_variables: multi_brand_trials,
  randomize_order: true
});


//------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: "<h3>Thank you for participating!</h3>",
  choices: "NO_KEYS",
  trial_duration: 2000
});
console.log(timeline)
jsPsych.run(timeline);


