// import { useEffect, useRef } from "react";

// export default function SvgCurve() {
//   const path = useRef<SVGPathElement | null>(null);

//   let progress = 0;
//   let reqId: number | null = null; // Specify the type for reqId
//   let x = 0.5;
//   let time = Math.PI / 2;
//   const animateIn = () => {
//     // If the animationOut is running, cancel it and reset time
//     if (reqId !== null) {
//       cancelAnimationFrame(reqId);
//       time = Math.PI / 2;
//     }

//     setPath(progress);

//     reqId = requestAnimationFrame(animateIn);
//   };

//   const manageMouseMove = (e: React.MouseEvent) => {
//     // Specify the type for the event
//     const { movementY } = e;

//     const box = (e.target as HTMLElement).getBoundingClientRect(); // Specify the type for e.target

//     x = (e.clientX - box.left) / box.width;

//     progress += movementY;
//   };

//   const resetAnimation = () => {
//     cancelAnimationFrame(reqId);

//     animateOut();
//   };

//   const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

//   const animateOut = () => {
//     let newProgress = progress * Math.sin(time);

//     setPath(newProgress);

//     progress = lerp(progress, 0, 0.04);

//     time += 0.2;

//     if (Math.abs(progress) > 0.5) {
//       reqId = requestAnimationFrame(animateOut);
//     }

//     // If the slope is almost flat, we stop the animation
//     else {
//       time = Math.PI / 2;

//       progress = 0;
//     }
//   };

//   useEffect(() => {
//     setPath(progress);

//     const handleResize = () => {
//       setPath(progress);
//     };

//     window.addEventListener("resize", handleResize);

//     // Clean up the event listener on component unmount
//     return () => {
//       window.removeEventListener("resize", handleResize);
//     };
//   }, [progress]);

//   const setPath = (value: number) => {
//     const width = window.innerWidth * 0.7;

//     path.current?.setAttributeNS(
//       null,
//       "d",
//       `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
//     );
//   };
//   /*

// */
//   return (
//     <div className="line">
//       <span
//         onMouseEnter={() => {
//           animateIn();
//         }}
//         onMouseLeave={() => {
//           resetAnimation();
//         }}
//         onMouseMove={(e) => {
//           manageMouseMove(e);
//         }}
//         className="box"
//       ></span>
//       <svg>
//         {/* Use optional chaining to handle the null case */}
//         <path ref={path}></path>
//       </svg>
//     </div>
//   );
// }
// // {"threads":[{"position":1227,"start":0,"end":1226,"connection":"closed"},{"position":1227,"start":1227,"end":2452,"connection":"open"}],"url":"https://att-c.udemycdn.com/2024-02-24_15-05-01-e95933152aff1445d73b1791d40dfd59/original.tsx?response-content-disposition=attachment%3B+filename%3Dsvg-curve.tsx&Expires=1709108910&Signature=Wfs8knVcU-rpOziUxPpkqVJMMcjooYhqO9z4GFpJ2hZ4gCp~D9zPtLFSMTLsW4u9u1rLBwlnEt8XpKuUWwm2~m9Hl6rCVqEOxcKaBLYufsx2qqreecZ~rK6YmFbkd0udUivzAAwor-zGSa7b0vN84WtBY~1HuOQRZj4~QLo7O3djBaZC1A7qsnUaJZn6Jlstf6JDKYqjQWbi9m8XP1Hmw5F8j940cZ-k~YJFjcmpCMxVuZKewJy1gtKow-qStEbTH9~E43cXVmz0o2ZITLkL7LM6K-lfXrCZvy12jvKD4DXzRvQxtejqMpqgTE7qxrzPgJNwOzF4FE84sxE5Ichmuw__&Key-Pair-Id=K3MG148K9RIRF4","method":"GET","port":443,"downloadSize":2452,"headers":{"content-type":"binary/octet-stream","content-length":"2452","connection":"close","date":"Wed, 28 Feb 2024 03:59:08 GMT","x-amz-replication-status":"COMPLETED","last-modified":"Sat, 24 Feb 2024 15:05:02 GMT","etag":"\"1092e0ffcf22fcf3ac6e63e2daf29eca\"","x-amz-server-side-encryption":"AES256","x-amz-meta-qqfilename":"svg-curve.tsx","x-amz-version-id":"2Fn4j34Ww0OowoW9KQAR.GfwNe5GHuN2","content-disposition":"attachment; filename=svg-curve.tsx","accept-ranges":"bytes","server":"AmazonS3","x-cache":"Miss from cloudfront","via":"1.1 254622ebfed5feb6e2d8380b3f9c4c10.cloudfront.net (CloudFront)","x-amz-cf-pop":"AMS1-C1","x-amz-cf-id":"wuIvx4A7inlfoFUqfo1EgNxyWcFthXchFTb362g1ei_pA7H93E0dTQ==","x-cdn":"cf-cloudfront","vary":"Origin"}}                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     


import { FC, useEffect, useRef } from "react";

const SvgCurve: FC = () => {
  const path = useRef<SVGPathElement | null>(null);

  let progress = 0;
  let reqId: number | null = null;
  let x = 0.5;
  let time = Math.PI / 2;

  const setPath = (value: number) => {
    const width = window.innerWidth * 0.7;
    path.current?.setAttribute(
      "d",
      `M 0 50 Q ${width * x} ${50 + value} ${width} 50`
    );
  };

  const animateIn = () => {
    if (reqId !== null) {
      cancelAnimationFrame(reqId);
      time = Math.PI / 2;
    }

    setPath(progress);
    reqId = requestAnimationFrame(animateIn);
  };

  const manageMouseMove = (e: React.MouseEvent) => {
    const { movementY } = e;
    const box = (e.target as HTMLElement).getBoundingClientRect();
    x = (e.clientX - box.left) / box.width;
    progress += movementY;
  };

  const resetAnimation = () => {
    if (reqId !== null) {
      cancelAnimationFrame(reqId);
    }
    animateOut();
  };

  const lerp = (x: number, y: number, a: number) => x * (1 - a) + y * a;

  const animateOut = () => {
    let newProgress = progress * Math.sin(time);
    setPath(newProgress);
    progress = lerp(progress, 0, 0.04);
    time += 0.2;

    if (Math.abs(progress) > 0.5) {
      reqId = requestAnimationFrame(animateOut);
    } else {
      time = Math.PI / 2;
      progress = 0;
    }
  };

  useEffect(() => {
    setPath(progress);

    const handleResize = () => {
      setPath(progress);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (reqId !== null) {
        cancelAnimationFrame(reqId);
      }
    };
  }, []);

  return (
    <div className="line">
      <span
        onMouseEnter={animateIn}
        onMouseLeave={resetAnimation}
        onMouseMove={manageMouseMove}
        className="box"
      ></span>
      <svg>
        <path ref={path}></path>
      </svg>
    </div>
  );
};

export default SvgCurve;
