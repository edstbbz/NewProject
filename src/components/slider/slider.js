import React from "react";
import Slider from "react-slick";
import { IMG_SLIDER_V1, IMG_SLIDER_V2} from "../../api/httpConst";
import "./slider.module.scss";

export default class extends React.Component {
  state = {
    img: [],
  };

  async componentDidMount() {
    try {
      let response = await fetch(IMG_SLIDER_V1);
      let data = await response.json();
      const img = [];
      data.forEach((field, i) => {
        img.push({
          id: i,
          src: field,
        });
        this.setState({ img });
        return data;
      });
    } catch (e) {
      try {
        let response = await fetch(IMG_SLIDER_V2);
        let data = await response.json();
        let images = data.hits;
        const img = [];

        images.forEach((field, i) => {
          img.push({
            id: i,
            src: field.webformatURL,
          });
        });

        this.setState({ img });

        return images;
      } catch (e) {
        console.log(e);
      }
    }
  }

  render() {
    let img = this.state.img.map((imgUrl, i) => {
      return (
        <div key={i}>
          <img key={i} src={imgUrl.src}></img>
        </div>
      );
    });
    const settings = {
      dots: true,
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
      pauseOnFocus: true,
      arrows: false,
    };
    return (
      <React.Fragment>
        <div className="container">
          <Slider {...settings}>{img}</Slider>
        </div>
      </React.Fragment>
    );
  }
}
