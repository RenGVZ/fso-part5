import React from 'react'

const Error = ({ message }) => {
  return (
    <div
      style={{
        background: '#f89797',
        color: 'white',
        position: 'absolute',
        margin: '0 auto',
        width: '100%',
        top: '0',
        padding: '8px',
        opacity: '70%',
      }}
    >
      {message}
    </div>
  )
}

export default Error
