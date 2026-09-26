import { useState, useMemo } from "react";
import "./styles/Work.css";
import WorkImage from "./WorkImage";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import {
  PROJECTS_DATA,
  FILTER_CATEGORIES,
  FilterCategory,
} from "../data/projectsData";
import { MdArrowOutward, MdChevronLeft, MdChevronRight } from "react-icons/md";
import { FaGithub } from "react-icons/fa";

gsap.registerPlugin(useGSAP);

const Work = () => {
  const [selectedCategory, setSelectedCategory] =
    useState<FilterCategory>("ALL");

  const filteredProjects = useMemo(() => {
    if (selectedCategory === "ALL") {
      return PROJECTS_DATA;
    }
    return PROJECTS_DATA.filter((project) =>
      project.filterTags.includes(selectedCategory)
    );
  }, [selectedCategory]);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add("(min-width: 1025px)", () => {
      const getScrollDistance = () => {
        const boxes = document.querySelectorAll(".work-box");
        const container = document.querySelector(".work-container") as HTMLElement | null;
        if (!boxes || boxes.length === 0 || !container) return 0;

        const lastBox = boxes[boxes.length - 1] as HTMLElement;
        const totalContentWidth = lastBox.offsetLeft + lastBox.offsetWidth;
        const visibleWidth = container.clientWidth || window.innerWidth;
        const rightPadding = 60;

        return Math.max(0, totalContentWidth - visibleWidth + rightPadding);
      };

      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: ".work-section",
          start: "top top",
          end: () => `+=${getScrollDistance()}`,
          scrub: 1,
          pin: true,
          pinSpacing: true,
          anticipatePin: 1,
          invalidateOnRefresh: true,
          id: "work",
        },
      });

      timeline.to(".work-flex", {
        x: () => -getScrollDistance(),
        ease: "none",
      });

      const onResize = () => {
        ScrollTrigger.refresh();
      };

      window.addEventListener("resize", onResize);
      window.addEventListener("load", onResize);

      // Support trackpad horizontal swipe inside work section
      const handleWheel = (e: WheelEvent) => {
        if (Math.abs(e.deltaX) > Math.abs(e.deltaY) && Math.abs(e.deltaX) > 10) {
          window.scrollBy({ top: e.deltaX, behavior: "auto" });
        }
      };
      const sectionEl = document.querySelector(".work-section");
      sectionEl?.addEventListener("wheel", handleWheel as EventListener, {
        passive: true,
      });

      // Refresh ScrollTrigger so layout & ScrollSmoother sync immediately
      const timer = setTimeout(() => {
        ScrollTrigger.refresh();
      }, 150);

      return () => {
        clearTimeout(timer);
        window.removeEventListener("resize", onResize);
        window.removeEventListener("load", onResize);
        sectionEl?.removeEventListener("wheel", handleWheel as EventListener);
        timeline.kill();
        ScrollTrigger.getById("work")?.kill();
      };
    });

    return () => {
      mm.revert();
    };
  }, [filteredProjects, selectedCategory]);

  // Quick navigation helpers for desktop pinned scrolling
  const handleScrollStep = (direction: "prev" | "next") => {
    if (window.innerWidth > 1024) {
      const step = 580; // approximate width of one card + gap
      window.scrollBy({
        top: direction === "next" ? step : -step,
        behavior: "smooth",
      });
    } else {
      const wrapper = document.querySelector(".work-flex-wrapper");
      if (wrapper) {
        const step = 340;
        wrapper.scrollBy({
          left: direction === "next" ? step : -step,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <section className="work-section" id="work">
      <div className="work-container section-container">
        <div className="work-header-wrap">
          <div className="work-header-top">
            <h2>
              Featured <span>Projects</span>
            </h2>

            {/* Navigation arrows for direct accessibility */}
            <div className="work-nav-arrows">
              <button
                type="button"
                className="work-nav-arrow-btn"
                onClick={() => handleScrollStep("prev")}
                aria-label="Previous project"
                data-cursor="disable"
                title="Scroll to previous project"
              >
                <MdChevronLeft />
              </button>
              <button
                type="button"
                className="work-nav-arrow-btn"
                onClick={() => handleScrollStep("next")}
                aria-label="Next project"
                data-cursor="disable"
                title="Scroll to next project"
              >
                <MdChevronRight />
              </button>
            </div>
          </div>

          {/* Filter Categories Bar */}
          <nav className="work-filter-bar" aria-label="Project Categories">
            {FILTER_CATEGORIES.map((cat) => {
              const count =
                cat === "ALL"
                  ? PROJECTS_DATA.length
                  : PROJECTS_DATA.filter((p) => p.filterTags.includes(cat))
                      .length;

              const isActive = selectedCategory === cat;

              return (
                <button
                  key={cat}
                  type="button"
                  className={`work-filter-btn ${isActive ? "active" : ""}`}
                  onClick={() => {
                    setSelectedCategory(cat);
                  }}
                  aria-pressed={isActive}
                  data-cursor="disable"
                >
                  <span className="filter-name">{cat}</span>
                  <span className="filter-count">({count})</span>
                </button>
              );
            })}
          </nav>
        </div>

        <div className="work-flex-wrapper">
          <div className="work-flex">
            {filteredProjects.map((project) => (
              <article
                className="work-box"
                key={project.id}
                data-id={project.id}
              >
                <div className="work-info">
                  <div className="work-title">
                    <span className="work-num">{project.number}</span>
                    <div className="work-meta">
                      <div className="work-category-chip">
                        {project.category}
                      </div>
                      <h3 className="work-project-name">{project.title}</h3>
                      {project.subtitle && (
                        <p className="work-subtitle">{project.subtitle}</p>
                      )}
                    </div>
                  </div>

                  <div className="work-tech-section">
                    <span className="work-tech-label">Stack &amp; Tools</span>
                    <div className="work-tech-tags">
                      {project.technologies.map((tech) => (
                        <span key={tech} className="tech-tag">
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  <p className="work-desc">{project.description}</p>

                  <div className="work-actions">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="work-github-btn"
                      data-cursor="disable"
                      aria-label={`View ${project.title} source code on GitHub`}
                    >
                      <FaGithub className="btn-icon" />
                      <span>View Project</span>
                      <MdArrowOutward className="btn-arrow" />
                    </a>
                  </div>
                </div>

                <WorkImage
                  image={project.image}
                  alt={project.title}
                  link={project.github}
                  title={project.title}
                  category={project.category}
                  badge={project.gradientBadge}
                />
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;