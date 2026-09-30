import React, { useState } from 'react';
import { skillsCategories, allSkillsList } from '../data/skills';
import { Sparkles, Terminal, Code, Cpu, Cloud } from 'lucide-react';

export default function TypographicSkills() {
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [hoveredSkill, setHoveredSkill] = useState(null);

  const getFilteredSkills = () => {
    if (selectedCategory === 'all') return allSkillsList;
    const cat = skillsCategories.find(c => c.id === selectedCategory);
    return cat ? cat.skills.map(s => s.toUpperCase()) : allSkillsList;
  };

  const currentSkills = getFilteredSkills();

  return (
    <section id="skills" className="skills-section">
      <div className="container">
        
        {/* Section Header Track */}
        <div className="section-header-track font-mono">
          <div className="track-left">
            <span className="track-num">04</span>
            <span className="track-slash">/</span>
            <span className="track-title">SKILLS & TECHNOLOGIES</span>
          </div>
          <div className="track-right hide-mobile">
            <span>TYPOGRAPHIC CLOUD SYSTEM</span>
            <span>VERIFIED ON GITHUB</span>
          </div>
        </div>

        {/* Section Headline */}
        <div className="skills-intro">
          <h2 className="skills-heading font-display">
            A TAXONOMY OF <span className="text-highlight-cyan">TOOLS</span> & <span className="text-highlight-violet">STACKS.</span>
          </h2>
          <p className="skills-desc font-body">
            Hover over any technology to inspect its role. Filter by system domain to explore Richardsen's verified toolkit.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="skills-filter-bar font-mono">
          <button 
            className={`filter-pill ${selectedCategory === 'all' ? 'active' : ''}`}
            onClick={() => setSelectedCategory('all')}
            data-cursor="hover"
          >
            <span>[ ALL TECHNOLOGIES ]</span>
          </button>

          {skillsCategories.map(cat => (
            <button
              key={cat.id}
              className={`filter-pill ${selectedCategory === cat.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(cat.id)}
              data-cursor="hover"
            >
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Typographic Cloud / Kinetic Composition */}
        <div className="typographic-cloud-board editorial-board">
          <div className="cloud-tape font-mono">
            <span>FIGURE 04-A // INTERACTIVE RUNTIME TAXONOMY</span>
            <span>{currentSkills.length} VERIFIED NODES</span>
          </div>

          <div className="typographic-words-matrix font-display">
            {currentSkills.map((skill, index) => {
              const isHovered = hoveredSkill === skill;
              // Add slight deterministic variation to font size & styling for magazine feeling
              const fontScale = (index % 4 === 0) ? 'word-hero' : (index % 3 === 0) ? 'word-large' : 'word-standard';

              return (
                <span
                  key={skill}
                  className={`kinetic-skill-word ${fontScale} ${isHovered ? 'word-active' : ''}`}
                  onMouseEnter={() => setHoveredSkill(skill)}
                  onMouseLeave={() => setHoveredSkill(null)}
                  data-cursor="action"
                  data-cursor-label={skill}
                >
                  <span className="skill-dot font-mono">/</span>
                  <span className="skill-text">{skill}</span>
                </span>
              );
            })}
          </div>

          {/* Interactive Inspection Footer */}
          <div className="cloud-footer font-mono">
            <div className="cloud-status">
              <span className="status-indicator-dot" />
              <span>
                {hoveredSkill 
                  ? `SELECTED TOOL: ${hoveredSkill} · VERIFIED IN REPOSITORY ARCHIVE`
                  : 'HOVER OVER ANY KEYWORD TO ENGAGE FOCUS'}
              </span>
            </div>
            <div className="cloud-stats hide-mobile">
              <span>ZERO ASSUMPTIONS</span>
              <span>100% SOURCED REPOS</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
