import { Button, Popup } from '@/shared/ui'
import { useState } from 'react'

export const PersonPopup = () => {
  const [isOpenFirst, setIsOpenFirst] = useState(false)
  const [isOpenSecond, setIsOpenSecond] = useState(false)

  const handleOpenFirstPopup = () => setIsOpenFirst(true)
  const handleCloseFirstPopup = () => setIsOpenFirst(false)

  const handleOpenSecondPopup = () => setIsOpenSecond(true)
  const handleCloseSecondPopup = () => setIsOpenSecond(false)

  return (
    <>
      <Button onClick={handleOpenFirstPopup}>Открыть первый попап</Button>
      <Popup onClose={handleCloseFirstPopup} isOpen={isOpenFirst}>
        <p className="system-typo-300">Это первый попап</p>
        <Button onClick={handleOpenSecondPopup}>Открыть второй попап</Button>
        <Popup onClose={handleCloseSecondPopup} isOpen={isOpenSecond}>
          <p className="system-typo-300">Это второй попап</p>
        </Popup>
      </Popup>
    </>
  )
}
