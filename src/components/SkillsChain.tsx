import { useEffect, useRef, useState, useMemo } from "react";
import "./styles/SkillsChain.css";
import {
  SKILL_CATEGORIES,
  SKILLS_DATA,
  SKILL_EDGES,
  SkillCategory,
  SkillItem,
} from "../data/skillsData";

interface WirePath {
  id: string;
  fromId: string;
  toId: string;
  d: string;
  startX: number;
  startY: number;
  endX: number;
  endY: number;
}

const SkillsChain = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const nodeRefs = useRef<Map<string, HTMLDivElement>>(new Map());
  const [wires, setWires] = useState<WirePath[]>([]);
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);

  // Group skills by category for clear architectural zones
  const groupedSkills = useMemo(() => {
    const groups: { [key: string]: SkillItem[] } = {};
    SKILL_CATEGORIES.forEach((cat) => {
      groups[cat.id] = SKILLS_DATA.filter((s) => s.category === cat.id);
    });
    return groups;
  }, []);

  // Recalculate dynamic SVG connection wires based on actual DOM card positions
  const updateWires = () => {
    if (!containerRef.current) return;
    const containerRect = containerRef.current.getBoundingClientRect();
    const newWires: WirePath[] = [];

    SKILL_EDGES.forEach(([fromId, toId], index) => {
      const fromEl = nodeRefs.current.get(fromId);
      const toEl = nodeRefs.current.get(toId);

      if (!fromEl || !toEl) return;

      const fromRect = fromEl.getBoundingClientRect();
      const toRect = toEl.getBoundingClientRect();

      // Only draw wires if elements are in the same relative category container
      // (or within reasonable vertical distance)
      const verticalDist = Math.abs(toRect.top - fromRect.top);
      if (verticalDist > 700) return; // avoid distant chaotic wires across large layout breaks

      let startX: number;
      let startY: number;
      let endX: number;
      let endY: number;

      // Calculate anchor connection points (left, right, top, bottom)
      if (toRect.left > fromRect.right - 10) {
        // Target is to the right
        startX = fromRect.right - containerRect.left;
        startY = fromRect.top + fromRect.height / 2 - containerRect.top;
        endX = toRect.left - containerRect.left;
        endY = toRect.top + toRect.height / 2 - containerRect.top;
      } else if (fromRect.left > toRect.right - 10) {
        // Target is to the left
        startX = fromRect.left - containerRect.left;
        startY = fromRect.top + fromRect.height / 2 - containerRect.top;
        endX = toRect.right - containerRect.left;
        endY = toRect.top + toRect.height / 2 - containerRect.top;
      } else if (toRect.top >= fromRect.bottom - 10) {
        // Target is below
        startX = fromRect.left + fromRect.width / 2 - containerRect.left;
        startY = fromRect.bottom - containerRect.top;
        endX = toRect.left + toRect.width / 2 - containerRect.left;
        endY = toRect.top - containerRect.top;
      } else {
        // Target is above
        startX = fromRect.left + fromRect.width / 2 - containerRect.left;
        startY = fromRect.top - containerRect.top;
        endX = toRect.left + toRect.width / 2 - containerRect.left;
        endY = toRect.bottom - containerRect.top;
      }

      const dx = endX - startX;
      const dy = endY - startY;

      // Construct organic/zigzag schematic bezier path
      // Uses curved control handles with a slight organic vertical bias
      const curvature = 0.45;
      const cp1X = startX + dx * curvature;
      const cp1Y = startY + (Math.abs(dy) > 20 ? (dy > 0 ? 12 : -12) : 0);
      const cp2X = endX - dx * curvature;
      const cp2Y = endY - (Math.abs(dy) > 20 ? (dy > 0 ? 12 : -12) : 0);

      const d = `M ${startX.toFixed(1)} ${startY.toFixed(1)} C ${cp1X.toFixed(1)} ${cp1Y.toFixed(1)}, ${cp2X.toFixed(1)} ${cp2Y.toFixed(1)}, ${endX.toFixed(1)} ${endY.toFixed(1)}`;

      newWires.push({
        id: `wire-${fromId}-${toId}-${index}`,
        fromId,
        toId,
        d,
        startX,
        startY,
        endX,
        endY,
      });
    });

    setWires(newWires);
  };

  useEffect(() => {
    // Reveal on scroll into viewport
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Resize observer to update wire routing automatically on layout changes
    const resizeObserver = new ResizeObserver(() => {
      // Debounce slightly to ensure cards finish layout
      requestAnimationFrame(updateWires);
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Initial calculation after mount
    const timer = setTimeout(updateWires, 120);

    window.addEventListener("resize", updateWires);
    return () => {
      observer.disconnect();
      resizeObserver.disconnect();
      clearTimeout(timer);
      window.removeEventListener("resize", updateWires);
    };
  }, []);

  return (
    <div
      className={`skills-chain-section ${isRevealed ? "is-revealed" : ""}`}
      ref={containerRef}
    >
      {/* Central Bridge Separator from 3D Spheres into the Technical Chain */}
      <div className="skills-chain-bridge-divider">
        <div className="bridge-vertical-line"></div>
        <div className="bridge-junction-node"></div>
        <div className="bridge-label-badge">
          TECHNICAL NETWORK & SYSTEM TOPOLOGY
        </div>
      </div>

      {/* SVG Canvas for Organic / Zigzag Connection Wires */}
      <svg className="network-svg-layer">
        {wires.map((wire) => {
          const isConnected =
            hoveredNodeId === wire.fromId || hoveredNodeId === wire.toId;
          return (
            <g key={wire.id}>
              {/* Base thin schematic wire */}
              <path
                d={wire.d}
                className={`network-wire ${isConnected ? "wire-highlighted" : ""}`}
              />
              {/* Dynamic pulse along active / hovered connections */}
              {isConnected && (
                <path d={wire.d} className="network-wire-pulse" />
              )}
              {/* Terminal junction dots at connection points */}
              <circle
                cx={wire.startX}
                cy={wire.startY}
                r={2.5}
                className={`network-junction-dot ${
                  isConnected ? "dot-highlighted" : ""
                }`}
              />
              <circle
                cx={wire.endX}
                cy={wire.endY}
                r={2.5}
                className={`network-junction-dot ${
                  isConnected ? "dot-highlighted" : ""
                }`}
              />
            </g>
          );
        })}
      </svg>

      {/* Category Sectors */}
      {SKILL_CATEGORIES.map((category: SkillCategory, catIndex: number) => {
        const skills = groupedSkills[category.id] || [];
        // Compact (3-col) grid for smaller categories (≤ 6 skills); auto-fill otherwise
        const isCompact = skills.length <= 6;

        return (
          <div key={category.id}>
            <div className="skills-category-sector">
              <div className="sector-header">
                <div className="sector-title-wrap">
                  <span className="sector-code">0{catIndex + 1} //</span>
                  <h3 className="sector-title">{category.name}</h3>
                </div>
                <div className="sector-badge">{category.badge}</div>
              </div>

              <div className="network-stage">
                <div
                  className={`network-nodes-grid ${
                    isCompact ? "compact-grid" : ""
                  }`}
                >
                  {skills.map((skill: SkillItem, index: number) => {
                    const isCardHovered = hoveredNodeId === skill.id;
                    return (
                      <div
                        key={skill.id}
                        ref={(el) => {
                          if (el) nodeRefs.current.set(skill.id, el);
                          else nodeRefs.current.delete(skill.id);
                        }}
                        className={`skill-node-card fade-in-node ${
                          isCardHovered ? "card-highlighted" : ""
                        }`}
                        style={{
                          transitionDelay: `${catIndex * 80 + index * 25}ms`,
                        }}
                        onMouseEnter={() => setHoveredNodeId(skill.id)}
                        onMouseLeave={() => setHoveredNodeId(null)}
                      >
                        {/* Terminal connection pins */}
                        <div className="node-pin-left" />
                        <div className="node-pin-right" />

                        <div className="node-inner-left">
                          <div className="node-status-indicator" />
                          <span className="node-title">{skill.name}</span>
                        </div>

                        <span className="node-cluster-badge">
                          {skill.cluster.slice(0, 4)}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Inter-category bridge conduit between sectors */}
            {catIndex < SKILL_CATEGORIES.length - 1 && (
              <div className="category-bridge-connector">
                <div className="conduit-line"></div>
                <div className="conduit-node"></div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default SkillsChain;
