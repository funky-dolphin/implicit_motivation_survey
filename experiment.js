function isMobileDevice() {
  return /Android|iPhone|iPad|iPod|Mobile|Tablet/i.test(navigator.userAgent);
}

const minRT = 350;
const maxRT = 5000;

const respondentIsMobile = isMobileDevice();
console.log(respondentIsMobile)

function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const external_id = getQueryParam("id") || "UNKNOWN";



const jsPsych = initJsPsych({
  show_progress_bar: true,
});
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

///--------------------------------------------------GENERATE FLAT SIAT TEST--------------------------------------------------------------------------------------
function generateFlatTrials(trialVars, respondentId, partLabel) {
  const trials = [];

  trialVars.forEach(vars => {
    const trial = {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => `
        <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
          
          <!-- CATEGORY -->
          ${vars.category ? `
            <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
              <p style="font-size:1.2rem; color:#666;">Category</p>
              <p style="font-size:2rem; font-weight:600; color:#222;">${vars.category}</p>
            </div>` : ''}

          <!-- IMAGE -->
          ${vars.img_src ? `
            <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
              <img src="${vars.img_src}" alt="${vars.img_name || ''}" style="max-height:40vh; object-fit:contain;" />
            </div>` : ''}

          <!-- ATTRIBUTE -->
          <div style="background:#fff; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
            <p style="font-size:2rem; font-weight:700; color:#111;">${vars.attribute}</p>
          </div>

          ${
            respondentIsMobile
              ? ''  // real buttons handled by jsPsychHtmlButtonResponse
              : `
              <!-- DESKTOP FAKE BUTTONS -->
              <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
                <div style="text-align:center;">
                  <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                    <div style="font-weight:bold;">[E]</div>
                    <div>Fits</div>
                  </div>
                </div>
                <div style="text-align:center;">
                  <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
                    <div style="font-weight:bold;">[I]</div>
                    <div>Does not fit</div>
                  </div>
                </div>
              </div>`
          }
        </div>
      `,
      choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],
      button_html: respondentIsMobile
        ? (choice, index) => `
          <button style="
            font-size:clamp(2rem,6vw,6rem);
            font-weight:600;
            padding:3vh 2vw;
            border-radius:2vw;
            border:none;
            background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
            color:white;
            width:40vw;
            box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
          ">${choice}</button>`
        : undefined,
      data: {
        part: partLabel,
        respondent_id: respondentId,
        ...vars
      },
      on_finish: function(data) {
        let label;
        if (respondentIsMobile) {
          label = data.response === 0 ? "Fits" : "Does not fit";
        } else {
          label = data.response === 'e' ? "Fits" : "Does not fit";
        }
        data.selected_label = label;

        if (vars.is_correct !== undefined) {
          data.accurate = (label === (vars.is_correct ? "Fits" : "Does not fit"));
        }
        if (data.rt < minRT) data.rt_flag = "too_fast";
        if (data.rt > maxRT) data.rt_flag = "too_slow";
        if (data.rt >= minRT && data.rt <= maxRT) data.rt_flag = "valid";
      }
    };

    trials.push(trial);

    if (respondentIsMobile) {
      trials.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 20,
        data: { trial_category: 'mobile_breaker' }
      });
    }
  });

  return trials;
}
//----------------------------------------------------------------------------------------------------------------------------------------------
//--------------------------------------------Generate Flat MIA Trials TRIAL AND TEST--------------------------------------------------------------------------------------------------------------
// function generateFlatMultiBrandTrials(trialVars, respondentId, partLabel) {
//   const trials = [];

//   trialVars.forEach(vars => {
//     // Support both shapes
//     const imageNames = vars.image_names || vars.brand_options;
//     const imagePaths = vars.image_paths || vars.brand_images;

