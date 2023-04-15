import React from 'react'

import {Link} from 'react-router-dom'

function Title() {
  return (
    <div className="title">
      <Link to="/" style={{ textDecoration: 'none', cursor: 'pointer' }}>
        <button style={{ border: 'none', backgroundColor: 'transparent', color: 'white' }}>
          <h1>Everything Books!</h1>
        </button>
      </Link>
    </div>
  )
}

export default Title
