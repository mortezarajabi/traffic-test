import React, { Component } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "" }}
            onClick={onClick}
        >
        </div>
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", background: "" }}
            onClick={onClick}
        />
    );
}



export default class Fade extends Component {
    render() {
        const settings = {
            fade: true,
            infinite: true,
            mobileFirst:true,
            speed: 500,
            slidesToShow: 1,
            slidesToScroll: 1,
            nextArrow: <NextArrow />,
            prevArrow: <PrevArrow />
        };
        return (
            <div>
                <Slider {...settings}>
                    <div>
                        <img src={"/static/assets/img01.png"} />
                    </div>
                    <div>
                        <img src={"/static/assets/img01.png"} />
                    </div>
                    <div>
                        <img src={"/static/assets/img01.png"} />
                    </div>
                </Slider>
            </div>
        );
    }
}