//     const trial = {
//       type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//       stimulus: () => {
//         const attr = vars.attribute;
//         const brandImgs = imagePaths;
//         const brandKeys = ['A', 'S', 'K', 'L'];
//         const brandKeyColors = [
//           "rgb(32, 150, 11)",
//           "rgb(60, 145, 237)",
//           "rgb(237, 80, 80)",
//           "rgb(236, 221, 57)"
//         ];

//         if (!respondentIsMobile) {
//           const imageBlocks = brandImgs.map((img, i) => `
//             <div style="background:#fff; border-radius:12px; padding:25px; width:220px; 
//                         text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.1); 
//                         display:flex; flex-direction:column; align-items:center; gap:15px;">
//               <img src="${img}" height="150" style="object-fit:contain;" />
//               <div style="background:${brandKeyColors[i]}; border-radius:8px; padding:8px 10px; 
//                           font-weight:bold; font-family:'Courier New', monospace; font-size:18px;">
//                 [${brandKeys[i]}]
//               </div>
//             </div>`).join("");

//           return `
//             <div style="display:flex; flex-direction:column; align-items:center; padding:4vh 4vw; width:100%;">
//               <div style="background:#ddd; border-radius:16px; padding:3vh 5vw; max-width:700px; text-align:center; margin-bottom:4vh;">
//                 <p style="font-size:1.5rem; color:#666;">Which image best represents:</p>
//                 <p style="font-size:2.2rem; font-weight:700; color:#111;">${attr}</p>
//               </div>
//               <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:60px; max-width:1100px;">
//                 ${imageBlocks}
//               </div>
//             </div>`;
//         }

//         // Mobile
//         return `
//           <div style="text-align:center; padding:4vh 5vw;">
//             <p style="font-size:1.2rem; color:#999;">Which brand best represents:</p>
//             <p style="font-size:1.6rem; font-weight:700; color:#111; margin-bottom:4vh;">${attr}</p>
//           </div>`;
//       },
//       choices: respondentIsMobile ? ['0', '1', '2', '3'] : ['a', 's', 'k', 'l'],
//       button_html: respondentIsMobile
//         ? (choice, index) => {
//             const img = imagePaths[index];
//             return `
//               <button style="background:none; border:none; width:47%; aspect-ratio:1/1; 
//                              border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15); overflow:hidden;">
//                 <img src="${img}" style="width:100%; height:100%; object-fit:contain;" />
//               </button>`;
//           }
//         : undefined,
//       data: {
//         part: partLabel,
//         respondent_id: respondentId,
//         attribute: vars.attribute,
//         image_names: imageNames,
//         image_paths: imagePaths,
//         correct_image: vars.correct_image || null
//       },
//       on_finish: function(data) {
//         if (respondentIsMobile) {
//           data.selected_image = imageNames[data.response];
//         } else {
//           const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
//           const idx = keyToIndex[data.response];
//           data.selected_image = imageNames[idx];
//         }
//         if (vars.correct_image) {
//           data.correct = data.selected_image === vars.correct_image;
//         }
//       }
//     };

//     trials.push(trial);

//     if (respondentIsMobile) {
//       trials.push({
//         type: jsPsychHtmlKeyboardResponse,
//         stimulus: '',
//         choices: "NO_KEYS",
//         trial_duration: 20,
//         data: { trial_category: 'mobile_breaker' }
//       });
//     }
//   });

