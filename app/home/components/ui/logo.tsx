"use client"

import ResponsiveLogo from '@/app/libs/components/reusables/ResponsiveLogo'
import { useWindowDimensions } from '@/app/utils/ui/getWindowDims.utils'


export default function Logo() {
  const { width } = useWindowDimensions();
  return (

    <>
      {
        width && (
          width < 750 ? <>
            <div className='w-1/3'>
              <ResponsiveLogo orientation={'horizontal'} />
            </div>
          </> : <>
            <div className='w-1/12'>
              <ResponsiveLogo orientation={'vertical'} />
            </div>
          </>
        )
      }

    </>

  )
}
