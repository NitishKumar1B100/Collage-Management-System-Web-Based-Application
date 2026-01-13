import { memo, useLayoutEffect, useMemo, useRef } from "react";
import gsap from "gsap";

import "../assest/design/profile-bubbles.css";
import { PROFILE_SCHEMAS } from "../StaticDataStructure/roledatastruc";
import Classes from "./studentcom/Attendence";
import Info from "./studentcom/Info";
import Teacherstudentlist from "./teacher/Teacherstudentlist.jsx"
import LibraryActivity from "./librarian/LibraryActivity.jsx";
import AdminProfileReview from "./admin/AdminProfileReview.jsx";
import HodProfileOverview from "./hod/HodProfileOverview.jsx";

const ProfileSection = memo(function ProfileSection({ role, data }) {
  const containerRef = useRef(null);

  const schema = PROFILE_SCHEMAS[role];

  const profileData = useMemo(
    () =>
      schema.fields.map(([label, key]) => ({
        label,
        value: data[key] ?? "-",
      })),
    [schema, data]
  );

  useLayoutEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      const header = gsap.utils.toArray(".profile-header");
      const info = gsap.utils.toArray(".profile-info");
      const attendance = gsap.utils.toArray(".profile-attendance");
      const bubbles = gsap.utils.toArray(".bubble");

bubbles.forEach((bubble, i) => {
  // entrance: gentle, no directional bias
  gsap.fromTo(
    bubble,
    {
      opacity: 0,
      scale: 0.85,
    },
    {
      opacity: 0.28,
      scale: gsap.utils.random(0.9, 1.15),
      duration: 1.6,
      delay: i * 0.15,
      ease: "power1.out",
    }
  );

  // continuous motion: slow horizontal drift + breathing
  gsap.to(bubble, {
    x: gsap.utils.random(-25, 25),   // small left/right drift
    y: gsap.utils.random(-18, 18),   // subtle vertical offset
    scale: gsap.utils.random(0.95, 1.2),
    duration: gsap.utils.random(14, 22),
    repeat: -1,
    yoyo: true,
    ease: "sine.inOut",
  });
});


      header.length &&
        gsap.fromTo(
          header,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 }
        );

      info.length &&
        gsap.fromTo(
          info,
          { opacity: 0, y: 20, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.5,
            stagger: 0.06,
          }
        );

      attendance.length &&
        gsap.fromTo(
          attendance,
          { opacity: 0, y: 24 },
          { opacity: 1, y: 0, duration: 0.6 }
        );

      bubbles.forEach((bubble, i) => {
        gsap.fromTo(
          bubble,
          { opacity: 0, scale: 0 },
          {
            opacity: 0.55,
            scale: gsap.utils.random(0.8, 1.4),
            duration: 0.8,
            delay: i * 0.08,
            ease: "power2.out",
          }
        );

        gsap.to(bubble, {
          x: gsap.utils.random(-40, 40),
          y: gsap.utils.random(-40, 40),
          scale: gsap.utils.random(0.6, 1.6),
          duration: gsap.utils.random(4, 7),
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
        });
      });
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={containerRef}
      className="space-y-6 h-[calc(100vh-68px)] md:h-[calc(100vh-48px)] overflow-y-auto slidebar p-4 "
    >
      <div className="profile-card flex sm:flex-row flex-col sm:gap-6 profile-header">
        {/* BUBBLE BACKGROUND */}
        <div className="profile-bubbles">
          {Array.from({ length: 8 }).map((_, i) => (
            <span key={i} className="bubble" />
          ))}
        </div>

        {/* CONTENT */}
        <div className=" flex md:flex-col  lg:text-start lg:flex-row flex-col items-center justify-center gap-3">
          <div className="flex flex-col gap-2 items-center">
            <img
              src={data.avatar}
              width={100}
              height={100}
              className="select-none rounded-full object-cover"
              alt=""
            />

            {role === "student" && (
              <span className="px-3 py-1 text-[10px] bg-[var(--primary)] text-white rounded-full">
                Semester {data.semester}
              </span>
            )}

            {role === "teacher" && (
              <span className="px-3 py-1 text-[10px] bg-[var(--primary)] text-white rounded-full">
                {data.designation}
              </span>
            )}
            
                     {role === "library" && (
              <span className="px-3 py-1 text-[10px] bg-[var(--primary)] text-white rounded-full">
                Librarian
              </span>
            )}
          </div>

          <div className="text-center">
            <h1 className="lg:text-xl text-2xl font-semibold">{data.name}</h1>
            <p className="text-center text-[9px] opacity-70">
              UID: {data.uid}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap sm:grid sm:grid-cols-2 lg:grid-cols-3 gap-5 mt-4 text-sm">
          {profileData.map((item, i) => (
            <div key={i} className="profile-info">
              <Info label={item.label} value={item.value} />
            </div>
          ))}
        </div>
      </div>

      {schema.showAttendance && (
        <div className="profile-attendance">
          <Classes />
        </div>
      )}

      {schema.showRespectiveStudent && role === "teacher" && (
        <div className="profile-teacher-student-list">
          <Teacherstudentlist />
        </div>
      )}
      
            {schema && role === "library" && (
        <div className="profile-teacher-student-list">
         <LibraryActivity />
        </div>
      )}
      
      {
        schema && role == "admin" && (
          <div className="profile-teacher-student-list">
            <AdminProfileReview/>
          </div>
        )
      }
      
            {
        schema && role == "hod" && (
          <div className="profile-teacher-student-list">
            <HodProfileOverview/>
          </div>
        )
      }
    </div>
  );
});

export default ProfileSection;