//   return trials;
// }
function generateFlatMultiBrandTrials(trialVars, respondentId, partLabel, isPretest=false) {
  const trials = [];

  trialVars.forEach(vars => {
    const imageNames = vars.image_names || vars.brand_options;
    const imagePaths = vars.image_paths || vars.brand_images;

    const trial = {
      type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
      stimulus: () => {
        const attr = vars.attribute;
        const brandImgs = imagePaths;
        const brandKeys = ['A', 'S', 'K', 'L'];
        const brandKeyColors = [
          "rgb(32, 150, 11)",
          "rgb(60, 145, 237)",
          "rgb(237, 80, 80)",
          "rgb(236, 221, 57)"
        ];

        if (!respondentIsMobile) {
          const imageBlocks = brandImgs.map((img, i) => `
            <div style="background:#fff; border-radius:12px; padding:25px; width:220px; 
                        text-align:center; box-shadow:0 6px 16px rgba(0,0,0,0.1); 
                        display:flex; flex-direction:column; align-items:center; gap:15px;">
              <img src="${img}" height="150" style="object-fit:contain;" />
              <div style="background:${brandKeyColors[i]}; border-radius:8px; padding:8px 10px; 
                          font-weight:bold; font-family:'Courier New', monospace; font-size:18px;">
                [${brandKeys[i]}]
              </div>
            </div>`).join("");

          return `
            <div style="display:flex; flex-direction:column; align-items:center; padding:4vh 4vw; width:100%;">
              <div style="background:#ddd; border-radius:16px; padding:3vh 5vw; max-width:700px; text-align:center; margin-bottom:4vh;">
                <p style="font-size:1.5rem; color:#666;">Which image best represents:</p>
                <p style="font-size:2.2rem; font-weight:700; color:#111;">${attr}</p>
              </div>
              <div style="display:grid; grid-template-columns:repeat(auto-fit,minmax(220px,1fr)); gap:60px; max-width:1100px;">
                ${imageBlocks}
              </div>
            </div>`;
        }

        // Mobile
        return `
          <div style="text-align:center; padding:4vh 5vw;">
            <p style="font-size:1.2rem; color:#999;">Which brand best represents:</p>
            <p style="font-size:1.6rem; font-weight:700; color:#111; margin-bottom:4vh;">${attr}</p>
          </div>`;
      },
      choices: respondentIsMobile ? ['0','1','2','3'] : ['a','s','k','l'],
      button_html: respondentIsMobile
        ? (choice, index) => {
            const img = imagePaths[index];
            return `
              <button style="background:none; border:none; width:47%; aspect-ratio:1/1; 
                             border-radius:12px; box-shadow:0 4px 12px rgba(0,0,0,0.15); overflow:hidden;">
                <img src="${img}" style="width:100%; height:100%; object-fit:contain;" />
              </button>`;
          }
        : undefined,
      data: {
        part: partLabel,
        respondent_id: respondentId,
        attribute: vars.attribute,
        image_names: imageNames,
        image_paths: imagePaths,
        // ✅ preserve correct_image only for pretest
        correct_image: isPretest ? vars.correct_image : null
      },
      on_finish: function(data) {
        let selectedImage;

        if (respondentIsMobile) {
          selectedImage = data.image_names[data.response];
        } else {
          const keyToIndex = { 'a': 0, 's': 1, 'k': 2, 'l': 3 };
          const idx = keyToIndex[data.response];
          selectedImage = data.image_names[idx];
        }

        data.selected_image = selectedImage;

        // ✅ Mark accuracy for pretests
        if (vars.correct_image) {
          data.correct_image = vars.correct_image;  // make sure it stays visible
          data.accurate = (selectedImage === vars.correct_image);
        }
      }

    };

    trials.push(trial);

    if (respondentIsMobile) {
      trials.push({
        type: jsPsychHtmlKeyboardResponse,
        stimulus: '',
        choices: "NO_KEYS",
        trial_duration: 20,
        data: { trial_category: 'mobile_breaker' }
      });
    }
  });

  return trials;
}

  //--------------------------------------------Generate Flat Pre Test--------------------------------------------------------------------------------------------------------------

// 🔧 Generate pretest trials as flat array
// function generatePretestTrials(images, attributes, respondentId) {
//   const trials = [];
//   const trialPairs = [];


