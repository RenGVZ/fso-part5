import React, { useState, forwardRef, useImperativeHandle } from "react"

const Toggleable = forwardRef(({ showText, hideText, children }, ref) => {
  const [isVisible, setIsVisible] = useState(false)

  const handleToggle = () => {
    setIsVisible(!isVisible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility: handleToggle,
    }
  })

  return (
    <div>
      {isVisible && <div>{children}</div>}
      <button onClick={handleToggle}>{isVisible ? hideText : showText}</button>
    </div>
  )
})

export default Toggleable
