import React from 'react'

const Header = () => {

    const imgStyle = {
        'display':'block',
        'width': '1300px',
        'height': '400px',
        'ObjectFit':'fill',
        'opacity':'0.5'
    }


    return (
       <header id="head-intro" className="container mt-4">
            <div id="slider4" className="carousel slide mb-5" data-ride="carousel">
                <ol className="carousel-indicators">
                <li className="actie" data-target="#slider4" data-slide-to="0"></li>
                <li data-target="#slider4" data-slide-to="1"></li>
                <li data-target="#slider4" data-slide-to="2"></li>
                </ol>
                <div className="carousel-inner text-center bg-dark">
                    <div className="carousel-item active">
                    <img className="d-block img-fluid" src="https://img.evbuc.com/https%3A%2F%2Fcdn.evbuc.com%2Fimages%2F63798556%2F148505504344%2F1%2Foriginal.20190612-173119?auto=compress&s=f3e2e535828bd60a7f409216540eb7c7" style={imgStyle} alt="First Slide"/>
                    <div className="carousel-caption d-none d-md-block" style={{'background':'rgba(0,0,0, 0.5'}}>
                        <h3>Slide One</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, similique?</p>
                    </div>
                    </div>
                    <div className="carousel-item text-center">
                    <img className="d-block img-fluid"src="https://source.unsplash.com/WLUHO9A_xik/1300x400" alt="Second Slide" style={imgStyle}/>
                    <div className="carousel-caption d-none d-md-block ">
                        <h3>Slide Two</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, similique?</p>
                        </div>
                    </div>
                    <div className="carousel-item text-center">
                    <img className="d-block img-fluid" src="https://source.unsplash.com/4yta6mU66dE/1300x400" alt="Third Slide" style={imgStyle} />
                    <div className="carousel-caption d-none d-md-block ">
                        <h3>Slide Three</h3>
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam, similique?</p>
                        </div>
                    </div>
                </div>
                {/* <!-- controls --> */}
                <a href="#slider4" className="carousel-control-prev" data-slide="prev">
                    <span className="carousel-control-prev-icon"></span>
                </a>
                <a href="#slider4" className="carousel-control-next" data-slide="next">
                    <span className="carousel-control-next-icon"></span>
                </a>
            </div>
       </header>
    )
}
export default Header
