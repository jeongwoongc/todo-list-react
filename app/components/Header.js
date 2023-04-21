import React from 'react'

function Header() {
    return (
        <>
        <header>
            <div className="header-div">
                <a className="todo-a" href="">
                    To Do
                </a>
                <form className="search-bar">
                        <input id="search" type="search"></input>
                </form>
            </div>
        </header>
        </>
    )
}

export default Header