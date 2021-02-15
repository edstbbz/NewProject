import React from "react";
import Slider from "react-slick";
import "./slider.module.scss";

const url =
  "https://pixabay.com/api/?key=20274303-821af1610ad5ac847c6179809&q=математика+классная_доска&per_page=5&min_height=360&image_type=all&pretty=true";
export default class extends React.Component {
  state = {
    img: [],
  };

  async componentDidMount() {
    try {
      let response = await fetch(url);
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
      pauseOnFocus: true
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
