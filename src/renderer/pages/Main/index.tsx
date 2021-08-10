import React from 'react'

// import { Container } from './styles';

const Main: React.FC = () => {
  return (
    <nav className='navbar is-primary is-fixed-top window-dragger'>
      <div className='container'>
        <div className='navbar-brand'>
          <a href='#' className='navbar-item brand-text'>
            News Speaker
          </a>
        </div>
      </div>
    </nav>
    // <div className='container'>
    //   <div className='columns is-mobile'>
    //     <div className='column is-3'>
    //       <aside className='menu'>
    //         <p className='menu-label'>General</p>
    //         <ul className='menu-list'>
    //           <li>
    //             <a href='#' className='is-active'>
    //               Dashboard
    //             </a>
    //           </li>
    //         </ul>
    //       </aside>
    //     </div>
    //     <div className='column is-9'>
    //       <section className='hero is-info welcome is-small'>
    //         <div className='hero-body'>
    //           <div className='container'>
    //             <h1 className='title'>Hello, Admin.</h1>
    //             <h2 className='subtitle'>I hope you are having a great day!</h2>
    //           </div>
    //         </div>
    //       </section>
    //     </div>
    //   </div>
    // </div>
  )
}

export default Main
