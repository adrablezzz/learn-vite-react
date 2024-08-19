import { ReactLenis, useLenis } from "lenis/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./home.less";
import { Layout } from "antd";
const { Header, Content, Sider } = Layout;

export default function Home() {
  const lenisRef = useRef(null);

  useEffect(() => {
    function update() {
      const LENGTH = 2100;
      const scrollTop = window.scrollY;
      if (scrollTop < LENGTH) {
        gsap.to(".img1", { backgroundPositionX: scrollTop * 1.2 });
        gsap.to(".img2", { backgroundPositionX: -scrollTop * 1.2 });
        gsap.to(".imgList", { top: 100 });
      } else {
        const SCROLL = 400
        let offset = scrollTop - LENGTH;
        gsap.to(".imgList", { top: -offset });

        let percent = offset / SCROLL
        if(percent <= 1) {
          gsap.to(".contentList", {
            opacity: percent,
            top: 500 - (SCROLL * percent),
          });
          gsap.to(".line1", { opacity: percent });
        }else {
          // const SCROLL = 200
          // let offset = scrollTop - LENGTH - SCROLL
          // let percent = offset / SCROLL
          console.log(percent-1)
          gsap.to(".line2", { opacity: percent - 1 });
        }
      }
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  return (
    <>
      <ReactLenis root ref={lenisRef}>
        <Layout>
          <Header className="header">
            <div className="logo-vertical">@adrablezzz</div>
          </Header>
          <div className="content">
            <div className="imgList">
              <div className="img img1"></div>
              <div className="img img2"></div>
            </div>
            <div className="contentList">
              <div className="lines line1">WelCome! 欢迎！</div>
              <div className="lines line2">现在是：</div>
            </div>
          </div>
          <div className="footer"></div>
        </Layout>
      </ReactLenis>
    </>
  );
}