//   images.forEach(img => {
//     attributes.forEach(attr => {
//       // Build a trial object directly, not timelineVariables
//       const trial = {
//         type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//         stimulus: () => {
//           return `
//             <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:100%; width:100%;">
//               <!-- IMAGE BOX -->
//               <div style="
//                 background-color: rgb(216,212,212);
//                 border-radius: 8px;
//                 padding: 1.5vh 2.5vw;
//                 margin-bottom: 2vh;
//                 width: 80%;
//                 max-width: 700px;
//                 text-align: center;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//               ">
//                 <p style="font-size: clamp(1rem, 2.5vw, 1.3rem); color: #999; margin-bottom: 1vh;">Stim</p>
//                 <img src="${img.img}" alt="${img.name}" style="
//                   width:auto; max-width:100%;
//                   height: clamp(30vh, 50vh, 60vh);
//                   object-fit:contain;
//                   margin-bottom:1vh;
//                 "/>
//               </div>

//               <!-- ATTRIBUTE BOX -->
//               <div style="
//                 background-color: #fff;
//                 border-radius: 10px;
//                 padding: 1.5vh 2.5vw;
//                 margin-bottom: 3vh;
//                 width: 80%;
//                 max-width: 400px;
//                 text-align:center;
//                 box-shadow: 0 4px 12px rgba(0,0,0,0.1);
//               ">
//                 <p style="font-size: clamp(2rem, 5.5vw, 4rem);
//                           font-weight: 700;
//                           color: #111;
//                           margin: 0;
//                           line-height:1;">
//                   ${attr}
//                 </p>
//               </div>

//               ${
//                 respondentIsMobile
//                   ? ''
//                   : `
//                     <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
//                       <div style="text-align:center;">
//                         <div style="background-color:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:250px;">
//                           <div style="font-weight:bold;">[E]</div>
//                           <div>Fits</div>
//                         </div>
//                       </div>
//                       <div style="text-align:center;">
//                         <div style="background-color:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:250px;">
//                           <div style="font-weight:bold;">[I]</div>
//                           <div>Does not fit</div>
//                         </div>
//                       </div>
//                     </div>
//                   `
//               }
//             </div>
//           `;
//         },
//         choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],
//         button_html: respondentIsMobile
//           ? (choice, index) => `
//               <button style="
//                 font-size: clamp(2rem, 6vw, 6rem);
//                 font-weight:600;
//                 padding:3vh 2vw;
//                 border-radius:2vw;
//                 border:none;
//                 background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
//                 color:white;
//                 box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
//                 width:40vw;
//               ">${choice}</button>`
//           : undefined,
//         data: {
//           part: "pretest_single_implicit",
//           respondent_id: respondentId,
//           img_src: img.img,
//           category_name: img.name,
//           attribute: attr,
//           is_correct: img.correct.includes(attr)
//         },
//         on_finish: function (data) {
//           let userSaysFits;
//           if (respondentIsMobile) {
//             userSaysFits = data.response === 0;
//           } else {
//             userSaysFits = data.response === 'e';
//           }
//           data.user_answer = userSaysFits ? "Fits" : "Does not fit";
//           data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
//           data.accurate = (userSaysFits === data.is_correct);
//         },
//         show_progress_bar: true  // ✅ progress bar updates every trial
//       };

//      const pair = [trial];

//       if (respondentIsMobile) {
//         pair.push({
//           type: jsPsychHtmlKeyboardResponse,
//           stimulus: '',
//           choices: "NO_KEYS",
//           trial_duration: 20,
//           data: { trial_category: 'mobile_breaker' }
//         });
//       }

//       trialPairs.push(pair);
//     });
//   });

//   // Shuffle the trial+breaker pairs
//   return jsPsych.randomization.shuffle(trialPairs).flat();
// }

// // ✅ Build once
// const pretest_trials = generatePretestTrials(pretest_images, pretest_attributes, respondent_id);

