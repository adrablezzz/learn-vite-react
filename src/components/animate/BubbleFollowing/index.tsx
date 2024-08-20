import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";
import gsap from "gsap";
import "./index.less";

const Circle = forwardRef(
  ({ size = "", delay }: { size: string; delay: number }, ref) => {
    const el = useRef<any>();

    useImperativeHandle(
      ref,
      () => {
        return {
          moveTo(x: number, y: number) {
            gsap.to(el.current, { x, y, delay });
          },
        };
      },
      [delay]
    );

    return <div className={`circle ${size} gradient-blue`} ref={el}></div>;
  }
);

export default function BubbleFollowing() {
  const comp = useRef(null);
  const circleRefs = useRef<any>([]);
  circleRefs.current = [];

  useEffect(() => {
    const { innerWidth, innerHeight } = window;
    circleRefs.current.forEach((el: any) => {
      el.moveTo(innerWidth / 2, innerHeight / 2);
    });
    const onMove = ({
      clientX,
      clientY,
    }: {
      clientX: number;
      clientY: number;
    }) => {
      circleRefs.current.forEach((el: any) => {
        el.moveTo(clientX, clientY);
      });
    };

    window.addEventListener("pointermove", onMove);
    return () => {
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  const addRef = (ref: any) => {
    ref && circleRefs.current.push(ref);
  };

  return (
    <>
      <div ref={comp} className="comp">
        <Circle ref={addRef} size="sm" delay={0}></Circle>
        <Circle ref={addRef} size="md" delay={0.1}></Circle>
        <Circle ref={addRef} size="lg" delay={0.2}></Circle>
      </div>
    </>
  );
}
