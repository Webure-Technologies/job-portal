import { useState, useEffect, useRef } from 'react'
import { BiSearch, BiDollar } from 'react-icons/bi'
import { IoLocationOutline } from 'react-icons/io5'
import { AiFillCaretDown, AiFillCaretUp } from 'react-icons/ai'
import Slider from 'rc-slider'
import 'rc-slider/assets/index.css'

const { createSliderWithTooltip }: any = Slider
const Range = createSliderWithTooltip(Slider.Range)

const Navbar = () => {
  const [openSearch, setOpenSearch] = useState(false)

  const searchRef = useRef() as React.MutableRefObject<HTMLDivElement>

  useEffect(() => {
    const checkIfClickedOutside = (e: MouseEvent) => {
      if (openSearch && searchRef.current && !searchRef.current.contains(e.target as Node)) {
        setOpenSearch(false)
      }
    }

    document.addEventListener('mousedown', checkIfClickedOutside)
    return () => document.removeEventListener('mousedown', checkIfClickedOutside)
  }, [openSearch])

  return (
    <div className='bg-white sticky top-0 md:static'>
      <div className='flex items-center justify-between md:px-20 px-6 md:pt-7 pt-5'>
        <div className='flex items-center gap-3'>
          <div className='w-12 h-12 bg-gray-300 rounded-full' />
          <h1>Lorem Ipsum</h1>
        </div>
        <div>
          <button className='bg-[#504ED7] hover:bg-[#2825C2] transition-[background] text-sm text-white px-5 py-2 rounded-md'>
            Sign In
          </button>
        </div>
      </div>
      <div ref={searchRef} className='shadow-lg border-t border-b border-gray-200 md:mt-7 mt-5'>
        <div onClick={() => setOpenSearch(!openSearch)} className='w-fit flex items-center block float-right gap-2 cursor-pointer py-3 px-6 lg:hidden block'>
          <p className='text-sm'>{openSearch ? 'Hide Search' : 'Expand Search'}</p>
          {
            openSearch
            ? <AiFillCaretUp className='text-gray-400' />
            : <AiFillCaretDown className='text-gray-400' />
          }
        </div>
        <div className='clear-both' />
        <form className={`md:px-20 px-6 md:py-5 py-2 lg:flex-row flex-col lg:items-center items-start gap-4 ${openSearch ? 'flex' : 'hidden'} lg:flex`}>
          <div className='flex items-center gap-4 flex-1'>
            <BiSearch className='text-lg' />
            <input type='text' autoComplete='off' placeholder='Designer' className='outline-0 text-sm' />
          </div>
          <div className='flex items-center gap-4 flex-1'>
            <IoLocationOutline className='text-lg' />
            <select className='bg-transparent outline-0 text-sm'>
              <option value=''>Work Location</option>
              <option value='remote'>Remote from Anywhere</option>
              <option value='onsite'>Onsite at Office</option>
            </select>
          </div>
          <div className='flex items-center gap-4 flex-1'>
            <BiDollar className='text-lg' />
            <select className='bg-transparent outline-0 text-sm'>
              <option value='day'>Per Day</option>
              <option value='week'>Per Week</option>
              <option value='month'>Per Month</option>
              <option value='year'>Per Year</option>
            </select>
          </div>
          <div className='flex-1 w-full'>
            <div className='text-sm mb-2 flex items-center justify-between'>
              <p>The salary</p>
              <p>$0 - $90.000</p>
            </div>
            <Range
              min={0}
              max={100000}
              defaultValue={[0, 100000]}
              tipFormatter={(value: number) => value}
              tipProps={{
                placement: 'top'
              }}
              value={[0, 100000]}
              trackStyle={[{background: 'black'}]}
              handleStyle={[{border: '4px solid black'}]}
            />
          </div>
        </form>
      </div>
    </div>
  )
}

export default Navbar