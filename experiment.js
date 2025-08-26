function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent);
}

const respondentIsMobile = isMobileDevice();
console.log(respondentIsMobile)

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const external_id = getQueryParam("id") || "UNKNOWN";



const jsPsych = initJsPsych();
//   {
//   on_finish: function () {
//     // jsPsych.data.get().localSave('csv', 'miat_results.csv');
//     const allData = jsPsych.data.get().values();
//     database
//       .ref(`miat_results/${survey_name}`)
//       .push(allData)
//       .then(() => console.log('✅ Written to Firebase'))
//       .catch(e => console.error('❌ Firebase error', e));
//   }
// });

jsPsych.data.addProperties({ external_id: external_id });


const respondent_id = jsPsych.randomization.randomID(10);
const timeline = [];





//------------------------------------------------------------------------------------------------------
// Create Pre-test Single Implicit trials with images and attributes coming from config file
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
// Generate trials for Multiple implicitit pretesting
//-------------------------------------------------------------------------------------------------------

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

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//UPLOAD IMAGES FOR PRELOAD HERE
////--------------------------------------------------------------------------------------------------------------------------------------------------------
const preload = {
  type: jsPsychPreload,
  images : 
  ['img/BMW.png',
    'img/Lexus.png',
    'img/Mercedes.png',
    'img/Subaru.png',
    'img/Tesla.png',
    'img/VW.png',
    'img/Volvo.png',
   'img/SingleImplicitMotivationimage.png',
   'pretest_img/pretest_cat.png',
   'pretest_img/pretest_fire.png',
   'pretest_img/pretest_driving.png',
   'pretest_img/pretest_icecube.png',
   'img/FCBNY_Logo.png',
   'img/Audi.png'
  ]
}

timeline.push(preload);

//--------------------------------------------------------------------------------------------------------------------------------------------------------
////--------------------------------------------------------------------------------------------------------------------------------------------------------


//------------------------------------------------------------------------------------------------------
// add a new htmlkeyboard response to clear the loading bar from the screen
//--------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});
//------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
      padding: 5vw;
    "> 
      <img src="img/FCBNY_Logo.png" style="
        width: 100vw;
        max-width: 700px;
        height: auto;
        margin-bottom: 4vh;
      "/>
      <p1 style="font-size: clamp(1.6rem, 4.0vw, 2rem); font-weight: 600; margin-bottom: 2vh;">
        Welcome to our Implicit Association Survey!
      </p>
      <p style="font-size: clamp(1.4rem, 4.5vw, 2rem); margin-bottom: 1vh;">
        Thank you for your time!
      </p>
      ${
        respondentIsMobile
          ? ""
          : '<p style="font-size: clamp(1rem, 3vw, 1.3rem); margin-bottom: 3vh;">Press space to continue.</p>'
      }
      <p style="color: white; font-size: clamp(0.8rem, 2.5vw, 1rem); margin-top: 5vh;">
        Program built by Nicholas Brereton
      </p>
    </div>
  `,
  save_trial_parameters: {
    stimulus: false
  },
  // FIX: button_html must be a function, not a string
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin'] : [' ']
});



//----------------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//----------------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
    <h2 style = "font-size: 2.5rem"> Please prepare for the test. </h2>
  </div>
  ${
    respondentIsMobile 
      ? "" 
      : `
        <h3 style="font-size: clamp(1.2rem, 2.5vw, 2rem); margin-bottom: 2vh;">
          Press any key to continue
        </h3>
        <img 
          src='img/SingleImplicitMotivationimage.png' 
          style="
            width: auto;
            max-width: 90vw;
            max-height: 60vh;
            object-fit: contain;
            margin-top: 2vh;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
          "
        />
      `
  }`,
  save_trial_parameters: {
    simulus: false
  },
   button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Ready'] : "ALL_KEYS",
});


//------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//------------------------------------------------------------------------------------------------------

timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `<div>
  <h2 style = "font-size: 2.0rem" > We will begin with a pretest to establish a baseline. </h2>
  </div>
  ${
    respondentIsMobile
    ? ""
    : "<p style='font-size: 18px> ;'>Press any key to begin </p>"
  }`,
  save_trial_parameters: {
    simulus: false
  },
   button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin Pre-Test'] : "ALL_KEYS",
});

//------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});

//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

const singleImplicitTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    const imgSrc = jsPsych.timelineVariable('img_src');
    const attr   = jsPsych.timelineVariable('attribute');
    const cat    = jsPsych.timelineVariable('img_name');

    return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%;">

  <!-- IMAGE BOX -->
  <div style="
    background-color: rgb(216, 212, 212);
    border-radius: 12px;
    padding: 3vh 5vw;
    margin-bottom: 4vh;
    width: 90%;
    max-width: 800px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  ">
    <p style="font-size: clamp(1rem, 2.5vw, 1.3rem); color: #999; margin-bottom: 1vh;">Stim</p>
    <img src="${imgSrc}" 
         alt="${cat}" 
         style="
           width: auto;
           max-width: 100%;
           height: clamp(30vh, 50vh, 60vh);
           object-fit: contain;
           margin-bottom: 1vh;
         " />
  </div>

  <!-- ATTRIBUTE BOX -->
  <div style="
    background-color: #ffffff;
    border-radius: 12px;
    padding: 3vh 5vw;
    margin-bottom: 4vh;
    width: 90%;
    max-width: 500px;
    text-align: center;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  ">
    <p style="
      font-size: clamp(2rem, 5.5vw, 4rem); 
      font-weight: 700; 
      color: #111; 
      margin: 0;
      line-height: 1.2;
      text-align: center;
      word-wrap: break-word;
      overflow-wrap: break-word;
      width: 100%;
    ">
      ${attr}
    </p>
  </div>

