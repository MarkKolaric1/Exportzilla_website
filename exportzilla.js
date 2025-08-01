(function() {
  // Add custom styles for the slider
  const style = document.createElement('style');
  style.textContent = `
    body, html, #Range-slider, #custom-range-slider, #range-slider-value, #range-slider-max-label {
      font-family: 'Golos Text', Arial, sans-serif;
    }
    #custom-range-slider {
      -webkit-appearance: none;
      width: 80%;
      height: 6px;
      background: #e0e0e0;
      border-radius: 3px;
      outline: none;
      margin-top: 24px;
      position: relative;
    }
    #custom-range-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      appearance: none;
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #864dff;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 2px solid #fff;
      margin-top: -9px;
      position: relative;
      z-index: 2;
    }
    #custom-range-slider::-moz-range-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #864dff;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 2px solid #fff;
      position: relative;
      z-index: 2;
    }
    #custom-range-slider::-ms-thumb {
      width: 24px;
      height: 24px;
      border-radius: 50%;
      background: #864dff;
      cursor: pointer;
      box-shadow: 0 2px 6px rgba(0,0,0,0.15);
      border: 2px solid #fff;
      position: relative;
      z-index: 2;
    }
    #custom-range-slider::-webkit-slider-runnable-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, #864dff 0%, #864dff var(--slider-percent, 0%), #e0e0e0 var(--slider-percent, 0%), #e0e0e0 100%);
    }
    #custom-range-slider::-ms-fill-lower {
      background: #864dff;
    }
    #custom-range-slider::-ms-fill-upper {
      background: #e0e0e0;
    }
    #custom-range-slider::-moz-range-track {
      height: 6px;
      border-radius: 3px;
      background: linear-gradient(to right, #864dff 0%, #864dff var(--slider-percent, 0%), #e0e0e0 var(--slider-percent, 0%), #e0e0e0 100%);
    }
    #custom-range-slider:focus {
      outline: none;
    }
    #range-slider-value {
      position: absolute;
      color: #131b23;
      font-weight: 500;
      font-style: normal;
      font-size: 14px;
      line-height: 150%;
      pointer-events: none;
      transform: translate(-50%, 0);
      top: 38px;
      left: 0;
      z-index: 3;
      /* No transition for instant update */
    }
    #range-slider-max-label {
      position: absolute;
      right: 0;
      top: -28px;
      color: #131b23;
      font-size: 14px;
      font-weight: 500;
      font-style: normal;
      line-height: 150%;
      background: #fff;
      padding: 2px 8px;
      border-radius: 6px;
      z-index: 4;
      pointer-events: none;
    }
    #Range-slider {
      position: relative;
      min-height: 70px;
    }
  `;
  // Add Golos Text font from Google Fonts if not present
  if (!document.getElementById('golos-text-font')) {
    const fontLink = document.createElement('link');
    fontLink.id = 'golos-text-font';
    fontLink.rel = 'stylesheet';
    fontLink.href = 'https://fonts.googleapis.com/css2?family=Golos+Text:wght@400;500;600&display=swap';
    document.head.appendChild(fontLink);
  }
  document.head.appendChild(style);
})();
(function() {
  // Create and insert the range slider in the div with id 'Range-slider'
  document.addEventListener('DOMContentLoaded', function() {
    const sliderDiv = document.getElementById('Range-slider');
    if (sliderDiv) {
      // Create input[type=range]
      const slider = document.createElement('input');
      slider.type = 'range';
      slider.min = '1';
      slider.max = '20000'; // Set a reasonable max value for the slider
      slider.step = '25';
      slider.value = '250';
      slider.id = 'custom-range-slider';
      slider.style.width = '100%';

      // Create label to show value under thumb
      const valueLabel = document.createElement('span');
      valueLabel.id = 'range-slider-value';
      valueLabel.textContent = slider.value;

      // Create input to show and set value above right
      const maxInput = document.createElement('input');
      maxInput.id = 'range-slider-max-label';
      maxInput.type = 'text';
      maxInput.value = slider.value;
      maxInput.style.position = 'absolute';
      maxInput.style.right = '0';
      maxInput.style.top = '-28px';
      //maxInput.style.bottom = '28px'
      maxInput.style.color = '#131b23';
      maxInput.style.fontSize = '14px';
      maxInput.style.fontWeight = '500';
      maxInput.style.fontStyle = 'normal';
      maxInput.style.lineHeight = '150%';
      maxInput.style.background = '#fff';
      maxInput.style.padding = '2px 8px';
      maxInput.style.borderRadius = '6px';
      maxInput.style.zIndex = '4';
      maxInput.style.pointerEvents = 'auto';
      maxInput.style.width = '70px';
      maxInput.style.textAlign = 'right';
      maxInput.style.border = '1px solid #ccc';
      sliderDiv.style.position = 'relative';
      sliderDiv.appendChild(maxInput);

      // Add slider and value label to the div
      sliderDiv.appendChild(slider);
      sliderDiv.appendChild(valueLabel);

      // Function to update label position and color track
      function updateLabelAndTrack() {
        const min = parseInt(slider.min, 10);
        const max = parseInt(slider.max, 10);
        const val = parseInt(slider.value, 10);
        const percent = ((val - min) / (max - min));
        // Position label under the thumb
        const thumbWidth = 24; // px, matches CSS
        const sliderWidth = slider.offsetWidth;
        const left = percent * (sliderWidth - thumbWidth) + thumbWidth / 2;
        valueLabel.style.left = left + 'px';
        valueLabel.textContent = slider.value;
        // Set CSS variable for track color
        slider.style.setProperty('--slider-percent', (percent * 100) + '%');
        // Update max input
        maxInput.value = slider.value;
      }
      // Initial position
      updateLabelAndTrack();
      // Update on slider input
      slider.addEventListener('input', updateLabelAndTrack);
      // Update slider when maxInput changes
      maxInput.addEventListener('change', function() {
        let v = parseInt(maxInput.value.replace(/\D/g, ''), 10);
        if (isNaN(v)) v = parseInt(slider.min, 10);
        v = Math.max(parseInt(slider.min, 10), Math.min(parseInt(slider.max, 10), v));
        slider.value = v;
        updateLabelAndTrack();
        // Optionally, trigger any other slider listeners
        slider.dispatchEvent(new Event('input'));
      });
    }
  });
})();
  // Hide the selected-regions and all selected-categories-* at the start
  document.addEventListener('DOMContentLoaded', () => {
    // Hide all region tags/containers at the start
    const regionContainers = [
      'selected-regions-asia',
      'selected-regions-me',
      'selected-regions-africa',
      'selected-regions-europe',
      'selected-regions-caribbean',
      'selected-regions-central-america',
      'selected-regions-north-america',
      'selected-regions-south-america',
      'selected-regions-oceania'
    ];
    regionContainers.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
    // Hide all selected-categories-* containers at the start
    const automobileCategoryIds = [
      'BMW', 'Audi', 'Mercedes'
    ];
    const categoryContainers = [
      'selected-categories-automobile',
      // Add more category containers here as needed
    ];
    categoryContainers.forEach(id => {
      const el = document.getElementById(id);
      if (el) el.style.display = 'none';
    });
  });
  // Asia countries
  const asiaCountryIds = [
    'Afghanistan', 'Armenia', 'Azerbaijan', 'Bangladesh', 'Bhutan', 'Brunei', 'Cambodia', 'China', 'Georgia', 'India', 'Indonesia', 'Japan', 'Kazakhstan', 'Kyrgyzstan', 'Laos', 'Malaysia', 'Maldives', 'Mongolia', 'Myanmar', 'Nepal', 'North-Korea', 'Pakistan', 'Philippines', 'Singapore', 'South-Korea', 'Sri-Lanka', 'Taiwan', 'Tajikistan', 'Thailand', 'Timor-Leste', 'Turkmenistan', 'Uzbekistan', 'Vietnam'
  ];
  // Middle-East countries
  const meCountryIds = [
    'Bahrain', 'Egypt', 'Iran', 'Iraq', 'Israel', 'Jordan', 'Kuwait', 'Lebanon', 'Oman', 'Qatar', 'Saudi-Arabia', 'Syria', 'Turkey', 'United-Arab-Emirates', 'Yemen'
  ];

  // Africa countries
  const africaCountryIds = [
    'Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina-Faso', 'Burundi', 'Cabo-Verde', 'Cameroon', 'CAF', 'Chad', 'Comoros', 'Congo', 'DR-Congo', 'C-te-d-Ivoire', 'Djibouti', 'Equatorial-Guinea', 'Eritrea', 'Eswatini', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Rwanda', 'S-o-Tom--and-Pr-ncipe', 'Senegal', 'Seychelles', 'Sierra-Leone', 'Somalia', 'South-Africa', 'South-Sudan', 'Sudan', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'
  ];

  // Europe countries
  const europeCountryIds = [
    'Albania', 'Andorra', 'Austria', 'Belarus', 'Belgium', 'Bosnia-Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czech-Republic', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Italy', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'North-Macedonia', 'Norway', 'Poland', 'Portugal', 'Romania', 'Russia', 'San-Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United-Kingdom', 'Vatican-City'
  ];

  // Caribbean countries
  const caribbeanCountryIds = [
    'Antigua-and-Barbuda', 'Bahamas', 'Barbados', 'Cuba', 'Dominica', 'Dominican-Republic', 'Grenada', 'Haiti', 'Jamaica', 'Saint-Kitts-and-Nevis', 'Saint-Lucia', 'Saint-Vincent-and-the-Grenadines', 'Trinidad-and-Tobago'
  ];

  // Central America countries
  const centralAmericaCountryIds = [
    'Belize', 'Costa-Rica', 'El-Salvador', 'Guatemala', 'Honduras', 'Nicaragua', 'Panama'
  ];

  // North America countries
  const northAmericaCountryIds = [
    'Canada', 'Mexico', 'United-States'
  ];

  // South America countries
  const southAmericaCountryIds = [
    'Argentina', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Ecuador', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela'
  ];

  // Oceania countries
  const oceaniaCountryIds = [
    'Australia', 'Fiji', 'Kiribati', 'Marshall-Islands', 'Micronesia', 'Nauru', 'New-Zealand', 'Palau', 'Papua-New-Guinea', 'Samoa', 'Solomon-Islands', 'Tonga', 'Tuvalu', 'Vanuatu'
  ];

  // --- Price Calculation Function ---

  // Live price update on checkbox and slider changes
  document.addEventListener('DOMContentLoaded', function() {
    // Function to update price display
    function updatePriceDisplay() {
      const price = calculatePrice();
      const priceEl = document.getElementById('calculated-price');
      if (priceEl) {
        priceEl.textContent = price + ' RUB';
      }
    }

    // Listen for changes on all country checkboxes
    const allCountryIds = [
      ...asiaCountryIds, ...meCountryIds, ...africaCountryIds, ...europeCountryIds,
      ...caribbeanCountryIds, ...centralAmericaCountryIds, ...northAmericaCountryIds,
      ...southAmericaCountryIds, ...oceaniaCountryIds
    ];
    allCountryIds.forEach(id => {
      const cb = document.getElementById(id);
      if (cb) {
        cb.addEventListener('change', updatePriceDisplay);
      }
    });

    // Listen for slider changes
    const slider = document.getElementById('custom-range-slider');
    if (slider) {
      slider.addEventListener('input', updatePriceDisplay);
    }

    // Initial price display
    updatePriceDisplay();
  });
