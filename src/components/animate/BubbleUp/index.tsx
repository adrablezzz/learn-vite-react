import {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useRef,
  useState,
} from "react";
import gsap from "gsap";
import "./index.less";

const Circle = forwardRef(({ size = "", delay }: any, ref) => {
  const el = useRef<any>();

  useImperativeHandle(
    ref,
    () => {
      return {
        moveTo(x: number, y: number) {
          gsap.to(el.current, { x: x, y: y, delay: delay, ease: "power2.out" });
        },
        setTo(x: number, y: number) {
          gsap.set(el.current, { x: x, y: y });
        }
      };
    },
    [delay]
  );

  return <div className={`circle ${size} gradient-blue`} ref={el}></div>;
});

export default function BubbleUp() {
  const comp = useRef(null);
  const circleRefs = useRef<any>([]);
  circleRefs.current = [];

  // 储存的scrollTop
  let [oldScrollY, setOldScrollY] = useState(0);

  useEffect(() => {
    const { innerWidth, innerHeight, scrollY } = window;
    console.log(scrollY);
    circleRefs.current.forEach((el: any) => {
      el.setTo(innerWidth / 2, innerHeight);
    });
    const onScroll = (e: any) => {
      const { scrollY } = window;
      const { offsetHeight } = document.body;
      console.log(scrollY, oldScrollY)
      let flag = scrollY > oldScrollY ? '-' : '+';
      circleRefs.current.forEach((el: any) => {
        el.moveTo(innerWidth / 2, `${flag}=${50*scrollY/offsetHeight}vh`);
      });
      oldScrollY = scrollY;
      // setOldScrollY(scrollY) //失效
    };

    window.addEventListener("scroll", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);


  const addRef = (ref: any) => {
    ref && circleRefs.current.push(ref);
  };

  return (
    <>
      <div ref={comp} className="comp">
        <Circle ref={addRef} size="sm" delay={0}></Circle>
      </div>
    </>
  );
}