</div>


    ${
      respondentIsMobile
        ? '' // buttons will be rendered by jsPsychHtmlButtonResponse
        : `
        <!-- DESKTOP INSTRUCTIONS -->
        <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
          <div style="text-align: center;">
            <div style="
              background-color: rgb(32, 150, 11);
              border-radius: 12px;
              padding: 15px 25px;
              width: 250px;
              box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
            ">
              <div style="font-weight: bold;">[E]</div>
              <div>Fits</div>
            </div>
          </div>
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
        </div>`
    }

  </div>`;
  },

  // Choices
  choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],

  // Side-by-side BIG MOBILE BUTTONS
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 600;
            padding: 3vh 2vw;
            border-radius: 2vw;
            border: none;
            background-color: ${index === 0 ? 'rgb(32, 150, 11)' : 'rgb(105, 135, 236)'};
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 40vw;
          ">${choice}</button>`;
      }
    : undefined,

  data: {
    part: "pretest_single_implicit",
    respondent_id: respondent_id,
    img_src: jsPsych.timelineVariable('img_src'),
    attribute: jsPsych.timelineVariable('attribute'),
    category_name: jsPsych.timelineVariable('img_name'),
    is_correct: jsPsych.timelineVariable('is_correct')
  },

  on_finish: function(data) {
    let userSaysFits;
    if (respondentIsMobile) {
      userSaysFits = data.response === 0;
    } else {
      userSaysFits = data.response === 'e';
    }
    data.user_answer = userSaysFits ? "Fits" : "Does not fit";
    data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
    data.accurate = (userSaysFits === data.is_correct);
  }
};

const mobileBreakerTrial = {
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker';
  }
};

const singleImplicitTimeline = respondentIsMobile 
  ? [singleImplicitTrial, mobileBreakerTrial]
  : [singleImplicitTrial];

timeline.push({
  timeline: singleImplicitTimeline,
  timeline_variables: pretest_trials,
  randomize_order: true
});


//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

////-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
// timeline.push({
//   timeline: [{
//     type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//     stimulus: function () {
//       const imgSrc = jsPsych.timelineVariable('img_src');
//       const attr   = jsPsych.timelineVariable('attribute');
//       const cat    = jsPsych.timelineVariable('img_name');

//       // For desktop, we include the visual E/I keys in the layout
//       // For mobile, we do NOT include fake buttons, the plugin renders them.
//       return `
//   <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">

//     <!-- IMAGE BOX -->
//     <div style="
//       background-color: rgb(216, 212, 212);
//       border-radius: 12px;
//       padding: 30px 50px;
//       margin-bottom: 40px;
//       width: 90%;
//       max-width: 500px;
//       text-align: center;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     ">
//       <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Stim</p>
//       <img src="${imgSrc}" style="height:180px; margin-bottom:10px;" alt="${cat}" />
//     </div>

//     <!-- ATTRIBUTE BOX -->
//     <div style="
//       background-color: #ffffff;
//       border-radius: 12px;
//       padding: 30px 50px;
//       margin-bottom: 40px;
//       width: 90%;
//       max-width: 500px;
//       text-align: center;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     ">
//       <p style="font-size: 32px; font-weight: 700; color: #111;">${attr}</p>
//     </div>

//     ${
//       respondentIsMobile
//         ? '' // no fake buttons; real buttons will appear
//         : `
//         <!-- DESKTOP INSTRUCTIONS -->
//         <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
//           <div style="text-align: center;">
//             <div style="
//               background-color: rgb(32, 150, 11);
//               border-radius: 12px;
//               padding: 15px 25px;
//               width: 250px;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             ">
//               <div style="font-weight: bold;">[E]</div>
//               <div>Fits</div>
//             </div>
//           </div>
//           <div style="text-align: center;">
//             <div style="
//               background-color: rgb(105, 135, 236);
//               border-radius: 12px;
//               padding: 15px 25px;
//               width: 250px;
//               box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//             ">
//               <div style="font-weight: bold;">[I]</div>
//               <div>Does not fit</div>
//             </div>
//           </div>
//         </div>`
//     }

//   </div>`;
//     },
//     choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],
//     data: {
//       part: "pretest_single_implicit",
//       respondent_id: respondent_id,
//       img_src: jsPsych.timelineVariable('img_src'),
//       attribute: jsPsych.timelineVariable('attribute'),
//       category_name: jsPsych.timelineVariable('img_name'),
//       is_correct: jsPsych.timelineVariable('is_correct')
//     },
//     on_finish: function(data) {
//       let userSaysFits;
//       if (respondentIsMobile) {
//         userSaysFits = data.response === 0; // button index
//       } else {
//         userSaysFits = data.response === 'e';
//       }
//       data.user_answer = userSaysFits ? "Fits" : "Does not fit";
//       data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
//       data.accurate = (userSaysFits === data.is_correct);
//     }
//   }],
//   timeline_variables: pretest_trials,
//   randomize_order: true
// });
// //------------------------------------------------------------------------------------------------------
// timeline.push({
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: '',
//   choices: "NO_KEYS",
//   trial_duration: 20  // 200ms pause
// });

