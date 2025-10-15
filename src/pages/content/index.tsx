import React from "react";
import './index.scss';
import Left from "../../components/left";
import Top from "../../components/top";
import ContentComponents from "../../components/content";

const ContentPage = () => {
  return(
    <div className="content">
      <Left />
      <div className="content-right">
        <div className="content-wrapper">
          <Top />
          <ContentComponents />
        </div>
      </div>
    </div>
  )
}

export default ContentPage;