function calculatePrice() {
  // Get slider value (number of rows)
  const slider = document.getElementById('custom-range-slider');
  const rows = slider ? parseInt(slider.value, 10) : 250;
  const minRows = 250;
  const minPrice = 3000;
  const extraPricePerRow = 5;
  if (rows <= minRows) return minPrice;
  return minPrice + (rows - minRows) * extraPricePerRow;
}

  // Optional: Helper to get checked country/category names (for order details)
  function getCheckedCountries() {
    const allCountryIds = [
      ...countryIds, ...meCountryIds, ...africaCountryIds, ...europeCountryIds,
      ...caribbeanCountryIds, ...centralAmericaCountryIds, ...northAmericaCountryIds,
      ...southAmericaCountryIds, ...oceaniaCountryIds
    ];
    return allCountryIds.filter(id => {
      const cb = document.getElementById(id);
      return cb && cb.checked;
    });
  }
  // function getCheckedCategories() {
  //   return Array.from(document.querySelectorAll('.category-checkbox')).filter(cb => cb.checked).map(cb => cb.value || cb.id);
  // }

  document.addEventListener('change', event => {
    const el = event.target;

    // 0. Category checkbox toggled? (any category)
    const automobileCategoryIds = [
      'BMW', 'Audi', 'Mercedes'
    ];
    // If a child category (BMW, Audi, Mercedes) is toggled, show/hide the Automobile container
    if (automobileCategoryIds.includes(el.id)) {
      const container = document.getElementById('selected-categories-automobile');
      if (!container) return;
      const anyChecked = automobileCategoryIds.some(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      });
      container.style.display = anyChecked ? 'flex' : 'none';
      updateCategoriesTotal();
    }
    // --- Category Total Update Function ---
    function updateCategoriesTotal() {
      let total = 0;
      const container = document.getElementById('selected-categories-automobile');
      if (container && container.style.display !== 'none') total++;
      // Add more containers as needed for other categories
      const categoriesTotal = document.getElementById('Categories-total');
      if (categoriesTotal) categoriesTotal.textContent = total;
    }

    // 1. Country checkbox toggled? (Asia)
    if (asiaCountryIds.includes(el.id)) {
      updateAsiaTag();
      const parent = document.getElementById('Asia');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = asiaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1b. Country checkbox toggled? (Middle-East)
    if (meCountryIds.includes(el.id)) {
      updateMeTag();
      const parent = document.getElementById('Middle-East');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = meCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1c. Country checkbox toggled? (Africa)
    if (africaCountryIds.includes(el.id)) {
      updateAfricaTag();
      const parent = document.getElementById('Africa');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = africaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1d. Country checkbox toggled? (Europe)
    if (europeCountryIds.includes(el.id)) {
      updateEuropeTag();
      const parent = document.getElementById('Europe');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = europeCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1e. Country checkbox toggled? (Caribbean)
    if (caribbeanCountryIds.includes(el.id)) {
      updateCaribbeanTag();
      const parent = document.getElementById('Caribbean');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = caribbeanCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1f. Country checkbox toggled? (Central America)
    if (centralAmericaCountryIds.includes(el.id)) {
      updateCentralAmericaTag();
      const parent = document.getElementById('Central-America');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = centralAmericaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1g. Country checkbox toggled? (North America)
    if (northAmericaCountryIds.includes(el.id)) {
      updateNorthAmericaTag();
      const parent = document.getElementById('North-America');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = northAmericaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1h. Country checkbox toggled? (South America)
    if (southAmericaCountryIds.includes(el.id)) {
      updateSouthAmericaTag();
      const parent = document.getElementById('South-America');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = southAmericaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }
    // 1i. Country checkbox toggled? (Oceania)
    if (oceaniaCountryIds.includes(el.id)) {
      updateOceaniaTag();
      const parent = document.getElementById('Oceania');
      if (el.checked) {
        if (parent) parent.checked = true;
      } else {
        const anyChecked = oceaniaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (parent && !anyChecked) parent.checked = false;
      }
    }

    // 2. Continent parent toggled?
    const continentIds = [
      'Asia', 'Middle-East', 'Africa', 'Europe', 'Caribbean', 'Central-America', 'North-America', 'South-America', 'Oceania'
    ];
    if (continentIds.includes(el.id)) {
      // Check/uncheck all children as before
      let countryList = [];
      switch (el.id) {
        case 'Asia': countryList = asiaCountryIds; break;
        case 'Middle-East': countryList = meCountryIds; break;
        case 'Africa': countryList = africaCountryIds; break;
        case 'Europe': countryList = europeCountryIds; break;
        case 'Caribbean': countryList = caribbeanCountryIds; break;
        case 'Central-America': countryList = centralAmericaCountryIds; break;
        case 'North-America': countryList = northAmericaCountryIds; break;
        case 'South-America': countryList = southAmericaCountryIds; break;
        case 'Oceania': countryList = oceaniaCountryIds; break;
      }
      countryList.forEach(cid => {
        const cb = document.getElementById(cid);
        if (cb) cb.checked = el.checked;
      });
      // Update tags
      switch (el.id) {
        case 'Asia': updateAsiaTag(); break;
        case 'Middle-East': updateMeTag(); break;
        case 'Africa': updateAfricaTag(); break;
        case 'Europe': updateEuropeTag(); break;
        case 'Caribbean': updateCaribbeanTag(); break;
        case 'Central-America': updateCentralAmericaTag(); break;
        case 'North-America': updateNorthAmericaTag(); break;
        case 'South-America': updateSouthAmericaTag(); break;
        case 'Oceania': updateOceaniaTag(); break;
      }
      // --- Regions-all logic ---
      const regionsAll = document.getElementById('Regions-all');
      if (regionsAll) {
        if (el.checked) {
          if (!regionsAll.checked) regionsAll.checked = true;
        } else {
          // If all continents are now unchecked, uncheck Regions-all
          const anyContinentChecked = continentIds.some(cid => {
            const cb = document.getElementById(cid);
            return cb && cb.checked;
          });
          if (!anyContinentChecked && regionsAll.checked) regionsAll.checked = false;
        }
      }
    }

    // Optionally, keep the old logic for 'Asia' and countryIds for compatibility
    if (el.id === 'Asia') {
      countryIds.forEach(cid => {
        const cb = document.getElementById(cid);
    // --- Cookie Consent Banner Logic ---
    const banner = document.getElementById('cookie-banner');
    const acceptBtn = document.getElementById('cookie-accept');
    if (banner && acceptBtn) {
      // Check if user already accepted
      if (localStorage.getItem('cookieAccepted') === 'true') {
        banner.style.display = 'none';
      } else {
        banner.style.display = '';
        acceptBtn.addEventListener('click', () => {
          localStorage.setItem('cookieAccepted', 'true');
          banner.style.display = 'none';
        });
      }
    }
        if (cb) {
          cb.checked = el.checked;
          console.log('[DEBUG] Set', cid, 'checked to', el.checked);
        }
      });
    }
    if (el.id === 'Middle-East') {
      meCountryIds.forEach(cid => {
        const cb = document.getElementById(cid);
        if (cb) {
          cb.checked = el.checked;
          console.log('[DEBUG] Set', cid, 'checked to', el.checked);
        }
      });
    }

    // If any country is checked, Asia is checked; if all are unchecked, Asia is unchecked
    if (asiaCountryIds.includes(el.id)) {
      const asia = document.getElementById('Asia');
      if (!asia) return;
      if (el.checked) {
        asia.checked = true;
      // [DEBUG] Asia checked set to true removed
      } else {
        const anyChecked = asiaCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (!anyChecked) {
          asia.checked = false;
          // [DEBUG] Asia checked set to false removed
        }
      }
    }
    // If any country is checked, Middle-East is checked; if all are unchecked, Middle-East is unchecked
    if (meCountryIds.includes(el.id)) {
      const me = document.getElementById('Middle-East');
      if (!me) return;
      if (el.checked) {
        me.checked = true;
      // [DEBUG] Middle-East checked set to true removed
      } else {
        const anyChecked = meCountryIds.some(cid => {
          const cb = document.getElementById(cid);
          return cb && cb.checked;
        });
        if (!anyChecked) {
          me.checked = false;
          // [DEBUG] Middle-East checked set to false removed
        }
      }
    }

    function updateAsiaTag() {
      const count = asiaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-asia');
      const subTag = document.getElementById('sub-tag-asia');
      const container = document.getElementById('selected-regions-asia');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Asia'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateMeTag() {
      const count = meCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-me');
      const subTag = document.getElementById('sub-tag-me');
      const container = document.getElementById('selected-regions-me');
      if (!mainTag || !subTag || !container) {
        // [DEBUG] main-tag-me, sub-tag-me, or selected-regions-me container not found
        return;
      }
      if (count > 0) {
        // mainTag.textContent = 'Middle-East'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
        // [DEBUG] main-tag-me set to Middle-East, sub-tag-me set to ...
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
        // [DEBUG] main-tag-me and sub-tag-me cleared and selected-regions-me hidden
      }
      updateRegionsTotal();
    }

    function updateAfricaTag() {
      const count = africaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-africa');
      const subTag = document.getElementById('sub-tag-africa');
      const container = document.getElementById('selected-regions-africa');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Africa'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateEuropeTag() {
      const count = europeCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-europe');
      const subTag = document.getElementById('sub-tag-europe');
      const container = document.getElementById('selected-regions-europe');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Europe'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateCaribbeanTag() {
      const count = caribbeanCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-caribbean');
      const subTag = document.getElementById('sub-tag-caribbean');
      const container = document.getElementById('selected-regions-caribbean');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Caribbean'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateCentralAmericaTag() {
      const count = centralAmericaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-central-america');
      const subTag = document.getElementById('sub-tag-central-america');
      const container = document.getElementById('selected-regions-central-america');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Central America'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateNorthAmericaTag() {
      const count = northAmericaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-north-america');
      const subTag = document.getElementById('sub-tag-north-america');
      const container = document.getElementById('selected-regions-north-america');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'North America'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateSouthAmericaTag() {
      const count = southAmericaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-south-america');
      const subTag = document.getElementById('sub-tag-south-america');
      const container = document.getElementById('selected-regions-south-america');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'South America'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateOceaniaTag() {
      const count = oceaniaCountryIds.filter(cid => {
        const cb = document.getElementById(cid);
        return cb && cb.checked;
      }).length;
      const mainTag = document.getElementById('main-tag-oceania');
      const subTag = document.getElementById('sub-tag-oceania');
      const container = document.getElementById('selected-regions-oceania');
      if (!mainTag || !subTag || !container) return;
      if (count > 0) {
        // mainTag.textContent = 'Oceania'; // No longer set dynamically
        subTag.textContent = count;
        container.style.display = 'flex';
      } else {
        // mainTag.textContent = '';
        subTag.textContent = '';
        container.style.display = 'none';
      }
      updateRegionsTotal();
    }

    function updateRegionsTotal() {
      let total = 0;
      const asiaContainer = document.getElementById('selected-regions-asia');
      const meContainer = document.getElementById('selected-regions-me');
      const africaContainer = document.getElementById('selected-regions-africa');
      const europeContainer = document.getElementById('selected-regions-europe');
      const caribbeanContainer = document.getElementById('selected-regions-caribbean');
      const centralAmericaContainer = document.getElementById('selected-regions-central-america');
      const northAmericaContainer = document.getElementById('selected-regions-north-america');
      const southAmericaContainer = document.getElementById('selected-regions-south-america');
      const oceaniaContainer = document.getElementById('selected-regions-oceania');
      if (asiaContainer && asiaContainer.style.display !== 'none') total++;
      if (meContainer && meContainer.style.display !== 'none') total++;
      if (africaContainer && africaContainer.style.display !== 'none') total++;
      if (europeContainer && europeContainer.style.display !== 'none') total++;
      if (caribbeanContainer && caribbeanContainer.style.display !== 'none') total++;
      if (centralAmericaContainer && centralAmericaContainer.style.display !== 'none') total++;
      if (northAmericaContainer && northAmericaContainer.style.display !== 'none') total++;
      if (southAmericaContainer && southAmericaContainer.style.display !== 'none') total++;
      if (oceaniaContainer && oceaniaContainer.style.display !== 'none') total++;
      const regionsTotal = document.getElementById('Regions-total');
      if (regionsTotal) regionsTotal.textContent = total;
    }
  });

document.addEventListener('DOMContentLoaded', function() {
  // Cookie banner logic
  var banner = document.getElementById('cookie-banner');
  var acceptBtn = document.getElementById('cookie-accept');
  if (banner && acceptBtn) {
    if (localStorage.getItem('cookieAccepted') === 'true') {
      banner.style.display = 'none';
    } else {
      acceptBtn.addEventListener('click', function() {
        try {
          localStorage.setItem('cookieAccepted', 'true');
        } catch (e) {}
        banner.style.display = 'none';
      });
    }
  }

  // Modal open/close logic
  var openBtn = document.getElementById('individual-base-btn');
  var closeBtn = document.getElementById('close-popup');
  var modal = document.getElementById('contact-popup');
  if (openBtn && modal) {
    openBtn.addEventListener('click', function() {
      modal.style.display = 'block';
    });
  }
  if (closeBtn && modal) {
    closeBtn.addEventListener('click', function() {
      modal.style.display = 'none';
    });
  }
});