//----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
timeline.push({
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align:center; font-size: 2rem; font-weight: 500;">
      <p>Thank you.</p>
      <p>The real test will begin after this.</p>
      ${
        respondentIsMobile
          ? ''  // No keyboard text on mobile
          : '<p>Press any key to begin</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Begin'] : 'ALL_KEYS',

  save_trial_parameters: {
    stimulus: false
  }
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: '',
  choices: "NO_KEYS",
  trial_duration: 20,
  data: { trial_category: 'mobile_breaker' },
  on_finish: function(data){
    // Optional: clear out fields so it's obvious to drop
    data.trial_type = 'mobile_breaker'}  // 200ms pause
});
//-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------
//Single implicit test
//---------------------------------------------------------------------------------------------------------------------------------------
const categoryFitTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: function () {
    const category = jsPsych.timelineVariable('category');
    const attr = jsPsych.timelineVariable('attribute');

    return `
      <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">
        
        <!-- CATEGORY BOX -->
        <div style="
        background-color: rgb(216, 212, 212);
        border-radius: 16px;
        padding: 4vh 6vw;
        margin-bottom: 5vh;
        width: 90%;
        max-width: 700px;
        text-align: center;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      ">
        <p style="font-size: clamp(1.2rem, 3vw, 1.6rem); color: #666; margin-bottom: 1.5vh;">Category</p>
        <p style="font-size: clamp(2rem, 5vw, 3rem); font-weight: 600; color: #222;">${category}</p>
      </div>
    
        <!-- ATTRIBUTE BOX -->
       <div style="
        background-color: #ffffff;
        border-radius: 16px;
        padding: 4vh 6vw;
        margin-bottom: 5vh;
        width: 90%;
        max-width: 700px;
        text-align: center;
        box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
      ">
        <p style="
          font-size: clamp(2.2rem, 6vw, 3.2rem); 
          font-weight: 700; 
          color: #111; 
          margin: 0;
          line-height: 1.3;
          word-wrap: break-word;
          overflow-wrap: break-word;
        ">
          ${attr}
        </p>
      </div>

        ${
          respondentIsMobile
            ? '' // No fake buttons on mobile
            : `
            <!-- Desktop instructions -->
            <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
              <div style="text-align: center;">
                <div style="background-color:rgb(32, 150, 11);
                  border-radius: 12px;
                  padding: 15px 25px;
                  margin-bottom: 60px;
                  width: 250px;
                  text-align: center;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                  <div style="font-weight: bold;">[E]</div>
                  <div>Fits</div>
                </div>
              </div>

              <div style="text-align: center;">
                <div style="background-color:rgb(105, 135, 236);
                  border-radius: 12px;
                  padding: 15px 25px;
                  margin-bottom: 60px;
                  width:250px;
                  text-align: center;
                  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);">
                  <div style="font-weight: bold;">[I]</div>
                  <div>Does not fit</div>
                </div>
              </div>
            </div>`
        }
      </div>`;
  },
  choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],

  // Add big side-by-side buttons on mobile
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 600;
            padding: 3vh 2vw;
            border-radius: 2vw;
            border: none;
            background-color: ${index === 0 ? 'rgb(32, 150, 11)' : 'rgb(105, 135, 236)'};
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 40vw;
          ">${choice}</button>`;
      }
    : undefined,

  data: {
    part: "Single Category IAT",
    respondent_id: respondent_id,
    category: jsPsych.timelineVariable('category'),
    attribute: jsPsych.timelineVariable('attribute')
  },
  on_finish: function (data) {
    let label;
    if (respondentIsMobile) {
      label = data.response === 0 ? "Fits" : "Does not fit";
    } else {
      label = data.response === 'e' ? "Fits" : "Does not fit";
    }
    data.selected_label = label;
  }
};

// If mobile, insert breaker after each trial
const categoryFitTimeline = respondentIsMobile
  ? [categoryFitTrial, mobileBreakerTrial]
  : [categoryFitTrial];

timeline.push({
  timeline: categoryFitTimeline,
  timeline_variables: category_fit_trials,
  randomize_order: true
});


