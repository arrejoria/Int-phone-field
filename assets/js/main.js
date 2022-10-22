import * as module from './data.js'

module.Countries()

//Show the selected country
const selectedCountry = document.querySelector('.ipf__country-code')

document.addEventListener('DOMContentLoaded', hanndlePhoneField)

//Handle show and hide country list
const countryList = document.querySelector('.ipf__country-list')
const countryListButton = document.querySelector('.ipf__country-selected')

countryListButton.addEventListener('click', handleCountryList)

function handleCountryList () {
  countryList.classList.toggle('ipf__flags-show')
}

function hanndlePhoneField () {
  setCountry()

  if (countryList) {
    countryList.addEventListener('click', e => {
      removeActive()

      const countryItem = e.target.closest('.ipf__country')

      if (countryItem) {
        countryItem.classList.add('ipf__active')
      }

      const countrySelected = document.querySelector('.ipf__active')

      if (countrySelected) {
        const dialCode = countrySelected.getAttribute('data-dial-code')
        const countryCode = countrySelected.getAttribute('data-country-code')

        selectedCountry.textContent = '+' + dialCode

        setSelectedFlag(countryCode)
        ariaSelected()
        setPlaceholder()
        handleCountryList()
      }

      function ariaSelected () {
        const country = document.querySelectorAll('.ipf__country')
        country.forEach(country => {
          country.setAttribute('aria-selected', 'false')
        })

        countrySelected.setAttribute('aria-selected', 'true')
      }
    })
  }

  function setSelectedFlag (flagCode) {
    const activeFlag = document.querySelector('.ipf__flag-selected .ipf__flag')
    activeFlag.classList.add('ipf__' + flagCode)

    if (activeFlag.classList[1] !== 'ipf__' + flagCode) {
      activeFlag.classList.replace(activeFlag.classList[1], 'ipf__' + flagCode)
    }
  }

  function removeActive () {
    const isActive = document.querySelectorAll('.ipf__active')

    isActive.forEach(country => {
      country.classList.remove('ipf__active')
    })
  }

  function setCountry () {
    const selected = document.querySelector('[aria-selected="true"]')
    if (selected) {
      const countryCode = selected.getAttribute('data-country-code')
      const dialCode = selected.getAttribute('data-dial-code')
      selectedCountry.textContent = '+' + dialCode

      setSelectedFlag(countryCode)
    }

    setPlaceholder()
  }
}

//Handle input with country code
const phone = document.querySelector('.ipf__phone-number')
phone.addEventListener('input', getPhoneNumber)

function getPhoneNumber () {
  const country = document.querySelector('.ipf__country-code').textContent
  const countryValue = country.replace('+', '')

  const fullPhone = countryValue + phone.value
}

//Handle phone placeholder
function setPlaceholder () {
  const country = document.querySelector('.ipf__country-code').textContent
  const countryValue = country.replace('+', '')

  if (countryValue === '54') {
    phone.placeholder = '011 3456-7890'
  } else {
    phone.placeholder = '(555) 555-5555'
  }
}
