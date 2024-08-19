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
        let offset = scrollTop - LENGTH;
        gsap.to(".imgList", { top: -offset });

        let percent = offset / 400
        if(percent <= 1) {
          gsap.to(".contentList", {
            // opacity: percent,
            top: 500 - (400 * percent),
          });
        }else {
          gsap.to(".line1", { opacity: 1 });
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
              <div className="line1">WelCome! 欢迎！</div>
              <div className="line2">现在是：</div>
            </div>
          </div>
          <div className="footer"></div>
        </Layout>
      </ReactLenis>
    </>
  );
}