// timeline.push({
//   timeline: [{
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: function () {
//       const category = jsPsych.timelineVariable('category');
//       const attr = jsPsych.timelineVariable('attribute');

//       return `
//       <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 70vh;">
        
//         <div style="
//           background-color:rgb(216, 212, 212);
//           border-radius: 12px;
//           padding: 30px 50px;
//           margin-bottom: 40px;
//           width: 500px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         ">
//           <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Category</p>
//           <p style="font-size: 28px; font-weight: 600; color: #222;">${category}</p>
//         </div>
    
//         <div style="
//           background-color: #ffffff;
//           border-radius: 12px;
//           padding: 30px 50px;
//           margin-bottom: 60px;
//           width: 500px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//         ">
//           <p style="font-size: 32px; font-weight: 700; color: #111;">${attr}</p>
//         </div>
    
//         <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
//           <div style="text-align: center;">
//             <div style=" background-color:rgb(32, 150, 11);
//           border-radius: 12px;
//           padding: 15px 25px;
//           margin-bottom: 60px;
//           width: 250px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           ">

//             <div style="font-weight: bold;">[E]</div>
//             <div>Fits</div>
//           </div>
//           </div>

//           <div style="display: flex; justify-content: center; gap: 120px; font-size: 20px;">
//           <div style="text-align: center;">
//             <div style=" background-color:rgb(105, 135, 236);
//           border-radius: 12px;
//           padding: 15px 25px;
//           margin-bottom: 60px;
//           width:250px;
//           text-align: center;
//           box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           ">
//           <div style="text-align: center;">
//             <div style="font-weight: bold;">[I]</div>
//             <div>Does not fit</div>
//           </div>
//           </div>
//         </div>
    
//       </div>
//     `;
    
//     },
//     choices: ['e', 'i'],
//     save_trial_parameters: { stimulus: false },
//     data: {
//       part: "Single Category IAT",
//       respondent_id: respondent_id,
//       category: jsPsych.timelineVariable('category'),
//       attribute: jsPsych.timelineVariable('attribute')
//     },
//     on_finish: function(data) {
//       data.selected_label = data.response === 'e' ? "Fits" : "Does not fit";
//     }
//   }],
//   timeline_variables: category_fit_trials,
//   randomize_order: true
// });



//------------------------------------------------------------------------------------------------------
//Complete SINGLE IMPLICIT COMPLETE
//------------------------------------------------------------------------------------------------------
const single_implicit_completition_trial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align:center;">
      <p style="font-size: 3rem;">Part 1 Complete!</p>
      ${
        respondentIsMobile
          ? '' // mobile will have a button
          : '<p>Press any key to continue to part 2.</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6.0vw, 6.0rem);
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2.0vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};

const single_implicit_completition_timeline= respondentIsMobile
  ? [single_implicit_completition_trial, mobileBreakerTrial]
  : [single_implicit_completition_trial];

timeline.push({
  timeline: single_implicit_completition_timeline
});
//------------------------------------------------------------------------------------------------------
// Multi Implicit Pretest Trial Start Button
//------------------------------------------------------------------------------------------------------
const multiImplicitIntroTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; font-size: 2rem; font-weight: 500;">
      <p>Next, we will begin with a pretest to set a baseline for our Multiple Implicit portion.</p>
      <p></p>
     
      ${
        respondentIsMobile
          ? '' // Mobile uses button
          : ' <p>Please place both hands on the keyboard with index and middle fingers on the A, S, K, and L keys.</p> <p style="font-size: 1.5rem; color: #666;">Press any key to continue.</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6vw, 6rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};
const multi_pretest_intro = respondentIsMobile
? [multiImplicitIntroTrial, mobileBreakerTrial]
: [multiImplicitIntroTrial];

timeline.push({
timeline: multi_pretest_intro,
timeline_variables: pretest_trials_multiple,
randomize_order: true
});

//------------------------------------------------------------------------------------------------------
//Multiple Implicit Pretest Images Trial 
//------------------------------------------------------------------------------------------------------
const multiBrandTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,

  stimulus: function () {
    const attr = jsPsych.timelineVariable('attribute');
    const brandImgs = jsPsych.timelineVariable('image_paths');
    const brandKeys = ['A', 'S', 'K', 'L'];
    const brandKeyColors = [
      "rgb(32, 150, 11)",
      "rgb(60, 145, 237)",
      "rgb(237, 80, 80)",
      "rgb(236, 221, 57)"
    ];

    if (!respondentIsMobile) {
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
          </div>`;
      }).join("");

      return `
       <div style="
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 4vh 4vw;
        width: 100%;
      ">
        <div style="
          background-color: rgb(216, 212, 212);
          border-radius: 16px;
          padding: 3vh 5vw;
          width: 100%;
          max-width: 700px;
          text-align: center;
          margin-bottom: 4vh;
          box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
        ">
          <p style="
            font-size: clamp(1.5rem, 5.5vw, 2.5rem); 
            color: #666; 
            margin: 0 0 3vh 0;
          ">
            Which image best represents:
          </p>
          <p style="
            font-size: clamp(2rem, 6vw, 3rem); 
            font-weight: 700; 
            color: #111; 
            margin: 0;
          ">
            ${attr}
          </p>
        </div>
        <div style="
          display: grid; 
          grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
          gap: 60px; 
          width: 100%; 
          max-width: 1100px; 
          justify-items: center;
        ">
          ${imageBlocks}
        </div>
      </div>`;
    }

    // MOBILE
    return `
      <div style="text-align:center; padding:4vh 5vw;">
        <p style="font-size: clamp(1.2rem, 4.5vw, 2rem); color:#999; margin-bottom: 3vh;">
          Which brand best represents:
        </p>
        <p style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight:700; color:#111; margin-bottom: 4vh;">
          ${attr}
        </p>
        <div id="mobile-grid-wrapper" style="
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 4vw;
          max-width: 700px;
          margin: 0 auto;
        ">
          <!-- Buttons injected by button_html -->
        </div>
      </div>`;
  },

  choices: respondentIsMobile
    ? ['0', '1', '2', '3']
    : ['a', 's', 'k', 'l'],

  button_html: respondentIsMobile
    ? (choice, index) => {
        const imgs = jsPsych.timelineVariable('image_paths');
        const img = imgs[index];
        return `
          <button style="
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            width: 47%;
            aspect-ratio: 1 / 1;
            margin-bottom: 4vw;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          ">
            <img src="${img}" style="
              width: 100%;
              height: 100%;
              object-fit: contain;
            " />
          </button>`;
      }
    : undefined,
data: {
  part: "Multiple Pretest",
  respondent_id: respondent_id,
  attribute: jsPsych.timelineVariable('attribute'),
  image_names: jsPsych.timelineVariable('image_names'),
  image_paths: jsPsych.timelineVariable('image_paths'),
  correct_image: jsPsych.timelineVariable('correct_image')
},

on_finish: function (data) {
  if (respondentIsMobile) {
    data.selected_image = data.image_names[data.response];
    data.correct = data.selected_image === data.correct_image;
  } else {
    const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
    const idx = keyToIndex[data.response];
    data.selected_image = data.image_names[idx];
    data.correct = data.selected_image === data.correct_image;
  }
}
};

const multiBrandTimeline = respondentIsMobile
? [multiBrandTrial, mobileBreakerTrial]
: [multiBrandTrial];

timeline.push({
timeline: multiBrandTimeline,
timeline_variables: pretest_trials_multiple,
randomize_order: true
});


// timeline.push({
//   timeline: [{
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: function () {
//       const attr = jsPsych.timelineVariable('attribute');
//       const brandImgs = jsPsych.timelineVariable('image_paths');
//       const brandKeys = ['A', 'S', 'K', 'L'];
//       const brandKeyColors = [
//         "rgb(32, 150, 11)",   // green
//         "rgb(60, 145, 237)",  // blue
//         "rgb(237, 80, 80)",   // red
//         "rgb(236, 221, 57)"   // yellow
//       ];

//       // Map must be handled with .map().join("") inside template string
//       const imageBlocks = brandImgs.map((img, i) => {
//         return `
//               <div style="
//                 background-color: #ffffff;
//                 border-radius: 12px;
//                 padding: 25px;
//                 width: 220px;
//                 text-align: center;
//                 box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
//                 display: flex;
//                 flex-direction: column;
//                 align-items: center;
//                 gap: 15px;
//               ">
//                 <img src="${img}" height="150" style="object-fit: contain;" />
//                 <div style="
//                   background-color: ${brandKeyColors[i]};
//                   border-radius: 8px;
//                   padding: 8px 10px;
//                   font-weight: bold;
//                   font-family: 'Courier New', monospace;
//                   font-size: 18px;
//                 ">[${brandKeys[i]}]</div>
//               </div>
//             `;
//       }).join("");

//       return `
//         <div style="
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 5vh 5vw;
//           min-height: 80vh;
//           box-sizing: border-box;
//         ">

//           <div style="
//             background-color: rgb(216, 212, 212);
//             border-radius: 12px;
//             padding: 30px 50px;
//             margin-bottom: 60px;
//             width: 100%;
//             max-width: 500px;
//             text-align: center;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           ">
//             <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which image best represents:</p>
//             <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
//           </div>

//           <div style="
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//             gap: 60px;
//             width: 100%;
//             max-width: 1100px;
//             justify-items: center;
//             align-items: start;
//           ">
//             ${imageBlocks}
//           </div>
//         </div>
//       `;
//     },
//     choices: ['a', 's', 'k', 'l'],
//     data: {
//       part: "Multiple Pretest",
//       respondent_id: respondent_id,
//       attribute: jsPsych.timelineVariable('attribute'),
//       image_names: jsPsych.timelineVariable('image_names'),
//       image_paths: jsPsych.timelineVariable('image_paths'),
//       correct_image: jsPsych.timelineVariable('correct_image')
//     },
//     on_finish: function(data) {
//       const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//       const idx = keyToIndex[data.response];
//       data.selected_image = data.image_names[idx];
//       data.correct = data.selected_image === data.correct_image;
//     }
//   }],
//   timeline_variables: pretest_trials_multiple,
//   randomize_order: true
// });
//-------------------------------------------------------------------------------------------------------------------
// timeline.push({
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: `<p style="font-size: 24px;"> Pretest Complete Next we will begin the real test.</p>
//             <p>Press any key to continue.</p>`,
//   save_trial_parameters: {
//     stimulus: false
//   },
//   choices: "ALL_KEYS"
// });
//-------------------------------------------------------------------------------------------------------------------
// Complete Multiple Pretest
//-------------------------------------------------------------------------------------------------------------------

const multiple_pretest_completion_trial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="text-align: center; font-size: 2rem; font-weight: 500;">
      <p>Multiple Pretest Complete!</p>
      <p>The main task will begin next.</p>
      ${
        respondentIsMobile
          ? '' // Mobile uses styled button
          : '<p style="font-size: 1.5rem; color: #666;">Press any key to continue to the main task.</p>'
      }
    </div>
  `,
  button_html: respondentIsMobile
    ? (choice, index) => {
        return `
          <button style="
            font-size: clamp(2rem, 6vw, 6rem); 
            font-weight: 500;
            padding: 2.5vh 6vw;
            margin-top: 4vh;
            border-radius: 2vw;
            border: none;
            background-color: rgba(62, 126, 245, 0.91);
            color: white;
            box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
            cursor: pointer;
            width: 80vw;
          ">${choice}</button>`;
      }
    : undefined,
  choices: respondentIsMobile ? ['Continue'] : 'ALL_KEYS',
  save_trial_parameters: {
    stimulus: false
  }
};

timeline.push({
  timeline: respondentIsMobile
    ? [multiple_pretest_completion_trial, mobileBreakerTrial]
    : [multiple_pretest_completion_trial]
});

//-------------------------------------------------------------------------------------------------------------------

// const multiImplicitTrial = {
//   type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//   stimulus: function () {
//     const attr = jsPsych.timelineVariable('attribute');
//     const brandImgs = jsPsych.timelineVariable('brand_images');
//     const brandKeys = ['A', 'S', 'K', 'L'];
//     const brandKeyColors = [
//       "rgb(32, 150, 11)",
//       "rgb(60, 145, 237)",
//       "rgb(237, 80, 80)",
//       "rgb(236, 221, 57)"
//     ];

//     // Desktop: Grid of 4 images + key hints
//     if (!respondentIsMobile) {
//       const imageBlocks = brandImgs.map((img, i) => {
//         return `
//           <div style="
//             background-color: #ffffff;
//             border-radius: 12px;
//             padding: 25px;
//             width: 220px;
//             text-align: center;
//             box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 15px;
//           ">
//             <img src="${img}" height="150" style="object-fit: contain;" />
//             <div style="
//               background-color: ${brandKeyColors[i]};
//               border-radius: 8px;
//               padding: 8px 10px;
//               font-weight: bold;
//               font-family: 'Courier New', monospace;
//               font-size: 18px;
//             ">[${brandKeys[i]}]</div>
//           </div>`;
//       }).join("");

//       return `
//         <div style="
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 5vh 5vw;
//           min-height: 80vh;
//           box-sizing: border-box;
//         ">
//           <div style="
//             background-color: rgb(216, 212, 212);
//             border-radius: 12px;
//             padding: 30px 50px;
//             margin-bottom: 60px;
//             width: 100%;
//             max-width: 500px;
//             text-align: center;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           ">
//             <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which brand best represents:</p>
//             <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
//           </div>

//           <div style="
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//             gap: 60px;
//             width: 100%;
//             max-width: 1100px;
//             justify-items: center;
//             align-items: start;
//           ">
//             ${imageBlocks}
//           </div>
//         </div>`;
//     }

//     // Mobile: Only the prompt (images will appear as buttons)
//     return `
//       <div style="text-align:center; padding:20px;">
//         <p style="font-size:22px; color:#999;">Which brand best represents:</p>
//         <p style="font-size:32px; font-weight:700; color:#111;">${attr}</p>
//       </div>
//     `;
//   },

//   choices: respondentIsMobile
//     ? ['0', '1', '2', '3'] // dummy labels
//     : ['a', 's', 'k', 'l'],

//   // Mobile: buttons are image buttons
//   button_html: respondentIsMobile
//     ? (choice, index) => {
//         const imgs = jsPsych.timelineVariable('brand_images');
//         const img = imgs[index];
//         return `
//           <button style="background:none; border:none; padding:10px; cursor:pointer;">
//             <img src="${img}" style="width:150px; height:150px; object-fit:contain; border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15);" />
//           </button>`;
//       }
//     : undefined,

//   data: {
//     part: "Multiple IAT",
//     respondent_id: respondent_id,
//     attribute: jsPsych.timelineVariable('attribute'),
//     brands: jsPsych.timelineVariable('brand_options'),
//     brand_images: jsPsych.timelineVariable('brand_images')
//   },

//   on_finish: function (data) {
//     if (respondentIsMobile) {
//       data.selected_brand = data.brands[data.response];
//     } else {
//       const keyMap = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//       const selectedIdx = keyMap[data.response];
//       data.selected_brand = data.brands[selectedIdx];
//     }
//   }
// };

// // Add breaker for mobile
// const multiImplicitTimeline = respondentIsMobile
//   ? [multiImplicitTrial, mobileBreakerTrial]
//   : [multiImplicitTrial];

// timeline.push({
//   timeline: multiImplicitTimeline,
//   timeline_variables: multi_brand_trials,
//   randomize_order: true
// });
// const multiImplicitTrial = {
//   type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//   stimulus: function () {
//     const attr = jsPsych.timelineVariable('attribute');
//     const brandImgs = jsPsych.timelineVariable('brand_images');
//     const brandKeys = ['A', 'S', 'K', 'L'];
//     const brandKeyColors = [
//       "rgb(32, 150, 11)",
//       "rgb(60, 145, 237)",
//       "rgb(237, 80, 80)",
//       "rgb(236, 221, 57)"
//     ];

//     if (!respondentIsMobile) {
//       const imageBlocks = brandImgs.map((img, i) => {
//         return `
//           <div style="
//             background-color: #ffffff;
//             border-radius: 12px;
//             padding: 25px;
//             width: 220px;
//             text-align: center;
//             box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
//             display: flex;
//             flex-direction: column;
//             align-items: center;
//             gap: 15px;
//           ">
//             <img src="${img}" height="150" style="object-fit: contain;" />
//             <div style="
//               background-color: ${brandKeyColors[i]};
//               border-radius: 8px;
//               padding: 8px 10px;
//               font-weight: bold;
//               font-family: 'Courier New', monospace;
//               font-size: 18px;
//             ">[${brandKeys[i]}]</div>
//           </div>`;
//       }).join("");

//       return `
//         <div style="
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           justify-content: center;
//           padding: 5vh 5vw;
//           min-height: 80vh;
//           box-sizing: border-box;
//         ">
//           <div style="
//             background-color: rgb(216, 212, 212);
//             border-radius: 12px;
//             padding: 30px 50px;
//             margin-bottom: 60px;
//             width: 100%;
//             max-width: 500px;
//             text-align: center;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//           ">
//             <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which brand best represents:</p>
//             <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
//           </div>

//           <div style="
//             display: grid;
//             grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//             gap: 60px;
//             width: 100%;
//             max-width: 1100px;
//             justify-items: center;
//             align-items: start;
//           ">
//             ${imageBlocks}
//           </div>
//         </div>`;
//     }

//     // MOBILE
//     return `
//       <div style="text-align:center; padding:20px;">
//       <p style="font-size:22px; color:#999;">Which brand best represents:</p>
//       <p style="font-size:32px; font-weight:700; color:#111;">${attr}</p>
//     </div>
//     <div id="mobile-grid" style="
//       display: grid;
//       grid-template-columns: repeat(2, 1fr);
//       gap: 5vw;
//       padding: 4vh 5vw;
//       justify-items: center;
//     ">
//       <!-- jsPsych will inject buttons here -->
//     </div>`
//   },

//   choices: respondentIsMobile
//     ? ['0', '1', '2', '3']
//     : ['a', 's', 'k', 'l'],

//   button_html: respondentIsMobile
//     ? (choice, index) => {
//         const imgs = jsPsych.timelineVariable('brand_images');
//         const img = imgs[index];
//         return `
//           <button style="
//           background: none;
//           border: none;
//           padding: 0;
//           cursor: pointer;
//           width: 100%;
//           max-width: 100%;
//         ">
//           <img src="${img}" style="
//             width: 100%;
//             aspect-ratio: 1 / 1;
//             object-fit: contain;
//             border-radius: 12px;
//             box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
//           " />
//         </button>`;
//       }
//     : undefined,

//   data: {
//     part: "Multiple IAT",
//     respondent_id: respondent_id,
//     attribute: jsPsych.timelineVariable('attribute'),
//     brands: jsPsych.timelineVariable('brand_options'),
//     brand_images: jsPsych.timelineVariable('brand_images')
//   },

//   on_finish: function (data) {
//     if (respondentIsMobile) {
//       data.selected_brand = data.brands[data.response];
//     } else {
//       const keyMap = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//       const selectedIdx = keyMap[data.response];
//       data.selected_brand = data.brands[selectedIdx];
//     }
//   }
// };

// // Timeline logic
// const multiImplicitTimeline = respondentIsMobile
//   ? [multiImplicitTrial, mobileBreakerTrial]
//   : [multiImplicitTrial];

// timeline.push({
//   timeline: multiImplicitTimeline,
//   timeline_variables: multi_brand_trials,
//   randomize_order: true
// });
//------------------------------------------------------------------------------------------------------
// Multiple Implicit Brand Test
//------------------------------------------------------------------------------------------------------
const multiImplicitTrial = {
  type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,

  stimulus: function () {
    const attr = jsPsych.timelineVariable('attribute');
    const brandImgs = jsPsych.timelineVariable('brand_images');
    const brandKeys = ['A', 'S', 'K', 'L'];
    const brandKeyColors = [
      "rgb(32, 150, 11)",
      "rgb(60, 145, 237)",
      "rgb(237, 80, 80)",
      "rgb(236, 221, 57)"
    ];

    if (!respondentIsMobile) {
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
          </div>`;
      }).join("");

      return `
        <div style="
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 4vh 4vw;
          width: 100%;
        ">
          <div style="
            background-color: rgb(216, 212, 212);
            border-radius: 16px;
            padding: 3vh 5vw;
            width: 100%;
            max-width: 700px;
            text-align: center;
            margin-bottom: 4vh;
            box-shadow: 0 6px 16px rgba(0, 0, 0, 0.12);
          ">
            <p style="
              font-size: clamp(1.5rem, 5.5vw, 2.5rem); 
              color: #666; 
              margin: 0 0 3vh 0;
            ">
              Which brand best represents:
            </p>
            <p style="
              font-size: clamp(2rem, 6vw, 3rem); 
              font-weight: 700; 
              color: #111; 
              margin: 0;
            ">
              ${attr}
            </p>
          </div>
          <div style="
            display: grid; 
            grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); 
            gap: 60px; 
            width: 100%; 
            max-width: 1100px; 
            justify-items: center;
          ">
            ${imageBlocks}
          </div>
        </div>`;
    }

    // MOBILE
    return `
      <div style="text-align:center; padding:4vh 5vw;">
        <p style="font-size: clamp(1.2rem, 4.5vw, 2rem); color:#999; margin-bottom: 3vh;">
          Which brand best represents:
        </p>
        <p style="font-size: clamp(1.5rem, 6vw, 2.5rem); font-weight:700; color:#111; margin-bottom: 4vh;">
          ${attr}
        </p>
        <div id="mobile-grid-wrapper" style="
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 4vw;
          max-width: 700px;
          margin: 0 auto;
        ">
          <!-- Buttons injected by button_html -->
        </div>
      </div>`;
  },

  choices: respondentIsMobile
    ? ['0', '1', '2', '3']
    : ['a', 's', 'k', 'l'],

  button_html: respondentIsMobile
    ? (choice, index) => {
        const imgs = jsPsych.timelineVariable('brand_images');
        const img = imgs[index];
        return `
          <button style="
            background: none;
            border: none;
            padding: 0;
            margin: 0;
            width: 47%;
            aspect-ratio: 1 / 1;
            margin-bottom: 4vw;
            border-radius: 12px;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
            overflow: hidden;
          ">
            <img src="${img}" style="
              width: 100%;
              height: 100%;
              object-fit: contain;
            " />
          </button>`;
      }
    : undefined,

  data: {
    part: "Multiple IAT",
    respondent_id: respondent_id,
    attribute: jsPsych.timelineVariable('attribute'),
    brands: jsPsych.timelineVariable('brand_options'),
    brand_images: jsPsych.timelineVariable('brand_images')
  },

  on_finish: function (data) {
    if (respondentIsMobile) {
      data.selected_brand = data.brands[data.response];
    } else {
      const keyMap = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
      const selectedIdx = keyMap[data.response];
      data.selected_brand = data.brands[selectedIdx];
    }
  }
};

const multiImplicitTimeline = respondentIsMobile
  ? [multiImplicitTrial, mobileBreakerTrial]
  : [multiImplicitTrial];

timeline.push({
  timeline: multiImplicitTimeline,
  timeline_variables: multi_brand_trials,
  randomize_order: true
});

//------------------------------------------------------------------------------------------------------
// timeline.push({
//   timeline: [{
//     type: jsPsychHtmlKeyboardResponse,
//     stimulus: function () {
//       const attr = jsPsych.timelineVariable('attribute');
//       const brandImgs = jsPsych.timelineVariable('brand_images');
//       const brandKeys = ['A', 'S', 'K', 'L'];
//       const brandKeyColors  = ["rgb(32, 150, 11)", "rgb(60, 145, 237)", "rgb(237, 80, 80)", "rgb(236, 221, 57)"]
    
//       return `
//   <div style="
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 5vh 5vw;
//     min-height: 80vh;
//     box-sizing: border-box;
//   ">

//     <!-- Attribute card -->
//     <div style="
//       background-color: rgb(216, 212, 212);
//       border-radius: 12px;
//       padding: 30px 50px;
//       margin-bottom: 60px;
//       width: 100%;
//       max-width: 500px;
//       text-align: center;
//       box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//     ">
//       <p style="font-size: 22px; color: #999; margin-bottom: 10px;">Which brand best represents:</p>
//       <p style="font-size: 32px; font-weight: 700; color: #111; margin: 0;">${attr}</p>
//     </div>

//     <!-- Brand choice cards -->
//     <div style="
//       display: grid;
//       grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
//       gap: 60px;
//       width: 100%;
//       max-width: 1100px;
//       justify-items: center;
//       align-items: start;
//     ">
//       ${brandImgs.map((img, i) => `
//         <div style="
//           background-color: #ffffff;
//           border-radius: 12px;
//           padding: 25px;
//           width: 220px;
//           text-align: center;
//           box-shadow: 0 6px 16px rgba(0, 0, 0, 0.1);
//           display: flex;
//           flex-direction: column;
//           align-items: center;
//           gap: 15px;
//         ">
//           <img src="${img}" height="150" style="object-fit: contain;" />
//           <div style="
//             background-color: ${brandKeyColors[i]};
//             border-radius: 8px;
//             padding: 8px 10px;
//             font-weight: bold;
//             font-family: 'Courier New', monospace;
//             font-size: 18px;
//           ">[${brandKeys[i]}]</div>
//         </div>
//       `).join('')}
//     </div>

//   </div>
// `;

//     },
//     save_trial_parameters:{
//       stimulus: false
//     },
//     choices: ['a', 's', 'k', 'l'],
//     data: {
//       part: "Multiple IAT",
//       respondent_id: respondent_id,
//       attribute: jsPsych.timelineVariable('attribute'),
//       brands: jsPsych.timelineVariable('brand_options'),
//       brand_images: jsPsych.timelineVariable('brand_images')
//     },
//     on_finish: function(data) {
//       const keyMap = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//       const selectedIdx = keyMap[data.response];
//       data.selected_brand = data.brands[selectedIdx];
//     }
//   }],
//   timeline_variables: multi_brand_trials,
//   randomize_order: true
// });


//------------------------------------------------------------------------------------------------------
// Completion Message
//------------------------------------------------------------------------------------------------------
// timeline.push({
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: `
//     <div style="
//       text-align: center;
//       font-size: clamp(2rem, 5vw, 4rem);
//       font-weight: 600;
//       color: #111;
//       padding: 5vh 5vw;
//     ">
//       <p>🎉 Thank you for participating!</p>
//     </div>
//   `,
//   choices: "NO_KEYS",
//   trial_duration: 500, // Optional: Slightly more than 1000ms if you'd like it to linger
//   save_trial_parameters: {
//     stimulus: false
//   },
//     on_finish: function() {
//     window.location.href =`https://sample.savanta.com/v2/c/?id=${external_id}`;
//   }
// });

// timeline.push({
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: `
//     <div style="
//       text-align: center;
//       font-size: clamp(2rem, 5vw, 4rem);
//       font-weight: 600;
//       color: #111;
//       padding: 5vh 5vw;
//     ">
//       <p>🎉 Thank you for participating!</p>
//     </div>
//   `,
//   choices: "NO_KEYS",
//   trial_duration: 1000, // Linger briefly before redirect
//   on_finish: function() {
//     const allData = jsPsych.data.get().values();

//     database
//       .ref(`miat_results/${survey_name}`)
//       .push(allData)
//       .then((snapshot) => {
//         console.log("✅ Data stored at key:", snapshot.key);
//         window.location.href = `https://sample.savanta.com/v2/c/?id=${external_id}`;
//       })
//       .catch(e => {
//         console.error('❌ Firebase error before redirect:', e);
//         // Still redirect to avoid breaking survey chain
//         setTimeout(() => {
//           // window.location.href = `https://sample.savanta.com/v2/c/?id=${external_id}`;
//         }, 5000);
//       });
//   }
// });
timeline.push({
  type: jsPsychHtmlKeyboardResponse,
  stimulus: `
    <div style="
      text-align: center;
      font-size: clamp(2rem, 5vw, 4rem);
      font-weight: 600;
      color: #111;
      padding: 5vh 5vw;
    ">
      <p>🎉 Thank you for participating!</p>
    </div>
  `,
  choices: "NO_KEYS",
  trial_duration: 1000,
  on_finish: async function () {
    const allData = jsPsych.data.get().values();

    try {
      const snapshot = await database
        .ref(`miat_results/${survey_name}`)
        .push(allData);

      console.log("✅ Firebase write successful. Key:", snapshot.key);

      // Optional: log the key or trigger another write
      // await database.ref(`audit_log/${snapshot.key}`).set({ ... });

      // Safe redirect after confirmed write
      window.location.href = `https://sample.savanta.com/v2/c/?id=${external_id}`;
    } catch (e) {
      console.error("❌ Firebase write failed:", e);

      // Optional: fallback delay before redirect
      setTimeout(() => {
        window.location.href = `https://sample.savanta.com/v2/c/?id=${external_id}`;
      }, 3000);
    }
  }
});

console.log(timeline)
jsPsych.run(timeline);