function generatePretestTrials(images, attributes, respondentId, mode="balanced") {
  // mode can be "correct_only", "balanced", or "extended"
  const trials = [];
  const trialPairs = [];

  images.forEach(img => {
    // Correct attributes
    const correctAttrs = img.correct;

    if (mode === "correct_only") {
      // Only correct attributes
      correctAttrs.forEach(attr => {
        trialPairs.push(makeTrial(img, attr, respondentId));
      });

    } else {
      // For balanced/extended, include distractors
      const distractors = attributes.filter(a => !correctAttrs.includes(a));
      const numDistractors = (mode === "balanced") ? 1 : 2;

      correctAttrs.forEach(attr => {
        // Always include the correct one
        trialPairs.push(makeTrial(img, attr, respondentId));
      });

      // Add random distractors
      const sampled = jsPsych.randomization.sampleWithoutReplacement(distractors, numDistractors);
      sampled.forEach(attr => {
        trialPairs.push(makeTrial(img, attr, respondentId));
      });
    }
  });

  // Shuffle and flatten (mobile breaker support stays the same)
  return jsPsych.randomization.shuffle(trialPairs).flat();
}

function makeTrial(img, attr, respondentId) {
  const trial = {
    type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
    stimulus: () => `
     
  <div style="display:flex; flex-direction:column; align-items:center; justify-content:center; height:70vh;">
    <!-- IMAGE -->
    <div style="background:#ddd; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center;">
      <img src="${img.img}" alt="${img.name}" style="max-height:40vh; object-fit:contain;" />
    </div>

    <!-- ATTRIBUTE -->
    <div style="background:#fff; border-radius:12px; padding:3vh 4vw; margin-bottom:4vh; text-align:center; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
      <p style="font-size:2rem; font-weight:700; color:#111;">${attr}</p>
    </div>

    <!-- DESKTOP FAKE BUTTONS -->
    <div style="display:flex; justify-content:center; gap:120px; font-size:20px;">
      <div style="text-align:center;">
        <div style="background:rgb(32,150,11); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="font-weight:bold;">[E]</div>
          <div>Fits</div>
        </div>
      </div>
      <div style="text-align:center;">
        <div style="background:rgb(105,135,236); border-radius:12px; padding:15px 25px; width:200px; box-shadow:0 4px 12px rgba(0,0,0,0.1);">
          <div style="font-weight:bold;">[I]</div>
          <div>Does not fit</div>
        </div>
      </div>
    </div>
  </div>
`  ,  choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],

    button_html: respondentIsMobile ? (choice, index) => `
      <button style="
        font-size:clamp(2rem,6vw,6rem);
        font-weight:600;
        padding:3vh 2vw;
        border-radius:2vw;
        border:none;
        background-color:${index===0 ? 'rgb(32,150,11)' : 'rgb(105,135,236)'};
        color:white;
        width:40vw;
        box-shadow:0 0.5vw 1.5vw rgba(0,0,0,0.2);
      ">${choice}</button>` : undefined,

    data: {
      part: "pretest_single_implicit",
      respondent_id: respondentId,
      img_src: img.img,
      category_name: img.name,
      attribute: attr,
      is_correct: img.correct.includes(attr)
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
return trial};

const pretest_trials = generatePretestTrials(pretest_images, pretest_attributes, respondent_id, 'balanced');

// ✅ Flatten directly into main timeline

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
// console.log(multi_brand_trials)


//----------------------------------------------------LOOP TO TRACK RESPONSE TIME------------------------------------------------------------------------------
function wrapTrialWithRTCheck(trial) {
  return {
    timeline: [
      trial,
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function () {
          const last = jsPsych.data.get().last(1).values()[0];
          if (last.rt < minRT) {
            return `<p style="font-size:2rem; color:red;">
                      ⚡ Too fast! Please slow down.<br>
                      Press any key to repeat the same trial.
                    </p>`;
          }
          if (last.rt > maxRT) {
            return `<p style="font-size:2rem; color:red;">
                      🐢 Too slow! Please respond faster.<br>
                      Press any key to repeat the same trial.
                    </p>`;
          }
          return ""; // ✅ just an empty string, never "null"
        },
        choices: "ALL_KEYS",
        trial_duration: function () {
          const last = jsPsych.data.get().last(1).values()[0];
          return (last.rt < minRT || last.rt > maxRT) ? null : 0;
          // ✅ if valid → 0ms duration, trial ends instantly (no click)
        },
        on_finish: function (data) {
          data.is_feedback = true;
        }
      }
    ],
    loop_function: function () {
      const last = jsPsych.data.get().last(2).values()[0];
      const tooFast = last.rt < minRT;
      const tooSlow = last.rt > maxRT;
      return (tooFast || tooSlow);
    }
  };
}

