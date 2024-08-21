import gsap from "gsap";
// import { useGSAP } from "@gsap/react";
import { ReactLenis, useLenis } from "lenis/react";
import "./home.less";
import { useRef, useState, useEffect } from "react";

const SCROLL_RATE = 1

export default function Home() {
  const lenisRef = useRef(null);
  let [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    function update(time: number) {
      lenisRef.current?.lenis?.raf(time * 1000);

      const { innerWidth, innerHeight } = window;
      let x = (innerWidth * scrollY) / innerHeight;
      // const tl = gsap.timeline();
      // tl.to(".box1", { x: x }).to(".box2", { x: x }).to(".box3", { x: x });

      // 滚动条缩放
      let y = scrollY * (innerHeight - 50) / innerHeight
      gsap.to(".scroll-bar", { y: y, duration: 0.5 });
    }

    gsap.ticker.add(update);

    return () => {
      gsap.ticker.remove(update);
    };
  });

  useEffect(() => {
    const onWheel = (e: any) => {
      const { deltaX, deltaY } = e;
      const { innerWidth, innerHeight } = window;

      scrollY += deltaY * SCROLL_RATE;
      if (scrollY >= innerHeight) {
        scrollY = innerHeight;
      } else if (scrollY <= 0) {
        scrollY = 0;
      }

      console.log(scrollY);
    };

    window.addEventListener("wheel", onWheel);

    return () => {
      window.removeEventListener("wheel", onWheel);
    };
  }, []);

  return (
    <ReactLenis ref={lenisRef} autoRaf={false}>
      <div className="container">
        <div className="header">
          <div className="logo">logo</div>
          <div className="nav">
            <span className="nav-item">nav1</span>
            <span className="nav-item">nav2</span>
            <span className="nav-item">nav3</span>
          </div>
        </div>
        <div className="content">
          <div className="left">left</div>
          <div className="right">right</div>
        </div>
        <div className="footer">
          <div className="link">footer</div>
        </div>

        <div className="scroll-thumb">
          <div className="scroll-bar"></div>
        </div>
      </div>
    </ReactLenis>
  );
}
