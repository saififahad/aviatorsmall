// import React from "react";
// import { Link } from "react-router-dom";
// import "./../New.css";
// // import MainInstallButton from "../MainInstallButton";
// const LandingPage = () => {
//   return (
//     <div
//       className="backgrounds"
//       style={{ height: "100vh", overflow: "hidden" }}
//     >
//       <div>
//         <div className="body__lights">
//           <div className="body__light body__light_position_top" />
//           <div className="body__light body__light_position_center" />
//         </div>
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="body__line body__line_is_mobile"
//           width={236}
//           height={235}
//           viewBox="0 0 236 235"
//         >
//           <path
//             stroke="#D3032A"
//             strokeLinecap="round"
//             strokeWidth="1.4"
//             d="M144.9 223.6c9.3 2.3 18.1 6 27.5 8 12.1 2.6 23.7 2.4 36 2.4 17.5 0 39.3-4.8 52.1-16 10.2-8.9 9.2-24.6 4.2-35.5-7.4-16.4-22.6-27.2-39.8-34.8a264.5 264.5 0 0 0-48.8-15.4c-22.7-5-45.5-9.6-68.2-15a422.4 422.4 0 0 1-78.6-25C20.8 88.4 7.1 80.4 2.8 72.1-1 64.8 1.8 53.6 6 47 13.7 35.6 28 27.8 41.5 23.4 91 7.3 145.5 4.6 197.3.4c93.3-7.4 187-6 280.6-8.4"
//             className="body__line-contour"
//           />
//         </svg>{" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="body__line body__line_is_md"
//           width={645}
//           height={394}
//           viewBox="0 0 645 394"
//         >
//           <path
//             stroke="red"
//             strokeLinecap="round"
//             strokeWidth="2.2"
//             d="M518 0c-50.6 14-101.2 26.8-154 33.4-39 4.8-77.1 4.5-116.2 1.7a420 420 0 0 1-81-11.8C143.3 17 118.7 9.3 95 0"
//             className="body__line-contour"
//           />
//           <path
//             stroke="#D3032A"
//             strokeLinecap="round"
//             strokeWidth="3.1"
//             d="M314.7 369.4c20.3 5 39.4 12.9 59.9 17.4 26.3 5.7 51.4 5.2 78.3 5.2 37.9 0 85.3-10.5 113.2-34.8 22.2-19.3 19.9-53.4 9.1-77-16.2-35.7-49.1-59.2-86.4-75.7A574.9 574.9 0 0 0 382.7 171c-49.4-11-99-20.9-148.4-32.5-58.1-13.6-117-29.9-170.8-54.4C45 75.6 15.4 58.2 6 40-2.5 24 3.9-.1 13-14.2c16.5-25 47.6-41.9 77-51.5 107.4-35 226-41 338.6-50 202.7-16.1 406.5-12.9 609.9-18.3"
//             className="body__line-contour"
//           />
//         </svg>{" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="body__line body__line_is_lg"
//           width={815}
//           height={502}
//           viewBox="0 0 815 502"
//         >
//           <path
//             stroke="red"
//             strokeLinecap="round"
//             strokeWidth="2.2"
//             d="M425 0c-50.6 14-101.2 26.8-154 33.4-39 4.8-77.1 4.5-116.2 1.7a420 420 0 0 1-81-11.8C50.3 17 25.7 9.3 2 0"
//             className="body__line-contour"
//           />
//           <path
//             stroke="#D3032A"
//             strokeLinecap="round"
//             strokeWidth="3.1"
//             d="M685.7 477.4c20.3 5 39.4 12.9 59.9 17.4 26.3 5.7 51.4 5.2 78.3 5.2 37.9 0 85.3-10.5 113.2-34.8 22.2-19.3 19.9-53.4 9.1-77-16.2-35.7-49.1-59.2-86.4-75.7A574.9 574.9 0 0 0 753.7 279c-49.4-11-99-20.9-148.4-32.5-58.1-13.6-117-29.9-170.8-54.4-18.5-8.5-48.1-25.9-57.6-44-8.4-16-2-40.2 7.2-54.3 16.5-25 47.6-41.9 77-51.5 107.4-35 226-41 338.6-50 202.7-16.1 406.5-12.9 609.9-18.3"
//             className="body__line-contour"
//           />
//         </svg>{" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="body__line body__line_is_xl"
//           width={937}
//           height={684}
//           viewBox="0 0 937 684"
//         >
//           <path
//             stroke="red"
//             strokeLinecap="round"
//             strokeWidth={3}
//             d="M579.7 0c-69 19.2-138.2 36.6-210.3 45.6a812 812 0 0 1-158.7 2.3 573.6 573.6 0 0 1-110.5-16C67.8 23 34.2 12.9 2 0"
//             className="body__line-contour"
//           />
//           <path
//             stroke="#D3032A"
//             strokeLinecap="round"
//             strokeWidth={3}
//             d="M708.8 660c19.7 4.9 38.3 12.5 58.2 16.9 25.5 5.6 49.9 5 76 5 36.8 0 82.9-10 110-33.7 21.5-18.8 19.3-51.9 8.8-74.9-15.7-34.6-47.6-57.4-84-73.4a558.5 558.5 0 0 0-103-32.6c-48-10.8-96.2-20.3-144.1-31.5-56.5-13.3-113.6-29.1-166-53-18-8.2-46.7-25-56-42.7-8-15.5-1.9-39 7.1-52.7 16-24.3 46.2-40.7 74.8-50 104.3-34.1 219.6-39.9 329-48.6 196.9-15.7 394.9-12.5 592.4-17.8"
//             className="body__line-contour"
//           />
//         </svg>{" "}
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           fill="none"
//           className="body__line body__line_is_xxl"
//           width={1102}
//           height={660}
//           viewBox="0 0 1102 660"
//         >
//           <path
//             stroke="red"
//             strokeLinecap="round"
//             strokeWidth={3}
//             d="M579.7 0c-69 19.2-138.2 36.6-210.3 45.6a812 812 0 0 1-158.7 2.3 573.6 573.6 0 0 1-110.5-16C67.8 23 34.2 12.9 2 0"
//             className="body__line-contour"
//           />
//           <path
//             stroke="#D3032A"
//             strokeLinecap="round"
//             strokeWidth={3}
//             d="M705.8 636c19.7 4.9 38.3 12.5 58.2 16.9 25.5 5.6 49.9 5 76 5 36.8 0 82.9-10 110-33.7 21.5-18.8 19.3-51.9 8.8-74.9-15.7-34.6-47.6-57.4-84-73.4a558.5 558.5 0 0 0-103-32.6c-48-10.8-96.2-20.3-144.1-31.5-56.5-13.3-113.6-29.1-166-53-18-8.2-46.7-25-56-42.7-8-15.5-1.9-39 7.1-52.7 16-24.3 46.2-40.7 74.8-50 104.3-34.1 219.6-39.9 329-48.6 196.9-15.7 394.9-12.5 592.4-17.8"
//             className="body__line-contour"
//           />
//         </svg>
//         <div className="body__fire" />
//         <div className="body__smoke" />
//         <div className="body__flame body__flame_position_left" />
//         <div className="body__flame body__flame_position_right" />
//         <header className="header">
//           <picture className="logo">
//             <source
//               media="(min-width: 1440px)"
//               srcSet="./images/Aviator-logo1.png"
//               width={125}
//               height={60}
//               type="image/svg+xml"
//             />
//             <source
//               media="(min-width: 768px)"
//               srcSet="./images/Aviator-logo1.png"
//               width={120}
//               height={60}
//               type="image/svg+xml"
//             />
//             <img
//               src="./images/Aviator-logo1.png"
//               alt="1win logo"
//               width={60}
//               height={24}
//             />
//           </picture>
//           {/* <MainInstallButton/> */}
//         </header>
//         <main className="main">
//           <div className="plane main__plane" />
//           <div className="main__content">
//             <h1 className="main__title">
//               <span className="text text_theme_with_shadow text_size_xxl text_weight_black text_is_uppercase text_is_italic main__sum">
//                 +500%
//               </span>{" "}
//               <span
//                 className="text text_theme_white text_size_md text_weight_regular text_is_italic main__text"
//                 data-1win-lang="contentText.bonusText"
//               >
//                 bonus awaits you on your first top-up{" "}
//               </span>
//             </h1>
//             <Link
//               to="/auth/login"
//               style={{ textDecoration: "none" }}
//               href="#"
//               className="link link_animation_pulse link_theme_red link_size_md link_is_uppercase link_is_italic link_weight_extrabold main__link"
//               id="take-bonus"
//             >
//               <span className="link__highlight" />
//               <span
//                 data-1win-lang="contentText.getBonus"
//                 style={{ color: "white" }}
//               >
//                 Play Now
//               </span>
//             </Link>
//           </div>
//         </main>
//         <noscript>
//           &lt;iframe
//           src="https://www.googletagmanager.com/ns.html?id=GTM-KGKQDC7"
//           height="0" width="0"
//           style="display:none;visibility:hidden"&gt;&lt;/iframe&gt;
//         </noscript>
//       </div>
//     </div>
//   );
// };

// export default LandingPage;