//--------------------------------------------------------------------------------------------------------------------------------------------------------
//------------------------------------------LOOP TO TRACK PRETEST ACCURACY--------------------------------------------------------------------------------
function wrapPretestBlock(trials, minCorrect, partLabel) {
  return {
    timeline: [
      {
        timeline: trials
      },
      {
        type: jsPsychHtmlKeyboardResponse,
        stimulus: function() {
          // ✅ Grab only the last block that was just run
          const blockData = jsPsych.data.get().last(trials.length);

          const correctCount = blockData.filter({accurate: true}).count();
          const totalCount   = blockData.count();

          if (correctCount >= minCorrect) {
            return `<p style="font-size:2rem; color:green;">
                      ✅ You got ${correctCount} out of ${totalCount} correct.<br>
                      Great! Moving on.
                    </p>`;
          } else {
            return `<p style="font-size:2rem; color:red;">
                      ❌ You only got ${correctCount} out of ${totalCount} correct.<br>
                      Please try again.
                    </p>`;
          }
        },
        choices: "ALL_KEYS",
        on_finish: function(data) {
          data.is_feedback = true;
        }
      }
    ],
    loop_function: function() {
      const blockData = jsPsych.data.get().last(trials.length);
      const correctCount = blockData.filter({accurate: true}).count();

      return correctCount < minCorrect; // ✅ repeat if accuracy too low
    }
  };
}


//---------------------------------------------------------------------------------------------------------------------------------------------------------

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
//--------ADDING SINGLE PRE-TEST TRIALS TO TIMELINE------------------------------------------------------------------------------------------------

const pretestBlock = wrapPretestBlock(pretest_trials, 6 , "pretest_single_implicit");
timeline.push(pretestBlock);
//------------------------------------------------------------------------------------------------------

// const singleImplicitTrial = {
//   type: respondentIsMobile ? jsPsychHtmlButtonResponse : jsPsychHtmlKeyboardResponse,
//   stimulus: function () {
//     const imgSrc = jsPsych.timelineVariable('img_src');
//     const attr   = jsPsych.timelineVariable('attribute');
//     const cat    = jsPsych.timelineVariable('img_name');

//     return `<div style="display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100%; width: 100%;">

//   <!-- IMAGE BOX -->
//   <div style="
//     background-color: rgb(216, 212, 212);
//     border-radius: 8px;
//     padding: 1.5vh 2.5vw;
//     margin-bottom: 2vh;
//     width: 80%;
//     max-width: 700px;
//     text-align: center;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   ">
//     <p style="font-size: clamp(1rem, 2.5vw, 1.3rem); color: #999; margin-bottom: 1vh;">Stim</p>
//     <img src="${imgSrc}" 
//          alt="${cat}" 
//          style="
//            width: auto;
//            max-width: 100%;
//            height: clamp(30vh, 50vh, 60vh);
//            object-fit: contain;
//            margin-bottom: 1vh;
//          " />
//   </div>

