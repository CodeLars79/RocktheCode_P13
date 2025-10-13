import { useState, useEffect, useRef } from 'react'
import './Filters.css'
import Button from '../Button/Button'

const Filters = ({ posters, onFilter }) => {
  const [selectedFilters, setSelectedFilters] = useState({
    color: null,
    format: null,
    orientation: null,
    style: null,
    price: null
  })

  const [options, setOptions] = useState({
    color: [],
    format: [],
    orientation: [],
    style: []
  })

  const [openDropdown, setOpenDropdown] = useState({})
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const containerRef = useRef(null)

  const priceOptions = ['Free', 10, 20, 30]

  useEffect(() => {
    if (!posters) return

    const extractOptions = (prop) => {
      const values = posters.flatMap((p) => p[prop] || [])
      return Array.from(new Set(values))
    }

    setOptions({
      color: extractOptions('color'),
      format: extractOptions('format'),
      orientation: extractOptions('orientation'),
      style: extractOptions('style')
    })
  }, [posters])

  useEffect(() => {
    if (!posters) return

    const filtered = posters.filter((p) => {
      const colorMatch =
        !selectedFilters.color || p.color.includes(selectedFilters.color)
      const formatMatch =
        !selectedFilters.format || p.format.includes(selectedFilters.format)
      const orientationMatch =
        !selectedFilters.orientation ||
        p.orientation.includes(selectedFilters.orientation)
      const styleMatch =
        !selectedFilters.style || p.style.includes(selectedFilters.style)

      const priceMatch =
        selectedFilters.price == null
          ? true
          : selectedFilters.price === 0
          ? p.isFree === true
          : p.price === selectedFilters.price

      return (
        colorMatch &&
        formatMatch &&
        orientationMatch &&
        styleMatch &&
        priceMatch
      )
    })

    onFilter(filtered)
  }, [selectedFilters, posters, onFilter])

  const toggleDropdown = (category) => {
    setOpenDropdown((prev) => {
      const isCurrentlyOpen = !!prev[category]
      return { [category]: !isCurrentlyOpen }
    })
  }

  const selectOption = (category, value) => {
    setSelectedFilters((prev) => ({
      ...prev,
      [category]: value
    }))
    setOpenDropdown((prev) => ({ ...prev, [category]: false }))
  }

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setOpenDropdown({})
      }
    }
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [])

  return (
    <>
      <button
        className='filters-toggle-btn'
        onClick={() => setIsMenuOpen((prev) => !prev)}
      >
        {isMenuOpen ? 'Close Filters ✕' : 'Filters ⚙️'}
      </button>

      {isMenuOpen && (
        <div
          className='filters-overlay'
          onClick={() => setIsMenuOpen(false)}
        ></div>
      )}

      <div
        className={`filters ${isMenuOpen ? 'menu-open' : ''}`}
        ref={containerRef}
      >
        <button
          className='filters-close-btn'
          onClick={() => setIsMenuOpen(false)}
          aria-label='Close filters'
        >
          ✕
        </button>

        {['color', 'format', 'orientation', 'style'].map((category) => (
          <div key={category} className='filter-dropdown'>
            <button
              type='button'
              className='filter-title'
              onClick={() => toggleDropdown(category)}
            >
              {selectedFilters[category] ||
                category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
            <div
              className={`filter-options ${
                openDropdown[category] ? 'open' : ''
              }`}
            >
              {options[category].map((opt) => (
                <div
                  key={opt}
                  className={`filter-option ${
                    selectedFilters[category] === opt ? 'selected' : ''
                  }`}
                  onClick={() => selectOption(category, opt)}
                >
                  {opt}
                </div>
              ))}
            </div>
          </div>
        ))}

        <div className='filter-dropdown'>
          <button
            type='button'
            className='filter-title'
            onClick={() => toggleDropdown('price')}
          >
            {selectedFilters.price === 0
              ? 'Free'
              : selectedFilters.price
              ? selectedFilters.price
              : 'Price'}
          </button>
          <div className={`filter-options ${openDropdown.price ? 'open' : ''}`}>
            {priceOptions.map((p) => {
              const value = p === 'Free' ? 0 : p
              return (
                <div
                  key={p}
                  className={`filter-option ${
                    selectedFilters.price === value ? 'selected' : ''
                  }`}
                  onClick={() => selectOption('price', value)}
                >
                  {p}
                </div>
              )
            })}
          </div>
        </div>

        <Button
          text='Clear Filters'
          size='small'
          variant='primary'
          onClick={() =>
            setSelectedFilters({
              color: null,
              format: null,
              orientation: null,
              style: null,
              price: null
            })
          }
        />
      </div>
    </>
  )
}

export default Filters