//   <!-- ATTRIBUTE BOX -->
//   <div style="
//     background-color: #ffffff;
//     border-radius: 10px;
//     padding: 1.5vh 2.5vw;
//     margin-bottom: 3vh;
//     width: 80%;
//     max-width: 400px;
//     text-align: center;
//     box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
//   ">
//     <p style="
//       font-size: clamp(2rem, 5.5vw, 4rem); 
//       font-weight: 700; 
//       color: #111; 
//       margin: 0;
//       line-height: 1;
//       text-align: center;
//       word-wrap: break-word;
//       overflow-wrap: break-word;
//       width: 100%;
//     ">
//       ${attr}
//     </p>
//   </div>

// </div>


//     ${
//       respondentIsMobile
//         ? '' // buttons will be rendered by jsPsychHtmlButtonResponse
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
//   },

//   // Choices
//   choices: respondentIsMobile ? ['Fits', 'Does not fit'] : ['e', 'i'],

//   // Side-by-side BIG MOBILE BUTTONS
//   button_html: respondentIsMobile
//     ? (choice, index) => {
//         return `
//           <button style="
//             font-size: clamp(2rem, 6.0vw, 6.0rem);
//             font-weight: 600;
//             padding: 3vh 2vw;
//             border-radius: 2vw;
//             border: none;
//             background-color: ${index === 0 ? 'rgb(32, 150, 11)' : 'rgb(105, 135, 236)'};
//             color: white;
//             box-shadow: 0 0.5vw 1.5vw rgba(0,0,0,0.2);
//             cursor: pointer;
//             width: 40vw;
//           ">${choice}</button>`;
//       }
//     : undefined,

//   data: {
//     part: "pretest_single_implicit",
//     respondent_id: respondent_id,
//     img_src: jsPsych.timelineVariable('img_src'),
//     attribute: jsPsych.timelineVariable('attribute'),
//     category_name: jsPsych.timelineVariable('img_name'),
//     is_correct: jsPsych.timelineVariable('is_correct')
//   },

//   on_finish: function(data) {
//     let userSaysFits;
//     if (respondentIsMobile) {
//       userSaysFits = data.response === 0;
//     } else {
//       userSaysFits = data.response === 'e';
//     }
//     data.user_answer = userSaysFits ? "Fits" : "Does not fit";
//     data.correct_answer = data.is_correct ? "Fits" : "Does not fit";
//     data.accurate = (userSaysFits === data.is_correct);
//   }
// };

// const mobileBreakerTrial = {
//   type: jsPsychHtmlKeyboardResponse,
//   stimulus: '',
//   choices: "NO_KEYS",
//   trial_duration: 20,
//   data: { trial_category: 'mobile_breaker' },
//   on_finish: function(data){
//     // Optional: clear out fields so it's obvious to drop
//     data.trial_type = 'mobile_breaker';
//   }
// };

const categoryFit_flat = generateFlatTrials(category_fit_trials, respondent_id, "Single Category IAT");
const singleTrialsWithCheck = categoryFit_flat.map(t => wrapTrialWithRTCheck(t));
timeline.push(...singleTrialsWithCheck);



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
timeline: multi_pretest_intro});
// timeline_variables: pretest_trials_multiple,
// randomize_order: true
// });

//------------------------------------------------------------------------------------------------------
//Multiple Implicit Pretest Images Trial 
//------------------------------------------------------------------------------------------------------
const multi_pretest_flat = generateFlatMultiBrandTrials(pretest_trials_multiple, respondent_id, "pretest_multiple_implicit", true);
const multipretestBlock = wrapPretestBlock(multi_pretest_flat, 7, "pretest_single_implicit");
timeline.push(multipretestBlock);




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


//------------------------------------------------------------------------------------------------------
// Multiple Implicit Brand Test
//------------------------------------------------------------------------------------------------------
const multi_main_flat = generateFlatMultiBrandTrials(multi_brand_trials, respondent_id, "Multiple IAT");
const multiple_brand_trials_with_check = multi_main_flat.map(t => wrapTrialWithRTCheck(t));
timeline.push(...multiple_brand_trials_with_check);


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
      <p> Please keep this window open </p>
      <p> until you are redirected.</p>
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


